import Custom404 from '@/shared-components/error/ui-404'
import Header from '@/shared-components/header'
import Footer from '@/shared-components/footer'

// add segment config to prevent data fetch during build
export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <>
      <Header />
      <Custom404 />
      <Footer />
    </>
  )
}
