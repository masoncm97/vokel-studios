import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // Keep typed routes off; not needed and avoids churn on the Studio catch-all.
  experimental: {},
};

export default config;
