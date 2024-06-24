'use client'
import type { ReactNode } from 'react'
import CustomImage from '@/shared-components/custom-image'
import NextLink from 'next/link'
import { getPostPageUrl } from '@/utils/site-urls'
import type { LatestPost } from '@/types/homepage'

type Props = Pick<LatestPost, 'postName' | 'postSlug' | 'heroImage'>

export default function HighlightItem({
  heroImage,
  postName,
  postSlug,
}: Props): ReactNode {
  return (
    <NextLink
      className="group/highlight-item w-full shrink-0 md:w-[312px] lg:w-[560px]"
      href={getPostPageUrl(postSlug)}
      target="_blank"
    >
      <div className="aspect-[297/165] overflow-hidden rounded group-hover/highlight-item:*:scale-110 group-active/highlight-item:*:scale-110 md:aspect-auto md:h-[174px] lg:h-[311px]">
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
        />
      </div>
      <p className="mt-2 line-clamp-3 text-base font-medium leading-normal text-[#000928] group-hover/highlight-item:text-[#575D71] group-active/highlight-item:text-[#575D71] md:mt-[6px] md:line-clamp-2 md:text-sm md:font-bold lg:mt-2 lg:text-xl">
        {postName}
      </p>
    </NextLink>
  )
}
