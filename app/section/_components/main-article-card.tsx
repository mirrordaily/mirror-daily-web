import Link from 'next/link'
import CustomImage from '@/shared-components/custom-image'
import type { Posts } from '@/types/posts'

type Props = {
  postItem: Posts[number] | undefined
  colors: { border: string; bg: string; color: string } | undefined
}

export default function MainArticleCard({ postItem, colors }: Props) {
  return (
    <Link
      href={`/story/${postItem?.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-[375px] flex-col gap-y-5 md:w-[670px] md:gap-y-[30px] lg:w-[740px] lg:gap-y-7"
    >
      <figure className="h-[208px] md:h-[375px] md:rounded lg:h-[412px]">
        <CustomImage
          images={postItem?.heroImage?.resized}
          imagesWebP={postItem?.heroImage?.resizedWebp}
          alt={postItem?.title ?? 'article image'}
          loadingImage={'/images-next/loading.gif'}
          defaultImage={'/images-next/default-og-img.png'}
        />
      </figure>
      <div className="flex flex-row justify-center gap-x-2 md:justify-start md:gap-x-3">
        <div className={`h-20 w-7 shrink-0 ${colors?.bg} md:h-12`} />
        <figcaption className="line-clamp-3 w-[294px] text-xl font-bold leading-[1.3] text-[#000928] md:line-clamp-2 md:w-[506px]">
          {postItem?.title}
        </figcaption>
      </div>
    </Link>
  )
}
