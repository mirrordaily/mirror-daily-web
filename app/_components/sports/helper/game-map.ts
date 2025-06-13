import type { SportsGameData } from '@/types/homepage'
import { GameNode } from './game-node'
import dayjs from 'dayjs'
import { SportsEvents } from '../main'

export type EventGameMapType = Map<
  SportsEvents | string,
  Map<string, GameNode[]>
>

/**
 * Example output structure:
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

  // 變成節點，降序排列
  const allGameNodesSorted: GameNode[] = scheduleData
    .map((singleGameData) => new GameNode(singleGameData))
    .sort((a, b) => a.startTime.valueOf() - b.startTime.valueOf())

  // 2. Initial population of resultMap (league-specific and 'ALL')
  allGameNodesSorted.forEach((gameNode) => {
    const leagueKey = gameNode.normalizedLeague
    const dateKey = gameNode.date

    // Populate league-specific map
    if (!resultMap.has(leagueKey)) {
      resultMap.set(leagueKey, new Map<string, GameNode[]>())
    }
    const leagueDateMap = resultMap.get(leagueKey)!
    if (!leagueDateMap.has(dateKey)) {
      leagueDateMap.set(dateKey, [])
    }
    leagueDateMap.get(dateKey)!.push(gameNode)

    // Populate 'ALL' category map
    const allEventsKey = SportsEvents.ALL
    if (!resultMap.has(allEventsKey)) {
      resultMap.set(allEventsKey, new Map<string, GameNode[]>())
    }
    const allEventsDateMap = resultMap.get(allEventsKey)!
    if (!allEventsDateMap.has(dateKey)) {
      allEventsDateMap.set(dateKey, [])
    }
    allEventsDateMap.get(dateKey)!.push(gameNode)
  })

  // 因為按照日期排列，所以需要確保每個key都是連續的日期，如果沒有的要補空陣列
  for (const leagueMap of Array.from(resultMap.values())) {
    const dateKeysInLeague = Array.from(leagueMap.keys())
    if (dateKeysInLeague.length < 2) {
      continue
    }

    dateKeysInLeague.sort((a, b) => dayjs(a).valueOf() - dayjs(b).valueOf())

    const minDateStr = dateKeysInLeague[0]
    const maxDateStr = dateKeysInLeague[dateKeysInLeague.length - 1]

    let currentDate = dayjs(minDateStr)
    const endDateLoop = dayjs(maxDateStr)

    while (
      currentDate.isBefore(endDateLoop) ||
      currentDate.isSame(endDateLoop, 'day')
    ) {
      const currentDateFormattedStr = currentDate.format('YYYY-MM-DD')
      if (!leagueMap.has(currentDateFormattedStr)) {
        leagueMap.set(currentDateFormattedStr, [])
      }
      currentDate = currentDate.add(1, 'day')
    }
  }

  // 如果當天沒有比賽，要加入兩個未來的比賽
  for (const leagueMap of Array.from(resultMap.values())) {
    for (const [dateKey, gamesOnDateList] of Array.from(leagueMap.entries())) {
      const currentUpcomingGames = gamesOnDateList.filter(
        (game) => game.status === 'UPCOMING'
      )
      let neededUpcomingCount = 2 - currentUpcomingGames.length

      if (neededUpcomingCount > 0) {
        const gamesToAdd: GameNode[] = []
        const existingIdsInList = new Set(
          gamesOnDateList.map((game) => game.id)
        )

        for (const candidateGame of allGameNodesSorted) {
          if (neededUpcomingCount <= 0) break
          if (
            candidateGame.status === 'UPCOMING' &&
            candidateGame.startTime.isAfter(dayjs(dateKey).endOf('day')) &&
            !existingIdsInList.has(candidateGame.id)
          ) {
            gamesToAdd.push(candidateGame)
            existingIdsInList.add(candidateGame.id)
            neededUpcomingCount--
          }
        }

        if (gamesToAdd.length > 0) {
          gamesOnDateList.push(...gamesToAdd)
          gamesOnDateList.sort(
            (a, b) => a.startTime.valueOf() - b.startTime.valueOf()
          )
        }
      }
    }
  }
  return resultMap
}
