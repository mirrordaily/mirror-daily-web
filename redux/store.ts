import { configureStore } from '@reduxjs/toolkit'
export const makeStore = () => {
  return configureStore({})
}

export type RootStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<RootStore['getState']>
export type AppDispatch = RootStore['dispatch']
