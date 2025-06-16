import dayjs, { type Dayjs } from 'dayjs'
import 'dayjs/locale/zh-tw'

// Setup Chinese locale for dayjs
dayjs.locale('zh-tw')

/**
 * Formats a date in Chinese format with weekday, replacing '星期' with '週'
 * @param date - The date to format
 * @returns Formatted date string like "6/15 （週六）"
 */
export const formatChineseDate = (date: Dayjs): string => {
  return date.format('M/D （dddd）').replace('星期', '週')
}

/**
 * Setup Chinese locale for dayjs (can be called to ensure locale is set)
 */
export const setupChineseLocale = (): void => {
  dayjs.locale('zh-tw')
}
