'use client'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import LatestNewsCard from './card'
import type { ReactNode } from 'react'

/** the amount of articles each time load-more is clicked  */
const RENDER_PAGE_SIZE = 20

import type { LatestPost } from '@/types/common'

type PostListProps = {
  initialList: LatestPost[]
  fetchLatestPost(page: number): Promise<LatestPost[]>
}

export default function PostList({
  initialList,
  fetchLatestPost,
}: PostListProps): ReactNode {
  return (
    <InfiniteScrollList
      initialList={initialList}
      pageSize={RENDER_PAGE_SIZE}
      amountOfElements={200}
      fetchListInPage={fetchLatestPost}
      isAutoFetch={false}
      loader={
        <button className="mt-4 inline-block rounded border-2 border-solid border-[#896fcc] p-[10px] text-lg font-bold leading-normal text-[#896fcc] hover-or-active:bg-[#896fcc] hover-or-active:text-[#ffffff] lg:mt-6">
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
