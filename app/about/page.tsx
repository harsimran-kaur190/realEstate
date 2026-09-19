import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blurProps } from '@/lib/photos';
import { ArrowRight } from 'lucide-react';
import { Footer, Navbar, ScrollReveal } from '@/components/site';

export const metadata: Metadata = {
  title: 'Our Approach',
  description:
    'How Altiere Estates approaches property: considered selection, private advisory and long-term stewardship across the UAE.',
  openGraph: {
    title: 'Our Approach | Altiere Estates',
    description:
      'How Altiere Estates approaches property: considered selection, private advisory and long-term stewardship across the UAE.',
  },
};

const PRINCIPLES = [
  {
    title: 'Clarity',
    copy: 'We make the complex understandable and the path forward visible, with transparent advice and careful reading of the market.',
  },
  {
    title: 'Care',
    copy: 'We listen closely, communicate openly and treat every property decision as if it were our own.',
  },
  {
    title: 'Discretion',
    copy: 'Confidentiality and quiet integrity underpin our relationships with private clients.',
  },
];

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        {/* Introduction */}
        <section className="ab-intro" aria-labelledby="about-heading">
          <div className="shell ab-intro__grid">
            <div className="ab-intro__lead">
              <p className="eyebrow animate-hero-reveal">Our point of view</p>
              <h1 id="about-heading" className="ab-intro__title animate-hero-reveal delay-1">
                A sharper eye for what <em>matters.</em>
              </h1>
            </div>
            <div className="ab-intro__aside animate-hero-reveal delay-2">
              <p className="ab-intro__copy">
                Altiere is an independent real-estate brand founded on a simple belief: remarkable
                property deserves a more considered experience.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="shell ab-mission" aria-labelledby="mission-heading">
          <ScrollReveal className="ab-mission__media">
            <div className="ab-mission__frame">
              <Image
                src="/images/unsplash/photo-1615747476328-41153cf6da54.jpg"
                {...blurProps("/images/unsplash/photo-1615747476328-41153cf6da54.jpg")}
                alt="Sculptural white arches at Dubai Creek Harbour framing the Downtown skyline"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="ab-mission__img"
                priority
              />
            </div>
          </ScrollReveal>
          <div className="ab-mission__text">
            <ScrollReveal>
              <p className="eyebrow">Our mission</p>
              <h2 id="mission-heading" className="ab-mission__title">
                To make every move feel <em>well made.</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal stagger={1}>
              <p className="ab-mission__copy">
                We bring together experienced counsel, close knowledge of the UAE market and a
                distinctly personal way of working. Our aim is to be the quietly trusted name behind
                our clients&rsquo; most important property decisions.
              </p>
            </ScrollReveal>
            <ScrollReveal stagger={2}>
              <Link href="/services" className="btn-link ab-mission__cta">
                <span>What we do</span>
                <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* Principles */}
        <section className="ab-principles" aria-labelledby="principles-heading">
          <div className="shell">
            <ScrollReveal>
              <p className="eyebrow">What guides us</p>
              <h2 id="principles-heading" className="ab-principles__title">
                Principles of practice.
              </h2>
            </ScrollReveal>
            <ul className="ab-principles__list">
              {PRINCIPLES.map((p, i) => (
                <li key={p.title} className="ab-principle">
                  <ScrollReveal stagger={i + 1} className="ab-principle__inner">
                    <h3 className="ab-principle__title">{p.title}</h3>
                    <p className="ab-principle__copy">{p.copy}</p>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing */}
        <section className="ab-close on-dark" aria-labelledby="about-cta-heading">
          <div className="shell ab-close__grid">
            <ScrollReveal>
              <p className="eyebrow ab-close__eyebrow">A private conversation</p>
              <h2 id="about-cta-heading" className="ab-close__title">
                Begin with a <em>conversation.</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal stagger={1} className="ab-close__actions">
              <Link href="/contact" className="btn-inverse">
                <span>Contact Altiere</span>
                <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
              </Link>
              <Link href="/properties" className="btn-outline-inverse">
                <span>View the Collection</span>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
