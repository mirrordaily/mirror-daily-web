'use server'

import { createErrorLogger } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import type {
  GetGroupTypeTopicPostsQuery,
  GetTopicBasicInfoQuery,
} from '@/graphql/__generated__/graphql'
import {
  GetGroupTypeTopicPostsDocument,
  GetListTypeTopcPostsDocument,
  GetTopicBasicInfoDocument,
} from '@/graphql/__generated__/graphql'
import {
  getFirstParagraphFromApiData,
  getHeroImage,
  transfromRawPost,
} from '@/utils/data-process'
import type { PostDataWithTags, TopicPostData } from '@/types/topic'
import { getStoryPageUrl } from '@/utils/site-urls'

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
  items: TopicPostData[]
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

type RawPostWithTags = NonNullable<
  NonNullable<GetGroupTypeTopicPostsQuery['topic']>['posts']
>[0]

const transfromRawPostWithTags = (
  rawPost: RawPostWithTags
): PostDataWithTags => {
  const title = rawPost.title ?? ''
  const slug = rawPost.slug ?? ''
  const link = getStoryPageUrl(slug)
  const postMainImage = getHeroImage(rawPost.heroImage)
  const brief = getFirstParagraphFromApiData(rawPost.apiDataBrief) ?? ''
  const content = getFirstParagraphFromApiData(rawPost.apiData) ?? ''
  const textContent = brief || content
  const tags = rawPost.tags || []

  return {
    title,
    slug,
    link,
    textContent,
    postMainImage,
    tags,
  }
}

async function fetchGorupTypeTopicPostBySlug(
  slug: string
): Promise<PostDataWithTags[]> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching group type topic posts (slug: ${slug})`,
    {}
  )

  const result = await fetchGQLData(
    errorLogger,
    GetGroupTypeTopicPostsDocument,
    {
      slug,
    }
  )

  if (result && result.topic && Array.isArray(result.topic.posts)) {
    return result.topic.posts.map(transfromRawPostWithTags)
  } else {
    return []
  }
}

export {
  fetchTopicBasicInfo,
  fetchListTypeTopicPostBySlug,
  fetchGorupTypeTopicPostBySlug,
}
