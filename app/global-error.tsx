'use client' // Error components must be Client Components

import Custom500 from '@/shared-components/error/ui-500'
import Footer from '@/shared-components/footer'
import Header from '@/shared-components/header-for-ui-500'
import { useEffect } from 'react'
import { Noto_Sans_TC } from 'next/font/google'
import StoreProvider from '@/redux/store-provider'

const notoSans = Noto_Sans_TC({
  preload: true,
  subsets: ['latin'],
  display: 'swap',
})

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    // TODO: send error log to GCP Logging
  }, [error])

  return (
    <html lang="zh-Hant" className={notoSans.className}>
      <body className="app-layout">
        <StoreProvider>
          <Header />
          <Custom500 />
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}
