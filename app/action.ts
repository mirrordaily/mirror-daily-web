'use server'

import type { HeroImage } from '@/types/common'
import type { LatestPost } from '@/types/homepage'
import {
  URL_STATIC_LATEST_NEWS,
  URL_STATIC_POPULAR_NEWS,
} from '@/constants/config'

type Category = {
  name: string
  slug: string
}

type Section = {
  slug: string
  name: string
}

type Partner = {
  slug: string
}

type RawLatestPost = {
  title: string
  slug: string
  heroImage: Pick<HeroImage, 'resized' | 'resizedWebp'> | string | null
  sections: Pick<Section, 'slug'>[]
  categories: Category[]
  partner: Partner | string
  redirect: string
  publishedDate: string
}

// TODO: replace with real data
const getSingleColor = () => {
  return Math.floor(Math.random() * 256)
}

// TODO: replace with real data
const getCategoryColor = () => {
  const red = getSingleColor()
  const green = getSingleColor()
  const blue = getSingleColor()
  return `rgb(${red},${green},${blue})`
}

const getHeroImage = (
  rawImageObj: RawLatestPost['heroImage']
): LatestPost['heroImage'] => {
  if (typeof rawImageObj === 'object') {
    if (rawImageObj !== null) return rawImageObj
    else
      return {
        resized: {
          original: '',
        },
      }
  } else {
    return {
      resized: {
        original: rawImageObj,
      },
    }
  }
}

type CategoryConfig = {
  name: string
  color: string
}

const getCategoryConfig = (rawPosts: RawLatestPost): CategoryConfig => {
  const { partner, categories } = rawPosts

  if (typeof partner === 'string') {
    const name = categories[0]?.name || ''
    const color = getCategoryColor()

    return {
      name,
      color,
    }
  } else {
    const { slug } = partner
    if (slug === 'healthnews') {
      return {
        name: '生活',
        color: '#03C121',
      }
    } else {
      // ebc and others
      return {
        name: '時事',
        color: '#D0D2D8',
      }
    }
  }
}

const isValidUrl = (url: string): boolean => {
  try {
    return Boolean(new URL(url))
  } catch (e) {
    return false
  }
}

const hasExternalLink = (rawPost: RawLatestPost): boolean => {
  const { redirect } = rawPost
  return isValidUrl(redirect)
}

const transformRawLatestPost = (rawPosts: RawLatestPost): LatestPost => {
  const { title, slug, heroImage, publishedDate } = rawPosts
  const { name, color } = getCategoryConfig(rawPosts)

  return {
    categoryName: name,
    categoryColor: color,
    postName: title,
    postSlug: slug,
    heroImage: getHeroImage(heroImage),
    publishedDate,
  }
}

// TODO: change source and update related handle
const fetchLatestPost = async (page: number = 0): Promise<LatestPost[]> => {
  try {
    const resp = await fetch(`${URL_STATIC_LATEST_NEWS}0${page + 1}.json`, {
      next: { revalidate: 300 },
    })

    const rawPostData: Record<'latest', RawLatestPost[]> = await resp.json()
    const filteredData = rawPostData.latest.filter(
      (rawPost) => !hasExternalLink(rawPost)
    )

    return filteredData.map(transformRawLatestPost)
  } catch (e) {
    console.error(e)
    return []
  }
}

type RawPopularPost = {
  title: string
  slug: string
  heroImage: Pick<HeroImage, 'resized' | 'resizedWebp'> | string | null
  sectionsInInputOrder: Section[]
}

const transformRawPopularPost = (rawPosts: RawPopularPost): LatestPost => {
  const { title, slug, heroImage, sectionsInInputOrder: sections } = rawPosts

  return {
    categoryName: sections[0]?.name ?? '',
    categoryColor: getCategoryColor(),
    postName: title,
    postSlug: slug,
    heroImage: getHeroImage(heroImage),
    publishedDate: new Date().toISOString(),
  }
}

// TODO: change source and update related handle
const fetchPopularPost = async (): Promise<LatestPost[]> => {
  try {
    const resp = await fetch(URL_STATIC_POPULAR_NEWS, {
      next: { revalidate: 300 },
    })

    const rawPostData: RawPopularPost[] = await resp.json()
    return rawPostData.map(transformRawPopularPost).slice(10)
  } catch (e) {
    console.error(e)
    return []
  }
}

export { fetchLatestPost, fetchPopularPost }
