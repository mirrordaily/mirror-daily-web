import {
  AVAILABLE_VIDEO_MIME_TYPE,
  MAX_VIDEO_SIZE,
} from '@/constants/multimedia'
import { getImageFromFrame, convertBlobToString } from '@/utils/file'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { checkShortsTitle } from '@/utils/common'

type CustomFile = File | null | undefined
type ShortsUploadState = {
  shortsFileName: string
  shortsFileBlobURL: string
  shortsFileType: string
  shortsFileHasError: boolean
  autoImageFileName: string
  autoImageBlobURL: string
  autoImageFileType: string
  title: string
  isTitleValid: boolean
}

const initialState: ShortsUploadState = {
  shortsFileName: '',
  shortsFileBlobURL: '',
  shortsFileType: '',
  shortsFileHasError: false,
  autoImageFileName: '',
  autoImageBlobURL: '',
  autoImageFileType: '',
  title: '',
  isTitleValid: false,
}

export const changeShortsFile = createAsyncThunk(
  'shortsUpload/setShortsFileAndAutoImage',
  async (file: CustomFile) => {
    const data: {
      name: string
      shorts: string
      fileType: string
      previewName: string
      autoPreview: string
      previewFileType: string
    } = {
      name: '',
      shorts: '',
      fileType: '',
      previewName: '',
      autoPreview: '',
      previewFileType: '',
    }

    if (
      file instanceof File &&
      file.size < MAX_VIDEO_SIZE &&
      AVAILABLE_VIDEO_MIME_TYPE.includes(file.type)
    ) {
      const preview = await getImageFromFrame(file)
      data.name = file.name
      data.fileType = file.type
      data.shorts = convertBlobToString(file)
      data.previewName = preview.name
      data.previewFileType = preview.type
      data.autoPreview = convertBlobToString(preview)
    }

    return data
  }
)
const shortsUploadSlice = createSlice({
  name: 'shortsUpload',
  initialState,
  reducers: {
    resetAllState: () => initialState,
    resetShortsFile: (state) => {
      state.shortsFileHasError = false
      state.shortsFileBlobURL = ''
      state.shortsFileType = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeShortsFile.fulfilled, (state, action) => {
      const {
        name,
        shorts,
        fileType,
        previewName,
        autoPreview,
        previewFileType,
      } = action.payload

      if (shorts && autoPreview) {
        state.shortsFileName = name
        state.shortsFileBlobURL = shorts
        state.shortsFileType = fileType
        state.shortsFileHasError = false
        state.autoImageFileName = previewName
        state.autoImageBlobURL = autoPreview
        state.autoImageFileType = previewFileType
        state.title = name
        state.isTitleValid = checkShortsTitle(name)
      } else {
        state.shortsFileHasError = true
      }
    })
  },
})

export const shortsUploadActions = shortsUploadSlice.actions

export default shortsUploadSlice.reducer
