export default function ArticleTag({ name }: { name: string }) {
  return (
    <div className="flex justify-center rounded bg-[#CCCED4] py-1 pl-[10px] pr-3 text-sm font-normal leading-[24px]">
      {name}
    </div>
  )
}
