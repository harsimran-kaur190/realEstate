import Link from 'next/link';
import Image from 'next/image';
import { blurProps } from '@/lib/photos';
import { ArrowRight } from 'lucide-react';
import { formatAED, type Property } from '@/lib/properties';
import { FavouriteButton } from '@/components/favourite-button';

/*
 * Property listing card — used on the Properties page.
 * Image-led, square-cornered, hairline body. One keyboard stop per card
 * (the name link) plus the visible View Property link and favourite toggle.
 */
export function PropertyListingCard({
  p,
  index,
  priority = false,
}: {
  p: Property;
  index: number;
  priority?: boolean;
}) {
  const href = `/properties/${p.slug}`;
  const label = `${p.purpose} · ${p.type}`;
  const alt = `${p.name}, ${p.type.toLowerCase()} in ${p.place}`;

  return (
    <article className="pl-card">
      <div className="pl-card__media">
        <Link href={href} className="pl-card__media-link" aria-label={`View ${p.name}`} tabIndex={-1}>
          <Image
            src={p.image}
            {...blurProps(p.image)}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="pl-card__img"
            priority={priority}
          />
        </Link>
        <span className="pl-card__index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <FavouriteButton slug={p.slug} name={p.name} className="pl-card__fav" />
      </div>

      <div className="pl-card__body">
        <div className="pl-card__head">
          <p className="pl-card__label">{label}</p>
          <p className="pl-card__price">
            {formatAED(p.price)}
            {p.purpose === 'Rent' && <span className="pl-card__price-note">per year</span>}
          </p>
        </div>

        <h2 className="pl-card__name">
          <Link href={href}>{p.name}</Link>
        </h2>
        <p className="pl-card__place">{p.place}</p>

        <div className="pl-card__foot">
          <p className="pl-card__meta">
            {p.beds > 0 && (
              <>
                <span>{p.beds} {p.beds === 1 ? 'Bed' : 'Beds'}</span>
                <span className="pl-card__dot" aria-hidden="true" />
              </>
            )}
            <span>{p.baths} {p.baths === 1 ? 'Bath' : 'Baths'}</span>
            <span className="pl-card__dot" aria-hidden="true" />
            <span>{p.area.toLocaleString()} sq ft</span>
          </p>
          <Link href={href} className="btn-link pl-card__cta">
            <span>View Property</span>
            <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
