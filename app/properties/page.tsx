import type { Metadata } from 'next';
import PropertiesClient from './properties-client';

export const metadata: Metadata = {
  title: 'Exclusive Properties & Residences',
  description:
    'Explore our curated portfolio of luxury villas, penthouses, and private estates across Dubai and the UAE.',
  openGraph: {
    title: 'Exclusive Properties & Residences | Altiere Estates',
    description:
      'Explore our curated portfolio of luxury villas, penthouses, and private estates across Dubai and the UAE.',
  },
};

export default function PropertiesPage() {
  return <PropertiesClient />;
}
