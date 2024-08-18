'use client'

import NextImage from 'next/image'
import type { ChangeEvent } from 'react'
import { useEffect, useRef } from 'react'
import InputLabel from './input-label'
import CustomText from './custom-text'
import IconUploadImage from '@/public/icons/shorts-upload/upload-image.svg'
import { AVAILABLE_IMAGE_MIME_TYPE } from '@/constants/multimedia'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  selectAutoImage,
  selectManualImage,
  selectShorts,
  selectImage,
  selectTitle,
  selectDescription,
} from '@/redux/shorts-upload/selector'
import {
  IMAGE_TYPE,
  IMAGE_STATE,
  shortsUploadActions,
  changeManualImage,
} from '@/redux/shorts-upload/slice'
import { convertStringToFile } from '@/utils/file'

export default function FileInformation() {
  const dispatch = useAppDispatch()
  const { name: uid, blobURL } = useAppSelector(selectShorts)
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
  const selected = useAppSelector(selectImage)
  const title = useAppSelector(selectTitle)
  const description = useAppSelector(selectDescription)

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
    <div className="flex w-full flex-col">
      <div className="flex gap-x-[35px]">
        <div className="flex shrink flex-col overflow-hidden">
          <div className="flex flex-col">
            <InputLabel
              text="影片標題"
              isRequired={true}
              labelFor={`title-${uid}`}
            />
            <input
              id={`title-${uid}`}
              type="text"
              name="title"
              className="mt-2 h-7 rounded-[5px] border-[0.5px] border-solid border-[#B2B5BE] bg-[#F6F6FB] py-1 pl-2 pr-3 text-sm font-normal leading-normal text-[#212944] shadow-input outline-none"
              value={title}
              onChange={(event) =>
                dispatch(shortsUploadActions.setTitle(event.target.value))
              }
            />
          </div>
          <div className="mt-4 flex flex-col">
            <InputLabel text="影片說明" labelFor={`description-${uid}`} />
            <textarea
              id={`description-${uid}`}
              name="description"
              className="mt-2 h-[198px] resize-none rounded-[5px] border-[0.5px] border-solid border-[#B2B5BE] bg-[#F6F6FB] p-2 text-sm font-normal leading-normal text-[#212944] shadow-input outline-none"
              value={description}
              onChange={(event) =>
                dispatch(shortsUploadActions.setDescription(event.target.value))
              }
            />
          </div>
        </div>
        <div className="flex shrink-0 flex-col">
          <div className="flex w-full items-center justify-between">
            <InputLabel text="影片預覽" />
            <CustomText content="上傳成功！" colorClass="text-[#119CC7]" />
          </div>
          <video
            src={blobURL}
            autoPlay={false}
            muted={true}
            playsInline={true}
            controls={true}
            className="mt-2 h-[270px] w-[152px] bg-[#D9D9D9]"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <InputLabel text="影片首圖" isRequired={true} />
        <div className="mt-2 flex flex-row gap-x-3">
          <div
            className="inline-block"
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
            <CustomText content="自動" colorClass="text-[#000928]" />
          </div>
          <div className="inline-block">
            <label
              className="relative mb-1 block h-[106px] w-[60px] cursor-pointer bg-[#D9D9D9]"
              htmlFor={`preview-${uid}`}
              onClick={() => {
                if (manualImageBlobURL)
                  dispatch(
                    shortsUploadActions.setSelectedImage(IMAGE_TYPE.Manual)
                  )
              }}
            >
              <input
                ref={imageInputRef}
                id={`preview-${uid}`}
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
              <CustomText content="上傳成功！" colorClass="text-[#119CC7]" />
            ) : imageState === IMAGE_STATE.Error ? (
              <CustomText
                content={
                  <>
                    上傳失敗！
                    <br />
                    圖片大小須為OOMB以內
                  </>
                }
                colorClass="text-[#D94141]"
              />
            ) : (
              <CustomText content="上傳圖片" colorClass="text-[#7F8493]" />
            )}
          </div>
        </div>
      </div>
      <hr className="mt-8 h-px bg-[#7F8493]" />
    </div>
  )
}
