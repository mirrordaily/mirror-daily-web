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
    <div className="flex w-full shrink-0 flex-col lg:max-w-[760px]">
      <TopicSelector topics={topics} activeTopic={topic} setTopic={setTopic} />
      {!!topicData && (
        <div className="mt-[15px] flex w-full flex-col flex-wrap justify-start gap-y-4 md:flex-row md:gap-x-[34px] md:gap-y-7 lg:gap-x-8">
          {topicData.map((data, index) => (
            <TopicItem {...data} isFirst={index === 0} key={data.postId} />
          ))}
        </div>
      )}
    </div>
  )
}
