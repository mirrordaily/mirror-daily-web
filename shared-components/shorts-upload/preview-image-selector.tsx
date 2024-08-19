import NextImage from 'next/image'
import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  changeManualImage,
  IMAGE_STATE,
  IMAGE_TYPE,
  shortsUploadActions,
} from '@/redux/shorts-upload/slice'
import {
  selectAutoImage,
  selectImage,
  selectManualImage,
  selectShorts,
} from '@/redux/shorts-upload/selector'
import type { ChangeEvent } from 'react'
import {
  AVAILABLE_IMAGE_MIME_TYPE,
  MAX_IMAGE_SIZE,
} from '@/constants/multimedia'
import InputLabel from './input-label'
import CustomText from './custom-text'
import IconUploadImage from '@/public/icons/shorts-upload/upload-image.svg'
import { convertStringToFile } from '@/utils/file'
import { MEGABYTES } from '@/constants/storage-unit'

export default function PreviewImageSelector() {
  const dispatch = useAppDispatch()
  const selected = useAppSelector(selectImage)
  const { name } = useAppSelector(selectShorts)
  const {
    name: autoImageName,
    blobURL: autoImageBlobURL,
    type: autoImageType,
  } = useAppSelector(selectAutoImage)
  const {
    name: manualImageName,
    blobURL: manualImageBlobURL,
    type: manualImageType,
    state: imageState,
  } = useAppSelector(selectManualImage)

  const imageInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    /** @see https://stackoverflow.com/a/70485949 */

    if (imageInputRef.current && autoImageBlobURL) {
      ;(manualImageBlobURL
        ? convertStringToFile(
            manualImageBlobURL,
            manualImageName,
            manualImageType
          )
        : convertStringToFile(autoImageBlobURL, autoImageName, autoImageType)
      ).then((file) => {
        if (!imageInputRef.current) return
        const container = new DataTransfer()
        container.items.add(file)
        imageInputRef.current.files = container.files

        dispatch(
          shortsUploadActions.setSelectedImage(
            manualImageBlobURL ? IMAGE_TYPE.Manual : IMAGE_TYPE.Auto
          )
        )
      })
    }
  }, [
    autoImageName,
    autoImageBlobURL,
    autoImageType,
    manualImageName,
    manualImageBlobURL,
    manualImageType,
    dispatch,
  ])

  useEffect(() => {
    if (
      imageInputRef.current &&
      ((selected === IMAGE_TYPE.Manual && manualImageBlobURL) ||
        (selected === IMAGE_TYPE.Auto && autoImageBlobURL))
    ) {
      ;(selected === IMAGE_TYPE.Manual
        ? convertStringToFile(
            manualImageBlobURL,
            manualImageName,
            manualImageType
          )
        : convertStringToFile(autoImageBlobURL, autoImageName, autoImageType)
      ).then((file) => {
        if (!imageInputRef.current) return
        const container = new DataTransfer()
        container.items.add(file)
        imageInputRef.current.files = container.files
      })
    }
  }, [selected]) /* eslint-disable-line react-hooks/exhaustive-deps */

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const file = files instanceof FileList ? files[0] : files

    dispatch(changeManualImage(file))
  }

  return (
    <div className="flex flex-col">
      <InputLabel text="影片首圖" isRequired={true} />
      <div className="mt-2 flex flex-row gap-x-3">
        <div
          className="inline-block shrink-0"
          onClick={() =>
            dispatch(shortsUploadActions.setSelectedImage(IMAGE_TYPE.Auto))
          }
        >
          <NextImage
            src={autoImageBlobURL}
            alt="影片首圖"
            className={`mb-1 h-[106px] w-[60px] cursor-pointer bg-[#D9D9D9] object-contain ${
              selected === IMAGE_TYPE.Auto
                ? 'border-[3px] border-[#3CD1FF] border-[inset]'
                : ''
            }`}
            width={60}
            height={106}
            unoptimized={true}
          />
          <CustomText content="自動" customClass="text-[#000928]" />
        </div>
        <div className="inline-block shrink-0">
          <label
            className="relative mb-1 block h-[106px] w-[60px] cursor-pointer bg-[#D9D9D9]"
            htmlFor={`preview-${name}`}
            onClick={() => {
              if (manualImageBlobURL)
                dispatch(
                  shortsUploadActions.setSelectedImage(IMAGE_TYPE.Manual)
                )
            }}
          >
            <input
              ref={imageInputRef}
              id={`preview-${name}`}
              type="file"
              name="preview"
              accept={AVAILABLE_IMAGE_MIME_TYPE.join(',')}
              className="hidden"
              onChange={inputChangeHandler}
            />
            {manualImageBlobURL ? (
              <NextImage
                src={manualImageBlobURL}
                alt="影片首圖"
                width={60}
                height={106}
                className={`mb-1 h-[106px] w-[60px] bg-[#D9D9D9] object-contain ${
                  selected === IMAGE_TYPE.Manual
                    ? 'border-[3px] border-[#3CD1FF] border-[inset]'
                    : ''
                }`}
                unoptimized={true}
              />
            ) : (
              <NextImage
                src={IconUploadImage}
                width={20}
                height={20}
                alt="上傳圖片"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </label>
          {imageState === IMAGE_STATE.Success ? (
            <CustomText content="上傳成功！" customClass="text-[#119CC7]" />
          ) : imageState === IMAGE_STATE.Error ? (
            <CustomText
              content={
                <>
                  上傳失敗！
                  <br />
                  圖片大小須為{Math.floor(MAX_IMAGE_SIZE / MEGABYTES)}MB以內
                </>
              }
              customClass="text-[#D94141]"
            />
          ) : (
            <CustomText content="上傳圖片" customClass="text-[#7F8493]" />
          )}
        </div>
      </div>
    </div>
  )
}
