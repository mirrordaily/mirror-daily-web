'use server'
import { fetchGQLData } from '@/utils/graphql'
import {
  GetCategoryInformationDocument,
  GetPostsByCategorySlugDocument,
} from '@/graphql/__generated__/graphql'
import type { GetPostsByCategorySlugQuery } from '@/graphql/__generated__/graphql'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import type { CategoryPost } from '@/types/category-page'
import { getStoryPageUrl } from '@/utils/site-urls'
import { getHeroImage } from '@/utils/common'

function transformCategoryPost(
  rawData: GetPostsByCategorySlugQuery['posts']
): CategoryPost[] {
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

async function fetchCategoryPosts(page: number, slug: string) {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching category posts in category page',
    getTraceObject()
  )

  const firstPageSize = 13
  const subsequentPageSize = 12

  const isFirstPage = page === 1

  const skip = isFirstPage ? 0 : firstPageSize + (page - 2) * subsequentPageSize
  const take = isFirstPage ? firstPageSize * 2 : subsequentPageSize * 2

  const result = await fetchGQLData(
    errorLogger,
    GetPostsByCategorySlugDocument,
    {
      skip: skip,
      take: take,
      slug: slug,
    }
  )

  if (result) {
    const { posts } = result
    return transformCategoryPost(posts)
  } else {
    return []
  }
}

async function fetchCategoryInformation(slug: string) {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching category information',
    getTraceObject()
  )

  const result = await fetchGQLData(
    errorLogger,
    GetCategoryInformationDocument,
    {
      slug: slug,
    }
  )
  return result?.category
}

export { fetchCategoryPosts, fetchCategoryInformation }
