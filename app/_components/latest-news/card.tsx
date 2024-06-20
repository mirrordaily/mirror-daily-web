'use client'

import type { ReactNode } from 'react'
import HeroImage from './hero-image'
import NextLink from 'next/link'

type PropsOfHeroImage = Parameters<typeof HeroImage>[0]

type Props = {
  categoryName: string
  categoryColor: string
  postName: string
  postSlug: string
  heroImage: Pick<PropsOfHeroImage, 'resized' | 'resizedWebp'>
}

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
        className="mb-1 inline-block h-1 w-3"
        style={{ backgroundColor: categoryColor }}
      ></span>
      <p
        className="mb-[7px] h-6 text-base font-black leading-normal md:mb-[11px]"
        style={{ color: categoryColor }}
      >
        {categoryName}
      </p>
      <NextLink href={`/story/${postSlug}`} className="group/card">
        <HeroImage
          resized={heroImage.resized}
          resizedWebp={heroImage.resizedWebp}
          alt="最新文章首圖"
        />
        <p className="mt-2 line-clamp-2 h-[54px] text-ellipsis text-lg font-normal leading-normal text-[#000928] group-hover/card:text-[#575D71] group-active/card:text-[#575D71] md:mt-3 md:line-clamp-3 md:h-[81px]">
          {postName}
        </p>
      </NextLink>
    </div>
  )
}
