'use client' // Error components must be Client Components

import Custom500 from '@/shared-components/error/ui-500'
import Footer from '@/shared-components/footer'
import Header from '@/shared-components/header-for-ui-500'
import { useEffect } from 'react'
import StoreProvider from '@/redux/store-provider'
import UploadModal from '@/shared-components/shorts-upload/upload-modal'
import type { Metadata } from 'next'
import { getDefaultMetadata } from '@/utils/common'

export const metadata: Metadata = getDefaultMetadata()

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    // TODO: send error log to GCP Logging
  }, [error])

  return (
    <html lang="zh-Hant">
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
