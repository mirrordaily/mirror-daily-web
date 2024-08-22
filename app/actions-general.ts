'use server'

import type {
  PopularNews,
  SectionAndCategory,
  Shorts,
  LatestPost,
} from '@/types/common'
import { SHORTS_TYPE } from '@/types/common'
import type { ZodArray } from 'zod'
import { z } from 'zod'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import {
  createDataFetchingChain,
  getHeroImage,
  transformLatestShorts,
} from '@/utils/data-process'
import { fetchGQLData } from '@/utils/graphql'
import {
  latestShortsSchema,
  rawPopularPostSchema,
  sectionSchema,
  rawLatestPostSchema,
} from '@/utils/data-schema'
import {
  URL_STATIC_LATEST_SHORTS,
  URL_STATIC_POPULAR_NEWS,
  URL_STATIC_SECTION_AND_CATEGORY,
  URL_STATIC_LATEST_NEWS,
} from '@/constants/config'
import {
  GetLatestShortsDocument,
  GetSectionsAndCategoriesDocument,
} from '@/graphql/__generated__/graphql'
import { getPostPageUrl } from '@/utils/site-urls'
import { colorManger } from '@/utils/section-color-manager'
import { isValidUrl } from '@/utils/common'

type CategoryConfig = {
  name: string
  color: string
}

const transformRawSectionsAndCategories = (
  rawData: z.infer<ZodArray<typeof sectionSchema>>
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

export const fetchSectionsAndCategories = async (): Promise<
  SectionAndCategory[]
> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching sections and categories',
    getTraceObject()
  )
  const schema = z.promise(z.object({ sections: z.array(sectionSchema) }))

  const data = await createDataFetchingChain<
    z.infer<ZodArray<typeof sectionSchema>>
  >(
    errorLogger,
    [],
    async () => {
      const resp = await fetch(URL_STATIC_SECTION_AND_CATEGORY)

      const result = await schema.parse(resp.json())
      return result.sections
    },
    async () => {
      const result = await schema.parse(
        fetchGQLData(errorLogger, GetSectionsAndCategoriesDocument)
      )
      return result.sections
    }
  )

  return transformRawSectionsAndCategories(data)
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

export const fetchPopularPost = async (
  amount: number = 10
): Promise<PopularNews[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching popular posts',
    getTraceObject()
  )

  try {
    const resp = await fetch(URL_STATIC_POPULAR_NEWS)

    const rawPostData = await z
      .promise(z.array(rawPopularPostSchema))
      .parse(resp.json())

    const result = await Promise.allSettled(
      rawPostData.map(transformRawPopularPost)
    )
    return result
      .filter(
        (r): r is PromiseFulfilledResult<LatestPost> => r.status === 'fulfilled'
      )
      .map((r) => r.value)
      .slice(0, amount)
  } catch (e) {
    errorLogger(e)
    return []
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
      const resp = await fetch(URL_STATIC_LATEST_SHORTS)

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

const getSectionConfig = async (
  rawPosts: z.infer<typeof rawLatestPostSchema>
): Promise<CategoryConfig> => {
  const { partner, sections } = rawPosts

  if (typeof partner === 'string') {
    const categoryName = sections[0]?.name || ''
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
