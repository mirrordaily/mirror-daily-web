'use client'

import useAdBlockDetector from '@/hooks/use-ad-block-detector'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import { NonDesktopGptAd } from '../gpt-ad/non-desktop-gpt-ad'

export default function ArticlePageTopAd() {
  const { isAdBlockerActive } = useAdBlockDetector()

  if (isAdBlockerActive) return null
  return (
    <div id="gpt-top-leaderboard mb-4 mt-5">
      <div className="hidden min-h-[250px] lg:flex lg:items-center">
        <DesktopGptAd
          mode="normal"
          slotKey="mirrordaily_article_PC_970x250_top"
        />
      </div>
      <div className="block min-h-[250px] md:hidden">
        <NonDesktopGptAd
          mode="normal"
          slotKey="mirrordaily_article_MW_300x250_top"
        />
      </div>
    </div>
  )
}
