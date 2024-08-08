import { fetchFlashNews } from '@/app/actions'
import { fetchSectionsAndCategories } from '@/app/actions-general'
import UiHeader from './header/ui-header'

export default async function Header() {
  const data = await fetchSectionsAndCategories()
  const flashNews = await fetchFlashNews()

  return <UiHeader data={data} flashNews={flashNews} />
}
