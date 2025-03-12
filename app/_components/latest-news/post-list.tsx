'use client'
import { z } from 'zod'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import LatestNewsCard from './card'
import type { ReactNode } from 'react'

/** the amount of articles each time load-more is clicked  */
const RENDER_PAGE_SIZE = 20

import type { LatestPost } from '@/types/common'
import { URL_STATIC_LATEST_NEWS } from '@/constants/config'
import { rawLatestPostSchema } from '@/utils/data-schema'
import { hasExternalLink, transformRawLatestPost } from '@/utils/post'
import type { getSectionColor } from '@/utils/data-process'

type PostListProps = {
  initialList: LatestPost[]
  sectionData: Parameters<typeof getSectionColor>[0]
}

export default function PostList({
  initialList,
  sectionData,
}: PostListProps): ReactNode {
  const fetchMoreLatestPost = async (
    page: number = 0
  ): Promise<LatestPost[]> => {
    // fetch more latest post on browser side
    try {
      const resp = await fetch(`${URL_STATIC_LATEST_NEWS}0${page}.json`)

      const rawPostData = await resp.json()
      const latestPosts = z
        .array(rawLatestPostSchema)
        .parse(rawPostData?.latest)
      const filteredData = latestPosts.filter(
        (rawPost) => !hasExternalLink(rawPost)
      )

      return filteredData.map((item) =>
        transformRawLatestPost(item, sectionData)
      )
    } catch (e) {
      // TODO: send error log
      console.error(e)
      return []
    }
  }

  return (
    <InfiniteScrollList
      initialList={initialList}
      pageSize={RENDER_PAGE_SIZE}
      amountOfElements={200}
      fetchListInPage={fetchMoreLatestPost}
      isAutoFetch={false}
      loader={
        <button className="mt-4 inline-block rounded border-2 border-solid border-[#1f668e] p-[10px] text-lg font-bold leading-normal text-[#1f668e] hover-or-active:border-[#119cc9] hover-or-active:text-[#119cc9] md:mt-5 lg:mt-5">
          看更多
        </button>
      }
    >
      {(posts: LatestPost[]) =>
        posts.map((post) => <LatestNewsCard {...post} key={post.postSlug} />)
      }
    </InfiniteScrollList>
  )
}
