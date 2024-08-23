import { useAppSelector } from '@/redux/hooks'
import { selectShorts } from '@/redux/shorts-upload/selector'
import InputLabel from './input-label'
import CustomText from './custom-text'
import { isEqual } from 'lodash-es'

export default function ShortsPreview() {
  const { blobURL } = useAppSelector(selectShorts, isEqual)

  return (
    <div className="flex shrink-0 flex-col">
      <div className="flex w-full items-end justify-between">
        <InputLabel text="影片預覽" />
        <CustomText content="上傳成功！" customClass="text-[#119CC7]" />
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
  )
}
