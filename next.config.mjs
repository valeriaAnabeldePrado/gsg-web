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
    ],
  },
};

export default nextConfig;
