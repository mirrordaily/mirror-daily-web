/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v3-statics-dev.mirrormedia.mg',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
