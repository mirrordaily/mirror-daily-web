'use client'
import DateSwitcher from './date-switcher'
import GameInfoCard from './game-info-card'
import SelectMenu from './select-menu'
import { useMemo, useState, useCallback, useEffect } from 'react'
import type { LatestSportsNewsData, SportsGameData } from '@/types/homepage'
import dayjs, { type Dayjs } from 'dayjs'
import { eventGameMap } from './helper/game-map'
import { useSportsEventsRTK } from '@/hooks/use-sports-events-rtk-query'
import CustomImage from '@readr-media/react-image'
import Link from 'next/link'
import { getStoryPageUrl } from '@/utils/site-urls'
import {
  formatChineseDate,
  setupChineseLocale,
} from './helper/utils/date-utils'
import {
  getOngoingGames,
  getUpcomingGames,
  getFinishedGames,
  getPostponedGames,
  hasGamesWithStatus,
} from './helper/utils/game-utils'

setupChineseLocale()
type SportsMainProps = {
  scheduleData?: SportsGameData[]
  latestSportsNewsData?: LatestSportsNewsData[]
}

export enum SportsEvents {
  ALL = 'ALL',
  CPBL = 'CPBL',
  TPBL = 'TPBL',
}

export default function SportsMain({
  scheduleData,
  latestSportsNewsData,
}: SportsMainProps) {
  const POLLING_INTERVAL_TIME = 180000
  // 僅在使用者開始捲動之後才啟用抓取與輪詢
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (enabled) return
    const enable = () => setEnabled(true)
    window.addEventListener('scroll', enable, { once: true, passive: true })
    window.addEventListener('wheel', enable, { once: true, passive: true })
    window.addEventListener('touchstart', enable, { once: true, passive: true })
    return () => {
      window.removeEventListener('scroll', enable)
      window.removeEventListener('wheel', enable)
      window.removeEventListener('touchstart', enable)
    }
  }, [enabled])

  // RTK Query approach for polling（延後啟用）
  const { data } = useSportsEventsRTK({
    initialData: scheduleData,
    pollingInterval: POLLING_INTERVAL_TIME,
    skipPollingIfUnfocused: true,
    enabled,
  })

  // Use RTK Query data, fall back to initial data
  const activeScheduleData = data.length > 0 ? data : scheduleData

  const [selectedSport, setSelectedSport] = useState<SportsEvents>(
    SportsEvents.ALL
  )

  const processedGameMap = useMemo(() => {
    return eventGameMap(activeScheduleData)
  }, [activeScheduleData])

  // Helper function to calculate appropriate date for a sport
  const calculateDateForSport = useCallback(
    (sport: SportsEvents): Dayjs => {
      const today = dayjs().startOf('day')
      const sportGameMap = processedGameMap.get(sport)

      if (!sportGameMap || sportGameMap.size === 0) {
        return today
      }

      const dateKeys = Array.from(sportGameMap.keys())

      if (dateKeys.length === 0) {
        return today
      }

      const firstDate = dayjs(dateKeys[0]).startOf('day')
      const lastDate = dayjs(dateKeys[dateKeys.length - 1]).startOf('day')

      // Rule 1: Default use today
      // Rule 2: If today is later than processedGameMap's last day, use last day
      if (today.isAfter(lastDate)) {
        return lastDate
      }

      // Rule 3: If today is before processedGameMap's first day, use first day
      if (today.isBefore(firstDate)) {
        return firstDate
      }

      // Rule 1: Default use today (within range)
      return today
    },
    [processedGameMap]
  )

  const [selectedDate, setSelectedDate] = useState<Dayjs>(() =>
    calculateDateForSport(selectedSport)
  )

  // 計算日期的邊界
  const { overallEarliestStartTime, overallLatestStartTime } = useMemo(() => {
    const allGamesByDateMap = processedGameMap.get(SportsEvents.ALL)
    if (!allGamesByDateMap)
      return {
        overallEarliestStartTime: null,
        overallLatestStartTime: null,
      }

    const dateKeys = Array.from(allGamesByDateMap.keys())
    return {
      overallEarliestStartTime: dayjs(dateKeys.at(0)).startOf('day'),
      // 因為最後一個是"futureGames"
      overallLatestStartTime: dayjs(dateKeys.at(-2)).startOf('day'),
    }
  }, [processedGameMap])

  const selectedSchedule = useMemo(
    () =>
      processedGameMap
        .get(selectedSport)
        ?.get(dayjs(selectedDate).format('YYYY-MM-DD')),
    [processedGameMap, selectedSport, selectedDate]
  )

  const futureGames = useMemo(
    () => processedGameMap.get(selectedSport)?.get('futureGames') || [],
    [processedGameMap, selectedSport]
  )

  const shouldShowSportsNews = useMemo(() => {
    // 檢查該日期是否有任何狀態的賽事
    const hasAnyScheduledGames = selectedSchedule && selectedSchedule.length > 0

    if (hasAnyScheduledGames) {
      const ongoingGames = getOngoingGames(selectedSchedule)
      const upcomingGames = getUpcomingGames(selectedSchedule)
      const finishedGames = getFinishedGames(selectedSchedule)
      const postponedGames = getPostponedGames(selectedSchedule)

      // 如果有任何狀態的賽事，不顯示相關報導
      return (
        ongoingGames.length === 0 &&
        upcomingGames.length === 0 &&
        finishedGames.length === 0 &&
        postponedGames.length === 0
      )
    }

    // 如果該日期沒有賽事，檢查是否有 futureGames
    const hasFutureGames = futureGames.length > 0

    // 只有當該日期沒有任何賽事且沒有 futureGames 時，才顯示相關報導
    return !hasFutureGames
  }, [selectedSchedule, futureGames])
  const sportOptions = useMemo(
    () => [
      { value: SportsEvents.ALL, label: '全部賽事' },
      { value: SportsEvents.CPBL, label: 'CPBL' },
      { value: SportsEvents.TPBL, label: 'TPBL' },
    ],
    []
  )

  const selectedSportDisplayName = useMemo(() => {
    switch (selectedSport) {
      case SportsEvents.ALL:
        return 'CPBL 及 TPBL'
      case SportsEvents.CPBL:
        return 'CPBL'
      case SportsEvents.TPBL:
        return 'TPBL'
      default:
        return 'CPBL 及 TPBL'
    }
  }, [selectedSport])
  return (
    <div className="flex min-h-fit w-[344px] flex-col md:w-full">
      <section className="flex justify-between">
        <SelectMenu
          options={sportOptions}
          selectedValue={selectedSport}
          onSelectChange={(value) => {
            const newSport = value as SportsEvents
            setSelectedSport(newSport)
            setSelectedDate(calculateDateForSport(newSport))
          }}
        />
        <DateSwitcher
          date={selectedDate}
          onSelectChange={(value) => {
            if (
              value.isBefore(overallEarliestStartTime) ||
              value.isAfter(overallLatestStartTime)
            )
              return
            setSelectedDate(value)
          }}
        />
      </section>
      {/* NOTE: add this because upcoming will add 2 future games. */}
      {!selectedSchedule?.filter(
        (game) => game.date === dayjs(selectedDate).format('YYYY-MM-DD')
      ).length && (
        <section className="flex h-full min-h-16 items-center justify-center text-primary-400 md:h-16 lg:h-[285px] lg:max-h-[285px]">
          {`${selectedSportDisplayName} 於${formatChineseDate(selectedDate)}沒有賽事`}
        </section>
      )}
      {hasGamesWithStatus(selectedSchedule, 'ONGOING') ? (
        <p className="mb-2 mt-5 text-base font-medium text-primary-500">
          進行中
        </p>
      ) : null}
      <div className="flex flex-col gap-2 lg:gap-3">
        {getOngoingGames(selectedSchedule).map((node) => (
          <GameInfoCard
            key={node.id}
            gameData={node}
            selectedDate={selectedDate}
          />
        ))}
      </div>
      {hasGamesWithStatus(selectedSchedule, 'UPCOMING') ||
      (!selectedSchedule?.length && futureGames.length > 0) ? (
        <p className="mb-2 mt-5 text-base font-medium text-primary-500">
          即將到來
        </p>
      ) : null}
      <div className="flex flex-col gap-2 lg:gap-3">
        {selectedSchedule?.length
          ? getUpcomingGames(selectedSchedule).map((node) => (
              <GameInfoCard
                key={node.id}
                gameData={node}
                selectedDate={selectedDate}
              />
            ))
          : futureGames.map((node) => (
              <GameInfoCard
                key={node.id}
                gameData={node}
                selectedDate={selectedDate}
              />
            ))}
      </div>
      {hasGamesWithStatus(selectedSchedule, 'FINISHED') ? (
        <p className="mb-2 mt-5 text-base font-medium text-primary-500">
          已結束
        </p>
      ) : null}
      <div className="flex flex-col gap-2 lg:gap-3">
        {getFinishedGames(selectedSchedule).map((node) => (
          <GameInfoCard
            key={node.id}
            gameData={node}
            selectedDate={selectedDate}
          />
        ))}
      </div>
      {hasGamesWithStatus(selectedSchedule, 'POSTPONED') ? (
        <p className="mb-2 mt-5 text-base font-medium text-primary-500">延賽</p>
      ) : null}
      <div className="flex flex-col gap-2 lg:gap-3">
        {getPostponedGames(selectedSchedule).map((node) => (
          <GameInfoCard
            key={node.id}
            gameData={node}
            selectedDate={selectedDate}
          />
        ))}
      </div>
      {shouldShowSportsNews && (
        <div className="hidden lg:flex lg:flex-col">
          <p className="mb-2 mt-5 text-base font-medium text-primary-500">
            相關報導
          </p>
          <div className="flex flex-col rounded-2xs border-[0.5px] border-primary-300 bg-white lg:gap-3 lg:p-4">
            {latestSportsNewsData?.map((news) => {
              return (
                <Link
                  href={getStoryPageUrl(news.id)}
                  prefetch={false}
                  target="_blank"
                  key={news.id + news.title}
                >
                  <section className="flex lg:gap-3">
                    <div className="lg:aspect-[108/72] lg:h-[72px] lg:w-[108px]">
                      <CustomImage
                        images={news.heroImage.resized}
                        imagesWebP={news.heroImage.resizedWebp}
                        defaultImage="/images-next/default-image.png"
                        objectFit="cover"
                        className="lg:rounded-2xs"
                        alt={`${news.title}文章首圖`}
                        rwd={{
                          mobile: '100%',
                          tablet: '100%',
                          default: '100%',
                        }}
                      />
                    </div>
                    <p className="text-sm leading-6 text-primary-800 lg:line-clamp-3">
                      {news.title}
                    </p>
                  </section>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
