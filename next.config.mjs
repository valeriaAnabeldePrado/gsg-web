/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gsgdesign.com.ar",
      },
    ],
  },
};

export default nextConfig;
