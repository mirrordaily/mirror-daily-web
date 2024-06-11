import Link from 'next/link'
import CustomImage from './custom-image'
import type { HeroImage } from '@/types/common'
import type { ReactElement } from 'react'

type Post = {
  id: string
  title: string
  heroImage: HeroImage | null
}

type Prop = {
  news: Post
}

export default function UiPopularNewsCard({ news }: Prop): ReactElement {
  /* TODO: 
  1. correct news href
  2. add category tag
  3. update default and loading images
  4. confirm the line height
   */
  return (
    <Link
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col md:gap-y-2 lg:w-60 lg:gap-y-3"
    >
      <figure className="md:h-[154px] lg:h-[133px]">
        <CustomImage
          images={news?.heroImage?.resized}
          imagesWebP={news?.heroImage?.resizedWebp}
          alt={news.title}
          loadingImage={'/images/loading.gif'}
          defaultImage={'/images/default-og-img.png'}
        />
      </figure>
      <figcaption className="text-lg font-normal text-[#000928] md:line-clamp-2 lg:line-clamp-3">
        {news.title}
      </figcaption>
    </Link>
  )
}
