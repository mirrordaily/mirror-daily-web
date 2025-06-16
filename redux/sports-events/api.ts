import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL_STATIC_SPORTS_EVENTS } from '@/constants/config'
import type { SportsGameData } from '@/types/homepage'
import { sportsEventsApiResponseSchema } from '@/utils/data-schema'
import { type z } from 'zod'

// Copy the transform function from actions.ts since it's not exported
const transformSportsEvents = (
  rawData: z.infer<typeof sportsEventsApiResponseSchema> | undefined
): SportsGameData[] => {
  if (!rawData) return []

  const allGames: SportsGameData[] = []

  for (const leagueName of Object.keys(rawData) as Array<
    keyof typeof rawData
  >) {
    const leagueData = rawData[leagueName]

    if (!Array.isArray(leagueData)) continue
    leagueData.forEach((dailySchedule) => {
      if (!dailySchedule || !Array.isArray(dailySchedule.games)) return
      dailySchedule.games.forEach((game) => {
        allGames.push({
          id: `${leagueName}-${game.game_sno}`,
          league: leagueName,
          startTime: game.datetime,
          endTime: game.end_datetime ?? '',
          result: game.game_result,
          gameResultName: game.game_result_name,
          isGameStop: game.is_game_stop === '0',
          presentStatus: game.present_status,
          homeTeamName: game.home_team,
          homeTeamScore: game.home_score,
          homeTeamLogo: game.home_logo,
          visitingTeamName: game.visiting_team,
          visitingTeamScore: game.visiting_score,
          visitingTeamLogo: game.visiting_logo,
          currentPlay: game.currentPlay ? game.currentPlay : undefined,
        })
      })
    })
  }

  return allGames
}

export const sportsEventsApi = createApi({
  reducerPath: 'sportsEventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints: (builder) => ({
    getSportsEvents: builder.query<SportsGameData[], void>({
      query: () => ({
        url: URL_STATIC_SPORTS_EVENTS,
      }),
      transformResponse: (response: unknown) => {
        try {
          const validated = sportsEventsApiResponseSchema.parse(response)
          return transformSportsEvents(validated)
        } catch (error) {
          console.error('Failed to parse sports events:', error)
          return []
        }
      },
    }),
  }),
})

export const { useGetSportsEventsQuery } = sportsEventsApi
