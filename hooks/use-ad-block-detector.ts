'use client'

import { useState, useEffect } from 'react'

export default function useAdBlockDetector() {
  const [isAdBlockerActive, setIsAdBlockerActive] = useState(false)

  useEffect(() => {
    const bait = document.createElement('div')
    bait.className = 'ad-banner text-ad ad-container advertisement'
    bait.style.height = '1px'
    bait.style.width = '1px'
    bait.style.position = 'absolute'
    bait.style.top = '-9999px'
    bait.style.left = '-9999px'
    bait.style.pointerEvents = 'none' // Ensure it's not interactive.
    bait.setAttribute('aria-hidden', 'true') // Hide from screen readers.

    document.body.appendChild(bait)

    const timer = setTimeout(() => {
      if (bait.offsetHeight === 0) {
        setIsAdBlockerActive(true)
      }

      if (document.body.contains(bait)) {
        document.body.removeChild(bait)
      }
    }, 150)

    return () => {
      clearTimeout(timer)

      if (document.body.contains(bait)) {
        document.body.removeChild(bait)
      }
    }
  }, [])

  return { isAdBlockerActive }
}
