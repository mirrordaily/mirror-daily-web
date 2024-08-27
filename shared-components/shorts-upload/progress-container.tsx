'use client'

import { selectProgress } from '@/redux/shorts-upload/selector'
import { useAppSelector } from '@/redux/hooks'
import { FormProgress } from '@/types/shorts'
import ProgressItem, { ItemStatus } from './progress-item'

const Seperator = ({ passed }: { passed: boolean }) => {
  return (
    <hr className={`h-[2px] ${passed ? 'bg-[#119CC7]' : 'bg-[#B2B5BE]'}`} />
  )
}

export default function ProgressContainer() {
  const progress = useAppSelector(selectProgress)
  const isSecond = progress === FormProgress.FileInfo
  const isLast = progress === FormProgress.PersonInfo
  const uploadStatus =
    isSecond || isLast ? ItemStatus.Complete : ItemStatus.Current
  const shortsStatus = isLast
    ? ItemStatus.Complete
    : isSecond
      ? ItemStatus.Current
      : ItemStatus.Future
  const personStatus = isLast ? ItemStatus.Current : ItemStatus.Future

  return (
    <div className="mt-6 grid grid-cols-[48px_1fr_48px_1fr_48px] items-baseline gap-x-5">
      <ProgressItem text="影片上傳" status={uploadStatus} />
      <Seperator passed={isSecond || isLast} />
      <ProgressItem text="影片資訊" status={shortsStatus} />
      <Seperator passed={isLast} />
      <ProgressItem text="個人資訊" status={personStatus} />
    </div>
  )
}
