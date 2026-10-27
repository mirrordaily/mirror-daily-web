'use client'
import { useEffect } from 'react'

const GOOGLE_FONT_URL =
  'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap'

// Load Google Fonts from CDN without blocking render:
// preload the stylesheet early, then apply it after hydration
export default function GoogleFontLoader() {
  useEffect(() => {
    if (
      document.querySelector(
        `link[rel="stylesheet"][href="${GOOGLE_FONT_URL}"]`
      )
    ) {
      return
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = GOOGLE_FONT_URL
    document.head.appendChild(link)
  }, [])

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preload" as="style" href={GOOGLE_FONT_URL} />
      <noscript>
        <link rel="stylesheet" href={GOOGLE_FONT_URL} />
      </noscript>
    </>
  )
}
