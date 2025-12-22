'use client'

import CustomImage from '@/shared-components/custom-image'
import type { TopicBundle } from '@/types/homepage'
import Link from 'next/link'

type Props = {
  topicData: TopicBundle[]
}

export default function TopicMain({ topicData }: Props) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2 lg:grid-cols-2">
        {topicData.map((topicBundle) => {
          const { id, name, link, heroImage } = topicBundle
          return (
            <Link key={id} href={link} className="flex flex-col gap-2">
              <div className="aspect-[8/5] overflow-hidden">
                <CustomImage
                  images={heroImage?.resized}
                  imagesWebP={heroImage?.resizedWebp}
                  objectFit="cover"
                  alt="topic 首圖"
                  className="transition-transform duration-300 ease-out hover:scale-110 active:scale-110"
                />
              </div>
              <span className="font-bold">{name}</span>
            </Link>
          )
        })}
      </div>
      <Link
        href="/topic"
        className="rounded border-2 border-mirror-blue-600 p-[10px] text-lg font-bold leading-none text-mirror-blue-600"
      >
        看所有專題
      </Link>
    </div>
  )
}
