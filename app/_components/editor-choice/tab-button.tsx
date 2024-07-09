type Props = {
  text: string
  isActive: boolean
  onClick: () => void
}

export default function TabButton({ text, isActive, onClick }: Props) {
  const activeStyle =
    'hover-or-active:bg-[#000928] hover-or-active:text-white peer-checked:bg-[#000928] peer-checked:text-white md:hover-or-active:bg-white md:hover-or-active:text-[#000928] md:peer-checked:bg-white md:peer-checked:text-[#000928]'

  return (
    <span>
      <input type="checkbox" checked={isActive} className="peer hidden" />
      <button
        onClick={onClick}
        className={`rounded-[29px] border border-[#000928] px-[16.5px] py-[2.5px] text-[15px] font-normal leading-[23px] text-[#000928] md:border-white md:text-white ${activeStyle}`}
      >
        {text}
      </button>
    </span>
  )
}
