import Link from 'next/link'
import CustomImage from '@/shared-components/custom-image'
import type { PostData } from '@/utils/data-process'
import NextImage from 'next/image'
import type { sectionGtmEvents, categoryGtmEvents } from '@/constants/gtm'

type Props = {
  postItem: PostData
  color: string
  gtm: typeof sectionGtmEvents | typeof categoryGtmEvents
}

export default function MainArticleCard({ postItem, color, gtm }: Props) {
  const { title, postMainImage } = postItem

  return (
    <Link
      prefetch={false}
      href={postItem.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${gtm.article} flex w-full flex-col gap-y-5 md:gap-y-[30px] lg:gap-y-7`}
    >
      <figure
        className={`${gtm.firstArticleImg} relative aspect-[375/250] w-full overflow-hidden md:h-[446px] md:rounded lg:h-[492px]`}
      >
        {/* external post */}
        {typeof postMainImage === 'string' && (
          <NextImage
            src={postMainImage}
            unoptimized
            fill
            alt={title}
            className="object-cover"
          />
        )}
        {/* story post */}
        {typeof postMainImage === 'object' && (
          <CustomImage
            images={postMainImage.resized}
            imagesWebP={postMainImage?.resizedWebp}
            alt={title}
          />
        )}
      </figure>
      <div className="flex w-full flex-row gap-x-2 pl-[23px] pr-[22px] md:gap-x-3 md:px-0">
        <div
          style={{ backgroundColor: color }}
          className={`h-20 w-7 shrink-0 md:h-12`}
        />
        <figcaption
          className={`${gtm.firstArticleTitle} line-clamp-3 max-w-[294px] text-xl font-bold leading-[1.3] text-[#000928] md:line-clamp-2 md:max-w-[506px]`}
        >
          {title}
        </figcaption>
      </div>
    </Link>
  )
}
