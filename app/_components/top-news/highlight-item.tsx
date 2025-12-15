'use client'
import type { ReactNode } from 'react'
import type { PickupItemInTopNewsSection } from '@/types/homepage'
import CustomImage from '@/shared-components/custom-image'
import ReactPlayer from 'react-player/lazy'
import type { TAB } from './section'
import { homepageGtmEvents } from '@/constants/gtm'

export const gtmClassNameMap = {
  Latest: {
    image: homepageGtmEvents.latestArticleImage,
    title: homepageGtmEvents.latestArticleTitle,
  },
  Hot: {
    image: homepageGtmEvents.popularArticleImage,
    title: homepageGtmEvents.popularArticleTitle,
  },
} as const

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
        <p className="mt-3 hidden text-sm font-normal leading-normal text-[#68666D] md:line-clamp-3 lg:text-base lg:font-bold">
          {postBrief}
        </p>
      )}
    </>
  )
}

type Props = PickupItemInTopNewsSection & {
  tab: keyof typeof TAB
}
export default function HighlightItem({
  heroImage,
  postName,
  postBrief,
  link,
  isVideoType,
  tab,
}: Props): ReactNode {
  if (isVideoType) {
    return (
      <div className="flex flex-col">
        <div
          className={`${homepageGtmEvents.liveStream} aspect-[330/220] w-full shrink-0 md:aspect-auto md:h-[208px] md:w-[312px] lg:h-[374px] lg:w-[560px]`}
        >
          <ReactPlayer
            url={link}
            width="100%"
            height="100%"
            muted={false}
            playing={false}
            playsinline={true}
            config={{
              file: {
                attributes: {
                  preload: 'none',
                },
              },
            }}
          />
        </div>
        <PostTitleAndBrief postName={postName} postBrief={postBrief} />
      </div>
    )
  }

  const gtm = gtmClassNameMap[tab]

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
