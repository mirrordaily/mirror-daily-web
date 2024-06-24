import Link from 'next/link'
import CustomImage from './custom-image'
import type { PopularNews } from '@/types/common'
import type { ReactElement } from 'react'

type Props = {
  news: PopularNews
  slug: string
  categoryColors: { [key: string]: string }
}

export default function UiPopularNewsCard({
  news,
  slug,
  categoryColors,
}: Props): ReactElement {
  /* TODO: 
  1. correct news href
  2. add category tag
  3. update default and loading images
  4. confirm the line height
   */
  const categoryName = news.sectionsInInputOrder[0]?.name || '未知'
  const categoryColor = categoryColors[categoryName] || 'bg-[#1C7CED]'

  return (
    <Link
      href={`/story/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col md:gap-y-2 lg:gap-y-3"
    >
      <figure className="relative md:h-[154px] lg:h-[133px]">
        <CustomImage
          images={news?.heroImage?.resized}
          imagesWebP={news?.heroImage?.resizedWebp}
          alt={news.title}
        />
        <div
          className={`absolute bottom-2 left-2 rounded-lg px-1 py-0 text-[10px] font-bold leading-4 tracking-[0.5px] ${categoryColor} text-[#ffffff]`}
        >
          {categoryName}
        </div>
      </figure>
      <figcaption className="text-lg font-normal text-[#000928] md:line-clamp-2 lg:line-clamp-3">
        {news.title}
      </figcaption>
    </Link>
  )
}
