'use server'
import { fetchGQLData } from '@/utils/graphql'
import { GetPostsBySectionSlugDocument } from '@/graphql/__generated__/graphql'
import { logGQLError } from '@/utils/log/common'
import type { Posts } from '@/types/posts'

async function fetchSectionPosts(
  page: number,
  pageSize: number,
  slug: string
): Promise<Posts | null> {
  const handleError = logGQLError('Failed to fetch category articles')
  const result = await fetchGQLData(
    handleError,
    GetPostsBySectionSlugDocument,
    {
      skip: (page - 1) * pageSize,
      take: pageSize,
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
