import { twMerge } from 'tailwind-merge'

type Props = {
  customClasses?: string
}

export default function SectionDivider({ customClasses }: Props) {
  return (
    <div className={twMerge('section-in-homepage', customClasses ?? '')}>
      <hr className="h-px border-none bg-[#000928] md:h-[2px]" />
    </div>
  )
}
