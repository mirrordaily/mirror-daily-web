'use server'
import { fetchGQLData } from '@/utils/graphql'
import {
  GetPostsBySectionSlugDocument,
  GetSectionInformationDocument,
} from '@/graphql/__generated__/graphql'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import type {
  GetPostsBySectionSlugQuery,
  GetSectionInformationQuery,
} from '@/graphql/__generated__/graphql'
import { transformRawPost } from '@/utils/data-process'
import type { SectionPost } from '@/types/section'

function transformSectionPost(
  rawData: GetPostsBySectionSlugQuery['posts']
): SectionPost[] {
  if (!rawData) return []
  return rawData.map(transformRawPost)
}

async function fetchSectionPosts({
  take,
  skip = 0,
  slug,
  withAmount = false,
}: {
  take: number
  skip?: number
  slug: string
  withAmount?: boolean
}): Promise<{
  posts: SectionPost[]
  totalAmount?: number
}> {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching section posts on section page',
    getTraceObject()
  )
  const result = await fetchGQLData(
    errorLogger,
    GetPostsBySectionSlugDocument,
    {
      skip,
      take,
      slug,
      withAmount,
    }
  )
  if (!result) {
    return {
      posts: [],
      totalAmount: 0,
    }
  }
  const posts = transformSectionPost(result.posts)
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

function transformSectionInformation(
  rawData: GetSectionInformationQuery['section']
) {
  if (!rawData) return null

  const name = rawData.name ?? ''
  const color = rawData.color ?? '#FF5A36'
  const state = rawData.state

  if (state === 'active') {
    return {
      name,
      color,
    }
  } else return null
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

  if (result) {
    const { section } = result
    return transformSectionInformation(section)
  } else {
    return null
  }
}

export { fetchSectionPosts, fetchSectionInformation }
