import Link from 'next/link'
import CustomImage from './custom-image'
import type { PopularNews } from '@/types/common'
import type { ReactElement } from 'react'

export default function UiPopularNewsCard({
  categoryName,
  categoryColor,
  postName,
  link,
  heroImage,
}: PopularNews): ReactElement {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col md:gap-y-2 lg:gap-y-3"
    >
      <figure className="relative overflow-hidden rounded md:h-[154px] lg:h-[133px]">
        <CustomImage
          images={heroImage?.resized}
          imagesWebP={heroImage?.resizedWebp}
          alt={postName}
        />
        <div
          className={`absolute bottom-2 left-2 rounded-lg px-1 py-0 text-xs font-bold leading-4 tracking-[0.5px] text-[#ffffff]`}
          style={{
            backgroundColor: categoryColor || '#1C7CED',
          }}
        >
          {categoryName}
        </div>
      </figure>
      <figcaption className="text-lg font-normal text-[#000928] md:line-clamp-2 lg:line-clamp-3">
        {postName}
      </figcaption>
    </Link>
  )
}
