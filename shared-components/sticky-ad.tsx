'use client'
import { useEffect, useRef } from 'react'
import type { StickyAdUnit } from '@/constants/ad'
import { stickyAdUnitMap } from '@/constants/ad'

type StickyAdProps = {
  pageType: StickyAdUnit
  headerSelector?: string
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
  headerSelector = '#site-header',
  footerSelector = '#site-footer',
}: StickyAdProps) {
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return

    if (sessionStorage.getItem('md_sticky_closed') === '1') return

    const adUnitPath = stickyAdUnitMap[pageType]

    if (!adUnitPath) return

    const wrap = document.getElementById('md-sticky')
    const headerEl = document.querySelector(headerSelector)
    const footerEl = document.querySelector(footerSelector)

    if (!wrap) return

    hasInitialized.current = true

    const state = {
      hasFill: false,
      userClosed: false,
      headerVisible: true,
      footerVisible: false,
    }

    function update() {
      if (!wrap) return
      const shouldShow =
        state.hasFill &&
        !state.userClosed &&
        !state.headerVisible &&
        !state.footerVisible

      wrap.hidden = !shouldShow
    }

    const closeBtn = document.getElementById('md-sticky-close')
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        state.userClosed = true
        sessionStorage.setItem('md_sticky_closed', '1')
        update()
      })
    }

    window.googletag.cmd.push(() => {
      const slot = window.googletag
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .addEventListener('slotRenderEnded', (e: any) => {
          if (e.slot === slot) {
            state.hasFill = !e.isEmpty
            update()
          }
        })

      window.googletag.display('gpt-sticky')
    })

    if (headerEl && 'IntersectionObserver' in window) {
      const headerObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0]) {
            const isIntersecting = entries[0].isIntersecting
            state.headerVisible = isIntersecting
            update()
          }
        },
        { threshold: 0.01 }
      )
      headerObserver.observe(headerEl)
    } else {
      state.headerVisible = false
      update()
    }

    if (footerEl && 'IntersectionObserver' in window) {
      const footerObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0]) {
            const isIntersecting = entries[0].isIntersecting
            state.footerVisible = isIntersecting
            update()
          }
        },
        { threshold: 0.01 }
      )
      footerObserver.observe(footerEl)
    }

    return () => {
      hasInitialized.current = false
    }
  }, [pageType, headerSelector, footerSelector])

  return (
    <div
      id="md-sticky"
      className="fixed inset-x-0 bottom-0 z-[9999] h-[90px] items-center justify-center bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)]"
      hidden
    >
      <div id="gpt-sticky"></div>
      <button
        id="md-sticky-close"
        type="button"
        className="absolute right-2 top-2 cursor-pointer border-0 bg-transparent text-lg leading-none"
        aria-label="關閉"
      >
        ✕
      </button>
    </div>
  )
}
