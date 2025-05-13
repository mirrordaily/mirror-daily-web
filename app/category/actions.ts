'use server'
import { fetchGQLData } from '@/utils/graphql'
import {
  GetCategoryInformationDocument,
  GetPostsByCategorySlugDocument,
} from '@/graphql/__generated__/graphql'
import type {
  GetPostsByCategorySlugQuery,
  GetCategoryInformationQuery,
} from '@/graphql/__generated__/graphql'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import type { CategoryPost } from '@/types/category'
import { transformRawPost } from '@/utils/data-process'

function transformCategoryPost(
  rawData: GetPostsByCategorySlugQuery['posts']
): CategoryPost[] {
  if (!rawData) return []

  return rawData.map(transformRawPost)
}

async function fetchCategoryPosts({
  take,
  skip = 0,
  slug,
  withAmount = false,
}: {
  take: number
  skip: number
  slug: string
  withAmount?: boolean
}) {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching category posts on category page',
    getTraceObject()
  )
  const result = await fetchGQLData(
    errorLogger,
    GetPostsByCategorySlugDocument,
    {
      skip,
      take,
      slug,
      withAmount,
    }
  )

  if (!result)
    return {
      posts: [],
      totalAmount: 0,
    }

  const posts = transformCategoryPost(result.posts)
  if (typeof result.postsCount === 'number') {
    return {
      posts,
      totalAmount: result.postsCount,
    }
  } else {
    return {
      posts,
    }
  }
}

function transformCategoryInformation(
  rawData: GetCategoryInformationQuery['category']
) {
  if (!rawData) return null

  const name = rawData.name ?? ''
  const color = rawData.sections?.[0]?.color ?? '#FF5A36'
  const state = rawData.state

  if (state === 'active') {
    return {
      name,
      color,
    }
  } else return null
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

  if (result) {
    const { category } = result
    return transformCategoryInformation(category)
  } else {
    return null
  }
}

export { fetchCategoryPosts, fetchCategoryInformation }
