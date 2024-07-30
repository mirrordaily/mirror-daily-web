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
      <body className="flex min-h-screen w-screen flex-col items-center overflow-x-hidden bg-white has-[#mobile-menu-toggle:checked]:h-screen has-[#mobile-menu-toggle:checked]:overflow-hidden has-[#mobile-menu-toggle:checked]:lg:h-auto has-[#mobile-menu-toggle:checked]:lg:overflow-auto">
        {children}
      </body>
    </html>
  )
}
