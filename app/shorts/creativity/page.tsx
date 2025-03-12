import ShortsLayout from '@/shared-components/shorts/layout'
import { fetchLatestShorts } from '@/app/actions-general'
import { SHORTS_TYPE } from '@/types/common'
import { notFound } from 'next/navigation'
import { LATEST_SHORT_PAGES } from '@/constants/misc'

// add segment config to prevent data fetch during build
export const dynamic = 'force-dynamic'

export default async function Page() {
  const data = await fetchLatestShorts(SHORTS_TYPE.DERIVATIVE, 50)

  if (!data) notFound()

  return (
    <ShortsLayout
      tabLinks={LATEST_SHORT_PAGES}
      activeTab={SHORTS_TYPE.DERIVATIVE}
      items={data}
    />
  )
}
