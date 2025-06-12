'use client'
import DateSwitcher from './date-switcher'
import GameInfoCard from './game-info-card'
import SelectMenu from './select-menu'
import { useMemo, useState } from 'react'
import type { SportsGameData } from '@/types/homepage'
import dayjs, { type Dayjs } from 'dayjs'
import 'dayjs/locale/zh-tw'
import { hasGamesOnDate } from './utils'
import { eventGameMap } from './game-map'

dayjs.locale('zh-tw')
type SportsMainProps = {
  scheduleData: SportsGameData[] | undefined
}

export enum SportsEvents {
  ALL = 'ALL',
  CPBL = 'CPBL',
  TPBL = 'TPBL',
}

export default function SportsMain({ scheduleData }: SportsMainProps) {
  const [selectedSport, setSelectedSport] = useState<SportsEvents>(
    SportsEvents.ALL
  )
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const processedGameMap = useMemo(() => {
    return eventGameMap(scheduleData)
  }, [scheduleData])

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

  //TODO: props should be passed to DateSwitcher
  const sportOptions = useMemo(
    () => [
      { value: SportsEvents.ALL, label: '全部賽事' },
      { value: SportsEvents.CPBL, label: 'CPBL' },
      { value: SportsEvents.TPBL, label: 'TPBL' },
    ],
    []
  )
  return (
    <div className="flex w-[344px] flex-col">
      <section className="flex justify-between">
        <SelectMenu
          options={sportOptions}
          selectedValue={selectedSport}
          onSelectChange={(value) => setSelectedSport(value as SportsEvents)}
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
      {!processedGameMap
        .get(selectedSport)
        ?.get(dayjs(selectedDate).format('YYYY-MM-DD'))
        // NOTE: add this because upcoming will add 2 future games.
        ?.filter(
          (game) => game.date === dayjs(selectedDate).format('YYYY-MM-DD')
        ).length && (
        <section className="flex h-full items-center justify-center text-black-primary-400">
          {`CPBL 及 TPBL 於${dayjs(selectedDate)
            .format('M/D （dddd）')
            .replace('星期', '週')}沒有賽事`}
        </section>
      )}
      {processedGameMap
        .get(selectedSport)
        ?.get(dayjs(selectedDate).format('YYYY-MM-DD'))
        ?.filter((game) => game.status === 'ONGOING').length ? (
        <p className="mb-2 mt-5 text-base font-medium text-black-primary-500">
          進行中
        </p>
      ) : null}
      <div className="flex flex-col lg:gap-3">
        {processedGameMap
          .get(selectedSport)
          ?.get(dayjs(selectedDate).format('YYYY-MM-DD'))
          ?.filter((game) => game.status === 'ONGOING')
          ?.map((node) => (
            <GameInfoCard
              key={node.id}
              gameData={node}
              selectedDate={selectedDate}
            />
          ))}
      </div>
      {processedGameMap
        .get(selectedSport)
        ?.get(dayjs(selectedDate).format('YYYY-MM-DD'))
        ?.filter((game) => game.status === 'UPCOMING').length ? (
        <p className="mb-2 mt-5 text-base font-medium text-black-primary-500">
          即將到來
        </p>
      ) : null}
      <div className="flex flex-col lg:gap-3">
        {processedGameMap
          .get(selectedSport)
          ?.get(dayjs(selectedDate).format('YYYY-MM-DD'))
          ?.filter((game) => game.status === 'UPCOMING')
          ?.map((node) => (
            <GameInfoCard
              key={node.id}
              gameData={node}
              selectedDate={selectedDate}
            />
          ))}
      </div>
      {processedGameMap
        .get(selectedSport)
        ?.get(dayjs(selectedDate).format('YYYY-MM-DD'))
        ?.filter((game) => game.status === 'FINISHED').length ? (
        <p className="mb-2 mt-5 text-base font-medium text-black-primary-500">
          已結束
        </p>
      ) : null}
      <div className="flex flex-col gap-2 lg:gap-3">
        {processedGameMap
          .get(selectedSport)
          ?.get(dayjs(selectedDate).format('YYYY-MM-DD'))
          ?.filter((game) => game.status === 'FINISHED')
          ?.map((node) => (
            <GameInfoCard
              key={node.id}
              gameData={node}
              selectedDate={selectedDate}
            />
          ))}
      </div>
    </div>
  )
}
