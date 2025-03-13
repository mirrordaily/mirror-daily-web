'use client'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import LatestNewsCard from './card'
import { useEffect, useState, type ReactNode } from 'react'
import type { LatestPost } from '@/types/common'
import type { getSectionColor } from '@/utils/data-process'
import { fetchLatestPost } from '@/utils/client-side-data-fetch'
import { fetchLiveEvent } from '@/app/actions'

/** the amount of articles each time load-more is clicked  */
const RENDER_PAGE_SIZE = 20

type PostListProps = {
  sectionData: Parameters<typeof getSectionColor>[0]
}

export default function PostList({ sectionData }: PostListProps): ReactNode {
  const [isInitialized, setIsInitialized] = useState(false)
  const [initialPostData, setInitialPostData] = useState<LatestPost[]>([])

  const fetchMoreLatestPost = async (
    page: number = 0
  ): Promise<LatestPost[]> => {
    // fetch more latest post on browser side
    return await fetchLatestPost(sectionData, page)
  }

  useEffect(() => {
    const initialize = async () => {
      const liveEvent = await fetchLiveEvent()
      const latestPosts = await fetchLatestPost(sectionData, 1)

      let startIndexOfLatestNewsSection = 0

      if (liveEvent) {
        startIndexOfLatestNewsSection = 9
      } else {
        startIndexOfLatestNewsSection = 10
      }

      setInitialPostData(latestPosts.slice(startIndexOfLatestNewsSection))
      setIsInitialized(true)
    }

    if (!isInitialized) {
      initialize()
    }
  }, [isInitialized, sectionData])

  return (
    <InfiniteScrollList
      key={String(isInitialized)}
      initialList={initialPostData}
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
