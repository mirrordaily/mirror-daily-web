'use client'

import type { TopicPost } from '@/types/homepage'
import { useState } from 'react'
import TopicSelector from './topic-selector'
import TopicItem from './topic-item'

type Props = {
  data: Record<string, [TopicPost, ...TopicPost[]]>
}

export default function TopicMain({ data }: Props) {
  const topics = Object.keys(data)
  const [topic, setTopic] = useState<string>(topics[0]!)
  const topicData = data[topic]

  return (
    <div className="flex w-full shrink-0 flex-col">
      <TopicSelector topics={topics} activeTopic={topic} setTopic={setTopic} />
      {!!topicData && (
        <div className="mt-6 flex w-full flex-col gap-y-4 md:mt-[11px] md:gap-y-7 lg:mt-[22px] lg:flex-row lg:gap-x-6">
          <div>
            <TopicItem {...topicData[0]} isFirst />
          </div>
          <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-[34px] lg:flex-col lg:gap-y-5">
            {topicData.slice(1, 4).map((data) => (
              <TopicItem {...data} key={data.postSlug} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
