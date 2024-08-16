import type { AppState } from '../store'

export const selectShorts = (state: AppState) => ({
  name: state.shortsUpload.shortsFileName,
  blobURL: state.shortsUpload.shortsFileBlobURL,
  type: state.shortsUpload.shortsFileType,
  hasError: state.shortsUpload.shortsFileHasError,
})
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export const selectIsFormValid = (state: AppState) => true
