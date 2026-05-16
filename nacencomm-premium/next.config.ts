import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "r2.erweima.ai" },
      { protocol: "https", hostname: "secure.ca2.com.vn" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "www.nacencomm.com.vn" },
    ],
  },
};

export default nextConfig;
