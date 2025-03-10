'use server'

import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import {
  GetExternalBySlugDocument,
  GetRelatedPostsByExternalSlugDocument,
} from '@/graphql/__generated__/graphql'
import type { GetExternalBySlugQuery } from '@/graphql/__generated__/graphql'
import type { ExternalPost } from '@/types/external'
import { dateFormatter, transfromRawRelatedPosts } from '@/utils/data-process'
import { getExternalPageUrl } from '@/utils/site-urls'
import type { RelatedPost } from '@/types/common'

function transformExternal(
  rawData: GetExternalBySlugQuery['external']
): ExternalPost | null {
  if (!rawData) return null
  const title = rawData.title ?? ''
  const thumb = rawData.thumb ?? ''
  const writer = rawData.extend_byline ?? ''
  const publishedTime = dateFormatter(rawData.publishedDate) ?? ''
  const brief = rawData.brief ?? ''
  const content = rawData.content ?? ''
  const tags =
    rawData.tags?.map((tag) => ({
      name: tag.name ?? '',
      slug: tag.slug ?? '',
    })) ?? []
  const slug = rawData.slug ?? ''
  const link = getExternalPageUrl(slug)
  const sectionName = '時事'

  return {
    title,
    thumb,
    writer,
    publishedTime,
    brief,
    content,
    tags,
    link,
    sectionName,
  }
}

async function fetchExternal(slug: string): Promise<ExternalPost | null> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching external with slug:${slug} on external page`,
    getTraceObject()
  )
  const result = await fetchGQLData(errorLogger, GetExternalBySlugDocument, {
    slug,
  })
  if (result) {
    const { external } = result
    return transformExternal(external)
  } else {
    return null
  }
}

async function fetchRelatedPosts(slug: string): Promise<RelatedPost[]> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching related posts using external slug:${slug} on external page`,
    getTraceObject()
  )
  const result = await fetchGQLData(
    errorLogger,
    GetRelatedPostsByExternalSlugDocument,
    {
      slug,
    }
  )
  if (result) {
    const { external } = result
    return transfromRawRelatedPosts(external)
  } else {
    return []
  }
}

export { fetchExternal, fetchRelatedPosts }
