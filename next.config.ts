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
      const entry = typeof config.entry === 'function'
        ? config.entry()
        : config.entry;

      config.entry = async () => {
        const entries = await entry;
        return {
          ...entries,
          'sw': './public/sw.ts',
        };
      };

      if (config.output) {
        config.output.filename = (pathData: PathData) => {
          return pathData.chunk.name === 'sw' ? 'sw.js' :
            (typeof config.output?.filename === 'string'
              ? config.output.filename
              : '[name].js');
        };
      }
    }
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
