'use client'

import type { Shorts } from '@/types/common'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import NextLink from 'next/link'

type Props = Shorts & {
  isActive: boolean
  customColor: string
  onPlay: () => void
  onPause: () => void
}

export default function ShortsItem({
  fileUrl,
  poster,
  title,
  link,
  isActive,
  customColor,
  onPlay,
  onPause,
}: Props) {
  const [isClientSide, setIsClientSide] = useState(false)

  useEffect(() => {
    setIsClientSide(true)
  }, [])

  return (
    <NextLink className="w-full select-none" href={link}>
      <div className="relative h-[480px] w-full lg:h-[566px]">
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
                },
              },
            }}
            onPause={() => onPause()}
            onEnded={() => onPause()}
          />
        )}
        <div
          className="absolute inset-0"
          onMouseEnter={() => onPlay()}
          onMouseLeave={() => onPause()}
        />
      </div>
      <p className="mt-2 line-clamp-2 text-base font-medium leading-normal lg:text-xl lg:font-bold">
        <span
          className="inline-block size-[15px] align-middle lg:size-5"
          style={{ backgroundColor: customColor }}
        />{' '}
        {title}
      </p>
    </NextLink>
  )
}
