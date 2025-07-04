/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://192.168.1.135:8080/:path*',
      },
    ];
  },
};

export default nextConfig;
