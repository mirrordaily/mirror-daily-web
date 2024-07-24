'use server'

import type { SectionAndCategory } from '@/types/common'
import type { ZodArray } from 'zod'
import { z } from 'zod'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { createDataFetchingChain, getHeroImage } from '@/utils/data-process'
import { fetchGQLData } from '@/utils/graphql'
import { rawPopularPostSchema, sectionSchema } from '@/utils/data-schema'
import {
  URL_STATIC_POPULAR_NEWS,
  URL_STATIC_SECTION_AND_CATEGORY,
} from '@/constants/config'
import { GetSectionsAndCategoriesDocument } from '@/graphql/__generated__/graphql'
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

export const fetchPopularPost = async (): Promise<LatestPost[]> => {
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
      .slice(0, 10)
  } catch (e) {
    errorLogger(e)
    return []
  }
}
