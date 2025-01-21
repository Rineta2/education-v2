/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

interface PathData {
  chunk: {
    name?: string;
  };
}

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.entry = {
        ...config.entry,
        'sw': './public/sw.ts',
      };

      config.output = {
        ...config.output,
        filename: (pathData: PathData) => {
          return pathData.chunk.name === 'sw' ? 'sw.js' : config.output?.filename;
        },
      };
    }
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
