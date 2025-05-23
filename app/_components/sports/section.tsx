import { fetchSportsEvents } from '@/app/actions'
import SportsMain from './main'

export default async function SportsSection() {
  const result = await fetchSportsEvents()
  console.log({ result })
  return (
    <div className="section-in-homepage flex flex-col bg-[#F6F6FB]">
      <SportsMain scheduleData={result}></SportsMain>
    </div>
  )
}
