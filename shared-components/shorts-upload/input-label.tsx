type Props = {
  text: string
  labelFor?: string
  isRequired?: boolean
}

export default function InputLabel({ text, labelFor, isRequired }: Props) {
  return (
    <label
      className="text-sm font-normal leading-normal text-black"
      htmlFor={labelFor}
    >
      {text}
      {isRequired && (
        <span className="text-xs leading-[18px] text-[#7F8493]">（必填）</span>
      )}
    </label>
  )
}
