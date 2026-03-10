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
  STATIC_JSON_EDITOR_CHOICE,
  STATIC_JSON_HOT_NEWS,
  STATIC_JSON_SPORTS_EVENTS,
  STATIC_JSON_TOPIC,
  STATIC_JSON_WEATHER,
  STATIC_JSON_LATEST_SPORTS_NEWS,
  STATIC_JSON_PROMOTE_TOPICS,
} from '@/constants/config'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import { readStaticJson } from '@/utils/read-static-json'
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
  const data = await createDataFetchingChain<
    z.infer<ZodArray<typeof rawHotNewsSchema>>
  >(
    errorLogger,
    [],
    async () => {
      const jsonData = await readStaticJson(STATIC_JSON_HOT_NEWS)
      const result = z
        .object({ hots: z.array(rawHotNewsSchema) })
        .parse(jsonData)
      return result.hots
    },
    async () => {
      const result = await fetchGQLData(errorLogger, GetFlashNewsDocument)
      const parsedResult = z
        .object({ hots: z.array(rawHotNewsSchema) })
        .parse(result)
      return parsedResult.hots
    }
  )
  return transformRawHotNews(data)
}

export const fetchEditorChoices = async (): Promise<
  ParameterOfComponent<typeof EditorChoiceMain>
> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching editor choices',
    getTraceObject()
  )
  const editorData = await createDataFetchingChain<
    z.infer<ZodArray<typeof editorChoiceSchenma>>
  >(
    errorLogger,
    [],
    async () => {
      const jsonData = await readStaticJson(STATIC_JSON_EDITOR_CHOICE)
      const result = z
        .object({ editorChoices: z.array(editorChoiceSchenma) })
        .parse(jsonData)
      return result.editorChoices
    },
    async () => {
      const result = await fetchGQLData(errorLogger, GetEditorChoicesDocument)
      const parsedResult = z
        .object({ editorChoices: z.array(editorChoiceSchenma) })
        .parse(result)
      return parsedResult.editorChoices
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
  const topicApiResponseSchema = z.object({ topics: z.array(topicsSchema) })

  const data = await createDataFetchingChain<
    z.infer<ZodArray<typeof topicsSchema>>
  >(
    errorLogger,
    [],
    async () => {
      const jsonData = await readStaticJson(STATIC_JSON_TOPIC)
      return topicApiResponseSchema.parse(jsonData).topics
    },
    async () => {
      const result = await fetchGQLData(errorLogger, GetTopicsDocument)
      return topicApiResponseSchema.parse(result).topics
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
    const jsonData = await readStaticJson(STATIC_JSON_WEATHER)
    const rawWeatherData = cityWeatherSchema.parse(jsonData)

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
  try {
    const jsonData = await readStaticJson(STATIC_JSON_SPORTS_EVENTS)
    const rawSportsEventsData = sportsEventsApiResponseSchema.parse(jsonData)
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
    const jsonData = await readStaticJson(STATIC_JSON_LATEST_SPORTS_NEWS)
    const parseResult = latestSportsNewsSchema.safeParse(jsonData)
    if (!parseResult.success) {
      errorLogger(parseResult.error)
      return []
    }
    const parsed = parseResult.data
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

  const schema = z.object({
    promoteTopics: z.array(promoteTopicSchema),
  })

  try {
    const jsonData = await readStaticJson(STATIC_JSON_PROMOTE_TOPICS)
    const result = schema.parse(jsonData)
    console.log(result.promoteTopics)
    return result.promoteTopics.map(transformRawPromoteTopic)
  } catch (e) {
    errorLogger(e)
    return []
  }
}
