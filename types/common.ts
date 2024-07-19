import type { HeroImageFragment } from '@/graphql/__generated__/graphql'

type ResizedImage = { original: string } & Partial<
  Record<
    keyof Omit<
      NonNullable<HeroImageFragment['resized']>,
      'original' | '__typename'
    >,
    string
  >
>
type ResizedWebPImage = { original: string } & Partial<
  Record<
    keyof Omit<
      NonNullable<HeroImageFragment['resizedWebp']>,
      'original' | '__typename'
    >,
    string
  >
>

export type HeroImage = {
  resized?: ResizedImage
  resizedWebp?: ResizedWebPImage
}

type Section = {
  id: string
  state: 'active' | 'inactive'
  name: string
  slug: string
}

export type PopularNews = {
  id: string
  slug: string
  sections: Section[]
  sectionsInInputOrder: Section[]
  title: string
  style: string
  state: string
  heroImage: HeroImage | null
}

export type ParameterOfComponent<T> = T extends (
  props: infer P,
  ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
) => any // eslint-disable-line @typescript-eslint/no-explicit-any
  ? P
  : never

export type SectionAndCategory = {
  name: string
  slug: string
  color: string
  categories: {
    name: string
    slug: string
    color: string
  }[]
}

export enum SHORTS_TYPE {
  NEWS = 'news',
  DERIVATIVE = 'creativity',
}
