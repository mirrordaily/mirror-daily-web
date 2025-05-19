'use client'
import type { PickupItemInTopNewsSection } from '@/types/homepage'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'

export default function LiveSectionMain({ link }: PickupItemInTopNewsSection) {
  const [isClientSide, setIsClientSide] = useState(false)

  useEffect(() => {
    setIsClientSide(true)
  }, [])

  return (
    <div className="flex grow flex-col items-center lg:size-full lg:grow-0 lg:items-start">
      <div className="md:tablet-live-video aspect-[330/220] w-full shrink-0 grow lg:aspect-video lg:w-full">
        {isClientSide && (
          <ReactPlayer
            url={link}
            width="100%"
            height="100%"
            muted={false}
            playing={false}
            playsinline={true}
            config={{
              file: {
                attributes: {
                  preload: 'none',
                },
              },
            }}
          />
        )}
      </div>
    </div>
  )
}
