'use client'
import ReactImage from '@readr-media/react-image'
import type { ReactNode } from 'react'
import type { ResizedImage } from '@/types/common'
import { IMAGE_BREAKPOINT } from '@/constants/misc'

type Props = {
  resized?: Partial<ResizedImage>
  resizedWebp?: Partial<ResizedImage>
  alt: string
}

export default function HeroImage({
  resized,
  resizedWebp,
  alt,
}: Props): ReactNode {
  return (
    <div className="relative h-[182px] w-full overflow-hidden group-hover/card:*:scale-110 md:h-[134px]">
      <ReactImage
        alt={alt}
        images={resized}
        imagesWebP={resizedWebp}
        objectFit="cover"
        loadingImage={'/images/loading.gif'}
        defaultImage={'/images/default-og-img.png'}
        breakpoint={IMAGE_BREAKPOINT}
        rwd={{
          mobile: '100%',
          tablet: '100%',
          default: '100%',
        }}
      />
    </div>
  )
}
