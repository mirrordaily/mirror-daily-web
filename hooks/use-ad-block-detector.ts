'use client'

import { useState, useEffect } from 'react'

const BLOCKED_URLS = [
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
  'https://static.doubleclick.net/instream/ad_status.js',
  'https://imasdk.googleapis.com/js/sdkloader/ima3.js',
]

export default function useAdBlockDetector() {
  const [isAdBlockerActive, setIsAdBlockerActive] = useState(false)

  useEffect(() => {
    const checkAdBlocker = async () => {
      try {
        await Promise.all(
          BLOCKED_URLS.map((url) =>
            fetch(new Request(url), {
              method: 'HEAD',
              mode: 'no-cors',
              cache: 'no-store',
            })
          )
        )

        setIsAdBlockerActive(false)
      } catch (error) {
        setIsAdBlockerActive(true)
      }
    }

    const checkTimeout = setTimeout(() => {
      checkAdBlocker()
    }, 50)

    return () => {
      clearTimeout(checkTimeout)
    }
  }, [])

  return { isAdBlockerActive }
}
