'use server'

import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import type {
  GetGroupTypeTopicPostsQuery,
  GetTopicBasicInfoQuery,
  GetTopicListQuery,
} from '@/graphql/__generated__/graphql'
import {
  GetGroupTypeTopicPostsDocument,
  GetListTypeTopcPostsDocument,
  GetTopicBasicInfoDocument,
  GetTopicListDocument,
} from '@/graphql/__generated__/graphql'
import {
  createDataFetchingChain,
  getFirstParagraphFromApiData,
  getHeroImage,
  transformRawPost,
  type PostData,
} from '@/utils/data-process'
import type { PostDataWithTags, Topic } from '@/types/topic'
import { getStoryPageUrl } from '@/utils/site-urls'
import { URL_STATIC_TOPIC_NEWS } from '@/constants/config'
import { sectionPostSchema, countsSchema } from '@/utils/data-schema'
import { z } from 'zod'

async function fetchTopicBasicInfo(
  slug: string
): Promise<GetTopicBasicInfoQuery['topic']> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching topic basic info (slug: ${slug})`,
    getTraceObject()
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
}) {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching list type topic posts (slug: ${slug})`,
    getTraceObject()
  )

  const data = await createDataFetchingChain<{
    postsData: PostData[]
    postsCount: number
  }>(
    errorLogger,
    {
      postsData: [],
      postsCount: 0,
    },
    async () => {
      const jsonPage = Math.floor(skip / 24) + 1
      const resp = await fetch(
        `${URL_STATIC_TOPIC_NEWS}_${slug}_${jsonPage}.json`
      )
      const rawData = await resp.json()

      const schema = z.object({
        items: z.array(sectionPostSchema),
        counts: countsSchema,
      })

      const result = schema.parse(rawData?.topic)

      const postsData = result.items.map(transformRawPost)
      const postsCount = result.counts.posts + result.counts.externals

      return {
        postsData,
        postsCount,
      }
    },
    async () => {
      const rawData = await fetchGQLData(
        errorLogger,
        GetListTypeTopcPostsDocument,
        {
          slug,
          take,
          skip,
          withAmount,
        }
      )
      if (rawData && rawData.topic && Array.isArray(rawData.topic.posts)) {
        const postsData = rawData.topic.posts.map(transformRawPost)
        if (
          typeof rawData.topic.postsCount === 'number' &&
          typeof rawData.topic.externalsCount === 'number'
        ) {
          return {
            postsData,
            postsCount: rawData.topic.postsCount + rawData.topic.externalsCount,
          }
        } else {
          return {
            postsData: [],
            postsCount: 0,
          }
        }
      } else {
        return {
          postsData: [],
          postsCount: 0,
        }
      }
    }
  )
  return data
}

type RawPostWithTags = NonNullable<
  NonNullable<GetGroupTypeTopicPostsQuery['topic']>['posts']
>[0]

const transformRawPostWithTags = (
  rawPost: RawPostWithTags
): PostDataWithTags => {
  const id = rawPost.id ?? ''
  const title = rawPost.title ?? ''
  const link = getStoryPageUrl(id)
  const postMainImage = getHeroImage(rawPost.heroImage)
  const brief = getFirstParagraphFromApiData(rawPost.apiDataBrief) ?? ''
  const content = getFirstParagraphFromApiData(rawPost.apiData) ?? ''
  const textContent = brief || content
  const tags = rawPost.tags || []

  return {
    id,
    title,
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
    getTraceObject()
  )

  const result = await fetchGQLData(
    errorLogger,
    GetGroupTypeTopicPostsDocument,
    {
      slug,
    }
  )

  if (result && result.topic && Array.isArray(result.topic.posts)) {
    return result.topic.posts.map(transformRawPostWithTags)
  } else {
    return []
  }
}

type RawTopic = NonNullable<GetTopicListQuery['topics']>[number]

const transformRawTopic = (rawTopic: RawTopic): Topic => {
  const id = rawTopic.id
  const name = rawTopic.name ?? ''
  const slug = rawTopic.slug ?? ''
  const brief = getFirstParagraphFromApiData(rawTopic.apiDataBrief) ?? ''
  const heroImage = getHeroImage(rawTopic.heroImage)

  return {
    id,
    name,
    slug,
    brief,
    heroImage,
  }
}

async function fetchTopicListingByPage({
  take,
  skip = 0,
  withAmount = false,
}: {
  take: number
  skip: number
  withAmount?: boolean
}): Promise<{
  items: Topic[]
  totalAmount?: number
}> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching topic listing`,
    getTraceObject()
  )

  const result = await fetchGQLData(errorLogger, GetTopicListDocument, {
    skip,
    take,
    withAmount,
  })

  if (result && Array.isArray(result.topics)) {
    const items = result.topics.map(transformRawTopic)
    if (typeof result.topicsCount === 'number') {
      return {
        items,
        totalAmount: result.topicsCount,
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

export {
  fetchTopicBasicInfo,
  fetchListTypeTopicPostBySlug,
  fetchGorupTypeTopicPostBySlug,
  fetchTopicListingByPage,
}
