import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const formatInTaipei = (date: dayjs.ConfigType, format: string) =>
  dayjs(date).utc().tz('Asia/Taipei').format(format)

const toDisplayDateTimeInTaipei = (date: dayjs.ConfigType) =>
  formatInTaipei(date, 'YYYY/MM/DD HH:mm:ss')

const toIsoStringWithTaipeiOffset = (date: dayjs.ConfigType) =>
  formatInTaipei(date, 'YYYY-MM-DDTHH:mm:ssZ')

export { toDisplayDateTimeInTaipei, toIsoStringWithTaipeiOffset }
