import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration for Cloudflare Pages
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
