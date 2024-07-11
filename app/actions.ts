'use server'

import type {
  LatestPost,
  PickupItemInTopNewsSection,
  SectionAndCategory,
  FlashNews,
  EditorChoice,
  TopicPost,
} from '@/types/homepage'
import {
  URL_STATIC_LATEST_NEWS,
  URL_STATIC_POPULAR_NEWS,
} from '@/constants/config'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import type {
  EditorChoiceDataFragment,
  GetFlashNewsQuery,
  GetLiveEventForHomepageQuery,
  GetSectionsAndCategoriesQuery,
  GetTopicsQuery,
} from '@/graphql/__generated__/graphql'
import {
  GetEditorChoicesDocument,
  GetFlashNewsDocument,
  GetLiveEventForHomepageDocument,
  GetSectionsAndCategoriesDocument,
  GetTopicsDocument,
} from '@/graphql/__generated__/graphql'
import dayjs from 'dayjs'
import {
  getPostPageUrl,
  getStoryPageUrl,
  getTopicPageUrl,
} from '@/utils/site-urls'
import { getHeroImage } from '@/utils/data-process'
import type { ParameterOfComponent } from '@/types/common'
import type EditorChoiceMain from './_components/editor-choice/main'
import type TopicMain from './_components/topic-and-game/topic-main'
import { z } from 'zod'
import { rawLatestPostSchema, rawPopularPostSchema } from '@/utils/data-schema'

// TODO: replace with real data
const getSingleColor = () => {
  return Math.floor(Math.random() * 256)
}

// TODO: replace with real data
const getCategoryColor = () => {
  const red = getSingleColor()
  const green = getSingleColor()
  const blue = getSingleColor()
  return `rgb(${red},${green},${blue})`
}

type CategoryConfig = {
  name: string
  color: string
}

