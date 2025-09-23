import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wonderful-wildcat-448.convex.cloud",
      },
    ],
  },
  allowedDevOrigins: [
    process.env.CLIENT_ORIGIN!,
  ],
  crossOrigin: "anonymous",

};

export default nextConfig;
