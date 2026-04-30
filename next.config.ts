import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Gzip/Brotli compression at the framework layer (Vercel/most hosts also apply edge compression).
  compress: true,

  // Strip the X-Powered-By: Next.js header — small SEO/security hygiene win.
  poweredByHeader: false,

  // Trailing-slash policy: omit, so /products/chatbots is canonical (not /products/chatbots/).
  trailingSlash: false,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },

  // 301 redirects — old /services/* routes were removed; preserve any existing link equity.
  async redirects() {
    return [
      { source: "/services/chatbots",     destination: "/products/chatbots",   permanent: true },
      { source: "/services/automation",   destination: "/products/automation", permanent: true },
      { source: "/services/erpnext",      destination: "/#services",           permanent: true },
      { source: "/services",              destination: "/#services",           permanent: true },
    ];
  },

  // Security + caching headers — also help Core Web Vitals and crawler trust signals.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options",        value: "SAMEORIGIN" },
          { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",     value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Long-cache static assets in /public.
        source: "/:path*\\.(png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2|ttf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
