import { fetchHeaderData } from './actions-general'

import Header from '@/shared-components/header'
import NewsletterSubscription from '@/shared-components/newsletter-subscription'
import Footer from '@/shared-components/footer'
import SectionDivider from './_components/divider'
import EditorChoiceSection from './_components/editor-choice/section'
import TopNewsSection from './_components/top-news/section'
import ShortsNewsSection from './_components/shorts/news-section'
import TopicSection from './_components/topic/section'
import ShortsDerivativeSection from './_components/shorts/derivative-section'
import LatestNewsSection from './_components/latest-news/section'
import Loading from './_components/loading'
import { Suspense } from 'react'
import PageLogger from '@/shared-components/page-logger'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import { MobileGptAd } from '@/shared-components/gpt-ad/mobile-gpt-ad'
import SportsSection from './_components/sports/section'
import LiveSection from './_components/live/section'
import TopAdSection from './_components/top-ad-section'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const headerData = await fetchHeaderData()

  return (
    <>
      <Suspense>
        <PageLogger />
      </Suspense>
      <Header />
      <div className="flex w-full max-w-screen-lg shrink-0 grow flex-col">
        <main className="flex w-full grow flex-col items-center justify-center">
          <TopAdSection />

          <SectionDivider customClasses="hidden md:block lg:hidden" />
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
          <DesktopGptAd
            slotKey="mirrordaily_home_PC_970x90_b1"
            customClasses="my-7"
          />
          <SectionDivider customClasses="lg:hidden" />
          {/* 直播區 */}
          <LiveSection />
          <SectionDivider />
          {/* 即時新聞/熱門新聞（10則） */}
          <TopNewsSection headerData={headerData} />
          <DesktopGptAd
            slotKey="mirrordaily_home_PC_970x90_b2"
            customClasses="mb-9"
          />
          <SectionDivider />
          <div className="block md:hidden">
            <MobileGptAd
              slotKey="mirrordaily_home_MW_300x250_b1"
              customClasses="mt-9 mx-auto"
            />
          </div>
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
          <div className="block md:hidden">
            <MobileGptAd
              slotKey="mirrordaily_home_MW_300x250_b2"
              customClasses="mt-9 mb-3 mx-auto"
            />
          </div>
          {/* Topic（4則）+ 天氣 */}
          <Suspense
            fallback={
              <div className="h-[80vh] w-full">
                <Loading />
              </div>
            }
          >
            <TopicSection />
          </Suspense>
          {/* 職棒、職籃 */}
          <Suspense
            fallback={
              <div className="h-[80vh] w-full">
                <Loading />
              </div>
            }
          >
            <SportsSection />
          </Suspense>
          <DesktopGptAd
            slotKey="mirrordaily_home_PC_970x90_b3"
            customClasses="mb-9"
          />
          <div className="block md:hidden">
            <MobileGptAd
              slotKey="mirrordaily_home_MW_300x250_b3"
              customClasses="mb-9 mt-2 mx-auto"
            />
          </div>
          <SectionDivider />
          {/* 短影音．投稿 */}
          <Suspense
            fallback={
              <div className="h-[80vh] w-full">
                <Loading />
              </div>
            }
          >
            <ShortsDerivativeSection />
          </Suspense>

          <div className="block md:hidden">
            <MobileGptAd
              slotKey="mirrordaily_home_MW_300x250_b4"
              customClasses="mb-9 mx-auto"
            />
          </div>
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
