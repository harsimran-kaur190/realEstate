import type { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = {
  title: 'Contact & Enquiries',
  description:
    'Connect with our private client advisors to discuss your property ambitions.',
  openGraph: {
    title: 'Contact & Enquiries | Altiere Estates',
    description:
      'Connect with our private client advisors to discuss your property ambitions.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
