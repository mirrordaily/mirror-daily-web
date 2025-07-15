import { fetchLiveEvent } from '@/app/actions'
import { fetchLatestVideos } from '@/app/actions-general'
import { LATEST_VIDEOS_TYPE } from '@/types/common'
import dynamic from 'next/dynamic'

const LatestVideoList = dynamic(() => import('./latest-video-list'), {
  ssr: false,
})
const LiveSectionMain = dynamic(() => import('./main'), {
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
        <p className="mb-4 w-full text-center text-lg font-bold leading-none text-mirror-blue-700 md:mb-5 lg:mb-4 lg:text-start">
          直播區
        </p>
        <div className="lg:mr-9 lg:border-r lg:border-r-primary-800 lg:pr-9">
          <div className="lg:h-[360px]">
            <LiveSectionMain {...liveEventData} />
          </div>
          <div className="mt-4 w-full text-justify text-base/[1.2] font-medium text-primary-800 md:mx-auto md:mt-5 md:w-[504px] lg:mx-0 lg:mt-4 lg:w-[600px] lg:text-xl/[1.2] lg:font-bold">
            {liveEventData.postName}
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-[455px] lg:flex-col lg:justify-start lg:self-stretch">
        <p className="mb-4 w-full text-center text-lg font-bold leading-none text-mirror-blue-700 lg:text-start">
          最新影音
        </p>
        <LatestVideoList latestVideos={latestVideosData} />
      </div>
    </section>
  )
}
