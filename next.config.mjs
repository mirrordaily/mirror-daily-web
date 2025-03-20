import * as tsImport from 'ts-import'

const { SITE_BASE_PATH, IS_PREVIEW_MODE } = await tsImport.load(
  './constants/preview-mode.ts'
)

/** @typedef {import('next/dist/lib/load-custom-routes').Header['headers'][number]} Header  */

// const SECOND = 1
// const MINUTE = SECOND * 60
// const HOUR = MINUTE * 60
// const DAY = HOUR * 24

/** @type {Header} */
// const cacheControl5Min = {
//   key: 'cache-control',
//   value: `public, s-maxage=${MINUTE * 5}, stale-while-revalidate=60`,
// }

// /** @type {Header} */
// const cacheControl10Min = {
//   key: 'cache-control',
//   value: `public, s-maxage=${MINUTE * 10}, stale-while-revalidate=60`,
// }

// /** @type {Header} */
// const cacheControl30Min = {
//   key: 'cache-control',
//   value: `public, s-maxage=${MINUTE * 30}, stale-while-revalidate=60`,
// }

/** @type {Header} */
// const cacheControl7Day = {
//   key: 'cache-control',
//   value: `public, s-maxage=${DAY * 7}, stale-while-revalidate=60`,
// }

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: SITE_BASE_PATH,
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    serverActions: {
      /** @see maximum HTTP/1 request size, @see https://cloud.google.com/run/quotas#networking_limits */
      bodySizeLimit: '31MB',
    },
  },
  async headers() {
    if (IS_PREVIEW_MODE) {
      return []
    }

    return [
      // {
      //   source: '/:path*',
      //   headers: [
      //     {
      //       key: 'ETag',
      //       value: `"${process.env.GIT_HASH}"`,
      //     },
      //     cacheControl5Min,
      //   ],
      // },
      // {
      //   source: '/story/:path*',
      //   headers: [cacheControl7Day],
      // },
    ]
  },
  poweredByHeader: false,
}

export default nextConfig
