import { GTM_ID } from '@/constants/config'
import StoreProvider from '@/redux/store-provider'
import UploadModal from '@/shared-components/shorts-upload/upload-modal'
import '@/shared-styles/global.css'
import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import { getDefaultMetadata } from '@/utils/common'

const notoSans = Noto_Sans_TC({
  preload: true,
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = getDefaultMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant" className={notoSans.className}>
      <GoogleTagManager gtmId={GTM_ID} />
      <body className="app-layout">
        <StoreProvider>
          {children}
          <UploadModal />
        </StoreProvider>
      </body>
    </html>
  )
}
