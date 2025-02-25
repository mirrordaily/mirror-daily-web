'use client'

import type { TopicPostData } from '@/types/topic'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import ArticleCard from '../article-card'

type Props = {
  pageSize: number
  totalAmount: number
  initialList: TopicPostData[]
  fetchMoreItem(page: number): Promise<TopicPostData[]>
}

export default function List({
  pageSize,
  totalAmount,
  initialList,
  fetchMoreItem,
}: Props) {
  return (
    <div className="list-container with-loadmore">
      <InfiniteScrollList
        initialList={initialList}
        pageSize={pageSize}
        amountOfElements={totalAmount}
        fetchListInPage={fetchMoreItem}
        isAutoFetch={false}
        loader={<button className="load-more">看更多</button>}
      >
        {(posts) =>
          posts.map((post) => <ArticleCard key={post.slug} {...post} />)
        }
      </InfiniteScrollList>
    </div>
  )
}
