import type { ChangeEvent } from 'react'
import { useEffect, useRef } from 'react'
import { AVAILABLE_VIDEO_MIME_TYPE } from '@/constants/multimedia'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { changeShortsFile } from '@/redux/shorts-upload/slice'
import { selectShorts } from '@/redux/shorts-upload/selector'
import BackButton from './back-button'
import CustomText from './custom-text'
import { isEqual } from 'lodash-es'
import { convertStringToFile } from '@/utils/file'

export default function InitialForm() {
  const dispatch = useAppDispatch()
  const { name, blobURL, type, hasError } = useAppSelector(
    selectShorts,
    isEqual
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const file = files instanceof FileList ? files[0] : files

    dispatch(changeShortsFile(file))
  }

  useEffect(() => {
    if (inputRef.current && blobURL) {
      convertStringToFile(blobURL, name, type).then((file) => {
        if (!inputRef.current) return
        const container = new DataTransfer()
        container.items.add(file)
        inputRef.current.files = container.files
      })
    }
  }, [blobURL, name, type])

  return (
    <>
      <input
        className="hidden"
        name="shorts"
        type="file"
        accept={AVAILABLE_VIDEO_MIME_TYPE.join(',')}
        ref={inputRef}
        onChange={inputChangeHandler}
      />
      <BackButton type="button" clickFn={() => inputRef.current?.click()}>
        選取檔案
      </BackButton>
      <CustomText
        content="上傳失敗！"
        customClass={`!text-base ${hasError ? 'text-[#D94141]' : 'text-transparent'}`}
      />
    </>
  )
}
