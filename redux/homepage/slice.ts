import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { HeaderData, LatestPost, PopularNews } from '@/types/common'
import {
  fetchLatestPost,
  fetchPopularPost,
} from '@/utils/client-side-data-fetch'
import type { PickupItemInTopNewsSection } from '@/types/homepage'
import { fetchLiveEvent } from '@/app/actions'

type LatestPostState = {
  isInitialized: boolean
  isPopularInitialized: boolean
  liveEvent: PickupItemInTopNewsSection | null
  latestPosts: LatestPost[]
  popularNews: PopularNews[]
}

const initialState: LatestPostState = {
  isInitialized: false,
  isPopularInitialized: false,
  liveEvent: null,
  latestPosts: [],
  popularNews: [],
}

export const initializeData = createAsyncThunk(
  'homepage/initialize',
  async (headerData: HeaderData[]) => {
    const liveEvent = await fetchLiveEvent()
    const latestPosts = await fetchLatestPost(headerData, 1)
    return {
      liveEvent,
      latestPosts,
    }
  }
)

export const fetchPopularNews = createAsyncThunk(
  'homepage/fetchPopular',
  async (headerData: HeaderData[]) => {
    const popularNews = await fetchPopularPost(headerData)
    return popularNews
  }
)

const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    resetAllState: () => initialState,
    setLiveEvent: (
      state,
      action: PayloadAction<PickupItemInTopNewsSection | null>
    ) => {
      state.liveEvent = action.payload
    },
    setLatestPosts: (state, action: PayloadAction<LatestPost[]>) => {
      state.latestPosts = action.payload
    },
    setPopularNews: (state, action: PayloadAction<PopularNews[]>) => {
      state.popularNews = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeData.fulfilled, (state, action) => {
      const { liveEvent, latestPosts } = action.payload

      state.isInitialized = true
      state.liveEvent = liveEvent
      state.latestPosts = latestPosts
    })

    builder.addCase(fetchPopularNews.fulfilled, (state, action) => {
      state.isPopularInitialized = true
      state.popularNews = action.payload
    })
  },
})

export const homepageSliceActions = homepageSlice.actions

export default homepageSlice.reducer
