'use server'
import { fetchGQLData } from '@/utils/graphql'
import {
  GetCategoryInformationDocument,
  GetPostsByCategorySlugDocument,
} from '@/graphql/__generated__/graphql'
import type {
  GetPostsByCategorySlugQuery,
  GetCategoryInformationQuery,
} from '@/graphql/__generated__/graphql'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import type { CategoryPost } from '@/types/category'
import { transformRawPost } from '@/utils/data-process'
import { sectionPostSchema, countsSchema } from '@/utils/data-schema'
import { STATIC_JSON_CATEGORY_NEWS } from '@/constants/config'
import { z } from 'zod'
import { readStaticJson } from '@/utils/read-static-json'

function transformCategoryPost(
  rawData: GetPostsByCategorySlugQuery['posts']
): CategoryPost[] {
  if (!rawData) return []

  return rawData.map(transformRawPost)
}

async function fetchCategoryPosts({
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
  posts: CategoryPost[]
  amount?: number
}> {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching category posts on category page',
    await getTraceObject()
  )
  const result = await fetchGQLData(
    errorLogger,
    GetPostsByCategorySlugDocument,
    {
      skip,
      take,
      slug,
      withAmount,
    }
  )

  if (!result)
    return {
      posts: [],
      amount: 0,
    }

  const posts = transformCategoryPost(result.posts)
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

async function fetchCategoryPostsFromJSON({
  slug,
  page = 1,
}: {
  slug: string
  page?: number
}): Promise<{ postsData: CategoryPost[]; jsonPostsCount: number }> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching category posts, category slug: ${slug}`,
    await getTraceObject()
  )

  const schema = z.object({
    items: z.array(sectionPostSchema),
    counts: countsSchema,
  })

  try {
    const rawData = await readStaticJson<{ category?: unknown }>(
      `${STATIC_JSON_CATEGORY_NEWS}_${slug}_${page}.json`
    )
    const data = schema.parse(rawData?.category)
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

function transformCategoryInformation(
  rawData: GetCategoryInformationQuery['category']
) {
  if (!rawData) return null

  const name = rawData.name ?? ''
  const color = rawData.sections?.[0]?.color ?? '#FF5A36'
  const state = rawData.state

  if (state === 'active') {
    return {
      name,
      color,
    }
  } else return null
}

async function fetchCategoryInformation(slug: string) {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching category information',
    await getTraceObject()
  )

  const result = await fetchGQLData(
    errorLogger,
    GetCategoryInformationDocument,
    {
      slug: slug,
    }
  )

  if (result) {
    const { category } = result
    return transformCategoryInformation(category)
  } else {
    return null
  }
}

export {
  fetchCategoryPosts,
  fetchCategoryPostsFromJSON,
  fetchCategoryInformation,
}
