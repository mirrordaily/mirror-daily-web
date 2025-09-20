'use client'

import { homepageGtmEvents } from '@/constants/gtm'
import useVideoViewLogger from '@/hooks/use-video-logger'
import type { Shorts } from '@/types/common'
import { useEffect, useState } from 'react'
import NextImage from 'next/image'
import ReactPlayer from 'react-player/lazy'
import { SHORTS_TYPE } from '@/types/common'

type Props = Shorts & {
  isActive: boolean
  onPlay(): void
  onPause(): void
  type: SHORTS_TYPE
}

const gtmClassNameMap = {
  [SHORTS_TYPE.NEWS]: homepageGtmEvents.shortNews,
  [SHORTS_TYPE.DERIVATIVE]: homepageGtmEvents.shortCreativity,
} as const

export default function ShortsItem({
  fileUrl,
  poster,
  title,
  link,
  isActive,
  onPlay,
  onPause,
  type,
}: Props) {
  const [isClientSide, setIsClientSide] = useState(false)
  const [duration, setDuration] = useState<number | null>(null)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const { sendVideoLog } = useVideoViewLogger({
    isActive,
    title,
    link,
    duration,
    playedSeconds,
  })

  useEffect(() => {
    setIsClientSide(true)
  }, [])

  const extractYouTubeId = (url: string): string | null => {
    try {
      const u = new URL(url)
      if (u.hostname.includes('youtu.be')) {
        return u.pathname.replace(/^\//, '') || null
      }
      if (u.hostname.includes('youtube.com')) {
        const v = u.searchParams.get('v')
        if (v) return v
        const path = u.pathname
        const match = path.match(/\/(embed|shorts)\/([^/?#]+)/)
        if (match && match[2]) return match[2]
      }
    } catch (_e) {
      return null
    }
    return null
  }

  const previewSrc = (() => {
    const ytId = extractYouTubeId(fileUrl)
    if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
    return poster || '/images-next/default-image.png'
  })()
  return (
    <a className={`${gtmClassNameMap[type]} w-full select-none`} href={link}>
      <div className="relative h-[400px] w-full lg:h-[400px]">
        {(!isClientSide || !isActive) && (
          <NextImage
            src={previewSrc}
            alt={`${title} 縮圖`}
            fill
            sizes="100vw"
            className="pointer-events-none"
            style={{ objectFit: 'cover' }}
          />
        )}
        {isClientSide && (
          <ReactPlayer
            url={fileUrl}
            width="100%"
            height="100%"
            muted={true}
            playing={isActive}
            playsinline={true}
            config={{
              file: {
                attributes: {
                  poster,
                  preload: 'none',
                },
              },
            }}
            onPause={() => onPause()}
            onEnded={async () => {
              onPause()
              await sendVideoLog(100, true)
            }}
            onDuration={(duration) => setDuration(duration)}
            onProgress={({ playedSeconds }) => {
              setPlayedSeconds(playedSeconds)
            }}
          />
        )}
        <div
          className="absolute inset-0"
          onMouseEnter={() => onPlay()}
          onMouseLeave={() => onPause()}
        />
      </div>
      <p className="mt-4 line-clamp-2 text-base font-normal leading-normal">
        {title}
      </p>
    </a>
  )
}
