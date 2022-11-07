/** @type {import('next').NextConfig} */
const withOptimizedImages = require("next-optimized-images");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["assets.howtowealthy.com", "howtowealthy.com"],
  },
};

module.exports = withOptimizedImages(nextConfig);
