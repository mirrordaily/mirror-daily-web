import Image from 'next/image'
import dayjs, { type Dayjs } from 'dayjs'
import 'dayjs/locale/zh-tw'
dayjs.locale('zh-tw')
enum DateChangeType {
  PREVIOUS = 'previous',
  NEXT = 'next',
}
type DateSwitcherProps = {
  date: Dayjs
  onSelectChange: (value: Dayjs) => void
}

export default function DateSwitcher({
  date,
  onSelectChange,
}: DateSwitcherProps) {
  const handleDateChange = (type: DateChangeType) => {
    const changedDate = dayjs(date).startOf('day')
    switch (type) {
      case DateChangeType.PREVIOUS:
        onSelectChange(changedDate.subtract(1, 'day'))
        break
      case DateChangeType.NEXT:
        onSelectChange(changedDate.add(1, 'day'))
        break
      default:
        break
    }
  }
  return (
    <div className="flex items-center gap-3">
      <button
        aria-label="previous day button"
        className="relative size-5"
        onClick={() => handleDateChange(DateChangeType.PREVIOUS)}
      >
        <Image
          src="/icons/sports/date-switcher-pre.svg"
          fill
          alt="previous date"
        />
      </button>
      {dayjs(date).format('MM/DD (ddd)')}
      <button
        aria-label="next day button"
        className="relative size-5"
        onClick={() => handleDateChange(DateChangeType.NEXT)}
      >
        <Image
          src="/icons/sports/date-switcher-next.svg"
          fill
          aria-label="next day button"
          alt="next date"
        />
      </button>
    </div>
  )
}
