import {
  URL_ELECTION_RECALL_IFRAME,
  URL_ELECTION_RECALL_FULL_DATA,
} from '@/constants/config'

export default function ElectionRecall() {
  return (
    <section className="section-in-homepage my-5 flex flex-col items-center">
      <p className="text-center text-xl font-bold leading-none text-[#6C00AA]">
        2025 鏡報立委罷免即時開票
      </p>
      <iframe
        src={URL_ELECTION_RECALL_IFRAME}
        className="h-[230px] w-full overflow-hidden md:h-[220px]"
      />
      <a
        className="cursor-pointer text-base font-bold leading-none text-[#6C00AA] underline"
        target="_blank"
        href={URL_ELECTION_RECALL_FULL_DATA}
      >
        查看完整資料
      </a>
    </section>
  )
}
