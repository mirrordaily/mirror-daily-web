'use client'
import type { LatestVideos } from '@/types/common'
import { matchYoutubeUrl } from '@/utils/common'
import dayjs from 'dayjs'
import Image from 'next/image'

export default function LatestVideoList({
  latestVideos,
}: {
  latestVideos: LatestVideos[]
}) {
  const getYoutubeId = (url: string): string | null => {
    return matchYoutubeUrl(url)
  }

  const getThumbnailByVideoId = (videoId: string): string => {
    // Using hqdefault for the highest resolution available
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }

  return (
    <div className="flex grow flex-col items-center lg:items-start lg:justify-end lg:gap-8">
      {latestVideos.map((video) => (
        <a
          key={video.id}
          href={video.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer gap-5"
        >
          <div className="md:tablet-live-video relative flex aspect-[330/220] w-full shrink-0 grow lg:h-[100px] lg:w-[180px]">
            <Image
              src={
                getThumbnailByVideoId(getYoutubeId(video.fileUrl) ?? '') ||
                '/images-next/default-image.png'
              }
              fill
              alt={`${video.title}`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="line-clamp-2">{video.title}</p>
            <p className="text-sm font-normal leading-4">
              {dayjs(video.updatedAt).format('YYYY-MM-DD')}
            </p>
          </div>
        </a>
      ))}
    </div>
  )
}
