import { fetchSectionsAndCategories } from './actions-general'

import Header from '@/shared-components/header'
import NewsletterSubscription from '@/shared-components/newsletter-subscription'
import Footer from '@/shared-components/footer'
import SectionDivider from './_components/divider'
import EditorChoiceSection from './_components/editor-choice/section'
import TopNewsSection from './_components/top-news/section'
import ShortsNewsSection from './_components/shorts/news-section'
import TopicAndGameSection from './_components/topic-and-game/section'
import ShortsDerivativeSection from './_components/shorts/derivative-section'
import LatestNewsSection from './_components/latest-news/section'
import Loading from './_components/loading'
import { Suspense } from 'react'

// add segment config to prevent data fetch during build
export const dynamic = 'force-dynamic'

export default async function Home() {
  const sectionData = await fetchSectionsAndCategories()

  return (
    <>
      <Header />
      <div className="flex w-full max-w-screen-lg shrink-0 grow flex-col">
        <main className="flex w-full grow flex-col items-center justify-center">
          <SectionDivider customClasses="hidden md:block" />
          {/* 編輯精選 */}
          <Suspense
            fallback={
              <div className="h-[80vh] w-full">
                <Loading />
              </div>
            }
          >
            <EditorChoiceSection />
          </Suspense>
          <SectionDivider />
          {/* 即時新聞/熱門新聞（10則） */}
          <TopNewsSection sectionData={sectionData} />
          <SectionDivider />
          {/* 短影音新聞 */}
          <Suspense
            fallback={
              <div className="h-[80vh] w-full">
                <Loading />
              </div>
            }
          >
            <ShortsNewsSection />
          </Suspense>
          <SectionDivider />
          {/* Topic（4則）＋遊戲區 */}
          <Suspense
            fallback={
              <div className="h-[80vh] w-full">
                <Loading />
              </div>
            }
          >
            <TopicAndGameSection />
          </Suspense>
          <SectionDivider />
          {/* 短影音．二創 */}
          <Suspense
            fallback={
              <div className="h-[80vh] w-full">
                <Loading />
              </div>
            }
          >
            <ShortsDerivativeSection />
          </Suspense>
          <SectionDivider />
          {/* 最新新聞 */}
          <LatestNewsSection />
        </main>
      </div>
      <NewsletterSubscription />
      <Footer />
    </>
  )
}
