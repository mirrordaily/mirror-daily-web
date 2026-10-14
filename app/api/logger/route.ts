import { NextResponse } from 'next/server'
import { z } from 'zod'
import { SITE_URL } from '@/constants/config'
import { logView, type ViewEventType } from '@/utils/view-log'

export const dynamic = 'force-dynamic'

const MAX_BODY_BYTES = 8 * 1024
const MAX_URL_LENGTH = 2048
const MAX_SCREEN_DIMENSION = 10000
const MAX_EXTRA_VALUE_LENGTH = 256

const PAGE_VIEW_STRING_KEYS = ['storyId', 'storyTitle', 'sectionName'] as const

const PAGE_VIEW_STRING_ARRAY_KEYS = [
  'authorNames',
  'tags',
  'algoTags',
  'editors',
  'mainWriters',
] as const

const VIDEO_STRING_KEYS = ['video_title', 'video_id'] as const

const VIDEO_NUMBER_KEYS = [
  'video_duration',
  'playback_duration',
  'percentage_watched',
] as const

const ScreenDimensionSchema = z
  .number()
  .finite()
  .transform(Math.round)
  .pipe(z.number().int().min(0).max(MAX_SCREEN_DIMENSION))

const ViewLogPayloadSchema = z.object({
  eventType: z.enum(['page-view', 'video-view']),
  currentUrl: z.string().max(MAX_URL_LENGTH).refine(isOwnSiteUrl, {
    message: 'currentUrl is not on an allowed host',
  }),
  referrer: z.string().max(MAX_URL_LENGTH).catch(''),
  screenSize: z.object({
    width: ScreenDimensionSchema,
    height: ScreenDimensionSchema,
  }),
  extra: z.record(z.string(), z.unknown()).catch({}),
})

export async function POST(request: Request) {
  if (!isTrustedRequest(request)) {
    console.warn('[api/logger] rejected untrusted origin', {
      origin: request.headers.get('origin'),
      referer: request.headers.get('referer'),
    })
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const declaredLength = Number(request.headers.get('content-length'))

  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }

  let rawBody: string

  try {
    rawBody = await request.text()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }

  let body: unknown

  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const result = ViewLogPayloadSchema.safeParse(body)

  if (!result.success) {
    console.warn('[api/logger] invalid payload', result.error.issues)
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  try {
    await logView({
      ...result.data,
      extra: pickAllowedExtra(result.data.eventType, result.data.extra),
    })
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error('[api/logger] failed', err)
    return NextResponse.json({ error: 'Failed to write log' }, { status: 500 })
  }
}

function isTrustedRequest(request: Request): boolean {
  const origin = request.headers.get('origin')

  // A present Origin is authoritative. Only fall back to Referer when it is absent.
  if (origin) {
    return origin !== 'null' && isOwnSiteUrl(origin)
  }

  const referer = request.headers.get('referer')
  return !!referer && isOwnSiteUrl(referer)
}

function isOwnSiteUrl(rawUrl: string): boolean {
  let parsed: URL

  try {
    parsed = new URL(rawUrl)
  } catch {
    return false
  }

  if (
    process.env.NODE_ENV === 'development' &&
    (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')
  ) {
    return true
  }

  return parsed.origin === new URL(SITE_URL).origin
}

function pickAllowedExtra(
  eventType: ViewEventType,
  extra: Record<string, unknown>
): Record<string, unknown> {
  const picked: Record<string, unknown> = {}

  if (eventType === 'page-view') {
    for (const key of PAGE_VIEW_STRING_KEYS) {
      const value = extra[key]
      if (typeof value === 'string') {
        picked[key] = value.slice(0, MAX_EXTRA_VALUE_LENGTH)
      }
    }

    for (const key of PAGE_VIEW_STRING_ARRAY_KEYS) {
      const value = pickStringArray(extra[key])
      if (value) picked[key] = value
    }

    return picked
  }

  for (const key of VIDEO_STRING_KEYS) {
    const value = extra[key]
    if (typeof value === 'string') {
      picked[key] = value.slice(0, MAX_EXTRA_VALUE_LENGTH)
    }
  }

  for (const key of VIDEO_NUMBER_KEYS) {
    const value = extra[key]
    if (typeof value === 'number' && Number.isFinite(value)) {
      picked[key] = value
    }
  }

  return picked
}

function pickStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.slice(0, MAX_EXTRA_VALUE_LENGTH))
}
