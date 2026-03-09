import { fetchPromoteTopics } from '@/app/actions'
import SwiperComponent from './swiper-component'

export default async function PromoteTopicSection() {
  const list = await fetchPromoteTopics()
  if (!list.length) return null

  return <SwiperComponent list={list} />
}
