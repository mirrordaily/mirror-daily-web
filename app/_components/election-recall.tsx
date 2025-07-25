import {
  URL_ELECTION_RECALL_IFRAME,
  URL_ELECTION_RECALL_FULL_DATA,
} from '@/constants/config'
import { fetchShouldDisplayElectionRecall } from '../actions-general'

export default async function ElectionRecall() {
  const show = await fetchShouldDisplayElectionRecall()
  return (
    show === 'TRUE' && (
      <section className="section-in-homepage my-5 flex flex-col items-center">
        <p className="mb-4 text-center text-xl font-bold leading-none text-[#6C00AA]">
          2025 鏡報立委罷免即時開票
        </p>
        <iframe
          src={URL_ELECTION_RECALL_IFRAME}
          className="mb-4 h-[240px] w-full overflow-hidden md:h-[230px]"
        />
        <a
          className="GTM-click_2025_election_page cursor-pointer text-base font-bold leading-none text-[#6C00AA] underline"
          target="_blank"
          href={URL_ELECTION_RECALL_FULL_DATA}
        >
          查看完整資料
        </a>
      </section>
    )
  )
}
