'use client'
import type { LatestVideos } from '@/types/common'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'

export default function LatestVideoList({
  latestVideos,
}: {
  latestVideos: LatestVideos[]
}) {
  // TODO: 修正來自GCS影片會無法顯示的問題
  const [isClientSide, setIsClientSide] = useState(false)

  useEffect(() => {
    setIsClientSide(true)
  }, [])
  if (!isClientSide) return <></>
  return (
    <div className="flex flex-col items-center">
      {latestVideos.map((video) => (
        <div
          key={video.id}
          className="md:tablet-live-video aspect-[330/220] w-full shrink-0 grow"
        >
          <ReactPlayer
            url={video.fileUrl}
            width="100%"
            height="100%"
            muted={true}
            playing={false}
            playsinline={true}
            controls={true}
            fallback={<div>error</div>}
            onError={(e) => {
              console.log('video error', e)
            }}
            onReady={() => {
              console.log('video ready', video.title)
            }}
            config={{
              file: {
                attributes: {
                  poster: video.poster,
                  /**   NOTE: preload: 'none', 會造成太大的影片沒有辦法顯示（測試的時候影片長度一小時）
                   * 遇到的情境：
                   * 1. onReady 不會被觸發
                   * 2. onError 不會被觸發
                   */
                  //   preload: 'none',
                },
              },
            }}
          />
          {/* <video
            className="aspect-video w-80"
            src="https://statics-dev.mirrordaily.news/video-files/720-p-e-e-1st-one-man-liv-ea-ae-a-e-i-a-i-a-e-ae-fc8SuznKlD5alWEyZ5.mp4"
          ></video> */}
        </div>
      ))}
      <ReactPlayer
        url="https://statics-dev.mirrordaily.news/video-files/720-p-e-e-1st-one-man-liv-ea-ae-a-e-i-a-i-a-e-ae-fc8SuznKlD5alWEyZ5.mp4"
        width="100%"
        height="100%"
        muted={true}
        playing={false}
        playsinline={true}
        fallback={<div>error</div>}
        onError={(e) => {
          console.log('video error', e)
        }}
        onReady={() => {
          console.log('video ready the GCS one')
        }}
      />
    </div>
  )
}
