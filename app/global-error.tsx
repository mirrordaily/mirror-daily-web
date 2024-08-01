'use client' // Error components must be Client Components

import Custom500 from '@/shared-components/error/ui-500'
import Footer from '@/shared-components/footer'
import Header from '@/shared-components/header-for-ui-500'
import { useEffect } from 'react'

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body className="flex min-h-screen w-screen flex-col items-center overflow-x-hidden bg-white has-[#mobile-menu-toggle:checked]:h-screen has-[#mobile-menu-toggle:checked]:overflow-hidden has-[#mobile-menu-toggle:checked]:lg:h-auto has-[#mobile-menu-toggle:checked]:lg:overflow-auto">
        <Header />
        <Custom500 />
        <Footer />
      </body>
    </html>
  )
}
