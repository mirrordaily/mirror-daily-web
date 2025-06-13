import { configureStore } from '@reduxjs/toolkit'
import shortsUploadReducer from './shorts-upload/slice'
import homepageReducer from './homepage/slice'
import referrerReducer from './referrer/slice'
import { sportsEventsApi } from './sports-events/api'
import { listenerMiddleware } from './listener-middleware'

export const makeStore = () => {
  return configureStore({
    reducer: {
      shortsUpload: shortsUploadReducer,
      homepage: homepageReducer,
      referrer: referrerReducer,
      [sportsEventsApi.reducerPath]: sportsEventsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(sportsEventsApi.middleware)
        .prepend(listenerMiddleware.middleware),
  })
}

export type RootStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<RootStore['getState']>
export type AppDispatch = RootStore['dispatch']
