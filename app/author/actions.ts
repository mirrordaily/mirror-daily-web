'use server'

import { fetchGQLData } from '@/utils/graphql'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import {
  GetPostsByAuthorIdDocument,
  GetAuthorInformationDocument,
} from '@/graphql/__generated__/graphql'
import type {
  GetPostsByAuthorIdQuery,
  GetAuthorInformationQuery,
} from '@/graphql/__generated__/graphql'
import { getStoryPageUrl } from '@/utils/site-urls'
import {
  getHeroImage,
  dateFormatter,
  selectMainImage,
} from '@/utils/data-process'
import type { AuthorPost, AuthorInfo } from '@/types/author-page'

function transformAuthorPost(
  rawData: GetPostsByAuthorIdQuery['posts']
): AuthorPost[] {
  if (!rawData) return []

  return rawData.map((rawPost) => {
    const title = rawPost.title ?? ''
    const slug = rawPost.slug ?? ''
    const link = getStoryPageUrl(slug)
    const createdTime = dateFormatter(rawPost.createdAt) ?? ''
    const heroImage = getHeroImage(rawPost.heroImage)
    const brief = rawPost.apiDataBrief?.[0]?.content?.[0] ?? ''
    const sectionName = rawPost.sections?.[0]?.name ?? ''
    const sectionColor = rawPost.sections?.[0]?.color ?? '#FF5A36'
    const content = rawPost.apiData?.[0]?.content?.[0] ?? ''
    const ogImage = getHeroImage(rawPost.og_image)
    const postMainImage = selectMainImage(heroImage, ogImage)
    const textContent = brief || content

    return {
      title,
      link,
      postMainImage,
      createdTime,
      sectionColor,
      sectionName,
      textContent,
    }
  })
}

async function fetchAuthorPosts(
  page: number,
  id: string
): Promise<AuthorPost[]> {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching author posts in author page',
    getTraceObject()
  )

  const pageSize = 12
  const take = pageSize * 2

  const result = await fetchGQLData(errorLogger, GetPostsByAuthorIdDocument, {
    skip: (page - 1) * pageSize,
    take: take,
    id: id,
  })

  if (result) {
    const { posts } = result
    return transformAuthorPost(posts)
  } else {
    return []
  }
}

function transformAuthorInformation(
  rawData: GetAuthorInformationQuery['contact']
): AuthorInfo | null {
  if (!rawData) return null

  const authorId = rawData.id
  const name = rawData.name ?? ''

  return {
    authorId,
    name,
  }
}

async function fetchAuthorInformation(id: string): Promise<AuthorInfo | null> {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching author information in author page',
    getTraceObject()
  )

  const result = await fetchGQLData(errorLogger, GetAuthorInformationDocument, {
    id: id,
  })

  if (result) {
    const { contact } = result
    return transformAuthorInformation(contact)
  } else {
    return null
  }
}

export { fetchAuthorPosts, fetchAuthorInformation }
