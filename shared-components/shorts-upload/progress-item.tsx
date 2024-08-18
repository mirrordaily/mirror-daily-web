import NextImage from 'next/image'
import IconFuture from '@/public/icons/shorts-upload/future.svg'
import IconCurrent from '@/public/icons/shorts-upload/current.svg'
import IconComplete from '@/public/icons/shorts-upload/complete.svg'

export enum ItemStatus {
  Future = 'future',
  Current = 'current',
  Complete = 'complete',
}

type Props = {
  text: string
  status: ItemStatus
}

export default function ProgressItem({ text, status }: Props) {
  return (
    <div className="flex flex-col items-center gap-y-2">
      {status === ItemStatus.Future && (
        <NextImage src={IconFuture} width={20} height={20} alt="" />
      )}
      {status === ItemStatus.Current && (
        <NextImage src={IconCurrent} width={20} height={20} alt="" />
      )}
      {status === ItemStatus.Complete && (
        <NextImage src={IconComplete} width={20} height={20} alt="" />
      )}

      <p
        className={`text-xs font-semibold leading-normal ${
          status === ItemStatus.Current || status === ItemStatus.Complete
            ? 'text-[#119CC7]'
            : 'text-[#B2B5BE]'
        }`}
      >
        {text}
      </p>
    </div>
  )
}
