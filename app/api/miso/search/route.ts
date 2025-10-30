import { MISO_API_KEY } from '@/constants/config'

const MISO_HYBRID_ENDPOINT = 'https://api.askmiso.com/v1/ask/search'

function validateSort(sort: string | null): 'relevance' | 'published_at' {
  return sort === 'relevance' || sort === 'published_at' ? sort : 'published_at'
}

function toInt(value: string | null, fallback: number): number {
  const n = value ? parseInt(value, 10) : NaN
  return Number.isFinite(n) && n > 0 ? n : fallback
}

function read(obj: unknown, key: string): unknown {
  if (obj && typeof obj === 'object') {
    return (obj as Record<string, unknown>)[key]
  }
  return undefined
}

function readArray(obj: unknown, path: string[]): unknown[] {
  let cur: unknown = obj
  for (const p of path) {
    cur = read(cur, p)
    if (cur === undefined) return []
  }
  return Array.isArray(cur) ? cur : []
}

function pick(obj: unknown, key: string): string | undefined {
  const v = read(obj, key)
  return typeof v === 'string' ? v : undefined
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const q = url.searchParams.get('q')?.trim() || ''
    if (!q) {
      return new Response(JSON.stringify({ items: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const page = toInt(url.searchParams.get('page'), 1)
    const size = toInt(url.searchParams.get('size'), 10)
    const sort = validateSort(url.searchParams.get('sort'))
    const debug = url.searchParams.get('debug') === '1'

    const start = (page - 1) * size
    const rows = size

    if (!MISO_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Missing MISO_API_KEY', items: [] }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Build Miso request
    const misoUrl = new URL(MISO_HYBRID_ENDPOINT)
    misoUrl.searchParams.set('api_key', MISO_API_KEY)

    const body = {
      anonymous_id: `anon_${Date.now()}`,
      q,
      fq: 'product_id:/mesh_story_.+/',
      start,
      rows,
      order_by: sort,
      // Align fields with working config
      fl: [
        'product_id',
        'cover_image',
        'url',
        'published_at',
        'title',
        'authors',
        'custom_attributes.*',
      ],
      source_fl: [
        'cover_image',
        'url',
        'created_at',
        'updated_at',
        'published_at',
        'title',
        'authors',
        'custom_attributes.*',
      ],
      snippet_max_chars: 200,
      answer: false,
      cite_link: 1,
      cite_start: '[',
      cite_end: ']',
    }

    const misoRes = await fetch(misoUrl.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-cache',
    })

    if (!misoRes.ok) {
      const text = await misoRes.text().catch(() => '')
      return new Response(
        JSON.stringify({
          error: 'Upstream Miso error',
          status: misoRes.status,
          message: text,
          items: [],
        }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const misoData: unknown = await misoRes.json().catch(() => ({}))

    const candidatesUnknown: unknown[] | [] = readArray(misoData, ['items'])
      .concat(readArray(misoData, ['data', 'items']))
      .concat(readArray(misoData, ['data', 'results']))
      .concat(readArray(misoData, ['data', 'products']))
      .concat(readArray(misoData, ['response', 'docs']))

    const candidates = Array.isArray(candidatesUnknown) ? candidatesUnknown : []

    const items = candidates.map((d) => {
      const id = pick(d, 'product_id') ?? pick(d, 'id') ?? ''
      return {
        id,
        title: pick(d, 'title') ?? '',
        url: pick(d, 'url') ?? '',
        cover_image: pick(d, 'cover_image') ?? pick(d, 'image') ?? '',
        published_at: pick(d, 'published_at') ?? pick(d, 'created_at') ?? '',
        snippet: pick(d, 'snippet') ?? pick(d, 'highlight') ?? '',
      }
    })

    const dataObj =
      (misoData && typeof misoData === 'object'
        ? (misoData as Record<string, unknown>)
        : undefined) || undefined
    const dataNested = dataObj?.data as Record<string, unknown> | undefined
    const total =
      (typeof dataNested?.total === 'number' ? dataNested.total : undefined) ??
      items.length

    const payload = debug
      ? {
          items,
          total,
          _debug: {
            candidatesLength: Array.isArray(candidates) ? candidates.length : 0,
            topLevelKeys: Object.keys(
              (dataObj as Record<string, unknown>) || {}
            ),
            dataKeys: Object.keys(
              (dataNested as Record<string, unknown>) || {}
            ),
            lengths: {
              items: readArray(misoData, ['items']).length || 0,
              data_items: readArray(misoData, ['data', 'items']).length || 0,
              data_results:
                readArray(misoData, ['data', 'results']).length || 0,
              data_products:
                readArray(misoData, ['data', 'products']).length || 0,
              response_docs:
                readArray(misoData, ['response', 'docs']).length || 0,
            },
            total:
              typeof dataNested?.total === 'number' ? dataNested.total : null,
          },
        }
      : { items, total }

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: 'Search proxy failed', message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
