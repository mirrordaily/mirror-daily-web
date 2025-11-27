import FeaturedNewsCard from '@/shared-components/featured-news-card'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import type { LatestPost } from '@/types/common'
import { storyGtmEvents } from '@/constants/gtm'

type Props = {
  posts: LatestPost[]
  shouldShowAd: boolean
}

export default function LatestNewsSection({ posts, shouldShowAd }: Props) {
  if (!posts.length) return null
  return (
    <section className="flex flex-col items-center gap-y-8 pl-12 pr-[47px] md:px-0 lg:gap-y-5">
      <h3 className="text-lg font-bold leading-normal text-[#674ab1]">
        最新新聞
      </h3>
      <div className="grid grid-cols-1 justify-items-center gap-y-7 md:grid-cols-2 md:gap-x-7 lg:grid-cols-1 lg:gap-y-5">
        {posts.map((item, i) => (
          <>
            <FeaturedNewsCard
              {...item}
              key={item.postId}
              gtmClassName={storyGtmEvents.latestArticle}
            />
            {i === 0 && shouldShowAd && (
              <DesktopGptAd
                mode="normal"
                slotKey="mirrordaily_article_PC_300x250_r1"
              />
            )}
          </>
        ))}
        {shouldShowAd && (
          <DesktopGptAd
            mode="normal"
            slotKey="mirrordaily_article_PC_300x600_r2"
          />
        )}
      </div>
    </section>
  )
}
