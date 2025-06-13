'use server'

import {
  type PickupItemInTopNewsSection,
  type FlashNews,
  type EditorChoice,
  type TopicPost,
  type CityAndWeather,
  type SportsGameData,
  type LatestSportsNewsData,
} from '@/types/homepage'
import {
  URL_STATIC_EDITOR_CHOICE,
  URL_STATIC_HOT_NEWS,
  URL_STATIC_SPORTS_EVENTS,
  URL_STATIC_TOPIC,
  URL_STATIC_WEATHER,
  URL_STATIC_LATEST_SPORTS_NEWS,
} from '@/constants/config'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import type {
  GetLiveEventForHomepageQuery,
  ImageDataFragment,
} from '@/graphql/__generated__/graphql'
import {
  GetEditorChoicesDocument,
  GetLiveEventForHomepageDocument,
  GetTopicsDocument,
  GetFlashNewsDocument,
} from '@/graphql/__generated__/graphql'
import dayjs from 'dayjs'
import {
  getExternalPageUrl,
  getStoryPageUrl,
  getTopicPageUrl,
} from '@/utils/site-urls'
import { createDataFetchingChain, getHeroImage } from '@/utils/data-process'
import type { ParameterOfComponent, HeroImage } from '@/types/common'
import type EditorChoiceMain from './_components/editor-choice/main'
import type TopicMain from './_components/topic/topic-main'
import type { ZodArray } from 'zod'
import { z } from 'zod'
import {
  rawHotNewsSchema,
  editorChoiceSchenma,
  topicsSchema,
  cityWeatherSchema,
  sportsEventsApiResponseSchema,
  latestSportsNewsSchema,
} from '@/utils/data-schema'

const transformRawLiveEvents = (
  rawLiveEvents: GetLiveEventForHomepageQuery['events']
): PickupItemInTopNewsSection | null => {
  const event = (rawLiveEvents ? rawLiveEvents[0] : null) ?? null

  if (!event) return event

  return {
    postName: event.name ?? '',
    link: event.link ?? '',
    heroImage: getHeroImage(event.heroImage),
    isVideoType: true,
  }
}

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

const transformRawHotNews = (
  rawData: z.infer<ZodArray<typeof rawHotNewsSchema>>
): FlashNews[] => {
  if (!rawData) return []
  return rawData.map(({ hotnews, hotexternal, outlink }) => {
    if (outlink) {
      return {
        link: outlink,
        postName: '快訊',
      }
    }

    if (hotnews) {
      const postId = hotnews?.id ?? ''
      return {
        link: getStoryPageUrl(postId),
        postName: hotnews?.title ?? '',
      }
    }

    if (hotexternal) {
      const postId = hotexternal?.id ?? ''
      return {
        link: getExternalPageUrl(postId),
        postName: hotexternal?.title ?? '',
      }
    }

    return {
      link: '',
      postName: '',
    }
  })
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

const transformEditorChoices = (
  rawData: z.infer<ZodArray<typeof editorChoiceSchenma>>
): EditorChoice[] => {
  if (!rawData) return []

  // NOTE: outlink, external, choices 只會擇一出現，因此總共有三種情況
  return rawData.map(
    (
      { outlink, heroImage, choices: rawPost, choiceexternal: externalRawPost },
      index
    ) => {
      const postId = rawPost?.id ?? ''
      const externalId = externalRawPost?.id ?? ''

      /**除了choiceexternal, choices 編輯精選也可以設定首圖，如果有設定的話會優先使用。 */
      const getHeroImageByPostType = (
        imageParam:
          | Pick<ImageDataFragment, 'resized' | 'resizedWebp'>
          | string
          | null
          | undefined
      ) => {
        const editorChoiceHeroImage = heroImage ? getHeroImage(heroImage) : null
        return editorChoiceHeroImage || getHeroImage(imageParam)
      }

      if (outlink) {
        return {
          postId: '',
          postName: '',
          link: outlink,
          heroImage: getHeroImageByPostType(heroImage),
        }
      }

      if (externalId) {
        return {
          postId: `${index}-${externalId}`,
          postName: externalRawPost?.title ?? '',
          link: getExternalPageUrl(externalId),
          heroImage: getHeroImageByPostType(externalRawPost?.thumb),
        }
      }

      return {
        postId: `${index}-${postId}`,
        postName: rawPost?.title ?? '',
        link: getStoryPageUrl(postId),
        heroImage: getHeroImageByPostType(rawPost?.heroImage),
      }
    }
  )
}

export const fetchEditorChoices = async (): Promise<
  ParameterOfComponent<typeof EditorChoiceMain>
> => {
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
      const resp = await fetch(URL_STATIC_EDITOR_CHOICE)

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
    editor: transformEditorChoices(editorData).slice(0, 10),
    // TODO: fetch AI data from JSON file (different to `editor`)
    ai: [],
  }
}

