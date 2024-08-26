'use server'

import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import {
  GetPostBySlugDocument,
  GetRelatedPostsBySlugDocument,
} from '@/graphql/__generated__/graphql'
import type {
  GetPostBySlugQuery,
  GetRelatedPostsBySlugQuery,
} from '@/graphql/__generated__/graphql'
import {
  dateFormatter,
  getHeroImage,
  selectMainImage,
} from '@/utils/data-process'
import type { Post, RelatedPost } from '@/types/story-page'
import { getStoryPageUrl, getAuthorPageUrl } from '@/utils/site-urls'

function transformPost(rawData: GetPostBySlugQuery['post']): Post | null {
  if (!rawData) return null

  const title = rawData.title ?? ''
  const subTitle = rawData.subtitle ?? ''
  const heroCaption = rawData.heroCaption ?? ''
  const publishedTime = dateFormatter(rawData.publishedDate) ?? ''
  const heroImage = getHeroImage(rawData.heroImage)
  const ogImage = getHeroImage(rawData.og_image)
  const postMainImage = selectMainImage(heroImage, ogImage)
  const sectionName = rawData.sections?.[0]?.name ?? '時事'
  const sectionColor = rawData.sections?.[0]?.color ?? '#4D8AA4'
  const writers =
    rawData.writers?.map(({ id, name }) => ({
      link: getAuthorPageUrl(id),
      name: name ?? '',
    })) ?? []
  const photographers =
    rawData.photographers?.map(({ id, name }) => ({
      link: getAuthorPageUrl(id),
      name: name ?? '',
    })) ?? []
  const apiData = rawData.apiData
  const apiDataBrief = rawData.apiDataBrief
  const tags =
    rawData.tags?.map((tag) => ({
      name: tag.name ?? '',
      slug: tag.slug ?? '',
    })) ?? []
  const slug = rawData.slug ?? ''
  const link = getStoryPageUrl(slug)

  return {
    title,
    subTitle,
    heroCaption,
    publishedTime,
    postMainImage,
    sectionName,
    sectionColor,
    writers,
    photographers,
    apiData,
    apiDataBrief,
    tags,
    link,
  }
}

async function fetchPost(slug: string) {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching post in story page',
    getTraceObject()
  )

  const result = await fetchGQLData(errorLogger, GetPostBySlugDocument, {
    slug: slug,
  })

  if (result) {
    const { post } = result
    return transformPost(post)
  } else {
    return null
  }
}

function transformRelatedPosts(
  rawData: GetRelatedPostsBySlugQuery['post']
): RelatedPost[] {
  if (!rawData || !rawData.relateds) return []

  return rawData.relateds.map((rawPost) => {
    const title = rawPost.title ?? ''
    const slug = rawPost.slug ?? ''
    const link = getStoryPageUrl(slug)
    const createdTime = dateFormatter(rawPost.createdAt) ?? ''
    const heroImage = getHeroImage(rawPost.heroImage)
    const ogImage = getHeroImage(rawPost.og_image)
    const postMainImage = selectMainImage(heroImage, ogImage)
    const sectionName = rawPost.sections?.[0]?.name ?? '時事'
    const sectionColor = rawPost.sections?.[0]?.color ?? '#4D8AA4'

    return {
      title,
      link,
      postMainImage,
      createdTime,
      sectionColor,
      sectionName,
    }
  })
}

async function fetchRelatedPosts(slug: string): Promise<RelatedPost[]> {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching related post in story page',
    getTraceObject()
  )

  const result = await fetchGQLData(
    errorLogger,
    GetRelatedPostsBySlugDocument,
    { slug: slug }
  )

  if (result) {
    const { post } = result
    return transformRelatedPosts(post)
  } else return []
}

export { fetchPost, fetchRelatedPosts }
