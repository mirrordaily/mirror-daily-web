import { fetchLiveEvent } from '@/app/actions'
import LiveSectionMain from './main'

export default async function LiveSection() {
  const liveEventData = await fetchLiveEvent()
  const hasLiveEventData = !!liveEventData?.link
  console.log({ liveEventData })
  if (!hasLiveEventData) return <></>
  return (
    <section className="section-in-homepage items-center py-7">
      <p className="mb-6 w-full text-center text-lg font-bold leading-none text-mirror-blue-700">
        直播區
      </p>
      <LiveSectionMain {...liveEventData} />
    </section>
  )
}
