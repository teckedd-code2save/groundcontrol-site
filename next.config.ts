import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/articles/chatgpt-operated-my-deployment",
        destination: "/articles/agentic-deployment-with-oauth-and-mcp",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
