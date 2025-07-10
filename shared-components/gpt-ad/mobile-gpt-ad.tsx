'use client'

import { useEffect, useState } from 'react'
import type { AdSlotKey } from './base-gpt-ad'
import type { TestAdSlotKey } from './test-base-gpt-ad'
import BaseGptAd from './base-gpt-ad'
import { getTailwindConfigBreakpointNumber } from '@/utils/tailwind'
import { ENV } from '@/constants/config'
import { ENVIRONMENT } from '@/constants/misc'
import TestBaseGptAd from './test-base-gpt-ad'

const isStagingOrProd =
  ENV === ENVIRONMENT.STAGING || ENV === ENVIRONMENT.PRODUCTION

export function MobileGptAd({
  slotKey,
  customClasses = '',
  pageKey = '',
}: {
  slotKey: AdSlotKey | TestAdSlotKey
  customClasses?: string
  pageKey?: string
}) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const check = () =>
      setShow(window.innerWidth < getTailwindConfigBreakpointNumber('md'))

    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!show) return null

  return isStagingOrProd ? (
    <TestBaseGptAd
      slotKey={slotKey as TestAdSlotKey}
      customClasses={customClasses}
      pageKey={pageKey}
    />
  ) : (
    <BaseGptAd
      slotKey={slotKey as AdSlotKey}
      customClasses={customClasses}
      pageKey={pageKey}
    />
  )
}
