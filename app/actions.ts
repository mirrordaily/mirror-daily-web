'use server'

import type {
  LatestPost,
  PickupItemInTopNewsSection,
  HeroImage,
  SectionAndCategory,
  FlashNews,
} from '@/types/homepage'
import {
  URL_STATIC_LATEST_NEWS,
  URL_STATIC_POPULAR_NEWS,
} from '@/constants/config'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import type {
  GetFlashNewsQuery,
  GetLiveEventForHomepageQuery,
  GetSectionsAndCategoriesQuery,
  HeroImageFragment,
} from '@/graphql/__generated__/graphql'
import {
  GetFlashNewsDocument,
  GetLiveEventForHomepageDocument,
  GetSectionsAndCategoriesDocument,
} from '@/graphql/__generated__/graphql'
import dayjs from 'dayjs'
import { getPostPageUrl, getStoryPageUrl } from '@/utils/site-urls'

type Category = {
  name: string
  slug: string
}

type Section = {
  slug: string
  name: string
}

type Partner = {
  slug: string
}

type RawLatestPost = {
  title: string
  slug: string
  heroImage: HeroImage | string | null | undefined
  sections: Pick<Section, 'slug'>[]
  categories: Category[]
  partner: Partner | string
  redirect: string
  publishedDate: string
}

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

const getHeroImage = (
  rawImageObj:
    | Pick<HeroImageFragment, 'resized' | 'resizedWebp'>
    | string
    | null
    | undefined
): HeroImage => {
  if (typeof rawImageObj === 'object' || typeof rawImageObj === 'undefined') {
    if (rawImageObj !== null && rawImageObj !== undefined) {
      return Object.entries(rawImageObj).reduce<HeroImage>(
        (
          obj: HeroImage,
          [typeKey, valueObj]: [
            string,
            HeroImageFragment[keyof HeroImageFragment],
          ]
        ) => {
          type RawResziedImages = NonNullable<HeroImageFragment['resized']>
          type ResizedImages = NonNullable<HeroImage['resized']>

          if (['resized', 'resizedWebp'].includes(typeKey) && valueObj) {
            const newValueObj = Object.entries(valueObj).reduce<ResizedImages>(
              (
                values,
                [sizeKey, value]: [
                  string,
                  RawResziedImages[keyof RawResziedImages],
                ]
              ) => {
                if (value) {
                  values[sizeKey as keyof ResizedImages] = value
                }

                return values
              },
              {
                original: '',
              } satisfies ResizedImages
            )

            obj[typeKey as keyof HeroImage] = newValueObj
          }

          return obj
        },
        {
          resized: {
            original: '',
          },
        } satisfies HeroImage
      )
    } else
      return {
        resized: {
          original: '',
        },
      }
  } else {
    return {
      resized: {
        original: rawImageObj,
      },
    }
  }
}

type CategoryConfig = {
  name: string
  color: string
}

const getCategoryConfig = (rawPosts: RawLatestPost): CategoryConfig => {
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

const hasExternalLink = (rawPost: RawLatestPost): boolean => {
  const { redirect } = rawPost
  return isValidUrl(redirect)
}

const transformRawLatestPost = (rawPosts: RawLatestPost): LatestPost => {
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

// TODO: change source and update related handle
const fetchLatestPost = async (page: number = 0): Promise<LatestPost[]> => {
  try {
    const resp = await fetch(`${URL_STATIC_LATEST_NEWS}0${page + 1}.json`, {
      next: { revalidate: 300 },
    })

    const rawPostData: Record<'latest', RawLatestPost[]> = await resp.json()
    const filteredData = rawPostData.latest.filter(
      (rawPost) => !hasExternalLink(rawPost)
    )

    return filteredData.map(transformRawLatestPost)
  } catch (e) {
    console.error(e)
    return []
  }
}

type RawPopularPost = {
  title: string
  slug: string
  heroImage: Pick<HeroImage, 'resized' | 'resizedWebp'> | string | null
  sectionsInInputOrder: Section[]
}

const transformRawPopularPost = (rawPosts: RawPopularPost): LatestPost => {
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

// TODO: change source and update related handle
const fetchPopularPost = async (): Promise<LatestPost[]> => {
  try {
    const resp = await fetch(URL_STATIC_POPULAR_NEWS, {
      next: { revalidate: 300 },
    })

    const rawPostData: RawPopularPost[] = await resp.json()
    return rawPostData.map(transformRawPopularPost).slice(10)
  } catch (e) {
    console.error(e)
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

export {
  fetchLatestPost,
  fetchPopularPost,
  fetchLiveEvent,
  fetchSectionsAndCategories,
  fetchFlashNews,
}
