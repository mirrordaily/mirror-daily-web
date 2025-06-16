import { fetchLatestSportsNews, fetchSportsEvents } from '@/app/actions'
import SportsMain from './main'

export default async function SportsSection() {
  const result = await fetchSportsEvents()
  const latestSportsNewsData = await fetchLatestSportsNews()
  return (
    <div className="section-in-homepage mb-7 flex flex-col bg-[#F6F6FB] py-4 lg:hidden">
      <SportsMain
        scheduleData={result}
        latestSportsNewsData={latestSportsNewsData}
      ></SportsMain>
    </div>
  )
}
