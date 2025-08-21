'use client'

import ArticleCard from './article-card'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import type { PostDataWithSection } from '@/utils/data-process'

type Props<T> = {
  initialList: T[]
  totalAmount: number
  fetchMorePosts(page: number): Promise<T[]>
  gtm: Parameters<typeof ArticleCard>[0]['gtm']
}

const PAGE_SIZE = 12

export default function ArticlesList<T extends PostDataWithSection>({
  initialList,
  totalAmount,
  fetchMorePosts,
  gtm,
}: Props<T>) {
  return (
    <InfiniteScrollList
      initialList={initialList}
      pageSize={PAGE_SIZE}
      fetchListInPage={fetchMorePosts}
      isAutoFetch={false}
      amountOfElements={totalAmount}
      loader={
        <button
          className={`${gtm.loadmore} h-9 rounded border-[1.5px] px-[33px] py-[4.5px] text-lg font-bold leading-[1.3] text-[#7F8493] hover-or-active:border-[#119CC7] hover-or-active:text-[#119CC7]`}
        >
          看更多
        </button>
      }
    >
      {(posts) =>
        posts.map((post) => (
          <ArticleCard {...post} key={post.title} gtm={gtm} />
        ))
      }
    </InfiniteScrollList>
  )
}
