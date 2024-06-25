'use server'
import { fetchGQLData } from '@/utils/graphql'
import { GetPostsBySectionSlugDocument } from '@/graphql/__generated__/graphql'
import { logGQLError } from '@/utils/log/common'
import type { Posts } from '@/types/posts'

async function fetchSectionPosts(
  page: number,
  slug: string
): Promise<Posts | null> {
  const handleError = logGQLError('Failed to fetch category articles')

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
      where: {
        sections: {
          some: {
            slug: {
              equals: slug,
            },
          },
        },
      },
    }
  )
  return result?.posts ? result.posts : null
}

export { fetchSectionPosts }
