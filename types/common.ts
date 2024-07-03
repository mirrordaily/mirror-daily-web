import type { HeroImageFragment } from '@/graphql/__generated__/graphql'

export type HeroImage = {
  resized?: Partial<
    Record<
      keyof Omit<NonNullable<HeroImageFragment['resized']>, '__typename'>,
      string
    >
  >
  resizedWebp?: Partial<
    Record<
      keyof Omit<NonNullable<HeroImageFragment['resizedWebp']>, '__typename'>,
      string
    >
  >
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
