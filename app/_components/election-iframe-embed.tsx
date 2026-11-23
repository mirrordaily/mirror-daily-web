import dayjs from 'dayjs'
import {
  DAILY_END_TS,
  DAILY_START_TS,
  DAILY_TEST_END_TS,
  ENV,
} from '@/constants/config'
import { ENVIRONMENT } from '@/constants/misc'

const TAIPEI_ISO_TIMESTAMP_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+08:00$/

/** 只接受 `YYYY-MM-DDTHH:mm:ss+08:00` 格式 */
const isTaipeiIsoTimestamp = (value: string) =>
  TAIPEI_ISO_TIMESTAMP_REGEX.test(value) && dayjs(value).isValid()

const IFRAME_SRC = `${
  ENV === ENVIRONMENT.PRODUCTION || ENV === ENVIRONMENT.STAGING
    ? 'https://www.mirrordaily.news'
    : 'https://dev.mirrordaily.news'
}/projects/election2026-homepage/index.html`

const isWithinDisplayPeriod = () => {
  if (
    !isTaipeiIsoTimestamp(DAILY_START_TS) ||
    !isTaipeiIsoTimestamp(DAILY_END_TS)
  ) {
    return false
  }

  const start = dayjs(DAILY_START_TS)
  const end = dayjs(DAILY_END_TS)

  const now = dayjs()
  return !now.isBefore(start) && !now.isAfter(end)
}

const checkIsElectionTestPeriod = () => {
  if (!isTaipeiIsoTimestamp(DAILY_TEST_END_TS)) return false

  return dayjs().isBefore(dayjs(DAILY_TEST_END_TS))
}

export default function ElectionIframeEmbed() {
  if (!isWithinDisplayPeriod()) return null

  const isElectionTestPeriod = checkIsElectionTestPeriod()

  return (
    <div className="relative mx-auto -mb-2 mt-3 w-[320px] max-w-full min-[768px]:mb-0 min-[768px]:mt-5 min-[768px]:w-[720px] lg:w-[970px]">
      <iframe
        src={IFRAME_SRC}
        title="2026 選舉開票"
        className="block h-[330px] w-full border-0 min-[768px]:h-[200px] lg:h-[294px]"
        scrolling="no"
      />
      {isElectionTestPeriod && (
        <span className="pointer-events-none absolute bottom-3 right-4 text-[13px] leading-[18px] text-red-500 md:right-6">
          測試畫面
        </span>
      )}
    </div>
  )
}
