import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR WebSocket connections when accessing via local network IP.
  allowedDevOrigins: ["192.168.1.13", "*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.io"],

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
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // 301 redirects — preserve link equity across URL moves.
  async redirects() {
    return [
      // ── Services moved from /products/* → /services/* (SEO URL optimization) ──
      // These keep Google ranking on the old /products/* URLs.
      { source: "/products/automation",  destination: "/services/automation", permanent: true },
      { source: "/products/devops",       destination: "/services/devops",     permanent: true },
      { source: "/products/custom-ai",    destination: "/services/custom-ai",  permanent: true },

      // ── Resources → Blog URL rename ──
      { source: "/resources",            destination: "/blog",              permanent: true },

      // ── Legacy /services/* links for pages that STAYED under /products/* ──
      // (chatbots stayed; do NOT redirect /services/automation here — it is now a real page.)
      { source: "/services/chatbots",     destination: "/products/chatbots",   permanent: true },
      { source: "/services/erpnext",      destination: "/#services",           permanent: true },
      { source: "/products/erpnext",      destination: "/#services",           permanent: true },
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
          { key: "Permissions-Policy",     value: "camera=(), microphone=(self \"https://chat.printai.cloud\"), geolocation=()" },
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
