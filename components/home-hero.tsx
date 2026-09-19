import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/public/images/collection-uae-hero.jpg';

/*
 * Homepage hero — contemporary waterfront villa at dusk with the
 * Downtown Dubai skyline on the horizon.
 *
 * Art direction
 *  - Desktop: the villa sits centre-left, skyline right; copy is anchored
 *    bottom-left over the darker pool deck so the architecture stays clear.
 *  - Mobile: the crop is re-centred on the glazed core of the house and
 *    the copy stacks beneath it with full-width CTAs.
 *  - The image is a static import so Next.js provides the blur-up
 *    placeholder used for the reveal; the fixed navbar sits over the top.
 */
export function HomeHero() {
  return (
    <section className="hero on-dark" aria-labelledby="hero-heading">
      {/* Image layer */}
      <div className="hero__media" aria-hidden="true">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          fetchPriority="high"
          placeholder="blur"
          quality={65}
          sizes="100vw"
          className="hero__img"
        />
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      {/* Content layer */}
      <div className="shell hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow hero-rise" data-step="1">
            Our Collection
          </p>

          <h1 id="hero-heading" className="hero__title hero-rise" data-step="2">
            Properties That
            <br />
            <em>Hold Their</em> Value.
          </h1>

          <p className="hero__copy hero-rise" data-step="3">
            Exceptional residences, commercial spaces and private property services across the UAE.
          </p>

          <div className="hero__actions hero-rise" data-step="4">
            <Link href="/properties" className="btn-inverse">
              <span>Explore Properties</span>
              <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
            </Link>
            <Link href="/services" className="btn-outline-inverse">
              <span>Private Advisory</span>
            </Link>
          </div>
        </div>

        <div className="hero__foot hero-rise" data-step="5">
          <dl className="hero__meta">
            <div className="hero__meta-item">
              <dt className="sr-only">Location</dt>
              <dd>Dubai · UAE</dd>
            </div>
            <div className="hero__meta-item">
              <dt className="sr-only">Focus</dt>
              <dd>Curated Residences</dd>
            </div>
          </dl>

          <a href="#featured-heading" className="hero__scroll" aria-label="Scroll to the featured collection">
            <span className="hero__scroll-label">Scroll to explore</span>
            <span className="hero__scroll-line" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