const transformTopics = (
  rawData: z.infer<ZodArray<typeof topicsSchema>>
): ParameterOfComponent<typeof TopicMain>['data'] | null => {
  if (!rawData) return null

  const convertedData = rawData.map((topic) => {
    const topicName = topic.name || ''
    const topicSlug = topic.slug || ''
    const topicLink = getTopicPageUrl(topicSlug)
    const posts: TopicPost[] =
      topic.posts?.map((rawPost) => {
        const postId = rawPost?.id ?? ''
        return {
          postId,
          postName: rawPost?.title ?? '',
          heroImage: getHeroImage(rawPost?.heroImage),
          link: getStoryPageUrl(postId),
          topicLink,
        }
      }) ?? []

    return [topicName, posts] as const
  })

  const filteredData = convertedData.filter(
    (data): data is [string, [TopicPost, ...TopicPost[]]] => {
      const [, posts] = data
      return posts.length > 0
    }
  )

  if (filteredData.length === 0) return null
  else return Object.fromEntries(filteredData)
}

export const fetchTopics = async (): Promise<
  ParameterOfComponent<typeof TopicMain>['data'] | null
> => {
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

const transformWeather = (
  rawData: z.infer<typeof cityWeatherSchema>
): CityAndWeather => {
  return Object.fromEntries(
    Object.entries(rawData).map(([city, info]) => [
      city,
      {
        date: info.date,
        maxTemp: info.max_temp,
        minTemp: info.min_temp,
        weatherDesc: info.weather_desc,
        weatherCode: info.weather_code,
        weather: info.weather,
        fetchTime: info.fetch_time,
      },
    ])
  )
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

const transformSportsEvents = (
  rawData: z.infer<typeof sportsEventsApiResponseSchema> | undefined
): SportsGameData[] => {
  if (!rawData) return []

  const allGames: SportsGameData[] = []

  for (const leagueName of Object.keys(rawData) as Array<
    keyof typeof rawData
  >) {
    const leagueData = rawData[leagueName]

    if (!Array.isArray(leagueData)) return []
    leagueData.forEach((dailySchedule) => {
      if (!dailySchedule || !Array.isArray(dailySchedule.games)) return []
      dailySchedule.games.forEach((game) => {
        allGames.push({
          id: `${leagueName}-${game.game_sno}`,
          league: leagueName,
          startTime: game.datetime,
          endTime: game.end_datetime ?? '',
          result: game.game_result,
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

type ImageSizeVariants = {
  original: string
  w480: string
  w800: string
  w1200: string
  w1600: string
  w2400: string
}

type SchemaImageData = z.infer<
  typeof latestSportsNewsSchema
>['category']['items'][0]['heroImage']

const createImageSizeVariants = (
  primaryImage: HeroImage,
  fallbackImage: SchemaImageData,
  isWebp = false
): ImageSizeVariants => {
  const imageType = isWebp ? 'resizedWebp' : 'resized'
  const sizes = ['original', 'w480', 'w800', 'w1200', 'w1600', 'w2400'] as const

  return sizes.reduce((variants, size) => {
    variants[size] =
      primaryImage?.[imageType]?.[size] ??
      fallbackImage?.[imageType]?.[size] ??
      ''
    return variants
  }, {} as ImageSizeVariants)
}

const transformSportsNewsImage = (
  heroImage: SchemaImageData,
  ogImage: SchemaImageData
): LatestSportsNewsData['heroImage'] => {
  const transformedHeroImage = getHeroImage(heroImage)

  return {
    resized: createImageSizeVariants(transformedHeroImage, ogImage, false),
    resizedWebp: createImageSizeVariants(transformedHeroImage, ogImage, true),
  }
}

const transformLatestSportsNews = (
  rawData: z.infer<typeof latestSportsNewsSchema> | undefined
): LatestSportsNewsData[] => {
  if (!rawData) return []

  return rawData.category.items.map(
    ({ id, type, title, publishedDate, heroImage, og_image }) => ({
      id,
      type,
      title,
      publishedDate,
      heroImage: transformSportsNewsImage(heroImage, og_image),
    })
  )
}

export const fetchLatestSportsNews = async (): Promise<
  LatestSportsNewsData[] | undefined
> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching latest sports news',
    getTraceObject()
  )
  const schema = z.promise(latestSportsNewsSchema)
  try {
    const resp = await fetch(URL_STATIC_LATEST_SPORTS_NEWS)
    const rawSportsEventsData = await schema.parse(resp.json())
    return transformLatestSportsNews(rawSportsEventsData)
  } catch (e) {
    errorLogger(e)
  }
}
