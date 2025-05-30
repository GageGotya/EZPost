/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ezpost.net'],
  },
  experimental: {
    esmExternals: false // Fixes undici/webpack compatibility issue
  },
  transpilePackages: ['framer-motion']
}

module.exports = nextConfig 