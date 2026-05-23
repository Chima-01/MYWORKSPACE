import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "https://sensible-parakeet-480.convex.cloud",
        port: "",
      },
    ] 
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    }
  }
};

export default nextConfig;