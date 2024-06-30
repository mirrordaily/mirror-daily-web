import '@/shared-styles/global.css'
import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import Header from '@/shared-components/header'
import NewsletterSubscription from '@/shared-components/newsletter-subscription'
import Footer from '@/shared-components/footer'

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
      <body className="flex min-h-screen w-screen flex-col items-center overflow-x-hidden bg-white has-[#mobile-menu-toggle:checked]:h-screen has-[#mobile-menu-toggle:checked]:overflow-hidden has-[#mobile-menu-toggle:checked]:lg:h-auto has-[#mobile-menu-toggle:checked]:lg:overflow-auto">
        <Header />
        {/* main content */}
        <div className="flex w-full max-w-screen-lg grow flex-col overflow-x-hidden">
          {children}
        </div>
        <NewsletterSubscription />
        <Footer />
      </body>
    </html>
  )
}
