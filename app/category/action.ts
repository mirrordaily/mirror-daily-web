'use server'

import type { HeroImage } from '@/types/common'
import type { PropsOfCard } from '../_components/latest-news/post-list'
import { URL_STATIC_LATEST_NEWS } from '@/constants/config'

type Category = {
  name: string
  slug: string
}

type RawPost = {
  title: string
  slug: string
  heroImage: Pick<HeroImage, 'resized' | 'resizedWebp'> | string | null
  categories: Category[]
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
  rawImageObj: RawPost['heroImage']
): PropsOfCard['heroImage'] => {
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

const transformRawPost = (rawPosts: RawPost): PropsOfCard => {
  const { title, slug, heroImage, categories } = rawPosts
  const categoryName = categories[0]?.name || ''

  return {
    categoryName,
    categoryColor: getCategoryColor(),
    postName: title,
    postSlug: slug,
    heroImage: getHeroImage(heroImage),
  }
}

// TODO: change source and update related handle
const fetchLatestPost = async (page: number = 0): Promise<PropsOfCard[]> => {
  try {
    const resp = await fetch(`${URL_STATIC_LATEST_NEWS}0${page + 1}.json`, {
      next: { revalidate: 300 },
    })

    const rawPostData: Record<'latest', RawPost[]> = await resp.json()

    return rawPostData.latest.map(transformRawPost)
  } catch (e) {
    console.error(e)
    return []
  }
}

export { fetchLatestPost }
