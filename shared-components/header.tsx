import { fetchFlashNews } from '@/app/actions'
import { fetchHeaderData } from '@/app/actions-general'
import UiHeader from './header/ui-header'

export default async function Header() {
  const data = await fetchHeaderData()
  const flashNews = await fetchFlashNews()

  return <UiHeader data={data} flashNews={flashNews} />
}
