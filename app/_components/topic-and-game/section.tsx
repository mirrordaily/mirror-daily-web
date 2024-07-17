import TopicMain from './topic-main'
import GameMain from './game-main'
import { fetchTopics } from '@/app/actions'

export default async function TopicAndGameSection() {
  const data = await fetchTopics()

  if (!data) return null

  return (
    <section className="section-in-homepage mb-[31px] mt-9 flex flex-col md:my-9 lg:flex-row">
      <TopicMain data={data} />
      <hr className="mb-9 mt-6 h-[2px] bg-[#000928] md:mb-6 md:mt-9 lg:my-0 lg:ml-[39px] lg:mr-6 lg:h-auto lg:w-[2px] lg:shrink-0" />
      <GameMain />
    </section>
  )
}
