type Props = {
  text: string
  isActive: boolean
  onClick: () => void
}

export default function TabButton({ text, isActive, onClick }: Props) {
  const activeStyle =
    'hover-or-active:bg-mirror-blue-700 hover-or-active:text-white peer-checked:bg-mirror-blue-700 peer-checked:text-white peer-checked:border-[#2b2b2b] md:peer-checked:border-white'

  return (
    <span>
      <input type="checkbox" checked={isActive} className="peer hidden" />
      <button
        onClick={onClick}
        className={`rounded-[29px] border border-primary-700 px-[10px] py-[3px] text-[15px] font-normal leading-none text-primary-700 md:border-white md:text-white ${activeStyle}`}
      >
        {text}
      </button>
    </span>
  )
}
