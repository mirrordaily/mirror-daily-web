import { fetchLiveEvent } from '@/app/actions'
import LiveSectionMain from './main'
import { fetchLatestVideos } from '@/app/actions-general'
import { LATEST_VIDEOS_TYPE } from '@/types/common'
import LatestVideoList from './latest-video-list'

export default async function LiveSection() {
  const liveEventData = await fetchLiveEvent()
  /**
   * 目前最新影音會在兩個條件都成就才會顯示
   * 1. 電腦版
   * 2. 有直播活動
   * 並且只會顯示最新的三部影片，因此取3
   */
  const LATEST_VIDEOS_AMOUNT = 10
  const latestVideosData = await fetchLatestVideos(
    LATEST_VIDEOS_TYPE.NEWS,
    LATEST_VIDEOS_AMOUNT
  )
  const hasLiveEventData = !!liveEventData?.link
  console.log({ latestVideosData })
  if (!hasLiveEventData) return <></>
  return (
    <section className="section-in-homepage items-center py-7 lg:flex lg:items-start">
      <div className="flex flex-col justify-start">
        <p className="mb-6 w-full text-center text-lg font-bold leading-none text-mirror-blue-700">
          直播區
        </p>
        <LiveSectionMain {...liveEventData} />
      </div>
      <div className="flex flex-col justify-start">
        <p className="mb-6 w-full text-center text-lg font-bold leading-none text-mirror-blue-700">
          最新影音
        </p>
        <LatestVideoList latestVideos={latestVideosData} />
      </div>
    </section>
  )
}
