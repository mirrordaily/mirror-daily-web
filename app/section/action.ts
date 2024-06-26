'use server'
import { fetchGQLData } from '@/utils/graphql'
import {
  GetPostsBySectionSlugDocument,
  GetSectionsSlugAndNameDocument,
} from '@/graphql/__generated__/graphql'
import { logGQLError } from '@/utils/log/common'
import type { Posts } from '@/types/section'

async function fetchSectionPosts(
  page: number,
  slug: string
): Promise<Posts | null> {
  const handleError = logGQLError('Failed to fetch section articles')

  const firstPageSize = 13
  const subsequentPageSize = 12

  const isFirstPage = page === 1

  const skip = isFirstPage ? 0 : firstPageSize + (page - 2) * subsequentPageSize
  const take = isFirstPage ? firstPageSize * 2 : subsequentPageSize * 2

  const result = await fetchGQLData(
    handleError,
    GetPostsBySectionSlugDocument,
    {
      skip: skip,
      take: take,
      slug: slug,
    }
  )
  return result?.posts ? result.posts : null
}

async function fetchSectionsSlugAndName(skip: number) {
  const handleError = logGQLError('Failed to fetch sections information')

  const result = await fetchGQLData(
    handleError,
    GetSectionsSlugAndNameDocument,
    {
      skip: skip,
    }
  )
  return result?.sections ? result.sections : null
}

export { fetchSectionPosts, fetchSectionsSlugAndName }
