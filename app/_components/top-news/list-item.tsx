import type { LatestPost } from '@/types/homepage'
import dayjs from 'dayjs'
import NextLink from 'next/link'
import { getPostPageUrl } from '@/utils/site-urls'

type Props = Pick<
  LatestPost,
  'categoryColor' | 'categoryName' | 'postName' | 'postSlug' | 'publishedDate'
>

export default function ListItem({
  categoryColor,
  categoryName,
  publishedDate,
  postSlug,
  postName,
}: Props) {
  const timeStr = dayjs(publishedDate).format('YYYY/MM/DD HH:mm:ss')

  return (
    <div className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-[#CCCED4] [&:not(:last-child)]:pb-[10px] md:[&:not(:last-child)]:pb-2">
      <div className={`flex items-center`}>
        <span
          style={{ backgroundColor: categoryColor || '#FF5A36' }}
          className="inline-block h-5 rounded-xl px-2 py-1 text-[10px] font-bold leading-[12px] tracking-[0.5px] text-[#F6F6FB]"
        >
          {categoryName || 'Video'}
        </span>
        <time
          style={{ color: categoryColor }}
          className="ml-2 text-sm font-light leading-normal tracking-[0.5px] md:ml-3"
        >
          {timeStr}
        </time>
      </div>
      <NextLink
        href={getPostPageUrl(postSlug)}
        target="_blank"
        className="mt-[6px] line-clamp-2 h-[42px] text-base font-medium leading-[21px] text-[#575D71] md:h-10 md:text-sm md:font-normal md:leading-[20px] lg:line-clamp-1 lg:h-auto lg:text-base lg:font-medium lg:leading-normal"
      >
        {postName}
      </NextLink>
    </div>
  )
}
