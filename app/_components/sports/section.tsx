import { fetchSportsEvents } from '@/app/actions'
import SportsMain from './main'

export default async function SportsSection() {
  const result = await fetchSportsEvents()
  return (
    <div className="section-in-homepage flex flex-col bg-[#F6F6FB] py-4 lg:hidden">
      <SportsMain scheduleData={result}></SportsMain>
    </div>
  )
}
