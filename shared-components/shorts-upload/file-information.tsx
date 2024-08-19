'use client'

import { useWindowSize } from 'usehooks-ts'
import { getTailwindConfig } from '@/utils/tailwind'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  selectDescription,
  selectShorts,
  selectTitle,
} from '@/redux/shorts-upload/selector'
import { shortsUploadActions } from '@/redux/shorts-upload/slice'
import InputLabel from './input-label'
import ShortsPreview from './shorts-preview'
import PreviewImageSelector from './preview-image-selector'
import { isEqual } from 'lodash-es'

export default function FileInformation() {
  const dispatch = useAppDispatch()
  const { name } = useAppSelector(selectShorts, isEqual)
  const title = useAppSelector(selectTitle)
  const description = useAppSelector(selectDescription)

  const config = getTailwindConfig()
  const desktopLowerBound = Number(config.theme.screens.lg.split('px')[0])
  const { width } = useWindowSize()
  const isDesktop = width >= desktopLowerBound

  return (
    <div className="flex w-full flex-col lg:mt-6">
      <div className="mb-4 flex gap-x-[35px] lg:mb-0 lg:gap-x-[63px]">
        <div className="flex shrink flex-col gap-y-4 overflow-hidden">
          <div className="flex flex-col">
            <InputLabel
              text="影片標題"
              isRequired={true}
              labelFor={`title-${name}`}
            />
            <input
              id={`title-${name}`}
              type="text"
              name="title"
              className="mt-2 h-7 rounded-[5px] border-[0.5px] border-solid border-[#B2B5BE] bg-[#F6F6FB] py-1 pl-2 pr-3 text-sm font-normal leading-normal text-[#212944] shadow-input outline-none"
              value={title}
              onChange={(event) =>
                dispatch(shortsUploadActions.setTitle(event.target.value))
              }
            />
          </div>
          <div className="flex flex-col">
            <InputLabel text="影片說明" labelFor={`description-${name}`} />
            <textarea
              id={`description-${name}`}
              name="description"
              className="mt-2 h-[198px] resize-none rounded-[5px] border-[0.5px] border-solid border-[#B2B5BE] bg-[#F6F6FB] p-2 text-sm font-normal leading-normal text-[#212944] shadow-input outline-none lg:h-[120px]"
              value={description}
              onChange={(event) =>
                dispatch(shortsUploadActions.setDescription(event.target.value))
              }
            />
          </div>
          {isDesktop && <PreviewImageSelector />}
        </div>
        <ShortsPreview />
      </div>
      {!isDesktop && <PreviewImageSelector />}
      <hr className="mt-8 h-px bg-[#7F8493] lg:hidden" />
    </div>
  )
}
