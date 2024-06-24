import Link from 'next/link'
import CustomImage from '@/shared-components/custom-image'
import { type GetPostsBySectionSlugQuery } from '@/graphql/__generated__/graphql'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

type Post = NonNullable<GetPostsBySectionSlugQuery['posts']>[number]

type Props = {
  postItem: Post | undefined
  colors: { border: string; bg: string; color: string } | undefined
}

const dateFormatter = (date: string) => {
  dayjs.extend(utc)
  const utcDate = dayjs(date).utc().format('YYYY/MM/DD HH:mm:ss')
  return utcDate
}

export default function SecondaryArticleCard({ postItem, colors }: Props) {
  return (
    <Link
      href={`/story/${postItem?.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-row gap-x-3 md:gap-x-6 lg:gap-x-8"
    >
      <figure className="relative h-[88px] w-40 shrink-0 rounded md:h-[133px] md:w-60">
        <CustomImage
          images={postItem?.heroImage?.resized}
          imagesWebP={postItem?.heroImage?.resizedWebp}
          alt={postItem?.title ?? 'article image'}
          loadingImage={'/images/loading.gif'}
          defaultImage={'/images/default-og-img.png'}
        />
      </figure>
      <div className="leading-[1.3]">
        <p
          className={`mb-[5px] text-sm font-normal ${colors?.color} md:mb-[17px]`}
        >
          {dateFormatter(postItem?.createdAt)}
        </p>
        <figcaption className="line-clamp-3 text-sm font-bold text-[#4A4A4A] md:mb-[6px] md:line-clamp-2 md:text-lg">
          {postItem?.title}
        </figcaption>
        <p className="hidden text-sm font-normal text-[#4A4A4A] md:visible md:line-clamp-2">
          {postItem?.brief.blocks[0].text}
        </p>
      </div>
    </Link>
  )
}
