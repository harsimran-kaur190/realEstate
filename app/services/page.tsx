import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Private Advisory & Client Services',
  description:
    'Bespoke real estate services including private sales, acquisitions, leasing, and asset management.',
  openGraph: {
    title: 'Private Advisory & Client Services | Altiere Estates',
    description:
      'Bespoke real estate services including private sales, acquisitions, leasing, and asset management.',
  },
};
import {
  ArrowRight,
  BarChart3,
  Building2,
  Home,
  KeyRound,
  Landmark,
} from 'lucide-react';
import { Footer, Navbar, ScrollReveal } from '@/components/site';

const services = [
  {
    title: 'Private Sales',
    desc: 'A strategic, human approach to marketing and transacting exceptional homes across the UAE.',
    benefits: ['Discreet off-market positioning', 'Qualified global buyer network', 'Executive negotiation expertise'],
    icon: Home,
    image: '/images/hero-uae-villa.jpg',
  },
  {
    title: 'Property Leasing',
    desc: 'Connecting premier residences with vetted tenants through tailored leasing strategies and seamless handovers.',
    benefits: ['Comprehensive tenant screening', 'Market-calibrated rental pricing', 'End-to-end lease administration'],
    icon: KeyRound,
    image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Property Management',
    desc: 'Attentive, institutional-grade property stewardship that preserves asset value and frees your time.',
    benefits: ['Proactive maintenance oversight', 'Institutional financial reporting', 'Dedicated tenant relationship lead'],
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Commercial Real Estate',
    desc: 'Workspaces, boutique headquarters, and commercial investments positioned for sustainable yield.',
    benefits: ['Prime office & retail advisory', 'Lease acquisition & restructuring', 'Corporate portfolio representation'],
    icon: Landmark,
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Investment Advisory',
    desc: 'Actionable market intelligence and strategic advisory for private wealth and institutional capital.',
    benefits: ['Predictive capital appreciation analysis', 'Prime waterfront & urban yield studies', 'Confidential acquisition support'],
    icon: BarChart3,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85',
  },
];

export default function Services() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header Hero - Full-bleed 50/50 split matching About and Properties pages */}
        <section className="grid md:grid-cols-2 min-h-[420px] lg:min-h-[480px] border-b border-[#20344d] w-full max-w-full overflow-hidden">
          <div className="bg-[#112239] text-white p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d6b98f] font-semibold animate-hero-fade">
              <span className="w-1.5 h-1.5 bg-[#d6b98f] rounded-full inline-block" />
              <span>Our expertise</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-3 sm:mt-4 animate-hero-fade delay-1 serif leading-[1.15] break-words">
              Thoughtful guidance at every turn.
            </h1>
            <p className="text-[#c3ccd5] leading-7 mt-4 sm:mt-5 max-w-lg text-sm md:text-base animate-hero-fade delay-2">
              A full suite of real-estate services shaped around your ambitions and the standards your property deserves.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 mt-6 sm:mt-8 border-t border-white/15 text-xs animate-hero-fade delay-3">
              <div>
                <strong className="block text-white font-medium text-base">Advisory</strong>
                <span className="text-[#bfc7d0] text-[11px] uppercase tracking-wider">End-to-End</span>
              </div>
              <div>
                <strong className="block text-white font-medium text-base">Institutional</strong>
                <span className="text-[#bfc7d0] text-[11px] uppercase tracking-wider">Asset Standards</span>
              </div>
              <div>
                <strong className="block text-white font-medium text-base">Discreet</strong>
                <span className="text-[#bfc7d0] text-[11px] uppercase tracking-wider">Private Client</span>
              </div>
            </div>
          </div>
          <div className="overflow-hidden bg-[#112239] relative min-h-[300px] md:min-h-full">
            <img
              className="w-full h-full object-cover animate-hero-fade"
              src="/images/services-uae-hero.jpg"
              alt="Altiere Estates Real Estate Advisory Penthouse Salon"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-[#112239]/20 pointer-events-none" />
          </div>
        </section>

        {/* Services Collection */}
        <section className="shell py-12 md:py-16">
          <div className="space-y-6 md:space-y-8">
            {services.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title}>
                  <div className="bg-white border border-stone-200/80 rounded-2xl p-8 lg:p-10 shadow-xs hover:border-[#b39062]/50 hover:shadow-md transition-all duration-300 group">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      {/* Media Image with Fixed Consistent Aspect Ratio & Full Coverage */}
                      <div
                        className={`relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-stone-100 shimmer-placeholder ${
                          i % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                        }`}
                      >
                        <img
                          className="w-full h-full !h-full object-cover rounded-xl group-hover:scale-103 transition-transform duration-700 ease-out"
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                        />
                      </div>

                      {/* Content Details */}
                      <div className={`flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="flex items-center gap-3">
                          <span className="h-7 w-7 rounded-md bg-[#112239]/5 text-[#b39062] flex items-center justify-center">
                            <Icon size={16} />
                          </span>
                          <span className="eyebrow text-[10px] tracking-[0.2em] font-semibold text-[#b39062]">
                            0{i + 1}
                          </span>
                        </div>
                        <h2 className="serif text-2xl sm:text-3xl lg:text-4xl mt-3 text-[#0B1528] font-medium tracking-tight">
                          {item.title}
                        </h2>
                        <p className="text-stone-600 leading-relaxed text-sm lg:text-base mt-3 max-w-lg">
                          {item.desc}
                        </p>
                        <ul className="mt-5 space-y-2.5 text-xs sm:text-sm text-stone-600">
                          {item.benefits.map((x) => (
                            <li key={x} className="flex items-center gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#b39062] shrink-0" />
                              <span>{x}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 pt-4 border-t border-stone-100">
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-[#0B1528] hover:text-[#b39062] transition-colors group/cta"
                          >
                            <span>Speak to a specialist</span>
                            <ArrowRight
                              size={14}
                              className="transition-transform duration-300 group-hover/cta:translate-x-1 text-[#b39062]"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
