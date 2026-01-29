import type { LatestPost, PopularNews } from '@/types/common'
import LatestNewsSection from './latest-news-section'
import PopularNewsSection from './popular-news-section'

type Props = {
  latestPosts: LatestPost[]
  popularPosts: PopularNews[]
  shouldShowAd: boolean
  className?: string
}

export default function StorySidebar({
  latestPosts,
  popularPosts,
  shouldShowAd,
  className,
}: Props) {
  return (
    <div
      className={`flex flex-col items-center gap-y-[38px] md:gap-y-12 lg:min-w-[300px] ${className}`}
    >
      <LatestNewsSection posts={latestPosts} shouldShowAd={shouldShowAd} />
      <PopularNewsSection posts={popularPosts} shouldShowAd={shouldShowAd} />
    </div>
  )
}
