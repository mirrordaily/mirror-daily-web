import type { SportsGameData } from '@/types/homepage'
import { GameNode } from './game-node'
import dayjs from 'dayjs'
import { SportsEvents } from '../main'

// Constants
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
 * Get future games for a specific category
 */
const getFutureGames = (
  games: GameNode[],
  maxCount: number = 2
): GameNode[] => {
  const now = dayjs()
  const futureGames = games
    .filter((game) => game.startTime.isAfter(now))
    .slice(0, maxCount)
  return futureGames
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
 * Populate game map and add futureGames for each league
 */
const populateGameMap = (allGames: GameNode[]): EventGameMapType => {
  const resultMap: EventGameMapType = new Map()

  // First, populate regular date-based games
  allGames.forEach((gameNode) => {
    const leagueKey = gameNode.normalizedLeague
    const dateKey = gameNode.date

    // Add to league-specific map
    const leagueGames = ensureNestedMapExists(resultMap, leagueKey, dateKey)
    leagueGames.push(gameNode)

    // Add to 'ALL' category
    const allGames = ensureNestedMapExists(resultMap, SportsEvents.ALL, dateKey)
    allGames.push(gameNode)
  })

  // Then, add futureGames for each league
  const leagueSet = new Set<string>()
  allGames.forEach((game) => leagueSet.add(game.normalizedLeague))

  // Add futureGames for each individual league
  leagueSet.forEach((leagueKey) => {
    const leagueGames = allGames.filter(
      (game) => game.normalizedLeague === leagueKey
    )
    const futureGames = getFutureGames(leagueGames, 2)
    ensureNestedMapExists(resultMap, leagueKey, 'futureGames')
    resultMap.get(leagueKey)!.set('futureGames', futureGames)
  })

  // Add futureGames for 'ALL' category
  const allFutureGames = getFutureGames(allGames, 2)
  ensureNestedMapExists(resultMap, SportsEvents.ALL, 'futureGames')
  resultMap.get(SportsEvents.ALL)!.set('futureGames', allFutureGames)

  return resultMap
}

/**
 * Fill gaps between min and max dates with empty arrays and ensure dates are sorted
 */
const fillDateGaps = (resultMap: EventGameMapType): EventGameMapType => {
  const filledMap: EventGameMapType = new Map()

  resultMap.forEach((leagueMap, leagueKey) => {
    // Separate date keys from special keys like 'futureGames'
    const allKeys = Array.from(leagueMap.keys())
    const dateKeys = allKeys.filter((key) => key !== 'futureGames').sort()
    const specialKeys = allKeys.filter((key) => key === 'futureGames')

    const sortedLeagueMap = new Map<string, GameNode[]>()

    // Handle date keys
    if (dateKeys.length === 0) {
      // No date keys, just preserve special keys
    } else if (dateKeys.length === 1) {
      // Single date - just preserve it
      const dateKey = dateKeys[0]
      if (dateKey) {
        sortedLeagueMap.set(dateKey, leagueMap.get(dateKey) || [])
      }
    } else if (dateKeys.length > 1) {
      // Multiple dates - fill gaps and sort
      const firstDate = dateKeys[0]
      const lastDate = dateKeys[dateKeys.length - 1]

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

    // Preserve special keys like 'futureGames'
    specialKeys.forEach((key) => {
      sortedLeagueMap.set(key, leagueMap.get(key) || [])
    })

    filledMap.set(leagueKey, sortedLeagueMap)
  })

  return filledMap
}
/**
 * Transforms sports game data into a structured map for efficient date-based lookups.
 * @param scheduleData - Array of sports game data
 * @returns Map structure: League -> Date | 'futureGames' -> GameNode[]
 *
 * Features:
 * - Groups games by league and date
 * - Fills date gaps between min/max dates with empty arrays
 * - Adds 'futureGames' key with future games for each league
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

  // 2. Populate nested map structure with futureGames
  const gameMap = populateGameMap(allGameNodes)

  // 4. Fill date gaps and ensure proper sorting
  return fillDateGaps(gameMap)
}

// Export utility functions for backward compatibility and testing
export { createSortedGameNodes }
