'use server'

import { createErrorLogger } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import type { GetTopicBasicInfoQuery } from '@/graphql/__generated__/graphql'
import {
  GetListTypeTopcPostsDocument,
  GetTopicBasicInfoDocument,
} from '@/graphql/__generated__/graphql'
import type { PostData } from '@/utils/data-process'
import { transfromRawPost } from '@/utils/data-process'

async function fetchTopicBasicInfo(
  slug: string
): Promise<GetTopicBasicInfoQuery['topic']> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching topic basic info (slug: ${slug})`,
    {}
  )

  const result = await fetchGQLData(errorLogger, GetTopicBasicInfoDocument, {
    slug,
  })

  if (result) {
    const { topic } = result
    return topic
  } else {
    return null
  }
}

async function fetchListTypeTopicPostBySlug({
  slug,
  take,
  skip = 0,
  withAmount = false,
}: {
  slug: string
  take: number
  skip?: number
  withAmount?: boolean
}): Promise<{
  items: PostData[]
  totalAmount?: number
}> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching list type topic posts (slug: ${slug})`,
    {}
  )

  const result = await fetchGQLData(errorLogger, GetListTypeTopcPostsDocument, {
    slug,
    take,
    skip,
    withAmount,
  })

  if (result && result.topic && Array.isArray(result.topic.posts)) {
    const items = result.topic.posts.map(transfromRawPost)

    if (typeof result.topic.postsCount === 'number') {
      return {
        items,
        totalAmount: result.topic.postsCount,
      }
    } else {
      return {
        items,
      }
    }
  } else {
    return {
      items: [],
      totalAmount: 0,
    }
  }
}

export { fetchTopicBasicInfo, fetchListTypeTopicPostBySlug }
