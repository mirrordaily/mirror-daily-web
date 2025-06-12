'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

interface Option {
  value: string
  label: string
}

interface SelectMenuProps {
  options: Option[]
  selectedValue: string
  onSelectChange: (value: string) => void
  placeholder?: string
}

export default function SelectMenu({
  options,
  selectedValue,
  onSelectChange,
  placeholder = 'Select an option',
}: SelectMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  useOnClickOutside(wrapperRef, () => {
    if (isOpen) {
      setIsOpen(false)
    }
  })

  const handleOptionClick = (value: string) => {
    onSelectChange(value)
    setIsOpen(false)
  }

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  )
  const displayLabel = selectedOption ? selectedOption.label : placeholder

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleDropdown()
    }
  }
  return (
    <div
      ref={wrapperRef}
      className="relative inline-block w-full text-left sm:w-auto"
    >
      <div
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className={`flex cursor-pointer items-center gap-3 font-bold leading-7 transition-colors duration-150 ease-in-out ${
          isOpen ? 'text-mirror-blue-700' : 'text-gray-800'
        }`}
        tabIndex={0}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="custom-options-list"
      >
        <span>{displayLabel}</span>
        <div
          className={`relative size-3 transition-transform duration-200 ease-in-out`}
        >
          <Image
            src={
              isOpen
                ? '/icons/sports/select-open.svg'
                : '/icons/sports/select-default.svg'
            }
            alt={isOpen ? 'select open icon' : 'select closed icon'}
            fill
          />
        </div>
      </div>

      {isOpen && (
        <div
          id="custom-options-list"
          className="absolute top-full z-sports-event-select-menu mt-1 w-full min-w-max bg-white px-6 py-3 shadow-sportsEventsSelect focus:outline-none"
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900 ${
                selectedValue === option.value
                  ? 'text-mirror-blue-700'
                  : 'text-[#2b2b2b]'
              }`}
              onClick={() => handleOptionClick(option.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleOptionClick(option.value)
                }
              }}
              tabIndex={0}
              role="option"
              aria-selected={selectedValue === option.value}
            >
              {option.label}
            </div>
          ))}
          {options.length === 0 && (
            <div className="px-4 py-2 text-sm text-gray-500">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  )
}
