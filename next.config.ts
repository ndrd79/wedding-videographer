import { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'i.ytimg.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default config;
