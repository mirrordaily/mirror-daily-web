import ShortsLayout from '@/shared-components/shorts/layout'
import { fetchLatestShorts } from '@/app/actions-general'
import { SHORTS_TYPE } from '@/types/common'
import { notFound } from 'next/navigation'
import { LATEST_SHORT_PAGES } from '@/constants/misc'

export default async function Page() {
  const data = await fetchLatestShorts(SHORTS_TYPE.DERIVATIVE, 20)

  if (!data) notFound()

  return (
    <ShortsLayout
      tabLinks={LATEST_SHORT_PAGES}
      activeTab={SHORTS_TYPE.DERIVATIVE}
      items={data}
    />
  )
}
