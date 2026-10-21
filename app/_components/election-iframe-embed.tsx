import dayjs from 'dayjs'
import { DAILY_END_TS, DAILY_START_TS, ENV } from '@/constants/config'
import { ENVIRONMENT } from '@/constants/misc'

const IFRAME_SRC = `${
  ENV === ENVIRONMENT.PRODUCTION
    ? 'https://www.mirrordaily.news'
    : 'https://dev.mirrordaily.news'
}/projects/election2026-homepage/index.html`

const isWithinDisplayPeriod = () => {
  if (!DAILY_START_TS || !DAILY_END_TS) return false

  const start = dayjs(DAILY_START_TS)
  const end = dayjs(DAILY_END_TS)
  if (!start.isValid() || !end.isValid()) return false

  const now = dayjs()
  return !now.isBefore(start) && !now.isAfter(end)
}

export default function ElectionIframeEmbed() {
  if (!isWithinDisplayPeriod()) return null

  return (
    <iframe
      src={IFRAME_SRC}
      title="2026 選舉開票"
      className="mx-auto -mb-2 mt-3 block h-[330px] w-[320px] max-w-full border-0 min-[768px]:mb-0 min-[768px]:mt-5 min-[768px]:h-[200px] min-[768px]:w-[720px] lg:h-[294px] lg:w-[970px]"
      scrolling="no"
    />
  )
}