const getCategoryConfig = (
  rawPosts: z.infer<typeof rawLatestPostSchema>
): CategoryConfig => {
  const { partner, categories } = rawPosts

  if (typeof partner === 'string') {
    const name = categories[0]?.name || ''
    const color = getCategoryColor()

    return {
      name,
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

const isValidUrl = (url: string): boolean => {
  try {
    return Boolean(new URL(url))
  } catch (e) {
    return false
  }
}

const hasExternalLink = (
  rawPost: z.infer<typeof rawLatestPostSchema>
): boolean => {
  const { redirect } = rawPost
  return isValidUrl(redirect)
}

const transformRawLatestPost = (
  rawPosts: z.infer<typeof rawLatestPostSchema>
): LatestPost => {
  const { title, slug, heroImage, publishedDate, partner } = rawPosts
  const { name, color } = getCategoryConfig(rawPosts)

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

const fetchLatestPost = async (page: number = 0): Promise<LatestPost[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching latest posts',
    getTraceObject()
  )

  try {
    const resp = await fetch(`${URL_STATIC_LATEST_NEWS}0${page + 1}.json`, {
      next: { revalidate: 0 },
    })

    const rawPostData = await resp.json()
    const latestPosts = z.array(rawLatestPostSchema).parse(rawPostData?.latest)
    const filteredData = latestPosts.filter(
      (rawPost) => !hasExternalLink(rawPost)
    )

    return filteredData.map(transformRawLatestPost)
  } catch (e) {
    errorLogger(e)
    return []
  }
}

const transformRawPopularPost = (
  rawPosts: z.infer<typeof rawPopularPostSchema>
): LatestPost => {
  const { title, slug, heroImage, sectionsInInputOrder: sections } = rawPosts

  return {
    categoryName: sections[0]?.name ?? '',
    categoryColor: getCategoryColor(),
    postName: title,
    postSlug: slug,
    heroImage: getHeroImage(heroImage),
    publishedDate: new Date().toISOString(),
    link: getPostPageUrl(slug),
  }
}

const fetchPopularPost = async (): Promise<LatestPost[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching popular posts',
    getTraceObject()
  )

  try {
    const resp = await fetch(URL_STATIC_POPULAR_NEWS, {
      next: { revalidate: 0 },
    })

    const rawPostData = await z
      .promise(z.array(rawPopularPostSchema))
      .parseAsync(resp.json())
    return rawPostData.map(transformRawPopularPost).slice(10)
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

const fetchLiveEvent = async (): Promise<PickupItemInTopNewsSection | null> => {
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

const transformRawSectionsAndCategories = (
  rawData: GetSectionsAndCategoriesQuery['sections']
): SectionAndCategory[] => {
  if (!rawData) return []

  return rawData.map((rawSection) => {
    const name = rawSection.name ?? ''
    const slug = rawSection.slug ?? ''
    const color = rawSection.color ?? ''
    const categories = (rawSection.categories ?? []).map((rawCategory) => {
      const name = rawCategory.name ?? ''
      const slug = rawCategory.slug ?? ''

      return {
        name,
        slug,
        color,
      }
    })

    return {
      name,
      slug,
      color,
      categories,
    }
  })
}

const fetchSectionsAndCategories = async (): Promise<SectionAndCategory[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching sections and categories',
    getTraceObject()
  )

  const result = await fetchGQLData(
    errorLogger,
    GetSectionsAndCategoriesDocument
  )

  if (result) {
    const { sections } = result
    return transformRawSectionsAndCategories(sections)
  } else {
    return []
  }
}

const transformRawFlashNews = (
  rawData: GetFlashNewsQuery['posts']
): FlashNews[] => {
  if (!rawData) return []

  return rawData.map((rawPost) => {
    const postName = rawPost.title ?? ''
    const postSlug = rawPost.slug ?? ''
    const link = getStoryPageUrl(postSlug)

    return {
      postName,
      postSlug,
      link,
    }
  })
}

const fetchFlashNews = async (): Promise<FlashNews[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching flash news',
    getTraceObject()
  )

  const result = await fetchGQLData(errorLogger, GetFlashNewsDocument)

  if (result) {
    const { posts } = result
    return transformRawFlashNews(posts)
  } else {
    return []
  }
}

const transformEditorChoices = (
  rawData: EditorChoiceDataFragment[] | null | undefined
): EditorChoice[] => {
  if (!rawData) return []

  return rawData.map(({ choices: rawPost }) => {
    const postName = rawPost?.title ?? ''
    const postSlug = rawPost?.slug ?? ''
    const link = getStoryPageUrl(postSlug)
    const heroImage = getHeroImage(rawPost?.heroImage)

    return {
      postName,
      postSlug,
      link,
      heroImage,
    }
  })
}

const fetchEditorChoices = async (): Promise<
  ParameterOfComponent<typeof EditorChoiceMain>
> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching editor choices',
    getTraceObject()
  )

  const result = await fetchGQLData(errorLogger, GetEditorChoicesDocument)

  if (result) {
    const { editor } = result

    return {
      editor: transformEditorChoices(editor),
      // TODO: fetch AI data from JSON file (different to `editor`)
      ai: [],
    }
  } else {
    return {
      editor: [],
      ai: [],
    }
  }
}

const transformTopics = (
  rawData: GetTopicsQuery['topics']
): ParameterOfComponent<typeof TopicMain>['data'] | null => {
  if (!rawData) return null

  const convertedData = rawData.map((topic) => {
    const topicName = topic.name || ''
    const topicSlug = topic.slug || ''
    const topicLink = getTopicPageUrl(topicSlug)
    const posts: TopicPost[] =
      topic.posts?.map((rawPost) => {
        const postName = rawPost?.title ?? ''
        const postSlug = rawPost?.slug ?? ''
        const link = getStoryPageUrl(postSlug)
        const heroImage = getHeroImage(rawPost?.heroImage)
        return {
          postName,
          postSlug,
          heroImage,
          link,
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

const fetchTopics = async (): Promise<
  ParameterOfComponent<typeof TopicMain>['data'] | null
> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching topics',
    getTraceObject()
  )

  const result = await fetchGQLData(errorLogger, GetTopicsDocument)

  if (result) {
    const { topics } = result

    return transformTopics(topics)
  } else {
    return null
  }
}

export {
  fetchLatestPost,
  fetchPopularPost,
  fetchLiveEvent,
  fetchSectionsAndCategories,
  fetchFlashNews,
  fetchEditorChoices,
  fetchTopics,
}
