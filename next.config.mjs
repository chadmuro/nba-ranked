/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'www.basketball-reference.com',
      port: '',
    },],
  }
};

export default nextConfig;
