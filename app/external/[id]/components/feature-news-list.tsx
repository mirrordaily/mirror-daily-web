import FeaturedNewsCard from '@/shared-components/featured-news-card'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'

type Props = {
  title: string
  posts: Parameters<typeof FeaturedNewsCard>[0][]
  type?: 'latest' | 'popular'
}

export default function FeatureNewsList({ title, posts }: Props) {
  if (!posts.length) return null

  return (
    <section className="flex flex-col items-center gap-y-8 lg:gap-y-5">
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
