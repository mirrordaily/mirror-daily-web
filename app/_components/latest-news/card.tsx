'use client'

import type { ReactNode } from 'react'
import CustomImage from '@/shared-components/custom-image'
import NextLink from 'next/link'
import { getPostPageUrl } from '@/utils/site-urls'
import type { LatestPost } from '@/types/homepage'

type Props = Pick<
  LatestPost,
  'categoryName' | 'categoryColor' | 'postName' | 'postSlug' | 'heroImage'
>

export default function LatestNewsCard({
  categoryName,
  categoryColor,
  postName,
  postSlug,
  heroImage,
}: Props): ReactNode {
  return (
    <div className="flex w-full max-w-[329px] flex-col md:w-[200px] [&:nth-last-child(2)]:mr-auto">
      <span
        className={`mb-1 inline-block h-1 w-3 ${!categoryName ? 'invisible' : ''}`}
        style={{ backgroundColor: categoryColor }}
      ></span>
      <p
        className="mb-[7px] h-6 text-base font-black leading-normal md:mb-[11px]"
        style={{ color: categoryColor }}
      >
        {categoryName}
      </p>
      <NextLink
        href={getPostPageUrl(postSlug)}
        target="_blank"
        className="group/card"
      >
        <div className="relative aspect-[329/182] w-full overflow-hidden rounded group-hover/card:*:scale-110 group-active/card:*:scale-110 md:aspect-auto md:h-[134px]">
          <CustomImage
            images={heroImage.resized}
            imagesWebP={heroImage.resizedWebp}
            objectFit="cover"
            alt="最新文章首圖"
            rwd={{
              mobile: '100%',
              tablet: '100%',
              default: '100%',
            }}
          />
        </div>
        <p className="mt-2 line-clamp-2 h-[54px] text-ellipsis text-lg font-normal leading-normal text-[#000928] group-hover/card:text-[#575D71] group-active/card:text-[#575D71] md:mt-3 md:line-clamp-3 md:h-[81px]">
          {postName}
        </p>
      </NextLink>
    </div>
  )
}
