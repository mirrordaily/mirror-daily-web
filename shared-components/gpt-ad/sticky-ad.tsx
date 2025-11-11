'use client'
import { useEffect, useRef, useState } from 'react'
import type { StickyAdUnit } from '@/constants/ad'
import { stickyAdUnitMap } from '@/constants/ad'
import { getTailwindConfigBreakpointNumber } from '@/utils/tailwind'

type StickyAdProps = {
  pageType: StickyAdUnit
  headerBannerSelector?: string
  footerSelector?: string
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    googletag?: any
  }
}

export default function StickyAd({
  pageType,
  headerBannerSelector = '#gpt-top-leaderboard',
  footerSelector = '#site-footer',
}: StickyAdProps) {
  const hasInitialized = useRef(false)
  const [show, setShow] = useState(false)
  const [shouldShowState, setShouldShowState] = useState({
    hasFill: false,
    userClosed: false,
    headerVisible: true,
    footerVisible: false,
  })

  const shouldShow =
    show &&
    shouldShowState.hasFill &&
    !shouldShowState.userClosed &&
    !shouldShowState.headerVisible &&
    !shouldShowState.footerVisible

  useEffect(() => {
    const check = () =>
      setShow(window.innerWidth >= getTailwindConfigBreakpointNumber('lg'))

    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (hasInitialized.current) return
    if (!show) return
    if (sessionStorage.getItem('md_sticky_closed') === '1') {
      setShouldShowState((prev) => ({ ...prev, userClosed: true }))
      return
    }

    const adUnitPath = stickyAdUnitMap[pageType]
    if (!adUnitPath) return

    const headerEl = document.querySelector(headerBannerSelector)
    const footerEl = document.querySelector(footerSelector)

    hasInitialized.current = true

    let headerObserver: IntersectionObserver | null = null
    let footerObserver: IntersectionObserver | null = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gptSlot: any = null

    const handleClose = () => {
      setShouldShowState((prev) => ({ ...prev, userClosed: true }))
      sessionStorage.setItem('md_sticky_closed', '1')
    }

    const closeBtn = document.getElementById('md-sticky-close')
    if (closeBtn) {
      closeBtn.addEventListener('click', handleClose)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gptEventHandler = (e: any) => {
      if (e.slot === gptSlot) {
        setShouldShowState((prev) => ({ ...prev, hasFill: !e.isEmpty }))
      }
    }

    window.googletag.cmd.push(() => {
      gptSlot = window.googletag
        .defineSlot(
          adUnitPath,
          [
            [970, 90],
            [728, 90],
          ],
          'gpt-sticky'
        )
        .addService(window.googletag.pubads())

      window.googletag
        .pubads()
        .addEventListener('slotRenderEnded', gptEventHandler)

      window.googletag.display('gpt-sticky')
    })

    if (headerEl) {
      headerObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry) {
            setShouldShowState((prev) => ({
              ...prev,
              headerVisible: entry.isIntersecting,
            }))
          }
        },
        { threshold: 0.01 }
      )
      headerObserver.observe(headerEl)
    } else {
      setShouldShowState((prev) => ({ ...prev, headerVisible: false }))
    }

    if (footerEl) {
      footerObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry) {
            setShouldShowState((prev) => ({
              ...prev,
              footerVisible: entry.isIntersecting,
            }))
          }
        },
        { threshold: 0.01 }
      )
      footerObserver.observe(footerEl)
    } else {
      setShouldShowState((prev) => ({ ...prev, footerVisible: false }))
    }

    return () => {
      if (headerObserver) {
        headerObserver.disconnect()
      }
      if (footerObserver) {
        footerObserver.disconnect()
      }
      if (closeBtn) {
        closeBtn.removeEventListener('click', handleClose)
      }
      if (window.googletag && gptSlot) {
        window.googletag
          .pubads()
          .removeEventListener('slotRenderEnded', gptEventHandler)
      }
      if (window.googletag && gptSlot) {
        window.googletag.destroySlots([gptSlot])
      }
      hasInitialized.current = false
    }
  }, [pageType, headerBannerSelector, footerSelector, show])

  return (
    <div
      id="md-sticky"
      className="fixed inset-x-0 bottom-0 z-[9999] h-[90px] items-center justify-center bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)]"
      style={{ display: shouldShow ? 'flex' : 'none' }}
    >
      <div id="gpt-sticky"></div>
      <button
        id="md-sticky-close"
        type="button"
        className="absolute right-2 top-[-24px] cursor-pointer border-0 bg-white p-1 text-lg leading-none"
        aria-label="關閉"
      >
        ✕
      </button>
    </div>
  )
}
