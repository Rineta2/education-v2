/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  trailingSlash: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/super-admin',
        destination: '/super-admins',
        permanent: true,
      },
      {
        source: '/super-admin/:path*',
        destination: '/super-admins/:path*',
        permanent: true,
      }
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Tambahkan rewrite rules jika diperlukan
      ],
      afterFiles: [
        {
          source: '/dashboard',
          destination: '/super-admins/dashboard',
        }
      ],
      fallback: []
    }
  }
}

export default withBundleAnalyzer(nextConfig)