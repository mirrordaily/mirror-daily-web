/* eslint-disable filename-rules/match */
import { fetchPopularPost } from '@/app/actions-general'
import Image404 from '../../public/images-next/404.svg'
import PopularNewsSection from './popular-news-section'
import ErrorMessage from './error-massage'

export default async function Custom404() {
  const popularPosts = await fetchPopularPost(6)

  return (
    <main className="mb-[72px]">
      <hr className="mt-4 hidden w-[1128px] border border-[#000928] lg:block" />
      <div className="mt-20 flex flex-col items-center gap-y-[72px] md:mt-[92px] md:gap-y-[88px] lg:mt-[104px]">
        <ErrorMessage
          src={Image404}
          alt="404圖片"
          width={204}
          height={92}
          text="抱歉！找不到這個網址"
          color="#000928"
        />
        <PopularNewsSection articles={popularPosts} />
      </div>
    </main>
  )
}
