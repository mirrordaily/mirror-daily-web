'use server'

import type { PopularNews, SectionAndCategory, Shorts } from '@/types/common'
import { SHORTS_TYPE } from '@/types/common'
import type { ZodArray } from 'zod'
import { z } from 'zod'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { createDataFetchingChain, getHeroImage } from '@/utils/data-process'
import { fetchGQLData } from '@/utils/graphql'
import {
  latestShortsSchema,
  rawPopularPostSchema,
  sectionSchema,
} from '@/utils/data-schema'
import {
  URL_STATIC_LATEST_SHORTS,
  URL_STATIC_POPULAR_NEWS,
  URL_STATIC_SECTION_AND_CATEGORY,
} from '@/constants/config'
import type { HeroImageFragment } from '@/graphql/__generated__/graphql'
import {
  GetLatestShortsDocument,
  GetSectionsAndCategoriesDocument,
} from '@/graphql/__generated__/graphql'
import type { LatestPost } from '@/types/homepage'
import { getPostPageUrl } from '@/utils/site-urls'
import { colorManger } from '@/utils/section-color-manager'

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
    id: rawData.id,
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
