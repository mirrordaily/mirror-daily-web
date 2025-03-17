import type { HeaderData, HeaderSection } from '@/types/common'
import { z } from 'zod'

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

const checkShortsTitle = (title: string) => title.length > 0
const checkEmail = (email: string) => {
  const { success } = z.string().email().safeParse(email)
  return success
}

const isSectionItem = (item: HeaderData): item is HeaderSection =>
  item.type === 'Section'

export { isServer, isValidUrl, checkShortsTitle, checkEmail, isSectionItem }
