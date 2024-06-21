'use client'
import ReactImage from '@readr-media/react-image'
import type { ReactNode } from 'react'
import type { ResizedImage } from '@/types/common'
import { IMAGE_BREAKPOINT } from '@/constants/misc'
import { IMAGE_PATH, LOADING_ANIMATION_PATH } from '@/constants/default-path'

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
    <div className="relative h-[182px] w-full overflow-hidden group-hover/card:*:scale-110 group-active/card:*:scale-110 md:h-[134px]">
      <ReactImage
        alt={alt}
        images={resized}
        imagesWebP={resizedWebp}
        objectFit="cover"
        loadingImage={LOADING_ANIMATION_PATH}
        defaultImage={IMAGE_PATH}
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
