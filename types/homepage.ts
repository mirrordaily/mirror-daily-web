import type { LatestPost } from './common'

export type ItemInTopNewsSection = Pick<
  LatestPost,
  | 'sectionColor'
  | 'categoryName'
  | 'categoryColor'
  | 'postName'
  | 'postId'
  | 'publishedDate'
  | 'link'
>

export type PickupItemInTopNewsSection = Pick<
  LatestPost,
  'postName' | 'heroImage' | 'link'
> & {
  isVideoType?: boolean
  postBrief?: string
}

export type FlashNews = Pick<LatestPost, 'postName' | 'link'>

export type EditorChoice = Pick<
  LatestPost,
  'postName' | 'postId' | 'link' | 'heroImage'
>

export type TopicPost = Pick<
  LatestPost,
  'postName' | 'postId' | 'link' | 'heroImage'
> & {
  topicLink: string
}

export type CityAndWeather = {
  [city: string]: {
    date: string
    maxTemp: number
    minTemp: number
    weatherDesc: string
    weatherCode: string
    weather: string
    fetchTime: string
  }
}

export type SportsGameData = {
  id: string
  league: string
  startTime: string
  endTime: string
  result: string
  gameResultName?: string
  isGameStop: boolean
  presentStatus: number
  homeTeamName: string
  homeTeamScore: number
  homeTeamLogo: string
  visitingTeamName: string
  visitingTeamScore: number
  visitingTeamLogo: string
  currentPlay?: {
    home_score: number
    inning: number
    visiting_score: number
  }
}

export type LatestSportsNewsData = {
  type: string
  id: string
  title: string
  publishedDate: string
  heroImage: {
    resized: {
      original: string
      w480: string
      w800: string
      w1200: string
      w1600: string
      w2400: string
    }
    resizedWebp: {
      original: string
      w480: string
      w800: string
      w1200: string
      w1600: string
      w2400: string
    }
  }
}
