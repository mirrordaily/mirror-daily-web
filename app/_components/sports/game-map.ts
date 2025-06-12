import type { SportsGameData } from '@/types/homepage'
import { GameNode, SportsEvents } from './game-node'
import dayjs from 'dayjs' // Import dayjs for date comparisons

export type EventGameMapType = Map<
  SportsEvents | string,
  Map<string, GameNode[]>
>

/**
 * Example output structure (after augmentation):
 * {
 *   'CPBL': Map {
 *     "2025-06-07" => [GameNode (original), GameNode (from 2025-06-08 if needed), ...],
 *     "2025-06-08" => [GameNode (possibly from future if original was empty/missing) ...], // Now guaranteed to exist
 *     "2025-06-09" => [GameNode, ...]
 *   },
 *   'TPBL': Map {
 *     "2025-06-07" => [GameNode, ...],
 *     "2025-06-08" => [GameNode, ...]
 *   },
 *   'ALL': Map {  // Aggregates all games for the date
 *     "2025-06-07" => [CPBLGame1, CPBLGame2, TPBLGame1, ...],
 *     "2025-06-08" => [CPBLGame3, ...]
 *   }
 * }
 */
export const eventGameMap = (
  scheduleData: SportsGameData[] | undefined = []
): EventGameMapType => {
  const resultMap: EventGameMapType = new Map()

  if (!scheduleData || scheduleData.length === 0) {
    return resultMap
  }

  // 1. Create and sort all GameNode instances from the entire scheduleData
  // This list will be used to find future upcoming games.
  const allGameNodesSorted: GameNode[] = scheduleData
    .map((singleGameData) => new GameNode(singleGameData))
    .sort((a, b) => a.startTime.valueOf() - b.startTime.valueOf())

  // 2. Initial population of resultMap (league-specific and 'ALL')
  allGameNodesSorted.forEach((gameNode) => {
    const leagueKey = gameNode.normalizedLeague
    const dateKey = gameNode.date // YYYY-MM-DD string from GameNode

    // Populate league-specific map
    if (!resultMap.has(leagueKey)) {
      resultMap.set(leagueKey, new Map<string, GameNode[]>())
    }
    const leagueDateMap = resultMap.get(leagueKey)!
    if (!leagueDateMap.has(dateKey)) {
      leagueDateMap.set(dateKey, [])
    }
    leagueDateMap.get(dateKey)!.push(gameNode) // Games are added in sorted order due to allGameNodesSorted

    // Populate 'ALL' category map
    const allEventsKey = SportsEvents.ALL
    if (!resultMap.has(allEventsKey)) {
      resultMap.set(allEventsKey, new Map<string, GameNode[]>())
    }
    const allEventsDateMap = resultMap.get(allEventsKey)!
    if (!allEventsDateMap.has(dateKey)) {
      allEventsDateMap.set(dateKey, [])
    }
    allEventsDateMap.get(dateKey)!.push(gameNode) // Games are added in sorted order
  })
  // At this point, games within each date array are already sorted by startTime
  // because we iterated through `allGameNodesSorted`.

  // 2.5. Ensure contiguous date keys for each league (including 'ALL')
  for (const leagueMap of Array.from(resultMap.values())) {
    const dateKeysInLeague = Array.from(leagueMap.keys())
    if (dateKeysInLeague.length < 2) {
      // Need at least two dates to define a range for filling gaps
      continue
    }

    // Sort date keys to reliably find min and max for this specific league
    dateKeysInLeague.sort((a, b) => dayjs(a).valueOf() - dayjs(b).valueOf())

    const minDateStr = dateKeysInLeague[0]
    const maxDateStr = dateKeysInLeague[dateKeysInLeague.length - 1]

    let currentDate = dayjs(minDateStr)
    const endDateLoop = dayjs(maxDateStr) // Loop up to and including the max date

    while (
      currentDate.isBefore(endDateLoop) ||
      currentDate.isSame(endDateLoop, 'day')
    ) {
      const currentDateFormattedStr = currentDate.format('YYYY-MM-DD')
      if (!leagueMap.has(currentDateFormattedStr)) {
        leagueMap.set(currentDateFormattedStr, []) // Add missing date with empty array
      }
      currentDate = currentDate.add(1, 'day')
    }
  }

  // 3. Augmentation Step: Ensure each date list has up to 2 upcoming games
  // by adding future ones if necessary.
  for (const leagueMap of Array.from(resultMap.values())) {
    // Iterates through CPBL map, TPBL map, ALL map
    for (const [dateKey, gamesOnDateList] of Array.from(leagueMap.entries())) {
      // Use .entries() to get key-value pairs
      // Iterates through each date's game list
      const currentUpcomingGames = gamesOnDateList.filter(
        (game) => game.status === 'UPCOMING'
      )
      let neededUpcomingCount = 2 - currentUpcomingGames.length

      if (neededUpcomingCount > 0) {
        const gamesToAdd: GameNode[] = []
        // Keep track of IDs already in this specific gamesOnDateList to avoid duplicates from future additions
        const existingIdsInList = new Set(gamesOnDateList.map((g) => g.id))

        // Iterate through all sorted games to find suitable future upcoming games
        for (const candidateGame of allGameNodesSorted) {
          if (neededUpcomingCount <= 0) break // Stop if we've found enough

          // Check if candidate is UPCOMING, chronologically AFTER the current dateKey,
          // and not already in the current list (either originally or already added from future)
          if (
            candidateGame.status === 'UPCOMING' &&
            candidateGame.startTime.isAfter(dayjs(dateKey).endOf('day')) && // Ensure it's from a future point
            !existingIdsInList.has(candidateGame.id)
          ) {
            gamesToAdd.push(candidateGame)
            existingIdsInList.add(candidateGame.id) // Add to set to prevent re-adding during this fill operation
            neededUpcomingCount--
          }
        }

        if (gamesToAdd.length > 0) {
          gamesOnDateList.push(...gamesToAdd)
          // Re-sort the list for this specific date, as we've added new games
          gamesOnDateList.sort(
            (a, b) => a.startTime.valueOf() - b.startTime.valueOf()
          )
        }
      }
    }
  }
  return resultMap
}
