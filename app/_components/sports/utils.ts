import { type SportsGameData } from '@/types/homepage'
import { SportsEvents } from './main'
import dayjs, { type Dayjs } from 'dayjs'

export function hasGamesOnDate(
  selectedSport: SportsEvents,
  selectedDate: Dayjs,
  scheduleData: SportsGameData[] | undefined
): boolean {
  if (!scheduleData || scheduleData.length === 0) {
    return false
  }

  const targetDayStart = selectedDate.startOf('day')

  return scheduleData.some((game) => {
    const gameDayStart = dayjs(game.startTime).startOf('day')

    if (!gameDayStart.isSame(targetDayStart)) {
      return false
    }

    if (selectedSport !== SportsEvents.ALL) {
      if (game.league?.toUpperCase() !== selectedSport) {
        return false
      }
    }

    return true
  })
}
