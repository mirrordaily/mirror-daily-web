import { SITE_URL } from '@/constants/config'
import { IMAGE_PATH } from '@/constants/default-path'
import { SITE_NAME } from '@/constants/misc'
import type { HeaderData, HeaderSection } from '@/types/common'
import type { Metadata } from 'next'
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

// TODO: update default description
const getDefaultMetadata = (): Metadata => ({
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: '',
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: '',
    url: '/',
    images: IMAGE_PATH,
  },
})
export {
  isServer,
  isValidUrl,
  checkShortsTitle,
  checkEmail,
  isSectionItem,
  getDefaultMetadata,
}
