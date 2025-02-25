'use server'

import { z } from 'zod'
import type { ShortsData } from '@/types/shorts'
import { latestShortsSchema, shortsDataSchema } from '@/utils/data-schema'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import {
  createDataFetchingChain,
  transformLatestShorts,
} from '@/utils/data-process'
import {
  GetShortsByTagAndVideoSectionDocument,
  GetShortsByVideoSectionDocument,
  GetShortsDataDocument,
} from '@/graphql/__generated__/graphql'
import { fetchGQLData } from '@/utils/graphql'
import type { Shorts, SHORTS_TYPE } from '@/types/common'

export const fetchShortsData = async (
  videoId: string
): Promise<ShortsData | null> => {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching shorts data (vidoeId: ${videoId})`,
    getTraceObject()
  )
  const schema = z.promise(z.object({ video: shortsDataSchema }))

  const data = await createDataFetchingChain<z.infer<
    typeof shortsDataSchema
  > | null>(errorLogger, null, async () => {
    const result = await schema.parse(
      fetchGQLData(errorLogger, GetShortsDataDocument, { id: videoId })
    )
    return result.video
  })

  if (data !== null) {
    if (data.state !== 'published') return null
    if (data.isShorts !== true) return null

    return {
      id: data.id,
      state: data.state,
      contributor: data.uploader,
      videoSection: data.videoSection,
      tagId: data.tags[0]?.id,
    }
  }

  return data
}

export const fetchShortsByTagAndVideoSection = async (
  originalVideoId: string,
  tagId: string | undefined,
  section: SHORTS_TYPE
): Promise<Shorts[]> => {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching shorts by tag (tagId: ${tagId})`,
    getTraceObject()
  )
  const schema = z.promise(z.object({ videos: z.array(latestShortsSchema) }))

  const isValidTagId = (tagId: string | undefined): tagId is string =>
    !Number.isNaN(Number(tagId))

  const data = await createDataFetchingChain<
    z.infer<z.ZodArray<typeof latestShortsSchema>>
  >(errorLogger, [], async () => {
    const fetchFunc = isValidTagId(tagId)
      ? fetchGQLData(errorLogger, GetShortsByTagAndVideoSectionDocument, {
          tagId,
          section,
        })
      : fetchGQLData(errorLogger, GetShortsByVideoSectionDocument, { section })

    const result = await schema.parse(fetchFunc)
    return result.videos
  })

  const orginalVideo = data.find((video) => video.id === originalVideoId)
  if (orginalVideo) {
    const filteredData = data.filter((video) => video.id !== originalVideoId)
    filteredData.unshift(orginalVideo)
    return filteredData.map(transformLatestShorts).slice(0, 20)
  }

  return data.map(transformLatestShorts).slice(0, 20)
}
