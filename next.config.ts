import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const storagePublicUrl = process.env.STORAGE_PUBLIC_URL;
const remotePatterns: RemotePattern[] = [];

if (storagePublicUrl) {
  const { protocol, hostname } = new URL(storagePublicUrl);
  remotePatterns.push({
    protocol: protocol.replace(":", "") as "http" | "https",
    hostname,
    pathname: "/**",
  });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
