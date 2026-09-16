import type { SportsGameData } from '@/types/homepage'
import dayjs from 'dayjs'
import { SportsEvents } from '../main'

export type GameDisplayStatus =
  'UPCOMING' | 'ONGOING' | 'FINISHED' | 'POSTPONED'
// --- End of Type Definitions ---

export class GameNode {
  // Original properties from SportsGameData
  public readonly id: string | number
  public readonly league: string // Original league string, e.g., "cpbl"
  public readonly startTimeRaw: string // Raw startTime string
  public readonly endTimeRaw?: string | null // Raw endTime string
  public readonly result?: string
  public readonly gameResultName?: string // New field from API
  public readonly isGameStop?: boolean
  public readonly presentStatus?: number
  public readonly homeTeamName: string
  public readonly homeTeamScore: number
  public readonly homeTeamLogo: string
  public readonly visitingTeamName: string
  public readonly visitingTeamScore: number
  public readonly visitingTeamLogo: string
  public readonly currentPlay?: SportsGameData['currentPlay']

  // Derived and processed properties
  public readonly startTime: dayjs.Dayjs // Parsed startTime
  public readonly endTime?: dayjs.Dayjs // Parsed endTime, if valid
  public readonly date: string // Date of the game (YYYY-MM-DD) from startTime
  public readonly normalizedLeague: SportsEvents | string // Standardized league (e.g., SportsEvents.CPBL) or original string
  public readonly status: GameDisplayStatus

  constructor(gameData: SportsGameData) {
    // Assign original properties
    this.id = gameData.id
    this.league = gameData.league
    this.startTimeRaw = gameData.startTime
    this.endTimeRaw = gameData.endTime
    this.result = gameData.result
    this.gameResultName = gameData.gameResultName
    this.isGameStop = gameData.isGameStop
    this.presentStatus = gameData.presentStatus
    this.homeTeamName = gameData.homeTeamName
    this.homeTeamScore = gameData.homeTeamScore
    this.homeTeamLogo = gameData.homeTeamLogo
    this.visitingTeamName = gameData.visitingTeamName
    this.visitingTeamScore = gameData.visitingTeamScore
    this.visitingTeamLogo = gameData.visitingTeamLogo
    this.currentPlay = gameData.currentPlay

    // Initialize derived properties
    if (!dayjs(this.startTimeRaw).isValid()) {
      console.error(
        `GameNode Error: Invalid startTime for game id ${this.id}: "${this.startTimeRaw}"`
      )
      // Fallback to current time if startTime is invalid, or consider throwing an error
      this.startTime = dayjs()
    } else {
      this.startTime = dayjs(this.startTimeRaw)
    }

    this.date = this.startTime.format('YYYY-MM-DD')

    // Set endTime object only if endTimeRaw is a non-empty, valid date string
    if (
      this.endTimeRaw &&
      this.endTimeRaw.trim() !== '' &&
      dayjs(this.endTimeRaw).isValid()
    ) {
      this.endTime = dayjs(this.endTimeRaw)
    } else {
      this.endTime = undefined
    }

    this.normalizedLeague = this.standardizeLeagueName(this.league)
    this.status = this.calculateGameStatus()
  }

  private standardizeLeagueName(
    leagueIdentifier: string
  ): SportsEvents | string {
    const upperCaseLeague = leagueIdentifier.toUpperCase()
    if (upperCaseLeague === SportsEvents.CPBL) return SportsEvents.CPBL
    if (upperCaseLeague === SportsEvents.TPBL) return SportsEvents.TPBL
    return leagueIdentifier
  }

  private calculateGameStatus(): GameDisplayStatus {
    if (this.gameResultName === '延賽') return 'POSTPONED'
    if (this.endTime) return 'FINISHED'
    if (this.currentPlay) return 'ONGOING'
    return 'UPCOMING'
  }
}
