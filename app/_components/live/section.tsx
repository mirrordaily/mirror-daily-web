import { fetchLiveEvent } from '@/app/actions'
import LiveSectionMain from './main'
import { fetchLatestVideos } from '@/app/actions-general'
import { LATEST_VIDEOS_TYPE } from '@/types/common'
// import LatestVideoList from './latest-video-list'
import dynamic from 'next/dynamic'

const LatestVideoList = dynamic(() => import('./latest-video-list'), {
  ssr: false,
})
export default async function LiveSection() {
  const liveEventData = await fetchLiveEvent()
  /**
   * 目前最新影音會在兩個條件都成就才會顯示
   * 1. 電腦版
   * 2. 有直播活動
   * 並且只會顯示最新的三部影片，因此取3
   */
  const LATEST_VIDEOS_AMOUNT = 3
  const latestVideosData = await fetchLatestVideos(
    LATEST_VIDEOS_TYPE.NEWS,
    LATEST_VIDEOS_AMOUNT
  )
  const hasLiveEventData = !!liveEventData?.link
  if (!hasLiveEventData) return <></>
  return (
    <section className="section-in-homepage items-center py-7 lg:flex lg:items-start">
      <div className="flex grow flex-col justify-start lg:w-[640px]">
        <p className="mb-6 w-full text-center text-lg font-bold leading-none text-mirror-blue-700 lg:text-start">
          直播區
        </p>
        <div className="lg:mr-11 lg:h-[364px] lg:border-r lg:border-r-black lg:pr-11">
          <LiveSectionMain {...liveEventData} />
        </div>
      </div>
      <div className="hidden lg:flex lg:w-[400px] lg:flex-col lg:justify-start lg:self-stretch">
        <p className="mb-6 w-full text-center text-lg font-bold leading-none text-mirror-blue-700 lg:text-start">
          最新影音
        </p>
        <LatestVideoList latestVideos={latestVideosData} />
      </div>
    </section>
  )
}
