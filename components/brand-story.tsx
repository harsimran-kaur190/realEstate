import Link from 'next/link';
import Image from 'next/image';
import { blurProps } from '@/lib/photos';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/site';

/*
 * The Altiere Perspective — brand story.
 *
 * Editorial split: a portrait architectural image on the left, typography on
 * the right. On mobile the headline leads, the image follows, then the body
 * copy, so the story reads in order rather than as a shrunken two-column.
 */

const STORY_PHOTO =
  '/images/unsplash/photo-1615747476205-991a14cd2358.jpg';

export function BrandStory() {
  return (
    <section className="bs" aria-labelledby="perspective-heading">
      <div className="shell bs__grid">
        <div className="bs__head">
          <ScrollReveal>
            <p className="eyebrow">The Altiere Perspective</p>
          </ScrollReveal>
          <ScrollReveal stagger={1}>
            <h2 id="perspective-heading" className="bs__title">
              Property is <em>more than</em> a transaction.
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal stagger={1} className="bs__media">
          <div className="bs__frame" aria-hidden="true" />
          <div className="bs__image">
            <Image
              src={STORY_PHOTO}
              {...blurProps(STORY_PHOTO)}
              alt="A sculptural white pavilion at Dubai Creek Harbour framing the Burj Khalifa and the Downtown skyline"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="bs__img"
            />
          </div>
          <p className="bs__caption">Dubai Creek Harbour</p>
        </ScrollReveal>

        <div className="bs__body">
          <ScrollReveal stagger={2}>
            <p className="bs__copy">
              Altiere Estates approaches real estate as a considered relationship between place,
              property and purpose. We focus on distinctive spaces and a composed advisory
              experience designed around the individual behind every decision.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger={3}>
            <p className="bs__line">
              <span>Selected with intention.</span>
              <span>Represented with care.</span>
            </p>
          </ScrollReveal>

          <ScrollReveal stagger={4}>
            <Link href="/about" className="btn-link bs__cta">
              <span>Our approach</span>
              <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
