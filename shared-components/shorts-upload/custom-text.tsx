export default function CustomText({
  content,
  colorClass,
}: {
  content: React.ReactNode
  colorClass: string
}) {
  return (
    <p className={`text-xs font-normal leading-[150%] ${colorClass}`}>
      {content}
    </p>
  )
}
