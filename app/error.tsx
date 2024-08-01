'use client' // Error components must be Client Components

import Custom500 from '@/shared-components/error/ui-500'
import Header from '@/shared-components/header-for-ui-500'
import Footer from '@/shared-components/footer'
import { useEffect } from 'react'

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <Header />
      <Custom500 />
      <Footer />
    </>
  )
}
