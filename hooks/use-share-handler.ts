import { useDebounceCallback } from 'usehooks-ts'

type ShareData = Parameters<typeof navigator.share>[0]

export const useShareHandler = (data: ShareData) => {
  return useDebounceCallback(() => {
    if ('share' in navigator) {
      navigator.share(data)
    } else if ('clipboard' in navigator) {
      /* @ts-expect-error ignorable error */
      navigator.clipboard.writeText(data.url).then(() => alert('已複製連結'))
    }
  }, 500)
}
