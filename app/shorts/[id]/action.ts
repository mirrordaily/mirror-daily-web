'use server'

import { z } from 'zod'
import type { ShortsData } from '@/types/shorts'
import { latestShortsSchema, shortsDataSchema } from '@/utils/data-schema'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import {
  createDataFetchingChain,
  getHeroImage,
  transformLatestShorts,
} from '@/utils/data-process'
import {
  // GetShortsByTagAndVideoSectionDocument,
  GetShortsByVideoSectionDocument,
  GetShortsDataDocument,
} from '@/graphql/__generated__/graphql'
import { fetchGQLData } from '@/utils/graphql'
import type { Shorts } from '@/types/common'
import { SHORTS_TYPE } from '@/types/common'
import {
  URL_STATIC_NEWS_SHORTSPAGE,
  URL_STATIC_CREATIVTY_SHORTPAGE,
} from '@/constants/config'

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
      name: data.name,
      state: data.state,
      contributor: data.uploader,
      videoSection: data.videoSection,
      tagId: data.tags[0]?.id,
      youtubeUrl: data.youtubeUrl || '',
      videoSrc: data.videoSrc || '',
      heroImage: getHeroImage(data.heroImage),
      createdAt: data.createdAt || '',
      duration: data.duration || '',
    }
  }

  return data
}

export const fetchShortsRandom = async (
  originalVideoId: string,
  take: number,
  section: SHORTS_TYPE
): Promise<Shorts[]> => {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching shorts (originalVideoId: ${originalVideoId}, section: ${section})`,
    getTraceObject()
  )
  const schema = z.promise(z.object({ videos: z.array(latestShortsSchema) }))

  const SHORTS_JSON_URL = {
    [SHORTS_TYPE.NEWS]: URL_STATIC_NEWS_SHORTSPAGE,
    [SHORTS_TYPE.DERIVATIVE]: URL_STATIC_CREATIVTY_SHORTPAGE,
  }

  const data = await createDataFetchingChain<
    z.infer<z.ZodArray<typeof latestShortsSchema>>
  >(
    errorLogger,
    [],
    async () => {
      const baseUrl = SHORTS_JSON_URL[section]
      const jsonUrl = `${baseUrl}01.json`
      const resp = await fetch(jsonUrl)

      const jsonData = await resp.json()
      // Ensure jsonData is parsed against the schema for safety and type correctness
      const validationResult = z.array(latestShortsSchema).safeParse(jsonData)

      if (!validationResult.success) {
        errorLogger(validationResult.error)
        throw new Error('Invalid JSON data structure from static file')
      }

      let videos = validationResult.data

      // Filter out the video that matches originalVideoId
      videos = videos.filter((video) => video.id !== originalVideoId)

      // Shuffle the remaining videos (Fisher-Yates shuffle)
      // This loop modifies 'videos' in place.
      for (let i = videos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        // Swap elements
        ;[videos[i], videos[j]] = [videos[j]!, videos[i]!]
      }

      // Get the first 'take' videos
      return videos.slice(0, take)
    },
    async () => {
      const fetchFunc = fetchGQLData(
        errorLogger,
        GetShortsByVideoSectionDocument,
        {
          section,
          take,
        }
      )

      const result = await schema.parse(fetchFunc)
      return result.videos
    }
  )

  const orginalVideo = data.find((video) => video.id === originalVideoId)
  if (orginalVideo) {
    const filteredData = data.filter((video) => video.id !== originalVideoId)
    filteredData.unshift(orginalVideo)
    return filteredData.map(transformLatestShorts)
  }

  return data.map(transformLatestShorts)
}
