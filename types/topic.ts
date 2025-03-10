import type { PostData } from '@/utils/data-process'
import type { HeroImage } from './common'

export enum TOPIC_LEADING {
  VIDEO = 'video',
  SLIDESHOW = 'slideshow',
  IMAGE = 'image',
}

export enum TOPIC_LIST_TYPE {
  LIST = 'list',
  GROUP = 'group',
}

export type TopicPostData = Pick<
  PostData,
  'title' | 'slug' | 'link' | 'textContent' | 'postMainImage'
>

export type PostDataWithTags = {
  title: string
  slug: string
  link: string
  postMainImage: HeroImage
  textContent: string
  tags: { id: string }[]
}

export type Topic = {
  id: string
  name: string
  slug: string
  brief: string
  heroImage: HeroImage
}
