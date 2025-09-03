'use client'

import { useEffect, useState } from 'react'
import type { AdSlotKey } from './base-gpt-ad'
import type { StickyAdSlotKey } from './sticky-gpt-ad'
import BaseGptAd from './base-gpt-ad'
import StickyGptAd from './sticky-gpt-ad'
import { getTailwindConfigBreakpointNumber } from '@/utils/tailwind'

export function DesktopGptAd({
  slotKey,
  customClasses = '',
  pageKey = '',
  isStickyAd = false,
}: {
  slotKey: AdSlotKey | StickyAdSlotKey
  customClasses?: string
  pageKey?: string
  isStickyAd?: boolean
}) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const check = () =>
      setShow(window.innerWidth >= getTailwindConfigBreakpointNumber('lg'))

    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!show) return null

  if (isStickyAd) {
    return (
      <StickyGptAd
        customClasses={customClasses}
        slotKey={slotKey as StickyAdSlotKey}
      />
    )
  }

  return (
    <BaseGptAd
      slotKey={slotKey as AdSlotKey}
      customClasses={customClasses}
      pageKey={pageKey}
    />
  )
}
