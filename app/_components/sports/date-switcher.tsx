import Image from 'next/image'

enum DateChangeType {
  PREVIOUS = 'previous',
  NEXT = 'next',
}
type DateSwitcherProps = {
  date: Date
  onSelectChange: (value: Date) => void
}
export default function DateSwitcher({
  date,
  onSelectChange,
}: DateSwitcherProps) {
  const handleDateChange = (type: DateChangeType) => {
    const changedDate = new Date(date)
    switch (type) {
      case DateChangeType.PREVIOUS:
        changedDate.setDate(changedDate.getDate() - 1)
        break
      case DateChangeType.NEXT:
        changedDate.setDate(changedDate.getDate() + 1)
        break
      default:
        break
    }
    onSelectChange(changedDate)
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
      {date.toLocaleDateString('zh-TW', {
        weekday: 'short',
        month: '2-digit',
        day: '2-digit',
      })}
      <button
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
