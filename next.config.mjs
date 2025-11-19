
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Image optimization
  images: {
    domains: [
      'supabase.co',
      'ebonidating.com',
      'images.unsplash.com',
      'lh3.googleusercontent.com' // For Google OAuth profile pictures
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.com',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // Redirect configuration
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Experimental features for production
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js', 'lucide-react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Production client-side optimizations
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        supabase: {
          name: 'supabase',
          test: /[\\/]node_modules[\\/](@supabase)[\\/]/,
          chunks: 'all',
          priority: 10,
        },
        ui: {
          name: 'ui',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          chunks: 'all',
          priority: 20,
        },
      }
    }
    return config
  },
}

export default nextConfig
