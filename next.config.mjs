/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  webpack: (config, { isServer }) => {
    // Externalize Node.js modules for Edge Runtime
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('better-sqlite3');
    }
    return config;
  },
};

export default nextConfig;
