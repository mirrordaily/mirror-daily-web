import { configureStore } from '@reduxjs/toolkit'
import shortsUploadReducer from './shorts-upload/slice'
import { listenerMiddleware, startStoreListening } from './listener-middleware'
import {
  selectAutoImage,
  selectManualImage,
  selectShorts,
} from './shorts-upload/selector'

/** revoke blob URL during related state changing to prevent memory leaks */
startStoreListening({
  predicate: (_, currentState, originalState) => {
    return (
      currentState.shortsUpload.shortsFileBlobURL !==
      originalState.shortsUpload.shortsFileBlobURL
    )
  },
  effect: (_, listenApi) => {
    const shorts = selectShorts(listenApi.getOriginalState())
    if (shorts.blobURL) {
      URL.revokeObjectURL(shorts.blobURL)
    }
  },
})

startStoreListening({
  predicate: (_, currentState, originalState) => {
    return (
      currentState.shortsUpload.autoImageBlobURL !==
      originalState.shortsUpload.autoImageBlobURL
    )
  },
  effect: (_, listenApi) => {
    const autoImage = selectAutoImage(listenApi.getOriginalState())
    if (autoImage.blobURL) {
      URL.revokeObjectURL(autoImage.blobURL)
    }
  },
})

startStoreListening({
  predicate: (_, currentState, originalState) => {
    return (
      currentState.shortsUpload.manualImageBlobURL !==
      originalState.shortsUpload.manualImageBlobURL
    )
  },
  effect: (_, listenApi) => {
    const manualImage = selectManualImage(listenApi.getOriginalState())
    if (manualImage.blobURL) {
      URL.revokeObjectURL(manualImage.blobURL)
    }
  },
})

export const makeStore = () => {
  return configureStore({
    reducer: {
      shortsUpload: shortsUploadReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  })
}

export type RootStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<RootStore['getState']>
export type AppDispatch = RootStore['dispatch']
