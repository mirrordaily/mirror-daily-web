import Image from 'next/image'
import { useState } from 'react'

enum DateChangeType {
  PREVIOUS = 'previous',
  NEXT = 'next',
}
export default function DateSwitcher() {
  const [date, setDate] = useState(new Date())
  const handleDateChange = (type: DateChangeType) => {
    const changedDate = new Date(date)
    if (type === DateChangeType.PREVIOUS) {
      changedDate.setDate(changedDate.getDate() - 1)
    } else {
      changedDate.setDate(changedDate.getDate() + 1)
    }
    setDate(changedDate)
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
