import Link from 'next/link'
import CustomImage from '@/shared-components/custom-image'
import type { RelatedPost } from '@/types/common'
import type { storyGtmEvents } from '@/constants/gtm'

type Props = RelatedPost & {
  gtmClassName?: typeof storyGtmEvents.relatedArticle
}
export default function RelatedNewsCard({
  postName,
  link,
  heroImage,
  sectionColor,
  sectionName,
  gtmClassName,
}: Props) {
  return (
    <Link
      prefetch={false}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${gtmClassName || ''}`}
    >
      <figure className="flex max-w-[330px] flex-row gap-x-3 md:w-[280px] md:flex-col md:gap-y-2 lg:w-[240px]">
        <div className="relative h-[108px] w-40 shrink-0 overflow-hidden rounded md:h-[188px] md:w-full lg:h-[160px]">
          <CustomImage
            images={heroImage.resized}
            imagesWebP={heroImage.resizedWebp}
            alt={postName}
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

        <figcaption className="line-clamp-3 break-all text-sm font-bold leading-normal text-[#4A4A4A] md:line-clamp-2 md:text-lg md:font-normal lg:line-clamp-3">
          {postName}
        </figcaption>
      </figure>
    </Link>
  )
}
