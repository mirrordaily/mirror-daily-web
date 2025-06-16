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
 * Helper function to ensure a league map exists in the result map
 */
const ensureLeagueMapExists = (
  resultMap: EventGameMapType,
  leagueKey: string
): Map<string, GameNode[]> => {
  if (!resultMap.has(leagueKey)) {
    resultMap.set(leagueKey, new Map<string, GameNode[]>())
  }
  return resultMap.get(leagueKey)!
}

/**
 * Helper function to ensure a date array exists in a league map
 */
const ensureDateArrayExists = (
  leagueMap: Map<string, GameNode[]>,
  dateKey: string
): GameNode[] => {
  if (!leagueMap.has(dateKey)) {
    leagueMap.set(dateKey, [])
  }
  return leagueMap.get(dateKey)!
}

/**
 * Populate the initial game map with games grouped by league and date
 */
const populateInitialGameMap = (
  resultMap: EventGameMapType,
  gameNodes: GameNode[]
): void => {
  gameNodes.forEach((gameNode) => {
    const leagueKey = gameNode.normalizedLeague
    const dateKey = gameNode.date

    // Add to league-specific map
    const leagueMap = ensureLeagueMapExists(resultMap, leagueKey)
    const leagueGames = ensureDateArrayExists(leagueMap, dateKey)
    leagueGames.push(gameNode)

    // Add to 'ALL' category
    const allEventsMap = ensureLeagueMapExists(resultMap, SportsEvents.ALL)
    const allGames = ensureDateArrayExists(allEventsMap, dateKey)
    allGames.push(gameNode)
  })
}

/**
 * Fill gaps between min and max dates with empty arrays and ensure dates are sorted
 */
const fillDateGaps = (resultMap: EventGameMapType): void => {
  resultMap.forEach((leagueMap, leagueKey) => {
    const dates = Array.from(leagueMap.keys()).sort()
    if (dates.length === 0) return

    // Create a new map with sorted dates
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
          sortedLeagueMap.set(dateKey, existingGames)
        }
      }
    }

    // Replace the original map with the sorted one
    resultMap.set(leagueKey, sortedLeagueMap)
  })
}

/**
 * Backfill dates with insufficient upcoming games
 */
const backfillUpcomingGames = (
  resultMap: EventGameMapType,
  allGameNodes: GameNode[]
): void => {
  resultMap.forEach((leagueMap) => {
    leagueMap.forEach((gamesOnDate, dateKey) => {
      const currentUpcomingGames = gamesOnDate.filter(
        (game) => game.status === 'UPCOMING'
      )
      let neededCount =
        MIN_UPCOMING_GAMES_PER_DATE - currentUpcomingGames.length

      if (neededCount <= 0) return

      const existingIds = new Set(gamesOnDate.map((game) => game.id))
      const gamesToAdd: GameNode[] = []
      const dateEnd = dayjs(dateKey).endOf('day')

      for (const candidateGame of allGameNodes) {
        if (neededCount <= 0) break

        if (
          candidateGame.status === 'UPCOMING' &&
          candidateGame.startTime.isAfter(dateEnd) &&
          !existingIds.has(candidateGame.id)
        ) {
          gamesToAdd.push(candidateGame)
          existingIds.add(candidateGame.id)
          neededCount--
        }
      }

      if (gamesToAdd.length > 0) {
        gamesOnDate.push(...gamesToAdd)
        gamesOnDate.sort(
          (a, b) => a.startTime.valueOf() - b.startTime.valueOf()
        )
      }
    })
  })
}
/**
 * Transforms sports game data into a structured map for efficient date-based lookups.
 *
 * @param scheduleData - Array of sports game data
 * @returns Map structure: League -> Date -> GameNode[]
 *
 * Features:
 * - Groups games by league and date
 * - Fills date gaps between min/max dates with empty arrays
 * - Backfills dates with insufficient upcoming games
 * - Includes 'ALL' category aggregating all leagues
 */
export const eventGameMap = (
  scheduleData: SportsGameData[] | undefined = []
): EventGameMapType => {
  const resultMap: EventGameMapType = new Map()

  if (!scheduleData?.length) {
    return resultMap
  }

  const allGameNodes = createSortedGameNodes(scheduleData)

  populateInitialGameMap(resultMap, allGameNodes)
  fillDateGaps(resultMap)
  backfillUpcomingGames(resultMap, allGameNodes)

  return resultMap
}
