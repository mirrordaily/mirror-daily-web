import { GTM_ID, SITE_URL } from '@/constants/config'
import { IMAGE_PATH } from '@/constants/default-path'
import { SITE_NAME } from '@/constants/misc'
import StoreProvider from '@/redux/store-provider'
import UploadModal from '@/shared-components/shorts-upload/upload-modal'
import '@/shared-styles/global.css'
import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'

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
      <Script
        id="comscore"
        dangerouslySetInnerHTML={{
          __html: `var _comscore = _comscore || [];
                _comscore.push({ c1: "2", c2: "24318560" ,  options: { enableFirstPartyCookie: "true" } });
                (function() {
                  var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
                  s.src = "https://sb.scorecardresearch.com/cs/24318560/beacon.js";
                  el.parentNode.insertBefore(s, el);
                })();`,
        }}
      />
      <noscript>
        <img src="https://sb.scorecardresearch.com/p?c1=2&amp;c2=24318560&amp;cv=3.9.1&amp;cj=1" />
      </noscript>
      <body className="app-layout">
        <StoreProvider>
          {children}
          <UploadModal />
        </StoreProvider>
      </body>
    </html>
  )
}
