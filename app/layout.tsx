import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import { FloatingContactButton } from '@/components/site';

/*
 * Typography foundation
 * Both families are self-hosted through next/font (no external requests,
 * no layout shift). They are exposed as CSS variables and consumed in
 * globals.css via --font-serif / --font-sans.
 */
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif-src',
});

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sans-src',
});

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
  themeColor: '#0D1726',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        <FloatingContactButton />
      </body>
    </html>
  );
}
