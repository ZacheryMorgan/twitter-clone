/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cloudflare-ipfs.com",
      "localhost",
      "s3.amazonaws.com",
      "amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
