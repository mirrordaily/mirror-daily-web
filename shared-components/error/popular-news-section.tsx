import PopularNewsCard from './popular-news-card'
import type { PopularNews } from '@/types/common'

export default function PopularNewsSection({
  articles,
}: {
  articles: PopularNews[]
}) {
  return (
    <section className="flex max-w-[240px] flex-col items-center gap-y-[19px] md:w-[588px] md:max-w-none md:gap-y-8">
      <p className="text-lg font-bold leading-normal text-[#9a82da]">
        熱門新聞
      </p>
      <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-7">
        {articles &&
          articles.map((item) => (
            <PopularNewsCard {...item} key={item.postId} />
          ))}
      </div>
    </section>
  )
}
