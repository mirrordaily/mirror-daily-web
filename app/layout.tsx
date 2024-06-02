import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans_TC({
  preload: true,
  subsets: ['latin'],
  display: 'swap',
})

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
      <body className="flex min-h-screen w-screen flex-col items-center overflow-x-hidden bg-white">
        <header className="h-[150px] w-full md:h-[134px] lg:h-[144px]"></header>
        {/* main content */}
        <div className="flex w-full max-w-screen-lg grow flex-col overflow-x-hidden">
          {children}
        </div>
        {/* newsletter subscription */}
        <section className="min-h-[266px] w-full bg-[#004EBC]"></section>
        <footer className="min-h-[150px] w-full bg-[#2B2B2B]"></footer>
      </body>
    </html>
  )
}
