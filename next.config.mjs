import * as tsImport from 'ts-import'

const { SITE_BASE_PATH } = await tsImport.load('./constants/preview-mode.ts')

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
    // add etag for all the routes to revalidate CDN cache for each build
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'ETag',
            value: `"${process.env.GIT_HASH}"`,
          },
        ],
      },
    ]
  },
}

export default nextConfig
