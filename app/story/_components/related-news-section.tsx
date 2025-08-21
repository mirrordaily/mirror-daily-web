import RelatedNewsCard from '@/shared-components/article/related-news-card'
import { storyGtmEvents } from '@/constants/gtm'

type Props = {
  posts: Parameters<typeof RelatedNewsCard>[0][]
}
export default function RelatedNewsSection({ posts }: Props) {
  if (!posts.length) return null
  return (
    <section className="mt-7 flex flex-col items-center gap-y-8 pl-[23px] pr-[22px] md:px-0 lg:items-start lg:gap-y-7">
      <h3 className="text-lg font-bold leading-normal text-[#674ab1]">
        延伸閱讀
      </h3>
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-y-12">
        {posts.map((item) => (
          <RelatedNewsCard
            {...item}
            key={item.postId}
            gtmClassName={storyGtmEvents.relatedArticle}
          />
        ))}
      </div>
    </section>
  )
}
