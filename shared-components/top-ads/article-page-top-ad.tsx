'use client'

import useAdBlockDetector from '@/hooks/use-ad-block-detector'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import { MobileGptAd } from '@/shared-components/gpt-ad/mobile-gpt-ad'

export default function ArticlePageTopAd() {
  const { isAdBlockerActive } = useAdBlockDetector()

  if (isAdBlockerActive) return null
  return (
    <div id="gpt-top-leaderboard">
      {' '}
      <div className="hidden min-h-[306px] lg:flex lg:items-center">
        <DesktopGptAd
          mode="normal"
          slotKey="mirrordaily_article_PC_970x250_top"
          customClasses="mt-5 mb-9"
        />
      </div>
      <div className="block min-h-[286px] md:hidden">
        <MobileGptAd
          mode="normal"
          slotKey="mirrordaily_article_MW_300x250_top"
          customClasses="mb-9"
        />
      </div>
    </div>
  )
}
