import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import type { AppState, AppDispatch } from './store'

export const listenerMiddleware = createListenerMiddleware()

export const startStoreListening = listenerMiddleware.startListening.withTypes<
  AppState,
  AppDispatch,
  undefined
>()

export const addStoreListener = addListener.withTypes<AppState, AppDispatch>()
