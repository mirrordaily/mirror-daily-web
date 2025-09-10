import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { IS_PREVIEW_MODE, SITE_BASE_PATH } from './constants/preview-mode'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-current-pathname', pathname)

  if (IS_PREVIEW_MODE && pathname.startsWith('/images-next')) {
    // applied SITE_BASE_PATH to images under /public folder when server in preview mode
    return NextResponse.rewrite(
      new URL(`${SITE_BASE_PATH}${pathname}`, request.url),
      {
        request: {
          headers: requestHeaders,
        },
      }
    )
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|\\.well-known|favicon.ico|icons).*)',
  ],
}
