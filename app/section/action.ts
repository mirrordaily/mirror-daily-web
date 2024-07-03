'use server'
import { fetchGQLData } from '@/utils/graphql'
import {
  GetPostsBySectionSlugDocument,
  GetSectionInformationDocument,
} from '@/graphql/__generated__/graphql'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import type { Posts } from '@/types/section'

async function fetchSectionPosts(
  page: number,
  slug: string
): Promise<Posts | null> {
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
  return result?.posts ? result.posts : null
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
  return result?.section ? result.section : null
}

export { fetchSectionPosts, fetchSectionInformation }
