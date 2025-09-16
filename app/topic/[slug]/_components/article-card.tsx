'use client'

import Link from 'next/link'
import CustomImage from '@/shared-components/custom-image'
import { topicGtmEvents } from '@/constants/gtm'
import type { PostData } from '@/utils/data-process'
import NextImage from 'next/image'

type Props = Pick<PostData, 'title' | 'link' | 'textContent' | 'postMainImage'>

export default function ArticleCard({
  title,
  link,
  textContent,
  postMainImage,
}: Props) {
  return (
    <Link
      prefetch={false}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${topicGtmEvents.topicArticle} article-container`}
    >
      {typeof postMainImage === 'string' && (
        <figure className="image">
          <NextImage
            src={postMainImage}
            unoptimized
            fill
            alt={title}
            className="object-cover"
          />
        </figure>
      )}
      {typeof postMainImage === 'object' && (
        <figure className="image">
          <CustomImage
            images={postMainImage.resized}
            imagesWebP={postMainImage?.resizedWebp}
            alt={title}
          />
        </figure>
      )}
      <figcaption className="title">{title}</figcaption>
      <p className="brief">{textContent}</p>
    </Link>
  )
}
