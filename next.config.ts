import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const STORAGE_PUBLIC_URL = process.env.STORAGE_PUBLIC_URL;

const remotePatterns: RemotePattern[] = [];

if (STORAGE_PUBLIC_URL) {
  try {
    const { protocol, hostname } = new URL(STORAGE_PUBLIC_URL);

    remotePatterns.push({
      protocol: protocol.replace(":", "") as "http" | "https",
      hostname,
      pathname: "/**",
    });
  } catch {
    console.warn(
      "⚠️ STORAGE_PUBLIC_URL is not a valid URL:",
      STORAGE_PUBLIC_URL,
    );
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
