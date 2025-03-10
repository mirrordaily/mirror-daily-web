import FeaturedNewsCard from '@/shared-components/featured-news-card'

type Props = {
  title: string
  posts: Parameters<typeof FeaturedNewsCard>[0][]
}

export default function FeatureNewsList({ title, posts }: Props) {
  if (posts.length === 0) return null

  return (
    <section className="flex flex-col items-center gap-y-8 lg:gap-y-5">
      <h3 className="text-lg font-bold leading-normal text-[#674AB1]">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-y-7 md:grid-cols-2 md:gap-x-7 lg:grid-cols-1 lg:gap-y-5">
        {posts.map((item) => (
          <FeaturedNewsCard {...item} key={item.postSlug} />
        ))}
      </div>
    </section>
  )
}
