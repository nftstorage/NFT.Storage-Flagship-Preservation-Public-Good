/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => [
    {
      source: "/v1",
      destination: "/v1/index.html",
    },
    {
      source: "/docs",
      destination: "/v1/index.html",
    },
  ],
};

export default nextConfig;
