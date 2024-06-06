import UiPopularNewsCard from './ui-popular-news-card'
import popularNews from '@/mocks/popular.json'
import type { ReactElement } from 'react'

export default function PopularNews(): ReactElement {
  return (
    <section className="md: hidden md:flex md:w-[588px] md:flex-col md:items-center md:gap-y-[31px] lg:w-[240px] lg:gap-y-[19px]">
      <h3 className="text-lg font-bold leading-normal text-mirror-500">
        熱門新聞
      </h3>
      <div className="grid md:grid-cols-2 md:gap-7 lg:grid-cols-1 lg:gap-y-5">
        {popularNews.map((news) => (
          <UiPopularNewsCard key={news.id} news={news} />
        ))}
      </div>
    </section>
  )
}
