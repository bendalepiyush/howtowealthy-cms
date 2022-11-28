/** @type {import('next').NextConfig} */
const withOptimizedImages = require("next-optimized-images");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["assets.howtowealthy.com", "howtowealthy.com"],
  },

  env: {
    REACT_APP_GRAPHQL_ENDPOINT: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    REACT_APP_ENDPOINT_ACCESS_TOKEN:
      process.env.REACT_APP_ENDPOINT_ACCESS_TOKEN,
  },

  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

module.exports = withOptimizedImages(nextConfig);
