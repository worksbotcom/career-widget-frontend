/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
                protocol: "https",
                hostname: "api.dicebear.com",
      },
    ],
  },
};

export default nextConfig;
