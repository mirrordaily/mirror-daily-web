'use client'
import Image from '@readr-media/react-image'
import type { ReactElement } from 'react'
import { IMAGE_PATH, LOADING_ANIMATION_PATH } from '@/constants/default-path'
import { IMAGE_BREAKPOINT } from '@/constants/misc'

type Props = Parameters<typeof Image>[0]

export default function CustomImage(props: Props): ReactElement {
  const {
    alt = '',
    defaultImage = IMAGE_PATH,
    loadingImage = LOADING_ANIMATION_PATH,
  } = props

  return (
    <Image
      {...props}
      alt={alt}
      defaultImage={defaultImage}
      loadingImage={loadingImage}
      breakpoint={IMAGE_BREAKPOINT}
    />
  )
}
