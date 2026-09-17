import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Altiere Estates | Luxury Properties & Private Residences Dubai',
  },
  description:
    'Explore our curated portfolio of luxury villas, penthouses, and private estates across Dubai and the UAE. Bespoke real estate advisory by Altiere Estates.',
  openGraph: {
    title: 'Altiere Estates | Luxury Properties & Private Residences Dubai',
    description:
      'Explore our curated portfolio of luxury villas, penthouses, and private estates across Dubai and the UAE.',
  },
};
import { Footer, Navbar, SearchPanel } from '@/components/site';
import { HomeHero } from '@/components/home-hero';
import { FeaturedCollection } from '@/components/featured-collection';
import { PopularLocations } from '@/components/popular-locations';
import { AltiereStandard } from '@/components/altiere-standard';
import { AltiereApproach } from '@/components/altiere-approach';
import { BrandStory } from '@/components/brand-story';
import { PropertyStewardship } from '@/components/property-stewardship';
import { FinalCta } from '@/components/final-cta';

export default function Home() {
  return (
    <>
      <Navbar transparentOverHero />
      <main>
        <HomeHero />

        {/* Refined Search Section */}
        <section className="search-premium-section">
          <div className="shell">
            <SearchPanel />
          </div>
        </section>

        <FeaturedCollection />

        <PopularLocations />

        {/* The Altiere Standard */}
        <section className="section" aria-labelledby="standard-heading">
          <AltiereStandard />
        </section>

        <AltiereApproach />

        <BrandStory />

        <PropertyStewardship />

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
