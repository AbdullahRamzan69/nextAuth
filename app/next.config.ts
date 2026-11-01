import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/users/:path*",
        destination: "/api/users/:path*",
      },
    ];
  },
};

export default nextConfig;
