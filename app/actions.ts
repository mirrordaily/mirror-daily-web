'use server'

import type {
  PickupItemInTopNewsSection,
  FlashNews,
  TopicBundle,
  CityAndWeather,
  SportsGameData,
  LatestSportsNewsData,
  PromoteTopicData,
} from '@/types/homepage'
import {
  URL_STATIC_EDITOR_CHOICE,
  URL_STATIC_HOT_NEWS,
  URL_STATIC_SPORTS_EVENTS,
  URL_STATIC_TOPIC,
  URL_STATIC_WEATHER,
  URL_STATIC_LATEST_SPORTS_NEWS,
  URL_STATIC_PROMOTE_TOPICS,
} from '@/constants/config'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import {
  GetEditorChoicesDocument,
  GetLiveEventForHomepageDocument,
  GetTopicsDocument,
  GetFlashNewsDocument,
} from '@/graphql/__generated__/graphql'
import dayjs from 'dayjs'
import { createDataFetchingChain } from '@/utils/data-process'
import type { ParameterOfComponent } from '@/types/common'
import type EditorChoiceMain from './_components/editor-choice/main'
import type { ZodArray } from 'zod'
import { z } from 'zod'
import {
  rawHotNewsSchema,
  editorChoiceSchenma,
  topicsSchema,
  cityWeatherSchema,
  sportsEventsApiResponseSchema,
  latestSportsNewsSchema,
  promoteTopicSchema,
} from '@/utils/data-schema'
import {
  transformRawLiveEvents,
  transformRawHotNews,
  transformEditorChoices,
  transformTopics,
  transformWeather,
  transformSportsEvents,
  transformLatestSportsNews,
  transformRawPromoteTopic,
} from '@/utils/transform-homepage'

export const fetchLiveEvent =
  async (): Promise<PickupItemInTopNewsSection | null> => {
    const errorLogger = createErrorLogger(
      'Error occurs while fetching live event data in homepage',
      getTraceObject()
    )

    const result = await fetchGQLData(
      errorLogger,
      GetLiveEventForHomepageDocument,
      {
        startDate: dayjs().add(5, 'minutes').toISOString(),
        endDate: dayjs().toISOString(),
      }
    )

    if (result) {
      const { events } = result
      return transformRawLiveEvents(events)
    }
    return null
  }

export const fetchHotNews = async (): Promise<FlashNews[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching hot news',
    getTraceObject()
  )
  const schema = z.promise(z.object({ hots: z.array(rawHotNewsSchema) }))

  const data = await createDataFetchingChain<
    z.infer<ZodArray<typeof rawHotNewsSchema>>
  >(
    errorLogger,
    [],
    async () => {
      const resp = await fetch(URL_STATIC_HOT_NEWS)
      const result = await schema.parse(resp.json())
      return result.hots
    },
    async () => {
      const result = await schema.parse(
        fetchGQLData(errorLogger, GetFlashNewsDocument)
      )
      return result.hots
    }
  )
  return transformRawHotNews(data)
}

export const fetchEditorChoices = async (): Promise<
  ParameterOfComponent<typeof EditorChoiceMain>
> => {
  const param = String(Date.now()).slice(0, 8)
  const errorLogger = createErrorLogger(
    'Error occurs while fetching editor choices',
    getTraceObject()
  )
  const schema = z.promise(
    z.object({ editorChoices: z.array(editorChoiceSchenma) })
  )

  const editorData = await createDataFetchingChain<
    z.infer<ZodArray<typeof editorChoiceSchenma>>
  >(
    errorLogger,
    [],
    async () => {
      const resp = await fetch(`${URL_STATIC_EDITOR_CHOICE}?param=${param}`)

      const result = await schema.parse(resp.json())
      return result.editorChoices
    },
    async () => {
      const result = await schema.parse(
        fetchGQLData(errorLogger, GetEditorChoicesDocument)
      )
      return result.editorChoices
    }
  )

  return {
    editor: transformEditorChoices(editorData).slice(0, 15),
    // TODO: fetch AI data from JSON file (different to `editor`)
    ai: [],
  }
}

export const fetchTopics = async (): Promise<TopicBundle[] | null> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching topics',
    getTraceObject()
  )
  const schema = z.promise(z.object({ topics: z.array(topicsSchema) }))

  const data = await createDataFetchingChain<
    z.infer<ZodArray<typeof topicsSchema>>
  >(
    errorLogger,
    [],
    async () => {
      const resp = await fetch(URL_STATIC_TOPIC)

      const result = await schema.parse(resp.json())
      return result.topics
    },
    async () => {
      const result = await schema.parse(
        fetchGQLData(errorLogger, GetTopicsDocument)
      )
      return result.topics
    }
  )

  return transformTopics(data)
}

export const fetchWeather = async (): Promise<CityAndWeather | undefined> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching weather',
    getTraceObject()
  )

  try {
    const resp = await fetch(URL_STATIC_WEATHER)
    const rawWeatherData = await z.promise(cityWeatherSchema).parse(resp.json())

    return transformWeather(rawWeatherData)
  } catch (e) {
    errorLogger(e)
  }
}

export const fetchSportsEvents = async (): Promise<
  SportsGameData[] | undefined
> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching sports events',
    getTraceObject()
  )
  const schema = z.promise(sportsEventsApiResponseSchema)
  try {
    const resp = await fetch(URL_STATIC_SPORTS_EVENTS)
    const rawSportsEventsData = await schema.parse(resp.json())
    return transformSportsEvents(rawSportsEventsData)
  } catch (e) {
    errorLogger(e)
  }
}

export const fetchLatestSportsNews = async (): Promise<
  LatestSportsNewsData[] | undefined
> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching latest sports news',
    getTraceObject()
  )
  try {
    const resp = await fetch(URL_STATIC_LATEST_SPORTS_NEWS)
    const json = await resp.json()

    const parseResult = latestSportsNewsSchema.safeParse(json)

    if (!parseResult.success) {
      errorLogger(parseResult.error)
      return []
    }
    const parsed = await parseResult.data
    return transformLatestSportsNews(parsed)
  } catch (e) {
    errorLogger(e)
  }
}

export const fetchPromoteTopics = async (): Promise<PromoteTopicData[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching promote topics',
    getTraceObject()
  )

  const schema = z.array(promoteTopicSchema)

  try {
    const resp = await fetch(URL_STATIC_PROMOTE_TOPICS)
    const json = await resp.json()
    const result = schema.parse(json.promoteTopics)
    return result.map(transformRawPromoteTopic)
  } catch (e) {
    errorLogger(e)
    return []
  }
}
