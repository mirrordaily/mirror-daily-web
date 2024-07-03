'use server'
import { fetchGQLData } from '@/utils/graphql'
import {
  GetCategoryInformationDocument,
  GetPostsByCategorySlugDocument,
} from '@/graphql/__generated__/graphql'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'

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
  return result?.posts
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
