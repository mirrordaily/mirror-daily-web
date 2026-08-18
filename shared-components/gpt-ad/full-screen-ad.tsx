'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { FullScreenAdUnit } from '@/constants/ad'
import { fullScreenAdMap } from '@/constants/ad'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    googletag?: any
  }
}

type Props = {
  slotKey: FullScreenAdUnit
}

const adSize = [
  [1, 1],
  [320, 480],
]

export default function FullScreenAd({ slotKey }: Props) {
  const [isAdVisible, setIsAdVisible] = useState(false)
  const [isCloseBtnVisible, setIsCloseBtnVisible] = useState(false)
  const [isAdEnabled, setIsAdEnabled] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adSlotRef = useRef<any>(null)

  const { adUnitPath, divId } = fullScreenAdMap[slotKey]

  // 啟動 3 秒計時器顯示關閉按鈕
  const setTimerForCloseBtn = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setIsCloseBtnVisible(true)
    }, 3000)
  }, [])

  const clearTimerForCloseBtn = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const closeAd = useCallback(() => {
    setIsAdEnabled(false)
    setIsAdVisible(false)
    clearTimerForCloseBtn()
  }, [clearTimerForCloseBtn])

  useEffect(() => {
    if (!divId || !window?.googletag) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let adSlot: any

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSlotRequested = (event: any) => {
      if (event.slot === adSlot) {
        setTimerForCloseBtn()
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSlotRenderEnded = (event: any) => {
      if (event.slot === adSlot) {
        const hasAd = !event.isEmpty

        if (hasAd) {
          setIsAdVisible(true)
        } else {
          closeAd()
        }
      }
    }

    window.googletag?.cmd?.push(() => {
      const pubads = window.googletag?.pubads()

      adSlot = window.googletag
        ?.defineSlot(adUnitPath, adSize, divId)
        ?.addService(pubads)

      window.googletag?.display(divId)

      pubads?.addEventListener('slotRequested', handleSlotRequested)
      pubads?.addEventListener('slotRenderEnded', handleSlotRenderEnded)

      adSlotRef.current = adSlot
    })

    return () => {
      clearTimerForCloseBtn()

      window.googletag?.cmd?.push(() => {
        const pubads = window.googletag?.pubads()
        if (adSlot) {
          window.googletag?.destroySlots([adSlot])
        }
        pubads?.removeEventListener('slotRequested', handleSlotRequested)
        pubads?.removeEventListener('slotRenderEnded', handleSlotRenderEnded)
      })
    }
  }, [divId, adUnitPath, setTimerForCloseBtn, clearTimerForCloseBtn, closeAd])

  if (!isAdEnabled) {
    return null
  }

  return (
    <>
      {/* 蓋板廣告容器 */}
      <div
        className={`fixed inset-0 z-full-screen-ad items-center justify-center overflow-hidden bg-black/70 md:hidden ${
          isAdVisible ? 'flex' : 'hidden'
        }`}
      >
        <div className="relative h-[480px] w-[320px]">
          <div id={divId} className="min-h-[480px] min-w-[320px]" />
          {/* 關閉按鈕 - 只有在廣告顯示且計時器觸發後才顯示 */}
          {isAdVisible && isCloseBtnVisible && (
            <button
              className="absolute right-[5px] top-[5px] size-8 cursor-pointer border-2 border-white/90 bg-[#d3d3d3] p-[5px] shadow-[2px_2px_5px_#d3d3d3] focus:outline-none"
              onClick={closeAd}
            >
              {/* X 圖案 */}
              <span className="absolute left-1/2 top-1/2 h-5 w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-sm bg-white" />
              <span className="absolute left-1/2 top-1/2 h-5 w-[2px] -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-sm bg-white" />
            </button>
          )}
        </div>
      </div>
    </>
  )
}
