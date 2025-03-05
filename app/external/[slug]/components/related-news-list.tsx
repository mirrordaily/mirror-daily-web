import RelatedNewsCard from '@/app/story/_components/related-news-card'
import type { RelatedPost } from '@/types/common'

type Props = {
  posts: RelatedPost[]
}

export default function RelatedNewsList({ posts }: Props) {
  if (posts.length === 0) return null

  return (
    <section className="flex flex-col items-center gap-y-8 px-[22.5px] pb-[92px] pt-7 md:px-0 md:pb-0 md:pt-9 lg:gap-y-7">
      <h3 className="text-lg font-bold leading-normal text-[#674AB1]">
        相關新聞
      </h3>
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-y-12">
        {posts.map((item) => (
          <RelatedNewsCard {...item} key={item.title} />
        ))}
      </div>
    </section>
  )
}
