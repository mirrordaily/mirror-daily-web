'use client'

import useAdBlockDetector from '@/hooks/use-ad-block-detector'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import { NonDesktopGptAd } from '@/shared-components/gpt-ad/non-desktop-gpt-ad'

export default function TopAdSection() {
  const { isAdBlockerActive } = useAdBlockDetector()

  if (isAdBlockerActive) return null
  return (
    <div id="gpt-top-leaderboard">
      <div className="mb-4 mt-5 hidden min-h-[306px] lg:flex lg:items-center">
        <DesktopGptAd mode="normal" slotKey="mirrordaily_home_PC_970x250_top" />
      </div>
      <div className="block min-h-[286px] lg:hidden">
        <NonDesktopGptAd
          mode="normal"
          slotKey="mirrordaily_home_MW_300x250_top"
          customClasses="mx-auto"
        />
      </div>
    </div>
  )
}
