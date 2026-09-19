/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    // All photography is self-hosted under /public/images (see scripts/optimize-images.mjs),
    // so no remote patterns are needed and nothing is fetched from a third-party CDN per request.
    formats: ['image/webp'],
    qualities: [65, 75],
    // Optimised variants are immutable; cache them for a year at the CDN and browser.
    minimumCacheTTL: 60 * 60 * 24 * 365,
    deviceSizes: [640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [96, 160, 256, 384],
  },
};

export default nextConfig;
