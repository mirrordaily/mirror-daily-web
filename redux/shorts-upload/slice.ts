type ShortsUploadState = {
  shortsFileName: string
  shortsFileBlobURL: string
  shortsFileType: string
  shortsFileHasError: boolean
}

const initialState: ShortsUploadState = {
  shortsFileName: '',
  shortsFileBlobURL: '',
  shortsFileType: '',
  shortsFileHasError: false,
}

const shortsUploadSlice = createSlice({
  name: 'shortsUpload',
  initialState,
  reducers: {
    resetAllState: () => initialState,
  },
})

export const shortsUploadActions = shortsUploadSlice.actions

export default shortsUploadSlice.reducer
