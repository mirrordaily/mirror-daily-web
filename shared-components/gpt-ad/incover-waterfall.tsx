'use client'

import { useState } from 'react'
import FullScreenAd from './full-screen-ad'
import { NonDesktopGptAd } from './non-desktop-gpt-ad'

export default function IncoverWaterfall() {
  const [showFallback, setShowFallback] = useState(false)

  return (
    <>
      <FullScreenAd
        slotKey="homepage_mw"
        onEmpty={() => setShowFallback(true)}
      />
      {showFallback && (
        <NonDesktopGptAd
          mode="normal"
          slotKey="mirrordaily_home_MW_1x1_incover_AD2"
          customClasses="!w-px !min-h-px overflow-visible"
        />
      )}
    </>
  )
}
