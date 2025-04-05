import type { NextConfig } from "next";
import { createProxyMiddleware } from 'http-proxy-middleware';

const nextConfig: NextConfig = {
  images: {
    domains: ['3.7.52.212', 'localhost', 'images.pexels.com', 'images.unsplash.com', 'api.dicebear.com', 'maps.googleapis.com', 'maps.gstatic.com', 'pbs.twimg.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://3.7.52.212:5000/:path*', // Proxy to HTTP server
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/:path*', // Proxy to HTTP server
      },
    ];
  },
};

export default nextConfig;