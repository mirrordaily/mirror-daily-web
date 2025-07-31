'use client'

import useAdBlockDetector from '@/hooks/use-ad-block-detector'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import { MobileGptAd } from '@/shared-components/gpt-ad/mobile-gpt-ad'

type TopAdSectionProps = {
  isStagingOrProd: boolean
}

export default function TopAdSection({ isStagingOrProd }: TopAdSectionProps) {
  const { isAdBlockerActive } = useAdBlockDetector()

  if (isAdBlockerActive) return null // Don't render ads if ad blocker is active
  return isStagingOrProd ? (
    <>
      <div className="hidden min-h-[306px] lg:block">
        <DesktopGptAd
          slotKey="mirrordaily_home_PC_970x250_1"
          customClasses="mt-5 mb-9"
        />
      </div>
      <div className="block min-h-[286px] md:hidden">
        <MobileGptAd
          slotKey="mirrordaily_list_MW_336x280_HD"
          customClasses="my-9 mx-auto"
        />
      </div>
    </>
  ) : (
    <>
      <div className="hidden min-h-[306px] lg:flex lg:items-center">
        <DesktopGptAd
          slotKey="mirrordaily_home_PC_970x250_top"
          customClasses="mt-5 mb-9"
        />
      </div>
      <div className="block min-h-[286px] md:hidden">
        <MobileGptAd
          slotKey="mirrordaily_home_MW_300x250_top"
          customClasses="mb-9 mx-auto"
        />
      </div>
    </>
  )
}
