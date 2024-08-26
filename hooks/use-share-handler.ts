import { useDebounceCallback } from 'usehooks-ts'

export const useShareHandler = (title: string, url: string) => {
  return useDebounceCallback(() => {
    if ('share' in navigator) {
      navigator.share({
        title: title,
        text: '',
        url: url,
      })
    } else if ('clipboard' in navigator) {
      /* @ts-expect-error ignorable error */
      navigator.clipboard.writeText(url)
    }
  }, 500)
}
