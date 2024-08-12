import { fetchPopularPost } from '@/app/actions-general'
import ErrorAndNewsSection from './error-and-news-section'
import PopularNewsSection from './popular-news-section'
import ErrorMessage from './error-massage'
import Image404 from '../../public/images-next/404.svg'
import Image from 'next/image'

export default async function Custom404() {
  const popularPosts = await fetchPopularPost(6)

  return (
    <main className="mb-[72px]">
      <ErrorAndNewsSection>
        <ErrorMessage text="抱歉！找不到這個網址" color="#000928">
          <Image alt="404圖片" src={Image404} width={204} height={92} />
        </ErrorMessage>
        <PopularNewsSection articles={popularPosts} />
      </ErrorAndNewsSection>
    </main>
  )
}
