export type ResizedImage = {
  original: string
  w480: string
  w800: string
  w1200: string
  w1600: string
  w2400: string
}

export type HeroImage = {
  id: string
  resized: ResizedImage
  resizedWebp: ResizedImage
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
