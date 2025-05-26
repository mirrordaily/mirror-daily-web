'use client'
import type { LatestVideos } from '@/types/common'
import Image from 'next/image'

export default function LatestVideoList({
  latestVideos,
}: {
  latestVideos: LatestVideos[]
}) {
  return (
    <div className="flex grow flex-col items-center lg:items-start lg:justify-end lg:gap-8">
      {latestVideos.map((video) => (
        <div key={video.id} className="flex gap-5">
          <div className="md:tablet-live-video relative flex aspect-[330/220] w-full shrink-0 grow lg:h-[100px] lg:w-[180px]">
            <Image
              src={video.poster || '/images-next/default-image.png'}
              fill
              alt={`${video.title}`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="line-clamp-2">{video.title}</p>
            <p className="text-sm font-normal leading-4">{video.updatedAt}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
