'use client'
import DateSwitcher from './date-switcher'
import GameInfoCard from './game-info-card'
import SelectMenu from './select-menu'
import type { z } from 'zod'
import type {
  gameSchema,
  sportsEventsApiResponseSchema,
} from '@/utils/data-schema' // Adjust path as needed
import { useMemo, useState } from 'react'

type DailyScheduleSports = z.infer<typeof sportsEventsApiResponseSchema>
type SportsMainProps = {
  scheduleData: DailyScheduleSports | undefined
}
type GameType = z.infer<typeof gameSchema>
enum SportsEvents {
  ALL = 'ALL',
  CPBL = 'CPBL',
  TPBL = 'TPBL',
}

enum DateChangeType {
  PREVIOUS = 'previous',
  NEXT = 'next',
}
const groupGamesByStatus = (games: GameType[]) => {
  const now = new Date()
  return {
    ongoing: games.filter(
      (game) => game.present_status !== 1 && new Date(game.datetime) <= now
    ),
    upcoming: games.filter(
      (game) => game.present_status !== 1 && new Date(game.datetime) > now
    ),
    finished: games.filter((game) => game.present_status === 1),
  }
}

export default function SportsMain({ scheduleData }: SportsMainProps) {
  const [selectedSport, setSelectedSport] = useState<SportsEvents>(
    SportsEvents.ALL
  )
  const [selectedDate, setSelectedDate] = useState(new Date())
  //TODO: props should be passed to DateSwitcher
  const sportOptions = useMemo(
    () => [
      { value: SportsEvents.ALL, label: '全部賽事' },
      { value: SportsEvents.CPBL, label: 'CPBL' },
      { value: SportsEvents.TPBL, label: 'TPBL' },
      // Add more sports as they become available from scheduleData
    ],
    []
  )
  const cpblDailySchedules = scheduleData?.cpbl // Assuming scheduleData.cpbl is Array<{date: string, games: GameType[]}>
  const allCpblGames: GameType[] = cpblDailySchedules
    ? cpblDailySchedules.flatMap((schedule) => schedule.games)
    : []
  console.log({
    scheduleData,
    selectedSport,
    games: groupGamesByStatus(allCpblGames),
    selectedDate,
  })
  return (
    <div>
      <section className="flex">
        <SelectMenu
          options={sportOptions}
          selectedValue={selectedSport}
          onSelectChange={(value) => setSelectedSport(value as SportsEvents)}
        />
        <DateSwitcher
          onSelectChange={(value) => setSelectedDate(value as DateChangeType)}
        />
      </section>
      <p>進行中</p>
      <GameInfoCard />
      <p>即將到來</p>
      <GameInfoCard />
      <p>已結束</p>
      <GameInfoCard />
    </div>
  )
}
