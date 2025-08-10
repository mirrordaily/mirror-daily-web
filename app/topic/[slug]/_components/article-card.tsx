'use client'

import Link from 'next/link'
import CustomImage from '@/shared-components/custom-image'
import type { TopicPostData } from '@/types/topic'
import { topicGtmEvents } from '@/constants/gtm'

export default function ArticleCard({
  title,
  link,
  textContent,
  postMainImage,
}: TopicPostData) {
  return (
    <Link
      prefetch={false}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${topicGtmEvents.topicArticle} article-container`}
    >
      <figure className="image">
        <CustomImage
          images={postMainImage.resized}
          imagesWebP={postMainImage.resizedWebp}
          alt={title}
        />
      </figure>
      <figcaption className="title">{title}</figcaption>
      <p className="brief">{textContent}</p>
    </Link>
  )
}
