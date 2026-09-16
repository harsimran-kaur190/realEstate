import type { Metadata } from 'next';
import Link from 'next/link';

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
import {
  ArrowRight,
  Building2,
  Handshake,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  AnimatedStat,
  Footer,
  Navbar,
  PropertyCard,
  PropertyManagementFeature,
  ScrollReveal,
  SearchPanel,
} from '@/components/site';
import { properties } from '@/lib/properties';

const locations = [
  ['Downtown Dubai', 'Dubai', 'photo-1512453979798-5ea266f8880c'],
  ['Dubai Marina', 'Dubai', 'photo-1518684079-3c830dcef090'],
  ['Palm Jumeirah', 'Dubai', 'photo-1546412414-e1885259563a'],
  ['Abu Dhabi', 'Abu Dhabi', 'photo-1512632578888-169bbbc64f33'],
  ['Sharjah', 'Sharjah', 'photo-1580674684081-7617fbf3d745'],
  ['Jumeirah', 'Dubai', 'photo-1518684079-3c830dcef090'],
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Compact Premium Hero - Balanced Layout */}
        <section className="hero-premium-compact">
          <div className="shell">
            <div className="hero-compact-grid">
              {/* Left Content Column */}
              <div className="hero-left-content">
                <div className="hero-eyebrow-minimal animate-hero-reveal">
                  <span className="hero-eyebrow-dot" />
                  <span>OUR COLLECTION</span>
                </div>

                <h1 className="hero-headline-compact animate-hero-reveal delay-1">
                  Properties That<br />
                  <span className="hero-italic">Hold Their</span> Value.
                </h1>

                <p className="hero-desc-compact animate-hero-reveal delay-2">
                  Exceptional homes, commercial spaces and professionally managed properties across the UAE.
                </p>

                <div className="hero-btns-compact animate-hero-reveal delay-3">
                  <Link href="/properties" className="hero-btn-compact-primary">
                    <span>Explore Properties</span>
                    <ArrowRight size={13} />
                  </Link>
                  <Link href="/services" className="hero-btn-compact-secondary">
                    View Our Services
                  </Link>
                </div>
              </div>

              {/* Right Image Column */}
              <div className="hero-right-image">
                <div className="hero-image-frame">
                  <img
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=90"
                    alt="Modern luxury villa with contemporary architecture and natural materials"
                    className="hero-image-asset"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="hero-image-overlay">
                    <div className="hero-featured-badge">
                      <p className="badge-meta">FEATURED</p>
                      <h3 className="badge-title">The Travertine Pavilion</h3>
                      <p className="badge-location">Emirates Hills, Dubai</p>
                      <Link href="/properties/serif-residence-palm" className="badge-link">
                        View Property <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Refined Search Section */}
        <section className="search-premium-section">
          <div className="shell">
            <SearchPanel />
          </div>
        </section>

        {/* Featured Properties Section with Scroll Reveal */}
        <section className="section">
          <div className="shell">
            <ScrollReveal>
              <div className="flex justify-between items-end mb-10">
                <div>
                  <p className="eyebrow">Selected for you</p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl mt-2">Featured properties</h2>
                </div>
                <Link
                  href="/properties"
                  className="hidden md:flex text-xs uppercase tracking-[.14em] gap-2 items-center group font-medium hover:text-[#b39062] transition-colors"
                >
                  <span>View all properties</span>
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid-3">
              {properties.slice(0, 3).map((p, idx) => (
                <PropertyCard p={p} key={p.slug} index={idx} />
              ))}
            </div>
            <Link href="/properties" className="btn btn-outline mt-7 md:hidden w-full h-[48px] flex items-center justify-center">
              <span>View all properties</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Popular Locations Section with Scroll Reveal & Hover Transitions */}
        <section className="bg-[#ece9e1] section">
          <div className="shell">
            <ScrollReveal>
              <p className="eyebrow">Explore the Emirates</p>
              <div className="flex justify-between items-end mb-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl mt-2">Popular locations</h2>
                <p className="hidden md:block max-w-xs text-sm text-[#657080]">
                  From waterfront icons to established neighbourhoods, discover a place with a perspective.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {locations.map(([name, city, id], idx) => (
                <ScrollReveal key={name} stagger={(idx % 3) + 1}>
                  <Link
                    href={`/properties?city=${city}`}
                    className="relative h-40 sm:h-56 overflow-hidden rounded-xl group block border border-black/5 bg-transparent"
                  >
                    <img
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                      src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`}
                      alt={name}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#112239]/85 via-[#112239]/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                    <span className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-10 sm:right-20 text-white serif text-base sm:text-2xl transition-transform duration-300 group-hover:-translate-y-0.5 truncate">
                      {name}
                    </span>
                    <span className="absolute right-3 sm:right-4 bottom-3 sm:bottom-5 text-white/80 text-[9px] sm:text-[10px] tracking-[.14em] uppercase inline-flex items-center gap-1 group-hover:text-[#d6b98f] transition-colors">
                      <span className="hidden xs:inline">Explore</span> <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* The Altiere Standard & Animated Statistics */}
        <section className="section">
          <div className="shell grid md:grid-cols-[1.05fr_.95fr] gap-12 md:gap-16 items-start">
            <ScrollReveal>
              <div>
                <p className="eyebrow">The Altiere standard</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl mt-2">Real estate, more thoughtfully represented.</h2>
                <p className="mt-6 text-[#657080] leading-7 max-w-xl text-sm sm:text-base">
                  We pair local intelligence with a remarkably personal service. Every detail is considered, from the first conversation to a confident close.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 mt-10">
                  {[
                    [Sparkles, 'Curated properties'],
                    [Handshake, 'Expert guidance'],
                    [Building2, 'Property management'],
                    [ShieldCheck, 'Transparent service'],
                  ].map(([Icon, label], idx) => {
                    const I = Icon as typeof Sparkles;
                    return (
                      <div key={String(label)} className="group">
                        <div className="transition-transform duration-300 group-hover:scale-110 origin-left inline-block">
                          <I color="#b39062" size={23} />
                        </div>
                        <p className="mt-3 serif text-xl group-hover:text-[#b39062] transition-colors duration-300">
                          {String(label)}
                        </p>
                        <p className="text-sm leading-6 text-[#657080] mt-1">
                          Clear advice, tailored to your priorities.
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* By The Numbers with Animated Counters */}
            <ScrollReveal stagger={2}>
              <div className="bg-[#112239] text-white p-6 sm:p-9 md:p-12 border border-[#23354d] shadow-xl">
                <p className="eyebrow !text-[#d6b98f]">By the numbers</p>
                <p className="serif text-2xl sm:text-3xl mt-3 leading-tight">Built on discernment, measured by trust.</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-y-10 mt-10 sm:mt-12">
                  {[
                    ['500+', 'Properties'],
                    ['12+', 'Years experience'],
                    ['4', 'UAE markets'],
                    ['98%', 'Client satisfaction'],
                  ].map(([n, l]) => (
                    <AnimatedStat key={l} number={n} label={l} dark={true} />
                  ))}
                </div>
                <p className="mt-8 sm:mt-11 text-[11px] leading-5 text-[#94a0ad]">
                  Figures are fictional and shown for this independent demo brand only.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* For Owners: Premium Property Management Section with Parallax Asset Feature */}
        <section className="bg-[#112239] text-white overflow-hidden">
          <div className="shell grid md:grid-cols-2 items-stretch">
            <ScrollReveal className="py-12 sm:py-16 md:py-24 md:pr-16 flex flex-col justify-center">
              <div>
                <p className="eyebrow !text-[#d6b98f]">For owners</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl mt-3">Your property, carefully kept in view.</h2>
                <div className="editorial-rule" />
                <p className="text-[#c3ccd5] leading-7 max-w-lg text-sm sm:text-base">
                  For owners who value a clear, composed experience, our property-management team takes care of every essential—from tenant relations and maintenance to precise reporting.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-8 text-sm">
                  <div className="border-t border-[#496079] pt-3">
                    <p className="font-medium text-white">Dedicated relationship lead</p>
                    <p className="text-xs text-[#9fb0c3] mt-1">Single point of executive contact</p>
                  </div>
                  <div className="border-t border-[#496079] pt-3">
                    <p className="font-medium text-white">Quarterly performance review</p>
                    <p className="text-xs text-[#9fb0c3] mt-1">Institutional yield & asset health</p>
                  </div>
                </div>
                <Link
                  href="/services"
                  className="btn mt-9 !bg-white !text-[#112239] !border-white hover:!bg-[#e6dfd5] group"
                >
                  <span>Explore management</span>
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Parallax Asset Feature with "More than a property. A long-term asset." */}
            <ScrollReveal stagger={2} className="h-full">
              <PropertyManagementFeature />
            </ScrollReveal>
          </div>
        </section>

        {/* Final CTA Section with Scroll Reveal */}
        <section className="bg-[#d9c29f] py-12 md:py-16">
          <div className="shell text-center">
            <ScrollReveal>
              <p className="eyebrow !text-[#6f5738]">Begin your search</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-3">Find a property that feels like yours.</h2>
              <p className="mt-4 sm:mt-5 text-[#314052] text-sm sm:text-base">Let our advisors make your next move feel effortless.</p>
              <div className="flex justify-center gap-3 mt-8 flex-wrap">
                <Link className="btn group" href="/properties">
                  <span>Explore properties</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link className="btn btn-outline" href="/contact">
                  Book a viewing
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
