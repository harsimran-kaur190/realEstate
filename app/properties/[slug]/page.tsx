import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Bath,
  BedDouble,
  Check,
  MapPin,
  Ruler,
  ArrowRight,
} from 'lucide-react';
import {
  FloorPlanSection,
  Footer,
  LocationSection,
  Navbar,
  PropertyCard,
  PropertyEnquiryForm,
  PropertyGallery,
  ScrollReveal,
} from '@/components/site';
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

  return (
    <>
      <Navbar />
      <main>
        {/* Breadcrumb */}
        <div className="shell py-6 text-xs text-[#657080] flex items-center gap-2">
          <Link href="/properties" className="hover:text-[#112239] transition-colors">
            Properties
          </Link>
          <span>/</span>
          <span className="text-[#112239] font-medium">{p.name}</span>
        </div>

        {/* Interactive Property Gallery with Lightbox */}
        <section className="shell animate-hero-fade">
          <PropertyGallery images={p.gallery} title={p.name} />
        </section>

        {/* Main Details & Private Viewing Enquiry */}
        <section className="shell section !py-10 sm:!py-16">
          <div className="grid md:grid-cols-[1.45fr_.75fr] gap-10 md:gap-14 items-stretch">
            <div className="min-w-0">
              <ScrollReveal>
                <p className="eyebrow">
                  {p.purpose} · {p.type}
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 font-normal text-[#112239] break-words">
                  {p.name}
                </h1>
                <p className="flex items-center gap-1.5 text-[#657080] mt-4">
                  <MapPin size={16} className="text-[#b39062]" />
                  {p.place}
                </p>
                <p className="serif text-2xl sm:text-3xl md:text-4xl mt-4 sm:mt-6 text-[#112239]">
                  {formatAED(p.price)}{' '}
                  {p.purpose === 'Rent' && (
                    <span className="font-sans text-sm text-[#657080] font-normal">
                      / year
                    </span>
                  )}
                </p>

                {/* Key Metrics Bar */}
                <div className="grid grid-cols-3 border-y border-[#e6e3dc] py-4 sm:py-6 mt-6 sm:mt-8 text-xs sm:text-sm text-center md:text-left gap-2 sm:gap-4">
                  {[
                    [BedDouble, `${p.beds || '—'} Bedrooms`],
                    [Bath, `${p.baths} Bathrooms`],
                    [Ruler, `${p.area.toLocaleString()} sq ft`],
                  ].map(([I, l]) => {
                    const Icon = I as typeof BedDouble;
                    return (
                      <span
                        className="flex flex-col md:flex-row gap-1.5 sm:gap-2.5 items-center text-[#112239] font-medium"
                        key={String(l)}
                      >
                        <Icon size={19} color="#b39062" />
                        {String(l)}
                      </span>
                    );
                  })}
                </div>
              </ScrollReveal>

              <ScrollReveal stagger={1}>
                <h2 className="serif text-2xl sm:text-3xl mt-8 sm:mt-12 text-[#112239]">
                  A considered place to live.
                </h2>
                <p className="text-[#657080] leading-7 sm:leading-8 mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base">
                  {p.description} This fictional listing has been curated to demonstrate a thoughtfully considered premium real-estate experience.
                </p>
              </ScrollReveal>

              <ScrollReveal stagger={2}>
                <h2 className="serif text-2xl sm:text-3xl mt-8 sm:mt-12 text-[#112239]">
                  Property highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 mt-4 sm:mt-5">
                  {p.amenities.map((a) => (
                    <p key={a} className="flex items-center gap-2.5 text-sm text-[#314052]">
                      <Check size={16} color="#b39062" />
                      {a}
                    </p>
                  ))}
                </div>
              </ScrollReveal>

              {/* Refined Architectural Floor Plan Block */}
              <ScrollReveal stagger={3}>
                <FloorPlanSection property={p} />
              </ScrollReveal>

              {/* Refined Location & Connectivity Block */}
              <ScrollReveal stagger={4}>
                <LocationSection property={p} />
              </ScrollReveal>
            </div>

            {/* Sidebar Sticky Enquiry Card */}
            <aside className="h-full relative">
              <div id="enquiry" className="border border-[#e6e3dc] bg-white p-5 sm:p-7 sticky top-28 shadow-lg shadow-black/5 transition-shadow duration-300 hover:shadow-xl rounded-2xl">
                <p className="eyebrow">Private viewing</p>
                <h2 className="serif text-3xl mt-2 text-[#112239]">
                  Enquire about this property
                </h2>
                <p className="text-sm text-[#657080] mt-3 leading-6">
                  Speak with our property advisor to arrange a confidential private viewing.
                </p>
                <PropertyEnquiryForm propertyName={p.name} advisorName="Maya Rahman" />

                <div className="rule my-6" />

                <p className="text-xs text-[#657080] uppercase tracking-wider">Your advisor</p>
                <p className="serif text-2xl mt-1 text-[#112239]">Maya Rahman</p>
                <p className="text-sm text-[#657080] mt-0.5">Senior Property Advisor</p>
              </div>
            </aside>
          </div>
        </section>

        {/* Related properties */}
        <section className="bg-[#ece9e1] section !py-10 sm:!py-16 border-t border-[#ded9ce]">
          <div className="shell">
            <ScrollReveal>
              <p className="eyebrow">Continue exploring</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl mt-2 mb-6 sm:mb-8 text-[#112239]">More exceptional spaces</h2>
            </ScrollReveal>
            <div className="grid-3">
              {properties
                .filter((x) => x.slug !== p.slug)
                .slice(0, 3)
                .map((x, idx) => (
                  <PropertyCard key={x.slug} p={x} index={idx} />
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
