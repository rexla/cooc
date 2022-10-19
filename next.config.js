/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["rb.gy"],
  }, //
  async rewrites() {
    return [
      {
        source: "/act/api/open/fakeLogin/:id",
        destination:
          "http://actregister.ezoominfo.com/api/open/fakeCoocLogin?TiltedShadow=:id",
      },
      {
        source: "/act/api/:path*",
        destination: "http://actregister.ezoominfo.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
