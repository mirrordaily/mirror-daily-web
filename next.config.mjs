/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    serverActions: {
      /** @see maximum HTTP/1 request size, @see https://cloud.google.com/run/quotas#networking_limits */
      bodySizeLimit: '31MB',
    },
  },
}

export default nextConfig
