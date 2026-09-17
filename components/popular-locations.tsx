import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/site';

/*
 * Popular Locations — editorial image gallery.
 *
 * Six locations on an asymmetric grid: Downtown Dubai runs tall as the
 * featured tile, the others fall into a rhythm of wide and narrow frames
 * around it. Every tile links to the existing Properties route with the
 * same `city` filter the previous grid used.
 */

type Location = {
  name: string;
  emirate: string;
  city: string;
  photo: string;
  alt: string;
  position?: string;
};

const LOCATIONS: Location[] = [
  {
    name: 'Downtown Dubai',
    emirate: 'Dubai',
    city: 'Dubai',
    photo: 'photo-1634007626524-f47fa37810a7',
    alt: 'The Burj Khalifa rising above the Downtown Dubai skyline at dusk',
    position: '50% 45%',
  },
  {
    name: 'Dubai Marina',
    emirate: 'Dubai',
    city: 'Dubai',
    photo: 'photo-1611577810610-642f8ac05c32',
    alt: 'Dubai Marina towers seen from the water in late afternoon light',
    position: '50% 60%',
  },
  {
    name: 'Palm Jumeirah',
    emirate: 'Dubai',
    city: 'Dubai',
    photo: 'photo-1702070114450-94d981d72233',
    alt: 'Aerial view of waterfront villas along the fronds of Palm Jumeirah',
    position: '50% 60%',
  },
  {
    name: 'Abu Dhabi',
    emirate: 'Abu Dhabi',
    city: 'Abu Dhabi',
    photo: 'photo-1734009775179-07f428483783',
    alt: 'Glass towers and a modern pavilion in Abu Dhabi at sunset',
    position: '50% 40%',
  },
  {
    name: 'Sharjah',
    emirate: 'Sharjah',
    city: 'Sharjah',
    photo: 'photo-1627120697861-84c863582194',
    alt: 'Noor Island and the Al Majaz waterfront skyline in Sharjah',
    position: '50% 45%',
  },
  {
    name: 'Jumeirah',
    emirate: 'Dubai',
    city: 'Dubai',
    photo: 'photo-1523816572-a1a23d1a67b8',
    alt: 'Aerial view of the Jumeirah coastline and residential neighbourhoods',
    position: '55% 50%',
  },
];

const SIZES = {
  featured: '(min-width: 1024px) 42vw, 100vw',
  tile: '(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw',
};

function LocationTile({ loc, index }: { loc: Location; index: number }) {
  const featured = index === 0;
  const src = `https://images.unsplash.com/${loc.photo}?auto=format&fit=crop&w=1600&q=80`;

  return (
    <ScrollReveal stagger={(index % 5) + 1} className={`loc-tile loc-tile--${index + 1}`}>
      <Link
        href={`/properties?city=${loc.city}`}
        className="loc-tile__link"
        aria-label={`Explore properties in ${loc.name}`}
      >
        <Image
          src={src}
          alt={loc.alt}
          fill
          sizes={featured ? SIZES.featured : SIZES.tile}
          className="loc-tile__img"
          style={loc.position ? { objectPosition: loc.position } : undefined}
        />
        <span className="loc-tile__shade" aria-hidden="true" />

        <span className="loc-tile__caption">
          <span className="loc-tile__text">
            <span className="loc-tile__emirate">{loc.emirate}</span>
            <span className="loc-tile__name">{loc.name}</span>
          </span>
          <span className="loc-tile__arrow" aria-hidden="true">
            <span className="loc-tile__arrow-label">Explore</span>
            <ArrowRight size={14} strokeWidth={1.75} />
          </span>
        </span>
      </Link>
    </ScrollReveal>
  );
}

export function PopularLocations() {
  return (
    <section id="locations" className="loc-section scroll-mt-20" aria-labelledby="locations-heading">
      <div className="shell">
        <header className="loc-intro">
          <div>
            <ScrollReveal>
              <p className="eyebrow">Prime UAE Locations</p>
            </ScrollReveal>
            <ScrollReveal stagger={1}>
              <h2 id="locations-heading" className="loc-intro__title">
                Places worth <em>coming home</em> to.
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal stagger={2} className="loc-intro__aside">
            <p className="loc-intro__copy">
              Explore distinctive residences across the UAE&rsquo;s most sought-after neighbourhoods.
            </p>
          </ScrollReveal>
        </header>

        <div className="loc-grid">
          {LOCATIONS.map((loc, i) => (
            <LocationTile key={loc.name} loc={loc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
