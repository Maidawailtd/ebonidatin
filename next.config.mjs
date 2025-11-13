/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false, // Security: hide Next.js header
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
