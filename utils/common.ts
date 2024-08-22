import { useDebounceCallback } from 'usehooks-ts'

function isServer(): boolean {
  return typeof window === 'undefined'
}

const isValidUrl = (url: string): boolean => {
  try {
    return Boolean(new URL(url))
  } catch (e) {
    return false
  }
}

const useShareHandler = (title: string, url: string) => {
  return useDebounceCallback(() => {
    if ('share' in navigator) {
      navigator.share({
        title,
        text: '',
        url,
      })
    } else if ('clipboard' in navigator) {
      /* @ts-expect-error ignorable error */
      navigator.clipboard.writeText(url)
    }
  }, 500)
}

export { isServer, isValidUrl, useShareHandler }
