'use client'

import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'

type Props = {
  fileUrl: string
  poster: string
}

export default function LeadingVideo({ fileUrl, poster }: Props) {
  const [isClientSide, setIsClientSide] = useState(false)

  useEffect(() => {
    setIsClientSide(true)
  }, [])

  return (
    <div className="leading-video">
      {isClientSide && (
        <ReactPlayer
          url={fileUrl}
          width="100%"
          height="100%"
          controls={true}
          loop={false}
          playing={false}
          playsinline={true}
          config={{
            file: {
              attributes: {
                poster,
              },
            },
          }}
        />
      )}
    </div>
  )
}
