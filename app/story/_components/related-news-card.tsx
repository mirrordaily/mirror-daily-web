import Link from 'next/link'
import CustomImage from '@/shared-components/custom-image'
import type { RelatedPost } from '@/types/story-page'

export default function RelatedNewsCard({
  title,
  link,
  postMainImage,
  publishedTime,
  sectionColor,
  sectionName,
}: RelatedPost) {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer">
      <figure className="flex max-w-[330px] flex-row gap-x-3 md:w-[280px] md:flex-col md:gap-y-2 lg:w-[240px]">
        <div className="relative h-[88px] w-40 shrink-0 overflow-hidden rounded md:h-[154px] md:w-full lg:h-[133px]">
          <CustomImage
            images={postMainImage.resized}
            imagesWebP={postMainImage.resizedWebp}
            alt={title}
          />
          <span
            className={`absolute bottom-2 left-2 rounded-lg px-1 py-0 text-xs font-bold leading-4 tracking-[0.5px] text-[#ffffff]`}
            style={{
              backgroundColor: sectionColor,
            }}
          >
            {sectionName}
          </span>
        </div>

        <figcaption className="leading-normal">
          <time
            style={{ color: sectionColor }}
            className="mb-[5px] inline-block font-normal md:hidden"
          >
            {publishedTime}
          </time>
          <p className="line-clamp-3 text-sm font-bold text-[#4A4A4A] md:line-clamp-2 md:text-lg md:font-normal lg:line-clamp-3">
            {title}
          </p>
        </figcaption>
      </figure>
    </Link>
  )
}
