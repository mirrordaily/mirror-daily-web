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
import { STATIC_JSON_SECTION_NEWS } from '@/constants/config'
import { sectionPostSchema, countsSchema } from '@/utils/data-schema'
import { z } from 'zod'
import { readStaticJson } from '@/utils/read-static-json'

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
  amount?: number
}> {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching section posts on section page',
    await getTraceObject()
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
      amount: 0,
    }
  }
  const posts = transformSectionPost(result.posts)
  if (typeof result.postsCount === 'number') {
    return {
      posts,
      amount: result.postsCount,
    }
  } else {
    return {
      posts,
    }
  }
}

async function fetchSectionPostsFromJSON({
  slug,
  page = 1,
}: {
  slug: string
  page?: number
}): Promise<{ postsData: SectionPost[]; jsonPostsCount: number }> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching section posts, section slug: ${slug}`,
    await getTraceObject()
  )

  const schema = z.object({
    items: z.array(sectionPostSchema),
    counts: countsSchema,
  })

  try {
    const rawData = await readStaticJson<{ section?: unknown }>(
      `${STATIC_JSON_SECTION_NEWS}_${slug}_${page}.json`
    )
    const data = schema.parse(rawData?.section)
    const { posts, externals } = data.counts
    const postsData = data.items.map((post) => transformRawPost(post))
    const jsonPostsCount = posts + externals

    return {
      postsData,
      jsonPostsCount,
    }
  } catch (e) {
    errorLogger(e)
    return {
      postsData: [],
      jsonPostsCount: 0,
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
    await getTraceObject()
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

export { fetchSectionPosts, fetchSectionPostsFromJSON, fetchSectionInformation }
