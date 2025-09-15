'use client'

import { useEffect, useRef } from 'react'
import { ENV } from '@/constants/config'
import { ENVIRONMENT } from '@/constants/misc'
import { gptStickyAdSlots } from '@/constants/ad'

export type StickyAdSlotKey = keyof typeof gptStickyAdSlots

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    googletag?: any
  }
}

const isDebugMode = ENV === ENVIRONMENT.LOCAL || ENV === ENVIRONMENT.DEVELOPMENT

export default function StickyGptAd({ slotKey }: { slotKey: StickyAdSlotKey }) {
  const isInitialed = useRef(false)
  const { slotId, collapseEmptyDivs } = gptStickyAdSlots[slotKey]

  useEffect(() => {
    if (typeof window === 'undefined' || isInitialed.current) return

    window.googletag = window.googletag || { cmd: [] }

    window.googletag.cmd.push(function () {
      if (isDebugMode) {
        console.log(`[GPT-STICKY-AD DEBUG] Registering ad slot: ${slotId}`)
      }

      window.googletag
        .defineOutOfPageSlot(slotId, 'out-of-page-ad')
        .addService(window.googletag.pubads())

      if (collapseEmptyDivs && !isDebugMode) {
        window.googletag.pubads().collapseEmptyDivs()
      }

      window.googletag.enableServices()
      window.googletag.display('out-of-page-ad')
    })
    isInitialed.current = true
  }, [slotId, collapseEmptyDivs])

  return <div id="out-of-page-ad" className="fixed inset-x-0 bottom-0"></div>
}
