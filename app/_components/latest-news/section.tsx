import type { LatestPost } from '@/types/common'
import PostList from './post-list'
import { fetchLatestPost } from '@/app/actions-general'

type Props = {
  initialList: LatestPost[]
}
export default async function LatestNewsSection({ initialList }: Props) {
  return (
    <section className="section-in-homepage mt-9">
      <p className="mb-9 flex justify-center text-lg font-bold leading-normal text-[#896FCC] md:mb-[26px] md:justify-start lg:mb-[29px] lg:text-xl">
        最新新聞
      </p>
      <div className="flex w-full flex-col items-center justify-center gap-y-[18px] pb-8 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-7 md:pb-[27px] lg:gap-9 lg:pb-[52px] [&>*:last-child]:flex [&>*:last-child]:w-full [&>*:last-child]:justify-center">
        <PostList initialList={initialList} fetchLatestPost={fetchLatestPost} />
      </div>
    </section>
  )
}
