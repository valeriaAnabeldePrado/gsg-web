/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gsgdesign.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'images.smartcloudstudio.com',
        pathname: '/gsg/**',
      },
      {
        protocol: 'https',
        hostname: 'gsgdesign.com.ar',
        pathname: '/gsg/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-991b1e142013489ca0b64e1e314c7386.r2.dev',
      },
    ],
  },
};

export default nextConfig;
