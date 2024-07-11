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
  URL_STATIC_EDITOR_CHOICE,
  URL_STATIC_FLASH_NEWS,
  URL_STATIC_LATEST_NEWS,
  URL_STATIC_POPULAR_NEWS,
  URL_STATIC_SECTION_AND_CATEGORY,
} from '@/constants/config'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import type {
  GetFlashNewsQuery,
  GetLiveEventForHomepageQuery,
  GetSectionsAndCategoriesQuery,
  GetTopicsQuery,
} from '@/graphql/__generated__/graphql'
import {
  GetLiveEventForHomepageDocument,
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
import type { ZodArray } from 'zod'
import { z } from 'zod'
import {
  rawLatestPostSchema,
  rawPopularPostSchema,
  sectionSchema,
  rawFlashNewsSchema,
  editorChoiceSchenma,
} from '@/utils/data-schema'
import { MINUTE } from '@/constants/time-unit'

const fetchSectionsAndCategories = async (): Promise<SectionAndCategory[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching sections and categories',
    getTraceObject()
  )

  try {
    const resp = await fetch(URL_STATIC_SECTION_AND_CATEGORY, {
      next: { revalidate: 0 },
    })

    const result = await z
      .promise(z.object({ sections: z.array(sectionSchema) }))
      .parse(resp.json())
    const { sections } = result
    return transformRawSectionsAndCategories(sections)
  } catch (e) {
    errorLogger(e)
    return []
  }
}
class SectionColorManager {
  private lastTime = 0
  private cacheTime = MINUTE * 5
  private defaultColor = '#D0D2D8'
  private data: Awaited<ReturnType<typeof fetchSectionsAndCategories>>

  constructor() {
    this.data = []
    this.updateData()
  }

  async updateData() {
    const result = await fetchSectionsAndCategories()
    this.lastTime = new Date().valueOf()
    this.data = result
  }

  async getColor(sectionSlug?: string): Promise<string> {
    if (!sectionSlug) return this.defaultColor

    const now = new Date().valueOf()

    if (now - this.lastTime > this.cacheTime) {
      await this.updateData()
    }

    return (
      this.data.find((item) => sectionSlug === item.slug)?.color ??
      this.defaultColor
    )
  }
}

const colorManger = new SectionColorManager()

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

    const result = await Promise.allSettled(
      filteredData.map(transformRawLatestPost)
    )
    return result.filter((r) => r.status === 'fulfilled').map((r) => r.value)
  } catch (e) {
    errorLogger(e)
    return []
  }
}

const transformRawPopularPost = async (
  rawPosts: z.infer<typeof rawPopularPostSchema>
): Promise<LatestPost> => {
  const { title, slug, heroImage, sectionsInInputOrder: sections } = rawPosts
  const color = await colorManger.getColor(sections[0]?.slug)

  return {
    // TODO: switch to category name
    categoryName: sections[0]?.name ?? '',
    categoryColor: color,
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
      .parse(resp.json())

    const result = await Promise.allSettled(
      rawPostData.map(transformRawPopularPost)
    )
    return result
      .filter((r) => r.status === 'fulfilled')
      .map((r) => r.value)
      .slice(0, 10)
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

  try {
    const resp = await fetch(URL_STATIC_FLASH_NEWS, {
      next: { revalidate: 0 },
    })

    const result = await z
      .promise(z.object({ posts: z.array(rawFlashNewsSchema) }))
      .parse(resp.json())
    const { posts } = result

    return transformRawFlashNews(posts)
  } catch (e) {
    errorLogger(e)
    return []
  }
}

const transformEditorChoices = (
  rawData: z.infer<ZodArray<typeof editorChoiceSchenma>>
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

  try {
    const resp = await fetch(URL_STATIC_EDITOR_CHOICE, {
      next: { revalidate: 0 },
    })

    const result = await z
      .promise(z.object({ editorChoices: z.array(editorChoiceSchenma) }))
      .parse(resp.json())
    const { editorChoices } = result

    return {
      editor: transformEditorChoices(editorChoices).slice(0, 10),
      // TODO: fetch AI data from JSON file (different to `editor`)
      ai: [],
    }
  } catch (e) {
    errorLogger(e)
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
