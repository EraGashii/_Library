import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: "mongodb://localhost:27017/myblogapp",
  },
};

export default nextConfig;
  