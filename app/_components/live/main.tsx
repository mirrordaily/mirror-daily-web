'use client'
import type { PickupItemInTopNewsSection } from '@/types/homepage'
import ReactPlayer from 'react-player'

export default function LiveSectionMain({ link }: PickupItemInTopNewsSection) {
  return (
    <div className="flex grow flex-col items-center">
      <div className="md:tablet-live-video aspect-[330/220] w-full shrink-0 grow">
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
      </div>
    </div>
  )
}
