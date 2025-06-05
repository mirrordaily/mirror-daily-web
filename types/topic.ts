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

export type TopicPostData = {
  id: string
  title: string
  link: string
  textContent: string
  postMainImage: HeroImage
}

export type PostDataWithTags = {
  id: string
  title: string
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
