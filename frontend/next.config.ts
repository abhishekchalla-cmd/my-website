import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  devIndicators: false,
  transpilePackages: ["@abhishekchalla/notion"],
};

export default nextConfig;
