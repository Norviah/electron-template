/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  experimental: {
    typedRoutes: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
