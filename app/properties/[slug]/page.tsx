import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Footer, Navbar, PropertyEnquiryForm, ScrollReveal } from '@/components/site';
import { PropertyDossierGallery } from '@/components/property-dossier-gallery';
import { PropertyListingCard } from '@/components/property-listing-card';
import { FavouriteButton } from '@/components/favourite-button';
import { formatAED, properties } from '@/lib/properties';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = properties.find((x) => x.slug === slug);
  if (!p) {
    return {
      title: 'Property Not Found',
      description: 'The requested luxury property listing could not be found.',
    };
  }

  const spec = `${p.beds ? `${p.beds} bed, ` : ''}${p.baths} bath ${p.type.toLowerCase()} (${p.area.toLocaleString()} sq ft) in ${p.place}.`;
  const description = `${spec} ${p.description}`;

  return {
    title: p.name,
    description: description.length > 155 ? `${description.slice(0, 152)}...` : description,
    openGraph: {
      title: `${p.name} | Altiere Estates`,
      description: description.length > 155 ? `${description.slice(0, 152)}...` : description,
      images: p.image ? [{ url: p.image }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  return properties.map((p) => ({
    slug: p.slug,
  }));
}

export default async function Detail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = properties.find((x) => x.slug === slug);
  if (!p) return notFound();

  const priceNote = p.purpose === 'Rent' ? 'per year' : null;
  const related = properties.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pd">
        {/* Dossier header */}
        <section className="shell pd-head" aria-labelledby="property-heading">
          <nav className="pd-crumb" aria-label="Breadcrumb">
            <Link href="/properties" className="pd-crumb__link">
              <ArrowLeft size={12} strokeWidth={1.75} aria-hidden="true" />
              <span>The Collection</span>
            </Link>
            <span className="pd-crumb__sep" aria-hidden="true" />
            <span className="pd-crumb__current">{p.place}</span>
          </nav>

          <div className="pd-head__grid">
            <div className="pd-head__lead animate-hero-reveal">
              <p className="eyebrow">
                {p.purpose} · {p.type}
              </p>
              <h1 id="property-heading" className="pd-head__title">
                {p.name}
              </h1>
              <p className="pd-head__place">{p.place}</p>
            </div>

            <div className="pd-head__aside animate-hero-reveal delay-1">
              <div className="pd-head__price-row">
                <p className="pd-head__price">
                  {formatAED(p.price)}
                  {priceNote && <span className="pd-head__price-note">{priceNote}</span>}
                </p>
                <FavouriteButton slug={p.slug} name={p.name} className="pd-head__fav" />
              </div>
              <p className="pd-head__spec">
                {p.beds > 0 && (
                  <>
                    <span>{p.beds} {p.beds === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                    <span className="pd-dot" aria-hidden="true" />
                  </>
                )}
                <span>{p.baths} {p.baths === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                <span className="pd-dot" aria-hidden="true" />
                <span>{p.area.toLocaleString()} sq ft</span>
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="shell pd-gallery-section animate-hero-reveal delay-2" aria-label="Gallery">
          <PropertyDossierGallery images={p.gallery} title={p.name} />
        </section>

        {/* Dossier body */}
        <section className="shell pd-body">
          <div className="pd-body__grid">
            <div className="pd-content">
              <ScrollReveal>
                <div className="pd-block">
                  <p className="eyebrow">Overview</p>
                  <h2 className="pd-block__title">A considered place to live.</h2>
                  <p className="pd-block__lede">{p.description}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal stagger={1}>
                <div className="pd-block">
                  <p className="eyebrow">Specifications</p>
                  <dl className="pd-spec">
                    <div className="pd-spec__row">
                      <dt>Property type</dt>
                      <dd>{p.type}</dd>
                    </div>
                    <div className="pd-spec__row">
                      <dt>Offering</dt>
                      <dd>{p.purpose === 'Commercial' ? 'Commercial lease' : p.purpose === 'Rent' ? 'For rent' : 'For sale'}</dd>
                    </div>
                    <div className="pd-spec__row">
                      <dt>Location</dt>
                      <dd>{p.place}</dd>
                    </div>
                    {p.beds > 0 && (
                      <div className="pd-spec__row">
                        <dt>Bedrooms</dt>
                        <dd>{p.beds}</dd>
                      </div>
                    )}
                    <div className="pd-spec__row">
                      <dt>Bathrooms</dt>
                      <dd>{p.baths}</dd>
                    </div>
                    <div className="pd-spec__row">
                      <dt>Built-up area</dt>
                      <dd>{p.area.toLocaleString()} sq ft</dd>
                    </div>
                    <div className="pd-spec__row">
                      <dt>Price</dt>
                      <dd>
                        {formatAED(p.price)}
                        {priceNote && <span className="pd-spec__note">{priceNote}</span>}
                      </dd>
                    </div>
                  </dl>
                </div>
              </ScrollReveal>

              {p.amenities.length > 0 && (
                <ScrollReveal stagger={2}>
                  <div className="pd-block">
                    <p className="eyebrow">Features</p>
                    <ul className="pd-features">
                      {p.amenities.map((a) => (
                        <li key={a} className="pd-features__item">
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )}

              <ScrollReveal stagger={3}>
                <p className="pd-note">
                  Demonstration listing. Altiere Estates is an independent design and development
                  showcase; details are presented for illustration.
                </p>
              </ScrollReveal>
            </div>

            {/* Enquiry */}
            <aside className="pd-aside">
              <div id="enquiry" className="pd-enquiry">
                <p className="eyebrow">Private viewing</p>
                <h2 className="pd-enquiry__title">Request a private viewing</h2>
                <p className="pd-enquiry__copy">
                  Share a few details and a member of our advisory team will be in touch to arrange a
                  confidential viewing of {p.name}.
                </p>
                <PropertyEnquiryForm propertyName={p.name} />
                <div className="pd-enquiry__foot">
                  <Link href="/properties" className="btn-link">
                    <ArrowLeft size={12} strokeWidth={1.75} aria-hidden="true" />
                    <span>Back to Collection</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Mobile action bar */}
        <div className="pd-bar" aria-label="Property actions">
          <div className="pd-bar__price">
            <span className="pd-bar__label">{p.purpose === 'Rent' ? 'Per year' : 'Price'}</span>
            <span className="pd-bar__value">{formatAED(p.price)}</span>
          </div>
          <a href="#enquiry" className="btn btn-sm pd-bar__cta">
            <span>Request a Private Viewing</span>
            <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="pd-related" aria-labelledby="related-heading">
            <div className="shell">
              <div className="pd-related__intro">
                <ScrollReveal>
                  <p className="eyebrow">Continue exploring</p>
                  <h2 id="related-heading" className="pd-related__title">
                    More from the collection.
                  </h2>
                </ScrollReveal>
                <ScrollReveal stagger={1}>
                  <Link href="/properties" className="btn-link">
                    <span>View All Properties</span>
                    <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                </ScrollReveal>
              </div>
              <div className="pd-related__grid">
                {related.map((x, i) => (
                  <ScrollReveal key={x.slug} stagger={i + 1}>
                    <PropertyListingCard p={x} index={i} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
