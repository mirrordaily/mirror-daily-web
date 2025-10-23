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

      const slot = window.googletag.defineOutOfPageSlot(
        slotId,
        window.googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR
      )

      if (slot) {
        slot.addService(window.googletag.pubads())
      }

      if (collapseEmptyDivs && !isDebugMode) {
        window.googletag.pubads().collapseEmptyDivs()
      }

      window.googletag
        .pubads()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .addEventListener('slotRenderEnded', function (event: any) {
          if (event.slot === slot) {
            if (!event.isEmpty) {
              setTimeout(
                'document.querySelector("body").removeAttribute("style");',
                500
              )
            }
          }
        })
      window.googletag.enableServices()
      window.googletag.display(slot)
    })
    isInitialed.current = true
  }, [slotId, collapseEmptyDivs])

  return <div></div>
}
