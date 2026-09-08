'use server'

import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { transformRawPostWithSection } from '@/utils/data-process'
import { fetchGQLData } from '@/utils/graphql'
import type {
  GetTagInformationQuery,
  GetPostsByTagSlugQuery,
} from '@/graphql/__generated__/graphql'
import {
  GetTagInformationDocument,
  GetPostsByTagSlugDocument,
} from '@/graphql/__generated__/graphql'
import type { TagPost, TagInfo } from '@/types/tag'

function transformTagInformation(
  rawData: GetTagInformationQuery['tag']
): TagInfo | null {
  if (!rawData) return null

  const name = rawData.name ?? ''

  return {
    name,
  }
}

async function fetchTagInformation(slug: string): Promise<TagInfo | null> {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching tag information',
    await getTraceObject()
  )

  const result = await fetchGQLData(errorLogger, GetTagInformationDocument, {
    slug: slug,
  })

  if (result) {
    const { tag } = result
    return transformTagInformation(tag)
  } else {
    return null
  }
}

function transformTagPost(rawData: GetPostsByTagSlugQuery['posts']): TagPost[] {
  if (!rawData) return []

  return rawData.map(transformRawPostWithSection)
}

async function fetchTagPosts({
  take,
  skip = 0,
  slug,
  withAmount = false,
}: {
  take: number
  skip: number
  slug: string
  withAmount?: boolean
}): Promise<{
  posts: TagPost[]
  totalAmount?: number
}> {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching posts on tag page',
    await getTraceObject()
  )
  const result = await fetchGQLData(errorLogger, GetPostsByTagSlugDocument, {
    skip,
    take,
    slug,
    withAmount,
  })
  if (!result) {
    return {
      posts: [],
      totalAmount: 0,
    }
  }
  const posts = transformTagPost(result.posts)
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

export { fetchTagInformation, fetchTagPosts }
