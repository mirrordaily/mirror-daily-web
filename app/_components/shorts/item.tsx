'use client'

import { homepageGtmEvents } from '@/constants/gtm'
import useVideoViewLogger from '@/hooks/use-video-logger'
import type { Shorts } from '@/types/common'
import { useEffect, useState, useRef } from 'react'
import ReactPlayer from 'react-player/lazy'
import { SHORTS_TYPE } from '@/types/common'
import { useIntersectionObserver } from 'usehooks-ts'
import CustomImage from '@/shared-components/custom-image'

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
  const isMountedRef = useRef(true)

  const { sendVideoLog } = useVideoViewLogger({
    isActive,
    title,
    link,
    duration,
    playedSeconds,
  })

  const { isIntersecting, ref: itemRef } = useIntersectionObserver({
    threshold: 0,
    rootMargin: '0px 150px 0px 150px',
  })

  useEffect(() => {
    setIsClientSide(true)
    return () => {
      isMountedRef.current = false
    }
  }, [])

  return (
    <a className={`${gtmClassNameMap[type]} w-full select-none`} href={link}>
      <div ref={itemRef} className="relative h-[400px] w-full lg:h-[400px]">
        {poster && (
          <div className="absolute inset-0">
            <CustomImage
              images={{ original: poster }}
              alt={title}
              objectFit="cover"
            />
          </div>
        )}
        {isClientSide && isIntersecting && (
          <div className="absolute inset-0">
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
                if (!isMountedRef.current) return
                onPause()
                await sendVideoLog(100, true)
              }}
              onDuration={(duration) => {
                if (isMountedRef.current) setDuration(duration)
              }}
              onProgress={({ playedSeconds }) => {
                if (isMountedRef.current) setPlayedSeconds(playedSeconds)
              }}
            />
          </div>
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
