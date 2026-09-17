import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { properties, formatAED, type Property } from '@/lib/properties';
import { ScrollReveal } from '@/components/site';
import { FavouriteButton } from '@/components/favourite-button';

/*
 * Featured Collection — editorial spread.
 *
 *  Desktop  : the lead property runs as a magazine spread (large image left,
 *             specification column right). The two supporting properties sit
 *             beneath on an offset two-column rhythm.
 *  Tablet   : lead image full width with its details below; supports in two columns.
 *  Mobile   : lead stays image-first; supports become compact horizontal rows
 *             (thumbnail + details) so the hierarchy is restructured, not shrunk.
 */

const IMAGE_SIZES = {
  lead: '(min-width: 1024px) 60vw, 100vw',
  support: '(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 40vw',
};

function specLabel(p: Property) {
  return `${p.purpose === 'Commercial' ? 'Commercial' : p.purpose} · ${p.type}`;
}

function areaText(p: Property) {
  return `${p.area.toLocaleString()} sq ft`;
}

function PriceLine({ p, className = '' }: { p: Property; className?: string }) {
  return (
    <p className={`fc-price ${className}`}>
      {formatAED(p.price)}
      {p.purpose === 'Rent' && <span className="fc-price__note">per year</span>}
    </p>
  );
}

function LeadProperty({ p }: { p: Property }) {
  const href = `/properties/${p.slug}`;
  const alt = `${p.name}, ${p.type.toLowerCase()} in ${p.place}`;

  return (
    <article className="fc-lead">
      <ScrollReveal className="fc-lead__media-wrap">
        <div className="fc-media fc-lead__media">
          <Link href={href} className="fc-media__link" aria-label={`View ${p.name}`} tabIndex={-1}>
            <Image src={p.image} alt={alt} fill sizes={IMAGE_SIZES.lead} className="fc-media__img" />
          </Link>
          <span className="fc-media__index" aria-hidden="true">01</span>
          <FavouriteButton slug={p.slug} name={p.name} className="fc-media__fav" />
        </div>
      </ScrollReveal>

      <ScrollReveal stagger={1} className="fc-lead__body">
        <p className="fc-label">{specLabel(p)}</p>
        <h3 className="fc-lead__name">
          <Link href={href}>{p.name}</Link>
        </h3>
        <p className="fc-place">{p.place}</p>

        <dl className="fc-spec">
          {p.beds > 0 && (
            <div className="fc-spec__row">
              <dt>Bedrooms</dt>
              <dd>{p.beds}</dd>
            </div>
          )}
          <div className="fc-spec__row">
            <dt>Bathrooms</dt>
            <dd>{p.baths}</dd>
          </div>
          <div className="fc-spec__row">
            <dt>Built-up area</dt>
            <dd>{areaText(p)}</dd>
          </div>
          <div className="fc-spec__row">
            <dt>Price</dt>
            <dd>
              <PriceLine p={p} className="fc-price--inline" />
            </dd>
          </div>
        </dl>

        <Link href={href} className="btn-link fc-cta">
          <span>View Property</span>
          <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </ScrollReveal>
    </article>
  );
}

function SupportProperty({ p, index }: { p: Property; index: number }) {
  const href = `/properties/${p.slug}`;
  const alt = `${p.name}, ${p.type.toLowerCase()} in ${p.place}`;

  return (
    <ScrollReveal stagger={index} className="fc-support">
      <article className="fc-support__inner">
        <div className="fc-media fc-support__media">
          <Link href={href} className="fc-media__link" aria-label={`View ${p.name}`} tabIndex={-1}>
            <Image src={p.image} alt={alt} fill sizes={IMAGE_SIZES.support} className="fc-media__img" />
          </Link>
          <span className="fc-media__index" aria-hidden="true">0{index + 1}</span>
          <FavouriteButton slug={p.slug} name={p.name} className="fc-media__fav" />
        </div>

        <div className="fc-support__body">
          <p className="fc-label">{specLabel(p)}</p>
          <h3 className="fc-support__name">
            <Link href={href}>{p.name}</Link>
          </h3>
          <p className="fc-place">{p.place}</p>
          <PriceLine p={p} />
          <p className="fc-meta">
            {p.beds > 0 && (
              <>
                <span>{p.beds} Bed</span>
                <span className="fc-meta__dot" aria-hidden="true" />
              </>
            )}
            <span>{p.baths} Bath</span>
            <span className="fc-meta__dot" aria-hidden="true" />
            <span>{areaText(p)}</span>
          </p>
          <Link href={href} className="btn-link fc-cta">
            <span>View Property</span>
            <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </article>
    </ScrollReveal>
  );
}

export function FeaturedCollection() {
  const [lead, ...supports] = properties.slice(0, 3);

  return (
    <section className="fc-section" aria-labelledby="featured-heading">
      <div className="shell">
        <header className="fc-intro">
          <div className="fc-intro__text">
            <ScrollReveal>
              <p className="eyebrow">Featured Collection</p>
            </ScrollReveal>
            <ScrollReveal stagger={1}>
              <h2 id="featured-heading" className="fc-intro__title">
                Properties with <em>presence.</em>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal stagger={2} className="fc-intro__aside">
            <p className="fc-intro__copy">
              A considered selection of distinctive residences and spaces across the UAE.
            </p>
          </ScrollReveal>
        </header>

        <LeadProperty p={lead} />

        <div className="fc-supports">
          {supports.map((p, i) => (
            <SupportProperty key={p.slug} p={p} index={i + 1} />
          ))}
        </div>

        <ScrollReveal className="fc-footer">
          <span className="fc-footer__note">Full portfolio</span>
          <Link href="/properties" className="btn-link fc-view-all">
            <span>View All Properties</span>
            <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
