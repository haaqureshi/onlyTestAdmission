/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'admission.blackstoneboard.com',
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;