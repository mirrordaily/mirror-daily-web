import type { TopicPost } from '@/types/homepage'
import CustomImage from '@/shared-components/custom-image'
import NextLink from 'next/link'

type Props = TopicPost & { isFirst?: boolean }

export default function TopicItem({
  postName,
  link,
  topicLink,
  heroImage,
  isFirst = false,
}: Props) {
  return (
    <div
      className={`group/card relative flex w-full flex-col gap-y-2 ${
        isFirst ? '' : 'md:w-[204px] lg:w-[232px]'
      } `}
    >
      <NextLink
        href={topicLink}
        className={`relative aspect-[329/182] w-full overflow-hidden rounded ${
          isFirst
            ? 'md:aspect-[680/377] lg:aspect-[760/422]'
            : 'md:aspect-[204/113] lg:aspect-[232/128]'
        } `}
      >
        <CustomImage
          images={heroImage.resized}
          imagesWebP={heroImage.resizedWebp}
          objectFit="cover"
          alt="topic 首圖"
          className="group-hover/card:scale-110 group-active/card:scale-110"
        />
        {isFirst && (
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_63.26%,rgba(0,0,0,0.50)_100%)]" />
        )}
      </NextLink>
      <NextLink
        href={link}
        className={`line-clamp-2 text-lg font-normal leading-normal text-[#000928] group-hover/card:text-[#575D71] group-active/card:text-[#575D71] ${
          isFirst
            ? 'md:absolute md:bottom-[14px] md:left-[21px] md:w-[471px] md:text-xl md:text-white md:group-hover/card:text-white md:group-hover/card:underline md:group-active/card:text-white md:group-active/card:underline lg:left-6 lg:w-[526px]'
            : 'md:text-sm md:leading-[24px] lg:line-clamp-3 lg:text-lg lg:leading-normal'
        }`}
      >
        {postName}
      </NextLink>
    </div>
  )
}
