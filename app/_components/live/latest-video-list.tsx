'use client'
import type { LatestVideos } from '@/types/common'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'

export default function LatestVideoList({
  latestVideos,
}: {
  latestVideos: LatestVideos[]
}) {
  const [isClientSide, setIsClientSide] = useState(false)

  useEffect(() => {
    setIsClientSide(true)
  }, [])
  if (!isClientSide) return <></>
  return (
    <div className="flex grow flex-col items-center lg:items-start lg:justify-end lg:gap-8">
      {latestVideos.map((video) => (
        <div key={video.id} className="flex gap-5">
          <div className="md:tablet-live-video flex aspect-[330/220] w-full shrink-0 grow lg:h-[100px] lg:w-[180px]">
            {/**   NOTE: preload: 'none', 會造成太大的影片沒有辦法顯示（測試的時候影片長度一小時）
             * 遇到的情境：
             * 1. onReady 不會被觸發
             * 2. onError 不會被觸發
             */}
            <ReactPlayer
              url={video.fileUrl}
              width="100%"
              height="100%"
              muted={true}
              playing={false}
              playsinline={true}
              controls={true}
              fallback={<div>error</div>}
            />
          </div>
          <div>
            <p className="line-clamp-2">{video.title}</p>
            <p>{video.updatedAt}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
