/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos",'ewsj12.s3.ap-south-1.amazonaws.com'],
   
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
