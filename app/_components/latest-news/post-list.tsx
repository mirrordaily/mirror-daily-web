'use client'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import LatestNewsCard from './card'
import type { ReactNode } from 'react'

/** the amount of articles each time load-more is clicked  */
const RENDER_PAGE_SIZE = 20

export type PropsOfCard = Parameters<typeof LatestNewsCard>[0]

type PostListProps = {
  initialList: PropsOfCard[]
  fetchLatestPost: (page: number) => Promise<PropsOfCard[]>
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
        <button className="mt-4 inline-block rounded border-2 border-solid border-[#1f668e] p-[10px] text-lg font-bold leading-normal text-[#1f668e] hover-or-active:border-[#119cc9] hover-or-active:text-[#119cc9] md:mt-5 lg:mt-5">
          看更多
        </button>
      }
    >
      {(posts: PropsOfCard[]) =>
        posts.map((post) => <LatestNewsCard {...post} key={post.postSlug} />)
      }
    </InfiniteScrollList>
  )
}
