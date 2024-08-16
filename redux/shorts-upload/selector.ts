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
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export const selectIsFormValid = (state: AppState) => true
