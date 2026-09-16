import './globals.css';
import type { Metadata, Viewport } from 'next';
import { FloatingContactButton } from '@/components/site';

export const metadata: Metadata = {
  metadataBase: new URL('https://altiere-estates.ae'),
  title: {
    default: 'Altiere Estates | Luxury Properties & Private Residences Dubai',
    template: '%s | Altiere Estates — Luxury UAE Real Estate',
  },
  description:
    'Explore our curated portfolio of luxury villas, penthouses, and private estates across Dubai and the UAE with Altiere Estates.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: 'Altiere Estates',
    title: 'Altiere Estates | Luxury Properties & Private Residences Dubai',
    description:
      'Explore our curated portfolio of luxury villas, penthouses, and private estates across Dubai and the UAE.',
  },
};

export const viewport: Viewport = {
  themeColor: '#b39062',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden w-full max-w-[100vw]">
      <body className="overflow-x-hidden w-full max-w-[100vw] min-h-screen min-h-[100dvh] relative flex flex-col bg-[#f8f6f1]">
        {children}
        <FloatingContactButton />
      </body>
    </html>
  );
}
