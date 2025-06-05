'use client'
import DateSwitcher from './date-switcher'
import GameInfoCard from './game-info-card'
import SelectMenu from './select-menu'
import { useMemo, useState } from 'react'
import type { SportsGameData } from '@/types/homepage'
import { useWindowSize } from 'usehooks-ts'
import { createPortal } from 'react-dom'

type SportsMainProps = {
  scheduleData: SportsGameData[] | undefined
}

enum SportsEvents {
  ALL = 'ALL',
  CPBL = 'CPBL',
  TPBL = 'TPBL',
}

// TODO: dayjs可以使用
const groupGamesByStatus = (
  games: SportsGameData[],
  date: Date,
  selectedSport: SportsEvents
) => {
  const now = new Date()
  const filterSelectedSports = (league: SportsEvents) => {
    if (selectedSport === SportsEvents.ALL) return true
    return selectedSport === league.toUpperCase()
  }
  return {
    ongoing: games.filter(
      (game) =>
        filterSelectedSports(game.league as SportsEvents) &&
        game.presentStatus !== 1 &&
        new Date(game.startTime) <= now &&
        new Date(game.startTime).toDateString() === date.toDateString()
    ),
    // TODO: 如果當天沒有就會取最新兩場
    upcoming: games.filter(
      (game) =>
        filterSelectedSports(game.league as SportsEvents) &&
        game.presentStatus !== 1 &&
        new Date(game.startTime) > now &&
        new Date(game.startTime).toDateString() === date.toDateString()
    ),
    finished: games.filter(
      (game) =>
        filterSelectedSports(game.league as SportsEvents) &&
        game.presentStatus === 1 &&
        new Date(game.startTime).toDateString() === date.toDateString()
    ),
  }
}

export default function SportsMain({ scheduleData }: SportsMainProps) {
  const { width } = useWindowSize()
  const isDesktop = width >= 1200
  const [selectedSport, setSelectedSport] = useState<SportsEvents>(
    SportsEvents.ALL
  )
  const [selectedDate, setSelectedDate] = useState(
    new Date('2025-05-18T17:05:00')
  )

  //TODO: props should be passed to DateSwitcher
  const sportOptions = useMemo(
    () => [
      { value: SportsEvents.ALL, label: '全部賽事' },
      { value: SportsEvents.CPBL, label: 'CPBL' },
      { value: SportsEvents.TPBL, label: 'TPBL' },
    ],
    []
  )

  console.log({
    scheduleData,
    selectedSport,
    selectedDate,
  })
  return createPortal(
    <div>
      <section className="flex justify-between">
        <SelectMenu
          options={sportOptions}
          selectedValue={selectedSport}
          onSelectChange={(value) => setSelectedSport(value as SportsEvents)}
        />
        <DateSwitcher
          date={selectedDate}
          onSelectChange={(value) => setSelectedDate(value as Date)}
        />
      </section>
      <p className="mb-2 mt-5 text-base font-medium text-black-primary-500">
        進行中
      </p>
      {groupGamesByStatus(
        scheduleData ?? [],
        selectedDate,
        selectedSport
      ).ongoing.map((game) => (
        <GameInfoCard key={game.id} gameData={game} />
      ))}
      <p className="mb-2 mt-5 text-base font-medium text-black-primary-500">
        即將到來
      </p>
      {groupGamesByStatus(
        scheduleData ?? [],
        selectedDate,
        selectedSport
      ).upcoming.map((game) => (
        <GameInfoCard key={game.id} gameData={game} />
      ))}
      <p className="mb-2 mt-5 text-base font-medium text-black-primary-500">
        已結束
      </p>
      <section className="flex flex-col gap-2">
        {groupGamesByStatus(
          scheduleData ?? [],
          selectedDate,
          selectedSport
        ).finished.map((game) => (
          <GameInfoCard key={game.id} gameData={game} />
        ))}
      </section>
    </div>,
    document.querySelector(
      isDesktop ? '#sports-section-desktop-slug' : '#sports-section-mobile-slug'
    ) ?? document.body
  )
}
