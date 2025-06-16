import type { SportsGameData } from '@/types/homepage'
import { GameNode } from './game-node'
import dayjs from 'dayjs'
import { SportsEvents } from '../main'

// Constants
const MIN_UPCOMING_GAMES_PER_DATE = 2
const DATE_FORMAT = 'YYYY-MM-DD'

export type EventGameMapType = Map<
  SportsEvents | string,
  Map<string, GameNode[]>
>

/**
 * Helper function to create and sort game nodes from raw data
 */
const createSortedGameNodes = (scheduleData: SportsGameData[]): GameNode[] => {
  return scheduleData
    .map((gameData) => new GameNode(gameData))
    .sort((a, b) => a.startTime.valueOf() - b.startTime.valueOf())
}

/**
 * Group games by date for backfill processing
 */
const groupGamesByDate = (gameNodes: GameNode[]): Map<string, GameNode[]> => {
  const gamesByDate = new Map<string, GameNode[]>()

  gameNodes.forEach((game) => {
    const dateKey = game.date
    if (!gamesByDate.has(dateKey)) {
      gamesByDate.set(dateKey, [])
    }
    gamesByDate.get(dateKey)!.push(game)
  })

  return gamesByDate
}

/**
 * Process backfill logic on flat array before nesting - OPTIMIZED VERSION
 */
const preprocessGamesWithBackfill = (allGameNodes: GameNode[]): GameNode[] => {
  if (allGameNodes.length === 0) return []

  // 1. Group games by date (still flat structure)
  const gamesByDate = groupGamesByDate(allGameNodes)

  // 2. Track all games and used IDs
  const processedGames: GameNode[] = [...allGameNodes]
  const usedGameIds = new Set<string | number>(allGameNodes.map((g) => g.id))

  // 3. Process each date for backfill needs
  gamesByDate.forEach((gamesOnDate, dateKey) => {
    const currentUpcomingGames = gamesOnDate.filter(
      (g) => g.status === 'UPCOMING'
    )
    const neededCount =
      MIN_UPCOMING_GAMES_PER_DATE - currentUpcomingGames.length

    if (neededCount <= 0) return

    // 4. Find candidates directly from flat array - MUCH SIMPLER!
    const dateEnd = dayjs(dateKey).endOf('day')
    const candidates = allGameNodes
      .filter(
        (game) =>
          game.status === 'UPCOMING' &&
          game.startTime.isAfter(dateEnd) &&
          !usedGameIds.has(game.id)
      )
      .slice(0, neededCount)

    // 5. Add candidates to processed games and mark as used
    candidates.forEach((game) => {
      processedGames.push(game)
      usedGameIds.add(game.id)
    })
  })

  // 6. Sort all processed games by start time
  return processedGames.sort(
    (a, b) => a.startTime.valueOf() - b.startTime.valueOf()
  )
}

/**
 * Helper function to ensure nested map structure exists
 */
const ensureNestedMapExists = (
  resultMap: EventGameMapType,
  leagueKey: string,
  dateKey: string
): GameNode[] => {
  if (!resultMap.has(leagueKey)) {
    resultMap.set(leagueKey, new Map<string, GameNode[]>())
  }
  const leagueMap = resultMap.get(leagueKey)!

  if (!leagueMap.has(dateKey)) {
    leagueMap.set(dateKey, [])
  }
  return leagueMap.get(dateKey)!
}

/**
 * Populate game map from preprocessed games (includes backfilled games)
 */
const populateGameMap = (processedGames: GameNode[]): EventGameMapType => {
  const resultMap: EventGameMapType = new Map()

  processedGames.forEach((gameNode) => {
    const leagueKey = gameNode.normalizedLeague
    const dateKey = gameNode.date

    // Add to league-specific map
    const leagueGames = ensureNestedMapExists(resultMap, leagueKey, dateKey)
    leagueGames.push(gameNode)

    // Add to 'ALL' category
    const allGames = ensureNestedMapExists(resultMap, SportsEvents.ALL, dateKey)
    allGames.push(gameNode)
  })

  return resultMap
}

/**
 * Fill gaps between min and max dates with empty arrays and ensure dates are sorted
 */
const fillDateGaps = (resultMap: EventGameMapType): EventGameMapType => {
  const filledMap: EventGameMapType = new Map()

  resultMap.forEach((leagueMap, leagueKey) => {
    const dates = Array.from(leagueMap.keys()).sort()
    if (dates.length === 0) {
      filledMap.set(leagueKey, new Map())
      return
    }

    const sortedLeagueMap = new Map<string, GameNode[]>()

    if (dates.length === 1) {
      // Single date - just preserve it
      const dateKey = dates[0]
      if (dateKey) {
        sortedLeagueMap.set(dateKey, leagueMap.get(dateKey) || [])
      }
    } else if (dates.length > 1) {
      // Multiple dates - fill gaps and sort
      const firstDate = dates[0]
      const lastDate = dates[dates.length - 1]

      if (firstDate && lastDate) {
        const startDate = dayjs(firstDate)
        const endDate = dayjs(lastDate)

        // Add all dates in chronological order
        for (
          let current = startDate;
          current.isBefore(endDate, 'day') || current.isSame(endDate, 'day');
          current = current.add(1, 'day')
        ) {
          const dateKey = current.format(DATE_FORMAT)
          const existingGames = leagueMap.get(dateKey) || []
          // Sort games within each date by start time
          const sortedGames = existingGames.sort(
            (a, b) => a.startTime.valueOf() - b.startTime.valueOf()
          )
          sortedLeagueMap.set(dateKey, sortedGames)
        }
      }
    }

    filledMap.set(leagueKey, sortedLeagueMap)
  })

  return filledMap
}
/**
 * Transforms sports game data into a structured map for efficient date-based lookups.
 * OPTIMIZED VERSION - processes backfill on flat array before nesting for better performance.
 *
 * @param scheduleData - Array of sports game data
 * @returns Map structure: League -> Date -> GameNode[]
 *
 * Features:
 * - Groups games by league and date
 * - Fills date gaps between min/max dates with empty arrays
 * - Backfills dates with insufficient upcoming games (OPTIMIZED)
 * - Includes 'ALL' category aggregating all leagues
 */
export const eventGameMap = (
  scheduleData: SportsGameData[] | undefined = []
): EventGameMapType => {
  if (!scheduleData?.length) {
    return new Map()
  }

  // 1. Create sorted game nodes (flat array)
  const allGameNodes = createSortedGameNodes(scheduleData)

  // 2. Process backfill on flat array - MUCH SIMPLER!
  const processedGames = preprocessGamesWithBackfill(allGameNodes)

  // 3. Populate nested map structure from processed games
  const gameMap = populateGameMap(processedGames)

  // 4. Fill date gaps and ensure proper sorting
  return fillDateGaps(gameMap)
}

// Export utility functions for backward compatibility and testing
export { createSortedGameNodes }
