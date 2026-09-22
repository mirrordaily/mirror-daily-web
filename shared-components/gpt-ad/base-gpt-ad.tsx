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
  fetchMode = 'display',
}: {
  slotKey: AdSlotKey
  customClasses: string
  pageKey: string
  /** `refresh`：SRA 已發出後才掛上的 slot，display 不會再抓廣告，要另外 refresh。 */
  fetchMode?: 'display' | 'refresh'
}) {
  const isInitialed = useRef(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const slotRef = useRef<any>(null)
  const { slotId, sizes, adId, collapseEmptyDivs, minSize } = adSlots[slotKey]
  const adDivId = `div-gpt-ad-${adId}`

  useEffect(() => {
    if (typeof window === 'undefined' || isInitialed.current) return

    let cancelled = false

    window.googletag.cmd.push(function () {
      if (cancelled) return

      if (isDebugMode) {
        console.log(
          `[GPT-AD DEBUG] Registering ad slot: ${slotId}, divId: ${adDivId}`
        )
      }

      const slot = window.googletag
        .defineSlot(slotId, sizes, adDivId)
        .addService(window.googletag.pubads())

      slotRef.current = slot

      if (pageKey) {
        slot.setTargeting('cid', pageKey)
      }

      if (collapseEmptyDivs && !isDebugMode) {
        window.googletag.pubads().collapseEmptyDivs()
      }

      window.googletag.display(adDivId)

      if (fetchMode === 'refresh') {
        window.googletag.pubads().refresh([slot])
      }
    })
    isInitialed.current = true

    if (fetchMode !== 'refresh') return

    return () => {
      cancelled = true
      isInitialed.current = false
      window.googletag?.cmd?.push(() => {
        if (slotRef.current) {
          window.googletag.destroySlots([slotRef.current])
          slotRef.current = null
        }
      })
    }
  }, [slotId, adDivId, sizes, collapseEmptyDivs, pageKey, fetchMode])

  return (
    <>
      <div
        id={adDivId}
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
          <span
            title={slotId}
            className="absolute left-0 top-0 z-ad block max-w-full truncate bg-red-500 px-1 py-0.5 text-[12px] text-white"
          >
            {slotId}
          </span>
        )}
      </div>
    </>
  )
}
