import { IMAGE_TYPE } from './slice'
import type { AppState } from '../store'

export const selectShorts = (state: AppState) => ({
  name: state.shortsUpload.shortsFileName,
  blobURL: state.shortsUpload.shortsFileBlobURL,
  type: state.shortsUpload.shortsFileType,
  hasError: state.shortsUpload.shortsFileHasError,
})

export const selectAutoImage = (state: AppState) => ({
  name: state.shortsUpload.autoImageFileName,
  blobURL: state.shortsUpload.autoImageBlobURL,
  type: state.shortsUpload.autoImageFileType,
})

export const selectManualImage = (state: AppState) => ({
  name: state.shortsUpload.manualImageFileName,
  blobURL: state.shortsUpload.manualImageBlobURL,
  type: state.shortsUpload.manualImageFileType,
  state: state.shortsUpload.manualImageState,
})

export const selectImage = (state: AppState) => state.shortsUpload.selectedImage

export const selectTitle = (state: AppState) => state.shortsUpload.title

export const selectDescription = (state: AppState) =>
  state.shortsUpload.description

export const selectUser = (state: AppState) => state.shortsUpload.user

export const selectEmail = (state: AppState) => state.shortsUpload.email

export const selectIsToSChecked = (state: AppState) =>
  state.shortsUpload.isToSChecked

export const selectIsCopyRightChecked = (state: AppState) =>
  state.shortsUpload.isCopyrightChecked

export const selectIsFormValid = (state: AppState) =>
  state.shortsUpload.isToSChecked &&
  state.shortsUpload.isCopyrightChecked &&
  state.shortsUpload.isTitleValid &&
  state.shortsUpload.isEmailValid &&
  Boolean(state.shortsUpload.shortsFileBlobURL) &&
  ((state.shortsUpload.selectedImage === IMAGE_TYPE.Auto &&
    Boolean(state.shortsUpload.autoImageBlobURL)) ||
    (state.shortsUpload.selectedImage === IMAGE_TYPE.Manual &&
      Boolean(state.shortsUpload.manualImageBlobURL)))

export const selectIsModalOpened = (state: AppState) =>
  state.shortsUpload.isModalOpened
