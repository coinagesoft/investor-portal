import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "",
  },
  async rewrites() {
    return [
      {
        source: "/category",
        destination: "/api/category",
      },
      {
        source: "/category/:id",
        destination: "/api/category/:id",
      },
      {
        source: "/folder",
        destination: "/api/folder",
      },
      {
        source: "/folder/:id",
        destination: "/api/folder/:id",
      },
      {
        source: "/file",
        destination: "/api/file",
      },
      {
        source: "/file/:id",
        destination: "/api/file/:id",
      },
      {
        source: "/dashboard-stats",
        destination: "/api/dashboard-stats",
      },
      {
        source: "/recent-files",
        destination: "/api/recent-files",
      },
    ];
  },
};

export default nextConfig;
