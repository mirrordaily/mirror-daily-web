'use client'
import DateSwitcher from './date-switcher'
import GameInfoCard from './game-info-card'
import SelectMenu from './select-menu'
import { useMemo, useState, useCallback } from 'react'
import type { LatestSportsNewsData, SportsGameData } from '@/types/homepage'
import dayjs, { type Dayjs } from 'dayjs'
import { eventGameMap } from './helper/game-map'
import { useSportsEventsRTK } from '@/hooks/use-sports-events-rtk-query'
import CustomImage from '@readr-media/react-image'
import 'dayjs/locale/zh-tw'
import Link from 'next/link'
import { getStoryPageUrl } from '@/utils/site-urls'

dayjs.locale('zh-tw')
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
  // RTK Query approach for polling
  const { data } = useSportsEventsRTK({
    initialData: scheduleData,
    pollingInterval: POLLING_INTERVAL_TIME,
    skipPollingIfUnfocused: true,
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

      const sortedDateKeys = Array.from(sportGameMap.keys()).sort(
        (a, b) => dayjs(a).valueOf() - dayjs(b).valueOf()
      )

      if (sortedDateKeys.length === 0) {
        return today
      }

      const firstDate = dayjs(sortedDateKeys[0]).startOf('day')
      const lastDate = dayjs(sortedDateKeys[sortedDateKeys.length - 1]).startOf(
        'day'
      )

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

    const sortedDateKeys = Array.from(allGamesByDateMap.keys()).sort(
      (a, b) => dayjs(a).valueOf() - dayjs(b).valueOf()
    )
    return {
      overallEarliestStartTime: dayjs(sortedDateKeys.at(0)).startOf('day'),
      overallLatestStartTime: dayjs(sortedDateKeys.at(-1)).startOf('day'),
    }
  }, [processedGameMap])

  const selectedSchedule = useMemo(
    () =>
      processedGameMap
        .get(selectedSport)
        ?.get(dayjs(selectedDate).format('YYYY-MM-DD')),
    [processedGameMap, selectedSport, selectedDate]
  )

  const shouldShowSportsNews = useMemo(() => {
    if (!selectedSchedule) return true

    const ongoingGames = selectedSchedule.filter(
      (game) => game.status === 'ONGOING'
    )
    const upcomingGames = selectedSchedule.filter(
      (game) => game.status === 'UPCOMING'
    )
    const finishedGames = selectedSchedule.filter(
      (game) => game.status === 'FINISHED'
    )

    return (
      ongoingGames.length === 0 &&
      upcomingGames.length === 0 &&
      finishedGames.length === 0
    )
  }, [selectedSchedule])
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
    <div className="flex min-h-fit w-[344px] flex-col">
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
        <section className="flex h-full items-center justify-center text-black-primary-400 lg:max-h-[285px]">
          {`${selectedSportDisplayName} 於${dayjs(selectedDate)
            .format('M/D （dddd）')
            .replace('星期', '週')}沒有賽事`}
        </section>
      )}
      {selectedSchedule?.filter((game) => game.status === 'ONGOING').length ? (
        <p className="mb-2 mt-5 text-base font-medium text-black-primary-500">
          進行中
        </p>
      ) : null}
      <div className="flex flex-col lg:gap-3">
        {selectedSchedule
          ?.filter((game) => game.status === 'ONGOING')
          ?.map((node) => (
            <GameInfoCard
              key={node.id}
              gameData={node}
              selectedDate={selectedDate}
            />
          ))}
      </div>
      {selectedSchedule?.filter((game) => game.status === 'UPCOMING').length ? (
        <p className="mb-2 mt-5 text-base font-medium text-black-primary-500">
          即將到來
        </p>
      ) : null}
      <div className="flex flex-col lg:gap-3">
        {selectedSchedule
          ?.filter((game) => game.status === 'UPCOMING')
          ?.map((node) => (
            <GameInfoCard
              key={node.id}
              gameData={node}
              selectedDate={selectedDate}
            />
          ))}
      </div>
      {selectedSchedule?.filter((game) => game.status === 'FINISHED').length ? (
        <p className="mb-2 mt-5 text-base font-medium text-black-primary-500">
          已結束
        </p>
      ) : null}
      <div className="flex flex-col gap-2 lg:gap-3">
        {selectedSchedule
          ?.filter((game) => game.status === 'FINISHED')
          ?.map((node) => (
            <GameInfoCard
              key={node.id}
              gameData={node}
              selectedDate={selectedDate}
            />
          ))}
      </div>
      {shouldShowSportsNews && (
        <div>
          <p className="mb-2 mt-5 text-base font-medium text-black-primary-500">
            相關報導
          </p>
          <div className="flex flex-col rounded-2xs border-[0.5px] border-black-primary-300 bg-white lg:gap-3 lg:p-4">
            {latestSportsNewsData?.map((news) => {
              console.log({
                images: news.heroImage.resized,
                imagesWebP: news.heroImage.resizedWebp,
              })
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
                    <p className="text-sm leading-6 text-black-primary-800 lg:line-clamp-3">
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
