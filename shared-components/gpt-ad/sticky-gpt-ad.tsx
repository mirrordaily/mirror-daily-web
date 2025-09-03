'use client'

import { useEffect, useRef } from 'react'
import { ENV } from '@/constants/config'
import { ENVIRONMENT } from '@/constants/misc'
import { gptStickyAdSlots } from '@/constants/ad'
import { twMerge } from 'tailwind-merge'

export type StickyAdSlotKey = keyof typeof gptStickyAdSlots

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    googletag?: any
  }
}

const isDebugMode = ENV === ENVIRONMENT.LOCAL || ENV === ENVIRONMENT.DEVELOPMENT

export default function StickyGptAd({
  slotKey,
  customClasses,
}: {
  slotKey: StickyAdSlotKey
  customClasses: string
}) {
  const isInitialed = useRef(false)
  const { slotId, collapseEmptyDivs } = gptStickyAdSlots[slotKey]

  useEffect(() => {
    if (typeof window === 'undefined' || isInitialed.current) return

    window.googletag = window.googletag || { cmd: [] }

    window.googletag.cmd.push(function () {
      if (isDebugMode) {
        console.log(`[GPT-STICKY-AD DEBUG] Registering ad slot: ${slotId}`)
      }

      const slot = window.googletag
        .defineOutOfPageSlot(
          slotId,
          window.googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR
        )
        .addService(window.googletag.pubads())

      if (collapseEmptyDivs && !isDebugMode) {
        window.googletag.pubads().collapseEmptyDivs()
      }

      window.googletag.enableServices()
      window.googletag.display(slot)
    })
    isInitialed.current = true
  }, [slotId, collapseEmptyDivs])

  return (
    <div
      id={slotId}
      className={twMerge(
        `${isDebugMode ? `relative flex items-center justify-center border-2 border-dashed border-red-500` : 'hidden'}`,
        customClasses
      )}
    >
      {isDebugMode && (
        <span className="absolute left-0 top-0 z-[9999] bg-red-500 px-1 py-0.5 text-[12px] text-white">
          {slotId}
        </span>
      )}
    </div>
  )
}
