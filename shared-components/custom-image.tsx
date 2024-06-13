'use client'
import Image from '@readr-media/react-image'
import type { ReactElement } from 'react'
import type { ResizedImage } from '@/types/common'

type Props = {
  images: ResizedImage | undefined
  imagesWebP: ResizedImage | undefined
  alt: string
  loadingImage: string
  defaultImage: string
}

export default function CustomImage({
  images,
  imagesWebP,
  alt,
  loadingImage,
  defaultImage,
}: Props): ReactElement {
  return (
    <Image
      images={images}
      alt={alt}
      imagesWebP={imagesWebP}
      loadingImage={loadingImage}
      defaultImage={defaultImage}
    />
  )
}
