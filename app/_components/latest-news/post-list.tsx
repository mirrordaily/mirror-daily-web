'use client'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import LatestNewsCard from './card'
import type { ReactNode } from 'react'
import type { LatestPost } from '@/types/common'
import type { getSectionColor } from '@/utils/data-process'
import { fetchLatestPost } from '@/utils/client-side-data-fetch'
import { useAppSelector } from '@/redux/hooks'
import {
  selectIsInitialized,
  selectLatestPosts,
  selectLiveEvent,
} from '@/redux/homepage/selector'

/** the amount of articles each time load-more is clicked  */
const RENDER_PAGE_SIZE = 20

type PostListProps = {
  sectionData: Parameters<typeof getSectionColor>[0]
}

export default function PostList({ sectionData }: PostListProps): ReactNode {
  const isInitialized = useAppSelector(selectIsInitialized)
  const liveEvent = useAppSelector(selectLiveEvent)
  const latestPosts = useAppSelector(selectLatestPosts)

  const fetchMoreLatestPost = async (
    page: number = 0
  ): Promise<LatestPost[]> => {
    // fetch more latest post on browser side
    return await fetchLatestPost(sectionData, page)
  }

  if (!isInitialized) return null

  let startIndexOfLatestNewsSection = 0

  if (liveEvent) {
    startIndexOfLatestNewsSection = 9
  } else {
    startIndexOfLatestNewsSection = 10
  }

  return (
    <InfiniteScrollList
      key={String(isInitialized)}
      initialList={latestPosts.slice(startIndexOfLatestNewsSection)}
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
