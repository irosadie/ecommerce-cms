/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.dummyjson.com',
      },
    ],
  },
  reactDevOverlay: false
}

module.exports = nextConfig
