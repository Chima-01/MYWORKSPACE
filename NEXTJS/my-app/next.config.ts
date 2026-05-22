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
        hostname: "striped-crocodile-996.convex.cloud",
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