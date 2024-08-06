import '@/shared-styles/global.css'
import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'

const notoSans = Noto_Sans_TC({
  preload: true,
  subsets: ['latin'],
  display: 'swap',
})

// TODO: update metadata
export const metadata: Metadata = {
  title: '鏡報',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant" className={notoSans.className}>
      <body className={`app-layout`}>{children}</body>
    </html>
  )
}
