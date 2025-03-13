import TopicMain from './topic-main'
import { fetchTopics } from '@/app/actions'

export default async function TopicAndGameSection() {
  const data = await fetchTopics()

  if (!data) return null

  return (
    <section className="section-in-homepage mb-9 mt-6 md:my-9 lg:my-10">
      <TopicMain data={data} />
    </section>
  )
}
