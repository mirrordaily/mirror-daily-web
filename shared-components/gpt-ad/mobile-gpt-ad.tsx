'use client'

import { useEffect, useState } from 'react'
import type { AdSlotKey } from './base-gpt-ad'
import BaseGptAd from './base-gpt-ad'
import { getTailwindConfigBreakpointNumber } from '@/utils/tailwind'
import type { StickyAdUnit } from '@/constants/ad'
import StickyAd from './sticky-ad'

type MobileGptAdProps =
  | {
      mode: 'normal'
      slotKey: AdSlotKey
      customClasses?: string
      targetingId?: string
    }
  | {
      mode: 'sticky'
      pageType: StickyAdUnit
      headerBannerSelector?: string
      footerSelector?: string
    }

export function MobileGptAd(props: MobileGptAdProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const check = () =>
      setShow(window.innerWidth < getTailwindConfigBreakpointNumber('md'))

    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!show) return null

  if (props.mode === 'sticky') {
    const {
      pageType,
      headerBannerSelector = '#gpt-top-leaderboard',
      footerSelector = '#site-footer',
    } = props

    return (
      <StickyAd
        pageType={pageType}
        headerBannerSelector={headerBannerSelector}
        footerSelector={footerSelector}
      />
    )
  }

  const { slotKey, customClasses = '', targetingId = '' } = props

  return (
    <BaseGptAd
      slotKey={slotKey}
      customClasses={customClasses}
      pageKey={targetingId}
    />
  )
}
