import type { SportsGameData } from '@/types/homepage'
import dayjs from 'dayjs'

// This enum should match the SportsEvents enum used in your project,
// typically for filtering or identifying league types.
export enum SportsEvents {
  ALL = 'ALL', // Usually for filtering, not a direct league type of a game
  CPBL = 'CPBL',
  TPBL = 'TPBL',
}

export type GameDisplayStatus = 'UPCOMING' | 'ONGOING' | 'FINISHED'
// --- End of Type Definitions ---

export class GameNode {
  // Original properties from SportsGameData
  public readonly id: string | number
  public readonly league: string // Original league string, e.g., "cpbl"
  public readonly startTimeRaw: string // Raw startTime string
  public readonly endTimeRaw?: string | null // Raw endTime string
  public readonly result?: string
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
    // This logic mirrors what's often seen in components like game-info-card:
    // A game is FINISHED if it has a valid endTime.
    // A game is ONGOING if it's not finished and has currentPlay data.
    // Otherwise, it's UPCOMING.

    if (this.endTime) {
      // this.endTime is a valid Dayjs object if endTimeRaw was valid
      return 'FINISHED'
    }
    if (this.currentPlay) {
      // Game has live play data and is not finished
      return 'ONGOING'
    }
    // No valid endTime and no currentPlay data
    return 'UPCOMING'
  }

  /**
   * Generates a display string for the game's status (e.g., "終場", "進行中", "上午10:00").
   * This is similar to the gameStatus() logic in your GameInfoCard.
   */
  public getFormattedStatusDisplay(): string {
    switch (this.status) {
      case 'FINISHED':
        return '終場'
      case 'ONGOING':
        if (this.currentPlay) {
          // Customize based on league rules if needed
          if (this.normalizedLeague === SportsEvents.CPBL) {
            return `${this.currentPlay.inning}局`
          }
          if (this.normalizedLeague === SportsEvents.TPBL) {
            return `第${this.currentPlay.inning}節`
          }
          return '進行中' // Default for other ongoing games
        }
        return '進行中' // Fallback if status is ONGOING but no currentPlay
      case 'UPCOMING': {
        // Format start time, e.g., "上午10:30" or "下午02:00"
        // Ensure dayjs locale is set correctly in your project for "上午/下午"
        const hour = this.startTime.hour()
        const period = hour < 12 ? '上午' : '下午'
        return `${period}${this.startTime.format('HH:mm')}`
      }
      default: {
        // Should not happen if status is correctly typed and calculated
        const exhaustiveCheck: never = this.status
        console.error(`Unexpected game status: ${exhaustiveCheck}`)
        return '未知狀態'
      }
    }
  }
}
