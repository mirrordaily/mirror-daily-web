'use client'

import { useEffect, useMemo } from 'react'
import { useReferrerTracker } from '@/hooks/use-referrer-tracker'

export default function PageLogger({
  extra,
}: {
  extra?: Record<string, unknown>
}) {
  const { currentURL, referrer: clientReferrer } = useReferrerTracker()

  const initialReferrer =
    typeof document !== 'undefined' ? document.referrer : ''

  const screenSize = useMemo(() => {
    if (typeof window === 'undefined') return null
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }, [])

  useEffect(() => {
    const log = async () => {
      if (!screenSize) return

      const response = await fetch('/api/logger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'page-view',
          currentUrl: window.location.href,
          referrer: clientReferrer || initialReferrer || '',
          screenSize,
          extra,
        }),
        keepalive: true,
      })

      if (!response.ok) {
        throw new Error(`log request failed with status ${response.status}`)
      }
    }

    void log().catch((err) => {
      console.error('[PageLogger] failed to log page view', err)
    })
  }, [clientReferrer, currentURL, extra, initialReferrer, screenSize])

  return null
}
