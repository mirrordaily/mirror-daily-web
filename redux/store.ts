import { configureStore } from '@reduxjs/toolkit'
import shortsUploadReducer from './shorts-upload/slice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      shortsUpload: shortsUploadReducer,
    },
  })
}

export type RootStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<RootStore['getState']>
export type AppDispatch = RootStore['dispatch']
