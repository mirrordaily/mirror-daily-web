/* eslint-disable filename-rules/match */
import { fetchPopularPost } from '@/app/actions-general'
import PopularNewsCard from './popular-news-card'
import Image404 from '../../public/images-next/404.svg'
import Image from 'next/image'

export default async function Custom404() {
  const articles = await fetchPopularPost(6)

  return (
    <main className="mb-[72px]">
      <hr className="mt-4 hidden w-[1128px] border border-[#000928] lg:block" />
      <div className="mt-20 flex flex-col items-center gap-y-[72px] md:mt-[92px] md:gap-y-[88px] lg:mt-[104px]">
        <div className="flex flex-col items-center gap-y-6">
          <Image alt="404圖片" src={Image404} width={204} height={92} />
          <p className="text-xl font-bold text-[#000928]">
            抱歉！找不到這個網址
          </p>
        </div>

        <section className="flex max-w-[240px] flex-col items-center gap-y-[19px] md:w-[588px] md:max-w-none md:gap-y-8">
          <h2 className="text-lg font-bold leading-normal text-[#119CC7]">
            熱門新聞
          </h2>
          <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-7">
            {articles &&
              articles.map((item) => (
                <PopularNewsCard {...item} key={item.postSlug} />
              ))}
          </div>
        </section>
      </div>
    </main>
  )
}
