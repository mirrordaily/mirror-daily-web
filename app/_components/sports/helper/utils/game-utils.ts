import type { GameNode, GameDisplayStatus } from '../game-node'

/**
 * Filter games by their status
 * @param games - Array of games to filter
 * @param status - The status to filter by
 * @returns Filtered array of games
 */
export const filterGamesByStatus = (
  games: GameNode[] | undefined,
  status: GameDisplayStatus
): GameNode[] => {
  return games?.filter((game) => game.status === status) || []
}

/**
 * Get games currently ongoing
 * @param games - Array of games to filter
 * @returns Array of ongoing games
 */
export const getOngoingGames = (games: GameNode[] | undefined): GameNode[] => {
  return filterGamesByStatus(games, 'ONGOING')
}

/**
 * Get games that are upcoming
 * @param games - Array of games to filter
 * @returns Array of upcoming games
 */
export const getUpcomingGames = (games: GameNode[] | undefined): GameNode[] => {
  return filterGamesByStatus(games, 'UPCOMING')
}

/**
 * Get games that are finished
 * @param games - Array of games to filter
 * @returns Array of finished games
 */
export const getFinishedGames = (games: GameNode[] | undefined): GameNode[] => {
  return filterGamesByStatus(games, 'FINISHED')
}

/**
 * Get games that are postponed
 * @param games - Array of games to filter
 * @returns Array of postponed games
 */
export const getPostponedGames = (
  games: GameNode[] | undefined
): GameNode[] => {
  return filterGamesByStatus(games, 'POSTPONED')
}

/**
 * Check if there are any games with a specific status
 * @param games - Array of games to check
 * @param status - The status to check for
 * @returns True if there are games with the specified status
 */
export const hasGamesWithStatus = (
  games: GameNode[] | undefined,
  status: GameDisplayStatus
): boolean => {
  return filterGamesByStatus(games, status).length > 0
}
