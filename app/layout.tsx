import { GTM_ID, SITE_URL } from '@/constants/config'
import { IMAGE_PATH } from '@/constants/default-path'
import { SITE_NAME } from '@/constants/misc'
import StoreProvider from '@/redux/store-provider'
import UploadModal from '@/shared-components/shorts-upload/upload-modal'
import '@/shared-styles/global.css'
import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'

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
