import UiPopularNewsCard from './ui-popular-news-card'
import { URL_STATIC_POPULAR_NEWS } from '@/constants/config'
import type { PopularNews } from '@/types/common'

async function getPopularNews(): Promise<PopularNews[] | undefined> {
  try {
    const res = await fetch(URL_STATIC_POPULAR_NEWS, {
      next: { revalidate: 300 },
    })
    const newsItem: PopularNews[] = await res.json()
    return newsItem.slice(0, 10)
  } catch (err) {
    console.error(err)
    // TODO: send error log
    return
  }
}

export default async function PopularNewsSection(): Promise<JSX.Element> {
  const categoryColors = {
    會員專區: 'bg-[#FF800A]',
    財經理財: 'bg-[#C0CB46]',
    時事: 'bg-[#FF69BA]',
    人物: 'bg-[#00C0DA]',
    汽車鐘錶: 'bg-[#C668F2]',
  }

  const articles = await getPopularNews()

  return (
    <section className="hidden md:flex md:w-[588px] md:flex-col md:items-center md:gap-y-[31px] lg:w-[240px] lg:gap-y-[19px]">
      <div className="text-lg font-bold leading-normal text-mirror-500">
        熱門新聞
      </div>
      <div className="grid md:grid-cols-2 md:gap-7 lg:grid-cols-1 lg:gap-y-5">
        {articles &&
          articles.map((item) => (
            <UiPopularNewsCard
              news={item}
              key={item.id}
              slug={item.slug}
              categoryColors={categoryColors}
            />
          ))}
      </div>
    </section>
  )
}
