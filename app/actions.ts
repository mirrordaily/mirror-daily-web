'use server'

import type {
  PickupItemInTopNewsSection,
  FlashNews,
  EditorChoice,
  TopicPost,
  Game,
} from '@/types/homepage'
import {
  URL_STATIC_EDITOR_CHOICE,
  URL_STATIC_FLASH_NEWS,
  URL_STATIC_GAME,
  URL_STATIC_TOPIC,
} from '@/constants/config'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import type { GetLiveEventForHomepageQuery } from '@/graphql/__generated__/graphql'
import {
  GetEditorChoicesDocument,
  GetFlashNewsDocument,
  GetGamesDocument,
  GetLiveEventForHomepageDocument,
  GetTopicsDocument,
} from '@/graphql/__generated__/graphql'
import dayjs from 'dayjs'
import { getStoryPageUrl, getTopicPageUrl } from '@/utils/site-urls'
import { createDataFetchingChain, getHeroImage } from '@/utils/data-process'
import type { ParameterOfComponent } from '@/types/common'
import type EditorChoiceMain from './_components/editor-choice/main'
import type TopicMain from './_components/topic/topic-main'
import type { ZodArray } from 'zod'
import { z } from 'zod'
import {
  rawFlashNewsSchema,
  editorChoiceSchenma,
  topicsSchema,
  gameSchema,
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
      }
    )

    if (result) {
      const { events } = result
      return transformRawLiveEvents(events)
    }
    return null
  }

const transformRawFlashNews = (
  rawData: z.infer<ZodArray<typeof rawFlashNewsSchema>>
): FlashNews[] => {
  if (!rawData) return []

  return rawData.map((rawPost) => {
    const postId = rawPost.id ?? ''

    return {
      postId,
      postName: rawPost.title ?? '',
      link: getStoryPageUrl(postId),
    }
  })
}

export const fetchFlashNews = async (): Promise<FlashNews[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching flash news',
    getTraceObject()
  )
  const schema = z.promise(z.object({ posts: z.array(rawFlashNewsSchema) }))

  const data = await createDataFetchingChain<
    z.infer<ZodArray<typeof rawFlashNewsSchema>>
  >(
    errorLogger,
    [],
    async () => {
      const resp = await fetch(URL_STATIC_FLASH_NEWS)

      const result = await schema.parse(resp.json())
      return result.posts
    },
    async () => {
      const result = await schema.parse(
        fetchGQLData(errorLogger, GetFlashNewsDocument)
      )
      return result.posts
    }
  )

  return transformRawFlashNews(data).slice(0, 8)
}

const transformEditorChoices = (
  rawData: z.infer<ZodArray<typeof editorChoiceSchenma>>
): EditorChoice[] => {
  if (!rawData) return []

  return rawData.map(({ outlink, heroImage, choices: rawPost }, index) => {
    const postId = rawPost?.id ?? ''

    if (outlink) {
      return {
        postId: `${index}-${postId}`,
        postName: rawPost?.title ?? '',
        link: outlink,
        heroImage: getHeroImage(heroImage),
      }
    }

    return {
      postId: `${index}-${postId}`,
      postName: rawPost?.title ?? '',
      link: getStoryPageUrl(postId),
      heroImage: getHeroImage(rawPost?.heroImage),
    }
  })
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

const transformGames = (
  rawData: z.infer<ZodArray<typeof gameSchema>>
): Game[] => {
  return rawData.map((game) => {
    return {
      name: game.name ?? '',
      link: game.link ?? '',
      heroImage: getHeroImage(game.heroImage),
      description: game.descriptions,
    }
  })
}

export const fetchGames = async (): Promise<Game[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching games',
    getTraceObject()
  )
  const schema = z.promise(z.object({ games: z.array(gameSchema) }))

  const data = await createDataFetchingChain<
    z.infer<ZodArray<typeof gameSchema>>
  >(
    errorLogger,
    [],
    async () => {
      const resp = await fetch(URL_STATIC_GAME)

      const result = await schema.parse(resp.json())
      return result.games
    },
    async () => {
      const result = await schema.parse(
        fetchGQLData(errorLogger, GetGamesDocument)
      )
      return result.games
    }
  )

  return transformGames(data).slice(0, 5)
}
