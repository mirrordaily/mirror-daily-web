'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export default function useVideoViewLogger({
  isActive,
  title,
  link,
  duration,
  playedSeconds,
}: {
  isActive: boolean
  title: string
  link: string
  duration: number | null
  playedSeconds: number
}) {
  const viewedPercentages = useRef<Set<number>>(new Set())
  const [screenSize, setScreenSize] = useState<{
    width: number
    height: number
  } | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
  }, [])

  const sendVideoLog = useCallback(
    async (percentage: number, force?: boolean) => {
      if (!duration || !screenSize) return
      if (!force && viewedPercentages.current.has(percentage)) return
      const extra = {
        video_title: title,
        video_id: link.split('/').pop(),
        video_duration: Math.floor(duration),
        playback_duration: Math.floor(playedSeconds),
      }
      viewedPercentages.current.add(percentage)

      try {
        const response = await fetch('/api/logger', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventType: 'video-view',
            currentUrl: window.location.href,
            referrer: document.referrer,
            screenSize,
            extra: {
              ...extra,
              percentage_watched: percentage,
            },
          }),
          keepalive: true,
        })

        if (!response.ok) {
          throw new Error(`log request failed with status ${response.status}`)
        }
      } catch (err) {
        console.error('[useVideoViewLogger] failed to log video view', err)
      }
    },
    [duration, link, playedSeconds, screenSize, title]
  )

  useEffect(() => {
    if (!duration || !isActive) return
    const logPercentages = [25, 50, 75]
    const isNearEnd = playedSeconds >= duration - 1
    const currentPercentage = Math.floor((playedSeconds / duration) * 100)

    const log = async () => {
      for (const percentage of logPercentages) {
        if (
          currentPercentage >= percentage &&
          !viewedPercentages.current.has(percentage)
        ) {
          await sendVideoLog(percentage)
        }
      }

      if (isNearEnd && !viewedPercentages.current.has(100)) {
        await sendVideoLog(100, true)
      }
    }

    void log().catch((err) => {
      console.error('[useVideoViewLogger] failed to log video view', err)
    })
  }, [duration, isActive, playedSeconds, sendVideoLog])

  return { sendVideoLog }
}
