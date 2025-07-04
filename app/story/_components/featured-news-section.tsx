import FeaturedNewsCard from '@/shared-components/featured-news-card'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import type { PopularNews } from '@/types/common'
import type { LatestPost } from '@/types/common'
type Props<T> = {
  title: string
  posts: T
  type?: 'latest' | 'popular'
}

export default function FeaturedNewsSection<
  T extends PopularNews[] | LatestPost[],
>({ title, posts, type }: Props<T>) {
  if (!posts.length) return null
  return (
    <section className="flex flex-col items-center gap-y-8 pl-12 pr-[47px] md:px-0 lg:gap-y-5">
      <h3 className="text-lg font-bold leading-normal text-[#674ab1]">
        {title}
      </h3>
      <div className="grid grid-cols-1 justify-items-center gap-y-7 md:grid-cols-2 md:gap-x-7 lg:grid-cols-1 lg:gap-y-5">
        {posts.map((item, i) => (
          <>
            <FeaturedNewsCard {...item} key={item.postId} />
            {type === 'latest' && i === 0 && (
              <DesktopGptAd slotKey="mirrordaily_article_PC_300x250_r1" />
            )}
          </>
        ))}
      </div>
    </section>
  )
}
