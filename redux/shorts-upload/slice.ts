import {
  AVAILABLE_IMAGE_MIME_TYPE,
  AVAILABLE_VIDEO_MIME_TYPE,
  MAX_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
} from '@/constants/multimedia'
import { getImageFromFrame, convertBlobToString } from '@/utils/file'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { checkShortsTitle, checkEmail } from '@/utils/common'

type CustomFile = File | null | undefined

export enum IMAGE_TYPE {
  Auto = 'auto',
  Manual = 'manual',
}

export enum IMAGE_STATE {
  Default = 'default',
  Success = 'success',
  Error = 'error',
}

type ShortsUploadState = {
  isModalOpened: boolean
  shortsFileName: string
  shortsFileBlobURL: string
  shortsFileType: string
  shortsFileHasError: boolean
  autoImageFileName: string
  autoImageBlobURL: string
  autoImageFileType: string
  manualImageFileName: string
  manualImageBlobURL: string
  manualImageFileType: string
  manualImageState: IMAGE_STATE
  selectedImage: IMAGE_TYPE
  title: string
  isTitleValid: boolean
  description: string
  user: string
  email: string
  isEmailValid: boolean
  isToSChecked: boolean
  isCopyrightChecked: boolean
}

const initialState: ShortsUploadState = {
  isModalOpened: false,
  shortsFileName: '',
  shortsFileBlobURL: '',
  shortsFileType: '',
  shortsFileHasError: false,
  autoImageFileName: '',
  autoImageBlobURL: '',
  autoImageFileType: '',
  manualImageFileName: '',
  manualImageBlobURL: '',
  manualImageFileType: '',
  manualImageState: IMAGE_STATE.Default,
  selectedImage: IMAGE_TYPE.Auto,
  title: '',
  isTitleValid: false,
  description: '',
  user: '',
  email: '',
  isEmailValid: false,
  isToSChecked: false,
  isCopyrightChecked: false,
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

export const changeManualImage = createAction(
  'shortsUpload/setManualImage',
  (file: CustomFile) => {
    const data: {
      name: string
      image: string
      fileType: string
    } = {
      name: '',
      image: '',
      fileType: '',
    }

    if (
      file instanceof File &&
      file.size < MAX_IMAGE_SIZE &&
      AVAILABLE_IMAGE_MIME_TYPE.includes(file.type)
    ) {
      data.name = file.name
      data.fileType = file.type
      data.image = convertBlobToString(file)
    }

    return {
      payload: data,
    }
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
    setSelectedImage: (state, action: PayloadAction<IMAGE_TYPE>) => {
      state.selectedImage = action.payload
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
      state.isTitleValid = checkShortsTitle(action.payload)
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
      state.isEmailValid = checkEmail(action.payload)
    },
    setIsToSChecked: (state, action: PayloadAction<boolean>) => {
      state.isToSChecked = action.payload
    },
    setIsCopyrightChecked: (state, action: PayloadAction<boolean>) => {
      state.isCopyrightChecked = action.payload
    },
    setIsModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isModalOpened = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeShortsFile.fulfilled, (state, action) => {
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
      .addCase(changeManualImage, (state, action) => {
        const { name, image, fileType } = action.payload

        if (image) {
          state.manualImageFileName = name
          state.manualImageFileType = fileType
          state.manualImageBlobURL = image
          state.manualImageState = IMAGE_STATE.Success
          state.selectedImage = IMAGE_TYPE.Manual
        } else {
          state.manualImageFileName = ''
          state.manualImageFileType = ''
          state.manualImageBlobURL = ''
          state.manualImageState = IMAGE_STATE.Error
          state.selectedImage = IMAGE_TYPE.Auto
        }
      })
  },
})

export const shortsUploadActions = shortsUploadSlice.actions

export default shortsUploadSlice.reducer
