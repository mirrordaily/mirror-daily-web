import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import type { AppState, AppDispatch } from './store'
import {
  selectAutoImage,
  selectManualImage,
  selectShorts,
} from './shorts-upload/selector'

export const listenerMiddleware = createListenerMiddleware()

export const startStoreListening = listenerMiddleware.startListening.withTypes<
  AppState,
  AppDispatch,
  undefined
>()

export const addStoreListener = addListener.withTypes<AppState, AppDispatch>()

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
      console.log('revoke shorts blobURL //')
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
      console.log('revoke autoImage blobURL //')
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
      console.log('revoke manualImage blobURL //')
      URL.revokeObjectURL(manualImage.blobURL)
    }
  },
})
