'use server'
import { fetchGQLData } from '@/utils/graphql'
import {
  GetPostsBySectionSlugDocument,
  GetSectionInformationDocument,
} from '@/graphql/__generated__/graphql'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import type {
  GetPostsBySectionSlugQuery,
  GetSectionInformationQuery,
} from '@/graphql/__generated__/graphql'
import { getStoryPageUrl } from '@/utils/site-urls'
import { getHeroImage } from '@/utils/common'
import type { SectionPost } from '@/types/section'

function transformSectionPost(
  rawData: GetPostsBySectionSlugQuery['posts']
): SectionPost[] {
  if (!rawData) return []

  return rawData.map((rawPost) => {
    const title = rawPost.title ?? ''
    const slug = rawPost.slug ?? ''
    const link = getStoryPageUrl(slug)
    const createdTime = rawPost.createdAt
    const heroImage = getHeroImage(rawPost.heroImage)
    const brief = rawPost.brief.blocks[0].text ?? ''

    return {
      title,
      slug,
      link,
      createdTime,
      heroImage,
      brief,
    }
  })
}

async function fetchSectionPosts(page: number, slug: string) {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching section posts in section page',
    getTraceObject()
  )

  const firstPageSize = 13
  const subsequentPageSize = 12

  const isFirstPage = page === 1

  const skip = isFirstPage ? 0 : firstPageSize + (page - 2) * subsequentPageSize
  const take = isFirstPage ? firstPageSize * 2 : subsequentPageSize * 2

  const result = await fetchGQLData(
    errorLogger,
    GetPostsBySectionSlugDocument,
    {
      skip: skip,
      take: take,
      slug: slug,
    }
  )

  if (result) {
    const { posts } = result
    return transformSectionPost(posts)
  } else {
    return []
  }
}

function transformCategoryInformation(
  rawData: GetSectionInformationQuery['section']
) {
  if (!rawData) return null

  const name = rawData.name ?? ''
  const color = rawData.color ?? '#FF5A36'

  return {
    name,
    color,
  }
}

async function fetchSectionInformation(slug: string) {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching sections information',
    getTraceObject()
  )

  const result = await fetchGQLData(
    errorLogger,
    GetSectionInformationDocument,
    {
      slug: slug,
    }
  )

  if (result) {
    const { section } = result
    return transformCategoryInformation(section)
  } else {
    return null
  }
}

export { fetchSectionPosts, fetchSectionInformation }
