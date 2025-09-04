import type { ImageDataFragment } from '@/graphql/__generated__/graphql'
import { SHORTS_TYPE } from '@/types/common'
import { z } from 'zod'

export type ImageKeys = keyof Omit<
  NonNullable<ImageDataFragment['resized']>,
  '__typename'
>

const imageKeys = [
  'original',
  'w480',
  'w800',
  'w1200',
  'w1600',
  'w2400',
] as const satisfies ImageKeys[]

const requiredImageKey = 'original'

export const resizedImageSchema = z
  .object(
    imageKeys.reduce(
      (shape, key) => {
        shape[key] = z.optional(z.string())
        return shape
      },
      {} as Record<ImageKeys, z.ZodTypeAny>
    )
  )
  .partial(
    Object.fromEntries([
      imageKeys.filter((k) => k != requiredImageKey).map((k) => [k, true]),
    ])
  )

const heroImageSchema = z
  .object({
    resized: resizedImageSchema,
    resizedWebp: resizedImageSchema,
  })
  .partial()

const categorySchema = z.object({
  name: z.string(),
  slug: z.string(),
})

export const sectionSchema = z.object({
  name: z.string(),
  slug: z.string(),
  color: z.string(),
  categories: z.array(categorySchema),
  type: z.literal('Section'),
})

const partnerSchema = z.object({
  slug: z.string(),
})

export const rawLatestPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  brief: z.string(),
  heroImage: z.union([heroImageSchema, z.string(), z.null(), z.undefined()]),
  sections: z.array(sectionSchema.pick({ name: true, slug: true })),
  categories: z.array(categorySchema.pick({ name: true, slug: true })),
  partner: z.union([partnerSchema, z.string()]),
  redirect: z.string(),
  publishedDate: z.string(),
})

export const rawPopularPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  brief: z.string(),
  heroImage: z.union([heroImageSchema, z.string(), z.null(), z.undefined()]),
  publishedDate: z.string(),
  sectionsInInputOrder: z.array(sectionSchema.pick({ name: true, slug: true })),
  categories: z.array(categorySchema.pick({ name: true, slug: true })),
})

export const rawHotNewsSchema = z.object({
  outlink: z.string(),
  hotnews: rawLatestPostSchema.pick({ id: true, title: true }).nullish(),
  hotexternal: rawLatestPostSchema.pick({ id: true, title: true }).nullish(),
})

export const editorChoiceSchenma = z.object({
  outlink: z.string().nullish(),
  heroImage: heroImageSchema.nullable(),
  choices: rawLatestPostSchema
    .pick({
      id: true,
      title: true,
      heroImage: true,
    })
    .nullish(),
  choiceexternal: z
    .object({
      id: z.string(),
      title: z.string(),
      slug: z.string(),
      thumb: z.string(),
    })
    .nullish(),
})

export const topicsSchema = z.object({
  name: z.string(),
  slug: z.string(),
  posts: z.array(
    rawLatestPostSchema.pick({
      id: true,
      title: true,
      heroImage: true,
    })
  ),
})

const weatherSchema = z.object({
  date: z.string(),
  max_temp: z.number(),
  min_temp: z.number(),
  weather_desc: z.string(),
  weather_code: z.string(),
  weather: z.string(),
  fetch_time: z.string(),
})

export const cityWeatherSchema = z.record(z.string(), weatherSchema)

export const latestShortsSchema = z.object({
  id: z.string(),
  name: z.string(),
  uploader: z.string(),
  youtubeUrl: z.string().nullish(),
  videoSrc: z.string().nullish(),
  heroImage: heroImageSchema.nullable(),
})

export const shortsDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  isShorts: z.boolean(),
  uploader: z.string(),
  videoSection: z.nativeEnum(SHORTS_TYPE),
  youtubeUrl: z.string().nullish(),
  videoSrc: z.string().nullish(),
  state: z.enum(['draft', 'scheduled', 'published']),
  tags: z.array(
    z.object({
      id: z.string(),
    })
  ),
  heroImage: heroImageSchema.nullable(),
  createdAt: z.string(),
  // fileDuration: z.string(),
  // youtubeDuration: z.string(),
  content: z.string(),
})

export const latestVideosSchema = z.object({
  id: z.string(),
  name: z.string(),
  uploader: z.string(),
  youtubeUrl: z.string().nullish(),
  videoSrc: z.string().nullish(),
  heroImage: heroImageSchema.nullable(),
  updatedAt: z.string().nullable(),
})

export const headerSchema = z.array(
  z.union([
    sectionSchema,
    topicsSchema
      .pick({
        name: true,
        slug: true,
      })
      .extend({
        type: z.literal('Topic'),
      }),
  ])
)
const currentPlaySchema = z.object({
  home_score: z.number(),
  inning: z.number(),
  visiting_score: z.number(),
})

export const gameSchema = z.object({
  // only when playing willl show this field
  currentPlay: currentPlaySchema.optional(),
  datetime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid datetime string',
  }),
  end_datetime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid datetime string',
    })
    .nullish(),
  game_result: z.string(),
  game_result_name: z.string().optional(),
  is_game_stop: z.string(),
  game_sno: z.number(),
  home_logo: z.string(),
  home_score: z.number(),
  home_team: z.string(),
  present_status: z.number(),
  visiting_logo: z.string(),
  visiting_score: z.number(),
  visiting_team: z.string(),
})

export const dailyScheduleSchema = z.object({
  // Changed field name from 'datetime' to 'date' and ensured ISO 8601 format
  date: z.string(),
  games: z.array(gameSchema),
})

export const sportsEventsApiResponseSchema = z.object({
  cpbl: z.array(dailyScheduleSchema).optional(),
  tpbl: z.array(dailyScheduleSchema).optional(),
})
export const sportsEventsSchema = dailyScheduleSchema

const apiDataContentSchema = z.object({
  id: z.string(),
  type: z.string(), // e.g., "unstyled"
  styles: z.record(z.unknown()).optional(),
  content: z.array(z.string()),
  alignment: z.string().optional(),
})

// Sports news article schema - reuses heroImageSchema for consistency
const sportsNewsItemSchema = z.object({
  type: z.literal('story'),
  id: z.string(),
  title: z.string(),
  publishedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid publishedDate string',
  }),
  heroImage: heroImageSchema.nullable(),
  og_image: heroImageSchema.nullable(),
  apiData: z.array(z.unknown()), // Generic array for any additional API data
  apiDataBrief: z.array(apiDataContentSchema),
})

const baseSectionPostSchema = rawLatestPostSchema.pick({
  id: true,
  title: true,
  publishedDate: true,
})

const sectionStorySchema = baseSectionPostSchema.extend({
  type: z.literal('story'),
  heroImage: z.union([heroImageSchema, z.string(), z.null(), z.undefined()]),
  og_image: z.union([heroImageSchema, z.string(), z.null(), z.undefined()]),
  apiData: z.unknown(),
  apiDataBrief: z.unknown(),
})

const sectionExternalSchema = baseSectionPostSchema.extend({
  type: z.literal('external'),
  thumb: z.string(),
  content: z.string(),
  brief: z.string(),
})

const sportsNewsCounts = z.object({
  posts: z.number(),
  externals: z.number(),
})

export const latestSportsNewsSchema = z.object({
  category: z.object({
    items: z.array(sportsNewsItemSchema),
    counts: sportsNewsCounts,
  }),
})

export { sportsNewsItemSchema, sportsNewsCounts }
export const sectionPostSchema = z.union([
  sectionStorySchema,
  sectionExternalSchema,
])
export const countsSchema = z.object({
  posts: z.number(),
  externals: z.number(),
})
