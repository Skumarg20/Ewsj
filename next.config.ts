/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos", "ewsj12.s3.ap-south-1.amazonaws.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  reactStrictMode: false,
  eslint: {
    // Add ESLint configuration here
    dirs: ["src"], // Optional: Specifies directories to lint (default includes all)
    ignoreDuringBuilds: false, // Ensures ESLint runs during builds
    // You can override rules here via a custom .eslintrc, but we'll simulate it
  },
};

// Note: Direct rule overrides are typically in .eslintrc, but we can extend config
// For inline ESLint rule disabling, we'll assume you're using a separate .eslintrc
module.exports = {
  ...nextConfig,
  eslint: {
    ...nextConfig.eslint,
   
  },
  output: 'standalone',
};
