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
