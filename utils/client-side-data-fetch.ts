import { z } from 'zod'
import {
  URL_STATIC_LATEST_NEWS,
  URL_STATIC_POPULAR_NEWS,
} from '@/constants/config'
import type {
  LatestPost,
  PopularNews,
  SectionAndCategory,
} from '@/types/common'
import { rawLatestPostSchema, rawPopularPostSchema } from './data-schema'
import {
  hasExternalLink,
  transformRawLatestPost,
  transformRawPopularPost,
} from './post'

type SectionData = Pick<SectionAndCategory, 'slug' | 'color'>[]

const fetchLatestPost = async (
  sectionData: SectionData,
  page: number = 0
): Promise<LatestPost[]> => {
  // fetch more latest post on browser side
  try {
    const resp = await fetch(`${URL_STATIC_LATEST_NEWS}0${page}.json`)

    const rawPostData = await resp.json()
    const latestPosts = z.array(rawLatestPostSchema).parse(rawPostData?.latest)
    const filteredData = latestPosts.filter(
      (rawPost) => !hasExternalLink(rawPost)
    )

    return filteredData.map((item) => transformRawLatestPost(item, sectionData))
  } catch (e) {
    // TODO: send error log
    console.error(e)
    return []
  }
}

const fetchPopularPost = async (
  sectionData: SectionData,
  amount: number = 10
): Promise<PopularNews[]> => {
  try {
    const resp = await fetch(URL_STATIC_POPULAR_NEWS)

    const rawPostData = await z
      .promise(z.array(rawPopularPostSchema))
      .parse(resp.json())

    return rawPostData
      .map((item) => transformRawPopularPost(item, sectionData))
      .slice(0, amount)
  } catch (e) {
    // TODO: send error log
    console.error(e)
    return []
  }
}

export { fetchLatestPost, fetchPopularPost }
