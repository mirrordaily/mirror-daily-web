'use server'

import type {
  LatestPost,
  PickupItemInTopNewsSection,
  FlashNews,
  EditorChoice,
  TopicPost,
  Game,
  Shorts,
} from '@/types/homepage'
import {
  URL_STATIC_EDITOR_CHOICE,
  URL_STATIC_FLASH_NEWS,
  URL_STATIC_GAME,
  URL_STATIC_LATEST_NEWS,
  URL_STATIC_LATEST_SHORTS,
  URL_STATIC_TOPIC,
} from '@/constants/config'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import type {
  GetLiveEventForHomepageQuery,
  HeroImageFragment,
} from '@/graphql/__generated__/graphql'
import {
  GetEditorChoicesDocument,
  GetFlashNewsDocument,
  GetGamesDocument,
  GetLatestShortsDocument,
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
import { SHORTS_TYPE } from '@/types/common'
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
  latestShortsSchema,
} from '@/utils/data-schema'
import { colorManger } from '@/utils/section-color-manager'
import { faker } from '@faker-js/faker/locale/ja'
import { isValidUrl } from '@/utils/common'

type CategoryConfig = {
  name: string
  color: string
}

const getCategoryConfig = async (
  rawPosts: z.infer<typeof rawLatestPostSchema>
): Promise<CategoryConfig> => {
  const { partner, categories, sections } = rawPosts

  if (typeof partner === 'string') {
    const categoryName = categories[0]?.name || ''
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
      return {
        name: '時事',
        color: '#D0D2D8',
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
  const { name, color } = await getCategoryConfig(rawPosts)

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

  return rawData.map(({ choices: rawPost }, index) => {
    const postSlug = rawPost?.slug ?? ''

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
      // TODO: replace mock data with real data
      description: faker.lorem.sentence({ min: 5, max: 50 }),
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

type ImageKeys = keyof Omit<
  NonNullable<HeroImageFragment['resized']>,
  '__typename'
>

const getPosterFromShorts = (
  heroImage: z.infer<typeof latestShortsSchema>['heroImage']
): string => {
  const pickedSize: ImageKeys[] = ['w800', 'w480', 'original']
  if (!heroImage) return ''

  const getImageSrc = (
    imageObj: typeof heroImage.resized
  ): string | undefined => {
    if (imageObj) {
      return pickedSize.reduce((src, size) => {
        const newSrc = imageObj![size]
        if (!src && newSrc) return newSrc
        else return src
      }, undefined)
    }
    return undefined
  }

  const resized = getImageSrc(heroImage.resized)
  const resizedWebp = getImageSrc(heroImage.resizedWebp)

  return resizedWebp || resized || ''
}

const transformLatestShorts = (
  rawData: z.infer<typeof latestShortsSchema>
): Shorts => {
  return {
    title: rawData.name ?? '',
    fileUrl: rawData.videoSrc ?? '',
    poster: getPosterFromShorts(rawData.heroImage),
    // TODO: add link to shorts page
    link: '',
  }
}

export const fetchLatestShorts = async (
  type: SHORTS_TYPE,
  amount: number = 10
): Promise<Shorts[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching latest shorts',
    getTraceObject()
  )

  const orignal = z.object({
    [SHORTS_TYPE.NEWS]: z.array(latestShortsSchema),
    [SHORTS_TYPE.DERIVATIVE]: z.array(latestShortsSchema),
  })
  const schema = z.promise(orignal)

  const data = await createDataFetchingChain<z.infer<typeof orignal>>(
    errorLogger,
    {
      [SHORTS_TYPE.NEWS]: [],
      [SHORTS_TYPE.DERIVATIVE]: [],
    },
    async () => {
      const resp = await fetch(URL_STATIC_LATEST_SHORTS, {
        next: { revalidate: 0 },
      })

      const result = await schema.parse(resp.json())
      return result
    },
    async () => {
      const result = await schema.parse(
        fetchGQLData(errorLogger, GetLatestShortsDocument, { amount })
      )
      return result
    }
  )

  const matchedData = data[type].slice(0, 10)
  return matchedData.map(transformLatestShorts)
}
