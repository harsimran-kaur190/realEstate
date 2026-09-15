import type { Metadata } from 'next';
import { ArrowRight, Mail, Quote } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us & Leadership',
  description:
    'Meet the team and discover our approach to exceptional prime real estate advisory.',
  openGraph: {
    title: 'About Us & Leadership | Altiere Estates',
    description:
      'Meet the team and discover our approach to exceptional prime real estate advisory.',
  },
};
import { Footer, Navbar, ScrollReveal } from '@/components/site';

const people = [
  {
    name: 'Maya Rahman',
    role: 'Managing Director',
    bio: 'Over 15 years advising ultra-high-net-worth individuals on prime UAE residential investments and strategic private acquisitions.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://linkedin.com',
    email: 'maya.rahman@altiere-estates.ae',
  },
  {
    name: 'Omar Al Nuaimi',
    role: 'Head of Advisory',
    bio: 'Institutional property strategist specializing in high-value portfolio structuring, acquisition, and yield growth.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://linkedin.com',
    email: 'omar.alnuaimi@altiere-estates.ae',
  },
  {
    name: 'Leila Noor',
    role: 'Director, Residential',
    bio: 'Architectural historian turned luxury advisor, curating premier waterfront villas and iconic penthouse estates.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    linkedin: 'https://linkedin.com',
    email: 'leila.noor@altiere-estates.ae',
  },
];

function LinkedinIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.94 0-1.7.76-1.7 1.7s.76 1.7 1.7 1.7 1.7-.76 1.7-1.7-.76-1.7-1.7-1.7Z" />
    </svg>
  );
}

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 min-h-[440px] lg:min-h-[500px] border-b border-[#20344d] w-full max-w-full overflow-hidden">
          <div className="bg-[#112239] text-white p-6 sm:p-8 md:p-14 lg:p-20 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d6b98f] font-semibold animate-hero-fade">
              <span className="w-1.5 h-1.5 bg-[#d6b98f] rounded-full inline-block" />
              <span>Our point of view</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-3 sm:mt-4 animate-hero-fade delay-1 serif leading-[1.15] break-words">
              A sharper eye for what matters.
            </h1>
            <p className="text-[#c3ccd5] leading-7 mt-4 sm:mt-5 max-w-lg text-sm md:text-base animate-hero-fade delay-2">
              Altiere is an independent real-estate brand founded on a simple belief: remarkable property deserves a more considered experience.
            </p>
          </div>
          <div className="overflow-hidden bg-[#112239] shimmer-placeholder relative min-h-[300px] md:min-h-full">
            <img
              className="w-full h-full object-cover animate-hero-fade"
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85"
              alt="Refined luxury home interior"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-[#112239]/20 pointer-events-none" />
          </div>
        </section>

        {/* Mission & Stats Section */}
        <section className="shell py-12 md:py-16">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
              <div>
                <p className="eyebrow">Our mission</p>
                <h2 className="serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 text-[#112239] font-medium leading-tight">
                  To make every move feel well made.
                </h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm md:text-base">
                We bring together experienced counsel, rigorous market knowledge and a distinctly personal way of working. Our vision is to be the quietly trusted name behind the UAE’s most important property decisions.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats: Clean 2x2 grid on mobile, 4 columns on desktop */}
          <ScrollReveal stagger={1}>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8 mt-12 md:mt-16 border-t border-stone-200 pt-10">
              {[
                ['500+', 'Properties represented'],
                ['12+', 'Years of experience'],
                ['4', 'UAE markets'],
                ['98%', 'Client satisfaction'],
              ].map(([n, l]) => (
                <div key={l} className="border-l-2 border-[#b39062]/50 pl-4 py-1">
                  <strong className="serif text-3xl sm:text-4xl text-[#112239] font-bold block tabular-nums">
                    {n}
                  </strong>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-stone-600 font-medium">
                    {l}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-stone-400 mt-6">
              All company figures shown are for independent brand demonstration.
            </p>
          </ScrollReveal>
        </section>

        {/* Values Section: High contrast with hairline dividers */}
        <section className="bg-[#ece9e1] py-12 md:py-16 border-y border-stone-200/80">
          <div className="shell">
            <ScrollReveal>
              <p className="eyebrow">What guides us</p>
              <h2 className="serif text-3xl md:text-4xl text-stone-900 font-medium mt-2 mb-8">
                Principles of practice.
              </h2>
              <div className="grid md:grid-cols-3 gap-6 md:gap-10 divide-y divide-stone-300 md:divide-y-0 md:divide-x md:divide-stone-300">
                {[
                  [
                    'Clarity',
                    'We make the complex understandable, and the path forward visible with transparent advice and rigorous data.',
                  ],
                  [
                    'Care',
                    'We listen closely, communicate openly and steward your property decisions with uncompromising dedication.',
                  ],
                  [
                    'Discretion',
                    'Confidentiality and quiet integrity underpin our relationships with private clients and high-value transactions.',
                  ],
                ].map(([t, d], i) => (
                  <div key={t} className={`group ${i > 0 ? 'pt-6 md:pt-0 md:pl-10' : ''}`}>
                    <div className="w-8 h-0.5 bg-[#b39062] mb-4" />
                    <h3 className="serif text-2xl sm:text-3xl text-stone-900 font-medium group-hover:text-[#b39062] transition-colors duration-300">
                      {t}
                    </h3>
                    <p className="text-stone-600 leading-relaxed text-sm md:text-base mt-2.5">
                      {d}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Leadership Team Section: Refined business-editorial portrait cards */}
        <section className="shell py-12 md:py-16">
          <ScrollReveal>
            <p className="eyebrow">Our people</p>
            <h2 className="serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 mb-8 md:mb-10 text-[#112239] font-medium">
              Meet the leadership team.
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {people.map((person, idx) => (
              <ScrollReveal key={person.name} stagger={idx + 1}>
                <div className="bg-white/80 backdrop-blur-sm border border-stone-200 rounded-xl p-4 sm:p-5 shadow-xs hover:border-[#b39062]/50 hover:shadow-md transition-all duration-300 group flex flex-col h-full">
                  {/* Portrait with identical aspect-[4/5] and gentle slow scale on hover */}
                  <div className="w-full aspect-[4/5] overflow-hidden rounded-xl bg-stone-100 mb-4 border border-stone-200/50 shimmer-placeholder">
                    <img
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-[1.02]"
                      src={person.image}
                      alt={person.name}
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    {/* Role & Social/Email Actions */}
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] tracking-widest uppercase text-stone-500 font-medium">
                        {person.role}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={person.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${person.name}'s LinkedIn profile`}
                          className="text-stone-400 hover:text-[#0B1528] transition-colors p-1 rounded-sm hover:bg-stone-100"
                        >
                          <LinkedinIcon className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`mailto:${person.email}`}
                          aria-label={`Email ${person.name}`}
                          className="text-stone-400 hover:text-[#0B1528] transition-colors p-1 rounded-sm hover:bg-stone-100"
                        >
                          <Mail size={13} />
                        </a>
                      </div>
                    </div>

                    {/* Member Name */}
                    <h3 className="serif text-2xl md:text-3xl text-stone-900 font-medium tracking-tight mt-1.5 group-hover:text-[#b39062] transition-colors duration-300">
                      {person.name}
                    </h3>

                    {/* Bio */}
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-2.5 flex-1">
                      {person.bio}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Discreet Centered Demo Disclaimer */}
          <p className="text-[11px] text-stone-400 text-center mt-12 md:mt-16 max-w-md mx-auto">
            People shown are fictional representatives for this independent design demonstration.
          </p>
        </section>

        {/* Testimonial Quote Section */}
        <section className="bg-[#112239] text-white py-14 md:py-20">
          <div className="shell max-w-4xl text-center">
            <ScrollReveal>
              <Quote color="#b39062" className="mx-auto" size={32} />
              <p className="serif text-2xl sm:text-3xl md:text-4xl leading-snug mt-6 font-normal">
                “They understood exactly what we needed before we had found the words for it.”
              </p>
              <p className="mt-5 text-xs uppercase tracking-[.18em] text-[#d6b98f] font-medium">
                Aisha M. · Fictional client testimonial
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
