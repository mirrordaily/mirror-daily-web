import { fetchHeaderData, fetchLatestPost } from '@/app/actions-general'
import UiHeader from './header/ui-header'
import { fetchHotNews } from '@/app/actions'
import { FLASH_NEWS_COUNT } from '@/constants/misc'

export default async function Header() {
  const data = await fetchHeaderData()
  const hotNews = await fetchHotNews()
  const latestPosts = await fetchLatestPost()
  const flashNews = [...hotNews, ...latestPosts].slice(0, FLASH_NEWS_COUNT)

  return <UiHeader data={data} flashNews={flashNews} />
}
