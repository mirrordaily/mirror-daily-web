import Custom404 from '@/shared-components/error/ui-404'
import Header from '@/shared-components/header'
import Footer from '@/shared-components/footer'
import { getDefaultMetadata } from '@/utils/common'

// add segment config to prevent data fetch during build
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const defaultMetadata = getDefaultMetadata()

  const metaData = Object.assign(
    {},
    {
      ...defaultMetadata,
      openGraph: {
        ...(defaultMetadata.openGraph ?? {}),
        type: 'website',
      },
      other: { 'product:availability': 'oos' },
    }
  )

  return metaData
}

export default function NotFound() {
  return (
    <>
      <Header />
      <Custom404 />
      <Footer />
    </>
  )
}
