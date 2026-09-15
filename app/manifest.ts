import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Altiere Estates | UAE Luxury Real Estate',
    short_name: 'Altiere',
    description: 'A fictional premium UAE real estate demo.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f6f1',
    theme_color: '#b39062',
    icons: [
      {
        src: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

