import type { AppState } from '../store'

export const selectIsInitialized = (state: AppState) =>
  state.homepage.isInitialized

export const selectLiveEvent = (state: AppState) => state.homepage.liveEvent

export const selectLatestPosts = (state: AppState) => state.homepage.latestPosts

export const selectPopularNews = (state: AppState) => state.homepage.popularNews
