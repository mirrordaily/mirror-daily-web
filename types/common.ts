import type { HeroImageFragment } from '@/graphql/__generated__/graphql'

type ResizedImage = Partial<
  Record<
    keyof Omit<
      NonNullable<HeroImageFragment['resized']>,
      'original' | '__typename'
    >,
    string
  >
>
type ResizedWebPImage = Partial<
  Record<
    keyof Omit<
      NonNullable<HeroImageFragment['resizedWebp']>,
      'original' | '__typename'
    >,
    string
  >
>

export type HeroImage = {
  resized?: { original: string } & ResizedImage
  resizedWebp?: { original: string } & ResizedWebPImage
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
