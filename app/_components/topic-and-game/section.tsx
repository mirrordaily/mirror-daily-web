import TopicMain from './topic-main'
import { fetchTopics } from '@/app/actions'

export default async function TopicAndGameSection() {
  const data = await fetchTopics()

  if (!data) return null

  return (
    <section className="section-in-homepage mb-[31px] mt-9 md:my-9">
      <TopicMain data={data} />
    </section>
  )
}
