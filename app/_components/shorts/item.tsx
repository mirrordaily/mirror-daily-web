'use client'

import type { Shorts } from '@/types/homepage'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'

type Props = Shorts & {
  isActive: boolean
  customColor: string
}

export default function ShortsItem({
  fileUrl,
  poster,
  title,
  isActive,
  customColor,
}: Props) {
  const [playing, setPlaying] = useState(isActive)
  const [isClientSide, setIsClientSide] = useState(false)

  useEffect(() => {
    setPlaying(isActive)
  }, [isActive])

  useEffect(() => {
    setIsClientSide(true)
  }, [])

  return (
    <div className="w-full select-none">
      <div className="relative h-[480px] w-full lg:h-[566px]">
        {isClientSide && (
          <ReactPlayer
            url={fileUrl}
            width="100%"
            height="100%"
            controls={true}
            muted={true}
            playing={playing}
            config={{
              file: {
                attributes: {
                  poster,
                },
              },
            }}
            onPause={() => setPlaying(false)}
          />
        )}
        <div
          className={`absolute inset-0 ${playing ? 'hidden' : ''}`}
          onClick={() => setPlaying(!playing)}
        />
      </div>
      <p className="mt-2 line-clamp-2 text-base font-medium leading-normal lg:text-xl lg:font-bold">
        <span
          className="inline-block size-[15px] align-middle lg:size-5"
          style={{ backgroundColor: customColor }}
        />{' '}
        {title}
      </p>
    </div>
  )
}
