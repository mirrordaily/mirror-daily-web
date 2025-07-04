'use client'

import { useEffect, useRef } from 'react'
import { ENV } from '@/constants/config'
import { ENVIRONMENT } from '@/constants/misc'
import { adSlots } from '@/constants/ad'
import { twMerge } from 'tailwind-merge'

export type AdSlotKey = keyof typeof adSlots

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    googletag?: any
  }
}

const isDebugMode = ENV === ENVIRONMENT.LOCAL || ENV === ENVIRONMENT.DEVELOPMENT

export default function BaseGptAd({
  slotKey,
  customClasses,
  pageKey,
}: {
  slotKey: AdSlotKey
  customClasses: string
  pageKey?: string
}) {
  const isInitialed = useRef(false)
  const { slotId, sizes, adDivId, collapseEmptyDivs, minSize } =
    adSlots[slotKey]

  useEffect(() => {
    if (typeof window === 'undefined' || isInitialed.current) return

    window.googletag = window.googletag || { cmd: [] }

    window.googletag.cmd.push(function () {
      if (isDebugMode) {
        console.log(
          `[GPT-AD DEBUG] Registering ad slot: ${slotId}, divId: ${adDivId}`
        )
      }

      window.googletag
        .defineSlot(slotId, sizes, adDivId)
        .addService(window.googletag.pubads())

      if (pageKey) {
        window.googletag.setTargeting('cid', pageKey)
      }

      window.googletag.pubads().enableSingleRequest()

      if (collapseEmptyDivs && !isDebugMode) {
        window.googletag.pubads().collapseEmptyDivs()
      }

      window.googletag.enableServices()
      window.googletag.display(adDivId)
    })
    isInitialed.current = true
  }, [slotId, adDivId, sizes, collapseEmptyDivs, pageKey])

  return (
    <>
      <div
        id={`div-gpt-ad-${adDivId}`}
        style={{
          width: minSize[0],
          minHeight: minSize[1],
        }}
        className={twMerge(
          `${isDebugMode ? `relative flex items-center justify-center border-2 border-dashed border-red-500` : 'flex items-center justify-center'}`,
          customClasses
        )}
      >
        {isDebugMode && (
          <span className="absolute left-0 top-0 z-[9999] bg-red-500 px-1 py-0.5 text-[12px] text-white">
            {slotId}
          </span>
        )}
      </div>
    </>
  )
}
