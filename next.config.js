/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "media.giphy.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.cookbook.gg",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/captain-falcon/clips",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
