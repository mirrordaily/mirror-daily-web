'use client'

import type { Topic } from '@/types/topic'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import { fetchTopicListingByPage } from '../action'
import { PAGE_SIZE } from '@/constants/topic-list'
import TopicCard from './topic-card'

export default function TopicList({ topics }: { topics: Topic[] }) {
  const fetchMoreTopics = async (page: number) => {
    const topics = await fetchTopicListingByPage(page, PAGE_SIZE)
    return topics
  }

  return (
    <InfiniteScrollList
      initialList={topics}
      pageSize={PAGE_SIZE}
      fetchListInPage={fetchMoreTopics}
      isAutoFetch={false}
      loader={
        <div className="mt-[60px] flex justify-center">
          <button className="h-9 rounded border-[1.5px] px-[33px] py-[4.5px] text-lg font-bold leading-[1.3] text-[#7F8493] hover-or-active:border-[#119CC7] hover-or-active:text-[#119CC7]">
            看更多
          </button>
        </div>
      }
    >
      {(topics) => (
        <div className="mx-auto grid grid-cols-1 gap-9 md:w-[592px] md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:w-[992px] lg:gap-x-[60px] lg:gap-y-12">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      )}
    </InfiniteScrollList>
  )
}
