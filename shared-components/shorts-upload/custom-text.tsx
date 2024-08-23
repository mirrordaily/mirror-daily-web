export default function CustomText({
  content,
  customClass,
}: {
  content: React.ReactNode
  customClass: string
}) {
  return (
    <p className={`text-xs font-normal leading-[150%] ${customClass}`}>
      {content}
    </p>
  )
}
