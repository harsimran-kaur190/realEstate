import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/site';

/*
 * Final CTA — Private Advisory.
 *
 * A closing frame in deep navy. A dusk skyline sits beneath a heavy scrim so
 * it reads as texture rather than a photograph, keeping the headline as the
 * focus. Headline left; supporting copy and the two actions right, with a
 * hairline above the buttons. Mobile stacks everything with full-width CTAs.
 */

const CTA_PHOTO =
  'https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=2000&q=75';

export function FinalCta() {
  return (
    <section className="cta on-dark" aria-labelledby="cta-heading">
      <div className="cta__backdrop" aria-hidden="true">
        <Image src={CTA_PHOTO} alt="" fill sizes="100vw" className="cta__img" />
        <span className="cta__scrim" />
      </div>

      <div className="shell cta__inner">
        <div className="cta__lead">
          <ScrollReveal>
            <p className="eyebrow cta__eyebrow">Private Advisory</p>
          </ScrollReveal>
          <ScrollReveal stagger={1}>
            <h2 id="cta-heading" className="cta__title">
              A more considered way to move <em>through</em> property.
            </h2>
          </ScrollReveal>
        </div>

        <div className="cta__aside">
          <ScrollReveal stagger={2}>
            <p className="cta__copy">
              Whether you&rsquo;re searching for a residence, evaluating an opportunity or looking
              after an existing asset, begin with a private conversation.
            </p>
          </ScrollReveal>
          <ScrollReveal stagger={3} className="cta__actions">
            <Link href="/contact" className="btn-inverse cta__btn">
              <span>Request a Private Viewing</span>
              <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
            </Link>
            <Link href="/properties" className="btn-outline-inverse cta__btn">
              <span>Explore Properties</span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
