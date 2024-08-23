'use server'

import type {
  LatestPost,
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
  URL_STATIC_LATEST_NEWS,
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
import {
  getPostPageUrl,
  getStoryPageUrl,
  getTopicPageUrl,
} from '@/utils/site-urls'
import { createDataFetchingChain, getHeroImage } from '@/utils/data-process'
import type { ParameterOfComponent } from '@/types/common'
import type EditorChoiceMain from './_components/editor-choice/main'
import type TopicMain from './_components/topic-and-game/topic-main'
import type { ZodArray } from 'zod'
import { z } from 'zod'
import {
  rawLatestPostSchema,
  rawFlashNewsSchema,
  editorChoiceSchenma,
  topicsSchema,
  gameSchema,
} from '@/utils/data-schema'
import { colorManger } from '@/utils/section-color-manager'
import { isValidUrl } from '@/utils/common'

type CategoryConfig = {
  name: string
  color: string
}

const getSectionConfig = async (
  rawPosts: z.infer<typeof rawLatestPostSchema>
): Promise<CategoryConfig> => {
  const defaultSectionName = '時事'
  const { partner, sections } = rawPosts

  if (typeof partner === 'string') {
    const categoryName = sections[0]?.name || defaultSectionName
    const color = await colorManger.getColor(sections[0]?.slug)

    return {
      name: categoryName,
      color,
    }
  } else {
    const { slug } = partner
    if (slug === 'healthnews') {
      return {
        name: '生活',
        color: '#03C121',
      }
    } else {
      // ebc and others
      const color = await colorManger.getColor()
      return {
        name: defaultSectionName,
        color,
      }
    }
  }
}

const hasExternalLink = (
  rawPost: z.infer<typeof rawLatestPostSchema>
): boolean => {
  const { redirect } = rawPost
  return isValidUrl(redirect)
}

const transformRawLatestPost = async (
  rawPosts: z.infer<typeof rawLatestPostSchema>
): Promise<LatestPost> => {
  const { title, slug, heroImage, publishedDate, partner } = rawPosts
  const { name, color } = await getSectionConfig(rawPosts)

  return {
    categoryName: name,
    categoryColor: color,
    postName: title,
    postSlug: slug,
    heroImage: getHeroImage(heroImage),
    publishedDate,
    link: getPostPageUrl(slug, !!partner),
  }
}

export const fetchLatestPost = async (
  page: number = 0
): Promise<LatestPost[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching latest posts',
    getTraceObject()
  )

  try {
    const resp = await fetch(`${URL_STATIC_LATEST_NEWS}0${page + 1}.json`)

    const rawPostData = await resp.json()
    const latestPosts = z.array(rawLatestPostSchema).parse(rawPostData?.latest)
    const filteredData = latestPosts.filter(
      (rawPost) => !hasExternalLink(rawPost)
    )

    const result = await Promise.allSettled(
      filteredData.map(transformRawLatestPost)
    )
    return result
      .filter(
        (r): r is PromiseFulfilledResult<LatestPost> => r.status === 'fulfilled'
      )
      .map((r) => r.value)
  } catch (e) {
    errorLogger(e)
    return []
  }
}

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
    const postSlug = rawPost.slug ?? ''

    return {
      postName: rawPost.title ?? '',
      postSlug,
      link: getStoryPageUrl(postSlug),
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

  // TODO: limit to 8 items
  return transformRawFlashNews(data)
}

const transformEditorChoices = (
  rawData: z.infer<ZodArray<typeof editorChoiceSchenma>>
): EditorChoice[] => {
  if (!rawData) return []

  return rawData.map(({ outlink, heroImage, choices: rawPost }, index) => {
    const postSlug = rawPost?.slug ?? ''

    if (outlink) {
      return {
        postName: rawPost?.title ?? '',
        postSlug: `${index}-${postSlug}`,
        link: outlink,
        heroImage: getHeroImage(heroImage),
      }
    }

    return {
      postName: rawPost?.title ?? '',
      postSlug: `${index}-${postSlug}`,
      link: getStoryPageUrl(postSlug),
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
        const postSlug = rawPost?.slug ?? ''
        return {
          postName: rawPost?.title ?? '',
          postSlug,
          heroImage: getHeroImage(rawPost?.heroImage),
          link: getStoryPageUrl(postSlug),
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
