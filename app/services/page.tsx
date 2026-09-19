import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blurProps } from '@/lib/photos';
import { ArrowRight } from 'lucide-react';
import { Footer, Navbar, ScrollReveal } from '@/components/site';

export const metadata: Metadata = {
  title: 'Private Advisory & Client Services',
  description:
    'Bespoke real estate services including private sales, acquisitions, leasing, and asset management.',
  openGraph: {
    title: 'Private Advisory & Client Services | Altiere Estates',
    description:
      'Bespoke real estate services including private sales, acquisitions, leasing, and asset management.',
  },
};

/*
 * Service areas — drawn from the practice areas the site already offered
 * (private sales, leasing, management, commercial, investment advisory),
 * reframed as stages of ownership. Nothing here promises outcomes.
 */
const SERVICES = [
  {
    index: '01',
    title: 'Property Acquisition',
    copy: 'A focused search and advisory process for distinctive residential and commercial opportunities.',
    includes: ['Discreet off-market positioning', 'Qualified buyer introductions', 'Considered negotiation'],
    image: '/images/hero-uae-villa.jpg',
    alt: 'A contemporary travertine villa with a reflecting pool at golden hour',
    ratio: 'portrait',
  },
  {
    index: '02',
    title: 'Private Viewings',
    copy: 'A composed viewing experience built around your priorities and schedule.',
    includes: ['Appointments arranged around you', 'Accompanied by your advisor', 'Full property context in advance'],
    image: '/images/services-uae-hero.jpg',
    alt: 'A double-height penthouse salon looking out over the Arabian Gulf towards the Burj Al Arab',
    ratio: 'wide',
  },
  {
    index: '03',
    title: 'Property Advisory',
    copy: 'Clear guidance through evaluation, negotiation and acquisition.',
    includes: ['Market context and comparables', 'Structured evaluation of each option', 'Support through to completion'],
    image: '/images/unsplash/photo-1615747476328-41153cf6da54.jpg',
    alt: 'Sculptural white arches at Dubai Creek Harbour framing the Downtown skyline',
    ratio: 'portrait',
  },
  {
    index: '04',
    title: 'Property Management',
    copy: 'Ongoing oversight for owners who value consistency and peace of mind.',
    includes: ['Proactive maintenance coordination', 'Tenant relations and occupancy oversight', 'Straightforward owner reporting'],
    image: '/images/unsplash/photo-1600585154526-990dced4db0d.jpg',
    alt: 'A contemporary residence at dusk with a lit timber entrance and dark cladding',
    ratio: 'tall',
  },
  {
    index: '05',
    title: 'Leasing & Commercial',
    copy: 'Tailored leasing for residences, and considered representation for workspaces and commercial addresses.',
    includes: ['Tenant screening and lease administration', 'Office and retail advisory', 'Corporate portfolio representation'],
    image: '/images/unsplash/photo-1497366811353-6870744d04b2.jpg',
    alt: 'A light-filled meeting room with a long timber table and floor-to-ceiling glazing',
    ratio: 'wide',
  },
  {
    index: '06',
    title: 'Asset Support',
    copy: 'Market context and considered analysis to inform acquisition and ownership decisions, without promises about outcomes.',
    includes: ['Area and market briefings', 'Confidential acquisition support', 'Portfolio review on request'],
    image: '/images/unsplash/photo-1611577810610-642f8ac05c32.jpg',
    alt: 'Dubai Marina towers seen from the water in late afternoon light',
    ratio: 'portrait',
  },
];

export default function Services() {
  return (
    <>
      <Navbar />
      <main className="sv">
        {/* Introduction */}
        <section className="sv-intro" aria-labelledby="services-heading">
          <div className="shell sv-intro__grid">
            <div className="sv-intro__lead">
              <p className="eyebrow animate-hero-reveal">Private Property Services</p>
              <h1 id="services-heading" className="sv-intro__title animate-hero-reveal delay-1">
                Guidance at every stage of <em>ownership.</em>
              </h1>
            </div>
            <div className="sv-intro__aside animate-hero-reveal delay-2">
              <p className="sv-intro__copy">
                From finding the right property to caring for an existing asset, Altiere Estates
                provides a considered approach to the UAE property journey.
              </p>
              <ol className="sv-intro__index" aria-label="Service areas">
                {SERVICES.map((s) => (
                  <li key={s.index}>
                    <a href={`#service-${s.index}`} className="sv-intro__index-link">
                      <span className="sv-intro__index-num">{s.index}</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Service areas */}
        <section className="shell sv-list" aria-label="Service areas in detail">
          {SERVICES.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={s.index}
                id={`service-${s.index}`}
                className={`sv-item ${flip ? 'sv-item--flip' : ''} sv-item--${s.ratio}`}
                aria-labelledby={`service-title-${s.index}`}
              >
                <ScrollReveal className="sv-item__text">
                  <span className="sv-item__num" aria-hidden="true">
                    {s.index}
                  </span>
                  <div className="sv-item__body">
                    <p className="sv-item__meta">
                      <span className="sr-only">Service </span>
                      {s.index}
                    </p>
                    <h2 id={`service-title-${s.index}`} className="sv-item__title">
                      {s.title}
                    </h2>
                    <p className="sv-item__copy">{s.copy}</p>
                    <ul className="sv-item__includes">
                      {s.includes.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    <Link href="/contact" className="btn-link sv-item__cta">
                      <span>Begin a conversation</span>
                      <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
                    </Link>
                  </div>
                </ScrollReveal>

                <ScrollReveal stagger={1} className="sv-item__media">
                  <div className="sv-item__frame">
                    <Image
                      src={s.image}
                      {...blurProps(s.image)}
                      alt={s.alt}
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="sv-item__img"
                      priority={i === 0}
                    />
                  </div>
                </ScrollReveal>
              </article>
            );
          })}
        </section>

        {/* Closing conversation */}
        <section className="sv-cta on-dark" aria-labelledby="services-cta-heading">
          <div className="shell sv-cta__grid">
            <div>
              <ScrollReveal>
                <p className="eyebrow sv-cta__eyebrow">A private conversation</p>
              </ScrollReveal>
              <ScrollReveal stagger={1}>
                <h2 id="services-cta-heading" className="sv-cta__title">
                  Tell us where you are in the <em>journey.</em>
                </h2>
              </ScrollReveal>
            </div>
            <ScrollReveal stagger={2} className="sv-cta__aside">
              <p className="sv-cta__copy">
                Whether you are beginning a search, weighing an opportunity or caring for a property
                you already own, the conversation starts the same way: privately, and at your pace.
              </p>
              <div className="sv-cta__actions">
                <Link href="/contact" className="btn-inverse">
                  <span>Request a Private Conversation</span>
                  <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
                </Link>
                <Link href="/properties" className="btn-outline-inverse">
                  <span>View the Collection</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
