import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/site';

/*
 * Property Stewardship — the owner-facing management offering.
 *
 * A navy editorial section. The intro splits headline and supporting copy
 * across two columns; beneath, a portrait architectural image sits beside
 * four hairline-ruled content areas. No cards, no metrics, no guarantees.
 */

const STEWARDSHIP_PHOTO =
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80';

const AREAS = [
  {
    title: 'Property Oversight',
    copy: 'Coordinated attention to the day-to-day details that keep a property performing at its best.',
  },
  {
    title: 'Tenant & Occupancy',
    copy: 'Clear communication and considered oversight throughout the occupancy cycle.',
  },
  {
    title: 'Maintenance',
    copy: 'Proactive coordination and attention to the condition of the property.',
  },
  {
    title: 'Owner Reporting',
    copy: 'Straightforward communication so owners remain informed without being involved in every detail.',
  },
];

export function PropertyStewardship() {
  return (
    <section className="pm on-dark" aria-labelledby="stewardship-heading">
      <div className="shell">
        <header className="pm__intro">
          <div className="pm__lead">
            <ScrollReveal>
              <p className="eyebrow pm__eyebrow">Property Stewardship</p>
            </ScrollReveal>
            <ScrollReveal stagger={1}>
              <h2 id="stewardship-heading" className="pm__title">
                Care that continues <em>beyond</em> the transaction.
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal stagger={2} className="pm__aside">
            <p className="pm__copy">
              Thoughtful property management for owners who value consistency, communication and
              long-term care.
            </p>
            <Link href="/services" className="btn-inverse pm__cta pm__cta--desktop">
              <span>Explore Property Management</span>
              <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </header>

        <div className="pm__body">
          <ScrollReveal stagger={1} className="pm__media">
            <div className="pm__image">
              <Image
                src={STEWARDSHIP_PHOTO}
                alt="A contemporary residence at dusk with a lit timber entrance and dark cladding"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="pm__img"
              />
            </div>
            <p className="pm__caption">
              <span>For owners</span>
              <span className="pm__caption-dot" aria-hidden="true" />
              <span>Ongoing care</span>
            </p>
          </ScrollReveal>

          <ul className="pm__areas">
            {AREAS.map((area, i) => (
              <li key={area.title} className="pm-area">
                <ScrollReveal stagger={Math.min(i + 1, 5)} className="pm-area__inner">
                  <h3 className="pm-area__title">{area.title}</h3>
                  <p className="pm-area__copy">{area.copy}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>

        <ScrollReveal className="pm__foot">
          <Link href="/services" className="btn-inverse pm__cta">
            <span>Explore Property Management</span>
            <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
