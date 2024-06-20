'use client'
import Image from '@readr-media/react-image'
import type { ReactElement } from 'react'
import type { Posts } from '@/types/posts'

type Post = Posts[number]
type HeroImage = NonNullable<Post['heroImage']>
type ResizedImage = HeroImage['resized']
type ResizedWebp = HeroImage['resizedWebp']

type Props = {
  images: ResizedImage
  imagesWebP: ResizedWebp
  loadingImage: string
  defaultImage: string
  alt: string | undefined
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
