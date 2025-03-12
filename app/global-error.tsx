'use client' // Error components must be Client Components

import Custom500 from '@/shared-components/error/ui-500'
import Footer from '@/shared-components/footer'
import Header from '@/shared-components/header-for-ui-500'
import { useEffect } from 'react'
import { Noto_Sans_TC } from 'next/font/google'
import StoreProvider from '@/redux/store-provider'
import UploadModal from '@/shared-components/shorts-upload/upload-modal'
import { SITE_URL } from '@/constants/config'
import { SITE_NAME } from '@/constants/misc'
import { IMAGE_PATH } from '@/constants/default-path'
import type { Metadata } from 'next'

const notoSans = Noto_Sans_TC({
  preload: true,
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: '',
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: '',
    url: '/',
    images: IMAGE_PATH,
  },
}

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
          <UploadModal />
        </StoreProvider>
      </body>
    </html>
  )
}
