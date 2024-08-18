import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import CustomText from './custom-text'
import InputLabel from './input-label'
import {
  selectEmail,
  selectIsCopyRightChecked,
  selectIsToSChecked,
  selectShorts,
  selectUser,
} from '@/redux/shorts-upload/selector'
import { shortsUploadActions } from '@/redux/shorts-upload/slice'
import ShortsPreview from './shorts-preview'

export default function OtherInformation() {
  const dispatch = useAppDispatch()
  const { name } = useAppSelector(selectShorts)
  const user = useAppSelector(selectUser)
  const email = useAppSelector(selectEmail)
  const isToSChecked = useAppSelector(selectIsToSChecked)
  const isCopyrightChecked = useAppSelector(selectIsCopyRightChecked)

  return (
    <div className="flex w-full flex-col lg:mt-6">
      <div className="flex justify-between">
        <div className="flex w-[160px] shrink flex-col gap-y-4 overflow-hidden">
          <div className="flex flex-col">
            <InputLabel text="投稿暱稱" labelFor={`user-${name}`} />
            <input
              id={`user-${name}`}
              type="text"
              name="user"
              className="mt-2 block h-7 w-[160px] rounded-[5px] border-[0.5px] border-solid border-[#B2B5BE] bg-[#F6F6FB] py-1 pl-2 pr-3 text-sm font-normal leading-normal text-[#212944] shadow-input outline-none"
              value={user}
              onChange={(event) =>
                dispatch(shortsUploadActions.setUser(event.target.value))
              }
            />
          </div>
          <div className="flex flex-col">
            <InputLabel
              text="email"
              isRequired={true}
              labelFor={`email-${name}`}
            />
            <input
              id={`email-${name}`}
              type="email"
              name="email"
              className="mb-1 mt-2 block h-7 w-[160px] rounded-[5px] border-[0.5px] border-solid border-[#B2B5BE] bg-[#F6F6FB] py-1 pl-2 pr-3 text-sm font-normal leading-normal text-[#212944] shadow-input outline-none"
              value={email}
              onChange={(event) =>
                dispatch(shortsUploadActions.setEmail(event.target.value))
              }
            />
            <CustomText
              content="影片審核完成後，將會寄送通知"
              colorClass="text-[#7F8493]"
            />
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-x-2">
              <input
                className="custom-checkbox"
                type="checkbox"
                id={`tos-${name}`}
                name="tos"
                checked={isToSChecked}
                onChange={(event) =>
                  dispatch(
                    shortsUploadActions.setIsToSChecked(event.target.checked)
                  )
                }
              />
              <label
                className="text-xs font-normal leading-[150%] text-[#000928]"
                htmlFor={`tos-${name}`}
              >
                同意將影片授權予鏡報
              </label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                className="custom-checkbox"
                type="checkbox"
                id={`copyright-${name}`}
                name="copyright"
                checked={isCopyrightChecked}
                onChange={(event) =>
                  dispatch(
                    shortsUploadActions.setIsCopyrightChecked(
                      event.target.checked
                    )
                  )
                }
              />
              <label
                className="text-xs font-normal leading-[150%] text-[#000928]"
                htmlFor={`copyright-${name}`}
              >
                確認內容無違反著作權
              </label>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <ShortsPreview />
        </div>
      </div>
    </div>
  )
}
