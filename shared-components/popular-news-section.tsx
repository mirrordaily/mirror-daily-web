import FeaturedNewsCard from './featured-news-card'
import { fetchPopularPost } from '@/app/actions-general'
import { DesktopGptAd } from './gpt-ad/desktop-gpt-ad'

type Props = {
  slug?: string
}
export default async function PopularNewsSection({
  slug,
}: Props): Promise<JSX.Element | null> {
  const articles = await fetchPopularPost()
  if (!articles.length) return null

  return (
    <section className="hidden md:flex md:w-[588px] md:flex-col md:items-center md:gap-y-[31px] lg:w-[240px] lg:gap-y-[19px]">
      <p className="text-lg font-bold leading-normal text-[#674ab1]">
        熱門新聞
      </p>
      <div className="grid justify-items-center md:grid-cols-2 md:gap-7 lg:grid-cols-1 lg:gap-y-5">
        {articles &&
          articles.map((item, i) => (
            <>
              <FeaturedNewsCard {...item} key={item.postId} />
              {i === 0 && (
                <DesktopGptAd
                  slotKey="mirrordaily_section_PC_300x250_r1"
                  pageKey={slug}
                />
              )}
              {i === 2 && (
                <DesktopGptAd
                  slotKey="mirrordaily_section_PC_300x600_r2"
                  pageKey={slug}
                />
              )}
              {i === 5 && (
                <DesktopGptAd
                  slotKey="mirrordaily_section_PC_300x600_r3"
                  pageKey={slug}
                />
              )}
            </>
          ))}
      </div>
    </section>
  )
}
