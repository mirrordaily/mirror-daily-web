'use client'
import type { ReactNode } from 'react'
import type {
  ItemInTopNewsSection,
  PickupItemInTopNewsSection,
} from '@/types/homepage'
import CustomImage from '@/shared-components/custom-image'
import { homepageGtmEvents } from '@/constants/gtm'

const gtm = {
  title: homepageGtmEvents.popularArticleTitle,
  image: homepageGtmEvents.popularArticleImage,
}

// 標題與簡介
const PostTitleAndBrief = ({
  postName,
  postBrief,
  gtmTitleClass = '',
}: {
  postName: PickupItemInTopNewsSection['postName']
  postBrief?: PickupItemInTopNewsSection['postBrief']
  gtmTitleClass?: string
}) => {
  return (
    <>
      <p
        className={`mt-4 line-clamp-3 text-base font-medium leading-none text-[#000928] group-hover/highlight-item:text-[#575D71] group-active/highlight-item:text-[#575D71] md:mt-2 md:line-clamp-2 lg:mt-2 lg:text-xl lg:font-bold ${gtmTitleClass}`}
      >
        {postName}
      </p>
      {postBrief && (
        <p className="mt-3 line-clamp-3 text-sm font-normal leading-normal text-[#68666D]">
          {postBrief}
        </p>
      )}
    </>
  )
}

type Props = ItemInTopNewsSection
export default function HighlightItem({
  heroImage,
  postName,
  postBrief,
  link,
}: Props): ReactNode {
  return (
    <a
      className={
        'group/highlight-item w-full shrink-0 md:w-[312px] lg:w-[560px]'
      }
      href={link}
      target="_blank"
    >
      <div className="aspect-[330/220] overflow-hidden rounded group-hover/highlight-item:*:scale-110 group-active/highlight-item:*:scale-110 md:aspect-auto md:h-[208px] lg:h-[374px]">
        <CustomImage
          images={heroImage.resized}
          imagesWebP={heroImage.resizedWebp}
          alt="文章圖片"
          objectFit="cover"
          rwd={{
            mobile: '100%',
            tablet: '100%',
            default: '100%',
          }}
          className={gtm.image}
        />
      </div>
      <PostTitleAndBrief
        postName={postName}
        postBrief={postBrief}
        gtmTitleClass={gtm.title}
      />
    </a>
  )
}
