export type ExternalPost = {
  title: string
  thumb: string
  writer: string
  publishedTime: string
  brief: string
  content: string
  tags: {
    name: string
    slug: string
  }[]
  link: string
}

export type PostIntro = Omit<ExternalPost, 'brief' | 'content'>
