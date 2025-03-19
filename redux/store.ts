import { configureStore } from '@reduxjs/toolkit'
import shortsUploadReducer from './shorts-upload/slice'
import homepageReducer from './homepage/slice'
import { listenerMiddleware } from './listener-middleware'

export const makeStore = () => {
  return configureStore({
    reducer: {
      shortsUpload: shortsUploadReducer,
      homepage: homepageReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  })
}

export type RootStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<RootStore['getState']>
export type AppDispatch = RootStore['dispatch']
