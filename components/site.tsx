'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  AlertCircle,
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Compass,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  Layers,
  Loader2,
  MapPin,
  Menu,
  MessageSquare,
  Plane,
  RotateCcw,
  Ruler,
  Search,
  Waves,
  X,
} from 'lucide-react';
import { Property, formatAED } from '@/lib/properties';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    ['Home', '/'],
    ['Properties', '/properties'],
    ['Services', '/services'],
    ['About', '/about'],
    ['Contact', '/contact'],
  ];

  return (
    <header
      className={`site-nav sticky top-0 z-50 border-b border-[#e6e3dc] ${
        scrolled ? 'site-nav-scrolled' : 'bg-[#f8f6f1]/90 backdrop-blur-md'
      }`}
    >
      <div className="shell h-[64px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <span className="h-8 w-8 shrink-0 flex items-center justify-center rounded-sm bg-[#b39062] text-white serif text-lg leading-none transition-transform duration-300 group-hover:scale-105 select-none">
            A
          </span>
          <span className="text-[16px] sm:text-[17px] tracking-[.18em] font-semibold leading-none pt-0.5 transition-colors duration-300 group-hover:text-[#b39062]">
            ALTIERE
          </span>
        </Link>
        <nav className="hidden md:flex gap-8 text-[12px] uppercase tracking-[0.14em]">
          {links.map(([n, h]) => (
            <Link key={n} href={h} className="nav-link text-[#112239] font-medium">
              {n}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/contact"
            className="text-xs uppercase tracking-[0.14em] font-medium text-[#112239] hover:text-[#b39062] transition-colors duration-200"
          >
            List Your Property
          </Link>
          <Link
            href="/contact"
            className="nav-cta-btn group"
          >
            <span>Book a Viewing</span>
            <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 text-[#112239] transition-transform active:scale-95"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#e6e3dc] bg-[#f8f6f1] px-4 sm:px-6 py-6 flex flex-col gap-5 animate-hero-fade">
          {links.map(([n, h]) => (
            <Link
              onClick={() => setOpen(false)}
              key={n}
              href={h}
              className="uppercase text-xs tracking-[.15em] hover:text-[#b39062] transition-colors"
            >
              {n}
            </Link>
          ))}
          <Link href="/contact" className="btn w-full mt-2">
            <span>Book a viewing</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#112239] text-[#e9e4da] pt-16 pb-7">
      <div className="shell grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 sm:gap-10">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="h-8 w-8 grid place-items-center bg-[#b39062] text-white serif text-xl">
              A
            </span>
            <span className="tracking-[.16em]">ALTIERE</span>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#bfc7d0]">
            A fictional premium UAE real-estate brand, created as an independent design and development demonstration.
          </p>
        </div>
        <Foot title="Properties" items={['Buy', 'Rent', 'Commercial', 'Featured homes']} />
        <Foot title="Services" items={['Property sales', 'Leasing', 'Management', 'Advisory']} />
        <div>
          <p className="text-xs tracking-[.16em] uppercase mb-4">Contact</p>
          <p className="text-sm leading-7 text-[#bfc7d0]">
            Al Saqr Business Tower
            <br />
            Sheikh Zayed Road, Dubai
            <br />
            +971 4 555 0182
          </p>
          <div className="flex gap-3 mt-4">
            <Globe2 size={17} />
            <Globe2 size={17} />
          </div>
        </div>
      </div>
      <div className="shell mt-14 pt-6 border-t border-[#344359] text-xs text-[#93a0b0] flex flex-col sm:flex-row justify-between gap-3 sm:gap-2">
        <span>© 2026 Altiere Estates. Demo website.</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
}

function Foot({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs tracking-[.16em] uppercase mb-4">{title}</p>
      {items.map((x) => (
        <p key={x} className="text-sm text-[#bfc7d0] mb-3 hover:text-white transition-colors cursor-pointer">
          {x}
        </p>
      ))}
    </div>
  );
}

export function PropertyCard({
  p,
  index = 0,
  reveal = false,
}: {
  p: Property;
  index?: number;
  reveal?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(p.image);

  useEffect(() => {
    setImgSrc(p.image);
  }, [p.image]);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImgLoaded(true);
    }
    const timer = setTimeout(() => {
      setImgLoaded(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, [imgSrc]);

  useEffect(() => {
    if (!reveal) return;
    const el = ref.current;
    if (!el) return;

    // Reveal immediately if already within or close to viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 150) {
      el.classList.add('reveal-active');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('reveal-active');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: '150px 0px 50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reveal]);

  const stagger = (index % 3) + 1;
  const revealClass = reveal ? `reveal-init stagger-${stagger}` : 'reveal-active';

  return (
    <Link
      ref={ref}
      href={`/properties/${p.slug}`}
      className={`property-card block group ${revealClass}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#e8e4dc]">
        {/* Shimmer skeleton placeholder */}
        <div
          className={`absolute inset-0 shimmer-placeholder transition-opacity duration-700 pointer-events-none ${
            imgLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <img
          ref={imgRef}
          src={imgSrc}
          alt={p.name}
          className={`cover property-image transition-all duration-700 ease-out ${
            imgLoaded ? 'opacity-100 filter-none scale-100' : 'opacity-0 blur-[6px] scale-102'
          }`}
          loading={index < 3 ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgSrc('/images/hero-uae-villa.jpg');
            setImgLoaded(true);
          }}
        />
        {p.featured && (
          <span className="absolute top-3.5 left-3.5 bg-black/40 backdrop-blur-md text-white text-xs tracking-wider uppercase px-2.5 py-1 font-medium shadow-xs">
            Featured
          </span>
        )}
        <span className="absolute bottom-3.5 right-3.5 bg-black/40 backdrop-blur-md text-white text-xs tracking-wider uppercase px-2.5 py-1 font-medium shadow-xs">
          {p.purpose}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[.16em] text-[#b39062] font-semibold">
            {p.type}
          </p>
          <span className="text-[10px] uppercase tracking-[.12em] text-[#657080] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-1 text-[#b39062]">
            Details <ArrowRight size={12} />
          </span>
        </div>
        <p className="serif text-2xl mt-1 group-hover:text-[#b39062] transition-colors duration-300">
          {p.name}
        </p>
        <p className="mt-2 flex items-center gap-1 text-sm text-[#657080]">
          <MapPin size={14} className="text-[#b39062] shrink-0" />
          {p.place}
        </p>
        <p className="mt-3.5 text-xl md:text-2xl font-semibold text-[#112239] tracking-tight">
          {formatAED(p.price)}{' '}
          {p.purpose === 'Rent' && (
            <span className="text-xs font-normal text-[#657080] tracking-normal font-sans">/ year</span>
          )}
        </p>
        <div className="mt-4 pt-3.5 border-t border-[#E6E1DA] flex items-center gap-2 text-xs text-[#657080] font-normal flex-wrap">
          <span>{p.beds || '—'} Beds</span>
          <span className="text-[#cbbeab]">•</span>
          <span>{p.baths} Baths</span>
          <span className="text-[#cbbeab]">•</span>
          <span>{p.area.toLocaleString()} sq ft</span>
        </div>
      </div>
    </Link>
  );
}

export function SearchPanel() {
  const [kind, setKind] = useState('Buy');
  const [city, setCity] = useState('All');
  const [type, setType] = useState('All');
  const [price, setPrice] = useState('All');
  const [beds, setBeds] = useState('All');

  const hasActiveFilters =
    city !== 'All' || type !== 'All' || price !== 'All' || beds !== 'All' || kind !== 'Buy';

  const resetFilters = () => {
    setKind('Buy');
    setCity('All');
    setType('All');
    setPrice('All');
    setBeds('All');
  };

  const qs = new URLSearchParams({ purpose: kind, city, type, price, beds });

  return (
    <div className="search-dock-container bg-white/95 backdrop-blur-md border border-stone-200/80 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] max-w-[1020px] mx-auto w-full p-3 sm:p-4 transition-all duration-300">
      {/* Top Tabs Row - Refined Underline Style */}
      <div className="flex items-center justify-between gap-4 px-2 sm:px-3 pt-1 pb-3 border-b border-stone-100 mb-2">
        <div className="flex items-center gap-6 sm:gap-8">
          {['Buy', 'Rent', 'Commercial'].map((x) => (
            <button
              type="button"
              key={x}
              onClick={() => setKind(x)}
              className={`relative pb-2 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 cursor-pointer ${
                kind === x
                  ? 'text-[#0B1528] font-semibold'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              {x}
              {kind === x && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b39062] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Right Side: Reset Filters or Editorial Scope */}
        <div className="flex items-center gap-3">
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#0B1528] transition-colors uppercase tracking-[0.14em] font-medium py-1 px-2.5 rounded-lg hover:bg-stone-100 cursor-pointer animate-hero-fade"
              title="Reset all filters"
            >
              <RotateCcw size={12} className="text-[#b39062]" />
              <span>Reset filters</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b39062]" />
              <span>UAE Curated Portfolio</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter Columns & Search Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:flex md:items-center gap-2 md:gap-1 p-1">
        <SearchField
          label="Location"
          value={city}
          set={setCity}
          options={['All', 'Dubai', 'Abu Dhabi', 'Sharjah']}
          defaultLabel="Any location"
        />
        <div className="hidden md:block w-px h-8 bg-stone-200/60 my-auto shrink-0" />
        <SearchField
          label="Property Type"
          value={type}
          set={setType}
          options={['All', 'Villa', 'Apartment', 'Office']}
          defaultLabel="Any type"
        />
        <div className="hidden md:block w-px h-8 bg-stone-200/60 my-auto shrink-0" />
        <SearchField
          label="Price Range"
          value={price}
          set={setPrice}
          options={['All', 'Under 1m', '1m–5m', '5m+']}
          defaultLabel="Any price"
        />
        <div className="hidden md:block w-px h-8 bg-stone-200/60 my-auto shrink-0" />
        <SearchField
          label="Bedrooms"
          value={beds}
          set={setBeds}
          options={['All', '2+', '3+', '4+']}
          defaultLabel="Any bedrooms"
        />

        {/* Search Button */}
        <Link
          href={`/properties?${qs.toString()}`}
          className="search-dock-submit col-span-2 sm:col-span-2 md:col-auto inline-flex items-center justify-center gap-2.5 !bg-[#0B1528] hover:!bg-[#162742] !text-white px-7 h-[52px] rounded-xl font-medium text-xs uppercase tracking-[0.18em] shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 shrink-0 group cursor-pointer md:ml-1 mt-1 md:mt-0 !no-underline"
        >
          <Search
            size={14}
            className="!text-[#b39062] group-hover:!text-white transition-all duration-300 group-hover:scale-110 group-hover:translate-x-0.5 shrink-0"
          />
          <span className="font-semibold !text-white">Search</span>
        </Link>
      </div>
    </div>
  );
}

function SearchField({
  label,
  value,
  set,
  options,
  defaultLabel,
}: {
  label: string;
  value: string;
  set: (x: string) => void;
  options: string[];
  defaultLabel: string;
}) {
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <div
      onClick={() => {
        try {
          selectRef.current?.showPicker();
        } catch {
          selectRef.current?.focus();
        }
      }}
      className="relative flex-1 min-w-0 p-3 rounded-xl border border-stone-200/50 md:border-transparent bg-stone-50/40 md:bg-transparent hover:bg-stone-50/80 transition-colors duration-200 cursor-pointer group"
    >
      <span className="block text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">
        {label}
      </span>
      <div className="relative flex items-center justify-between">
        <select
          ref={selectRef}
          aria-label={label}
          value={value}
          onChange={(e) => set(e.target.value)}
          className="w-full bg-transparent text-sm font-medium text-[#112239] cursor-pointer focus:outline-none appearance-none pr-5 truncate"
        >
          {options.map((x) => (
            <option key={x} value={x} className="text-stone-900 bg-white">
              {x === 'All' ? defaultLabel : x}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="text-stone-400 group-hover:text-stone-600 transition-colors pointer-events-none stroke-[1.5] absolute right-0 top-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}

export function AnimatedStat({
  number,
  label,
  dark = false,
}: {
  number: string;
  label: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState('0');
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            const numMatch = number.match(/^(\d+)(.*)$/);
            if (!numMatch) {
              setDisplay(number);
              return;
            }
            const target = parseInt(numMatch[1], 10);
            const suffix = numMatch[2] || '';
            const duration = 1200;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 4);
              const current = Math.round(target * ease);
              setDisplay(`${current}${suffix}`);
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setDisplay(number);
              }
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [number]);

  return (
    <div
      ref={ref}
      className={`border-l pl-5 ${
        dark ? 'border-white/25 text-white' : 'border-[#d6d2ca] text-[#112239]'
      }`}
    >
      <strong className="serif text-3xl md:text-4xl tabular-nums block">
        {display}
      </strong>
      <p
        className={`mt-1 text-xs uppercase tracking-[.12em] ${
          dark ? 'text-[#bfc7d0]' : 'text-[#657080]'
        }`}
      >
        {label}
      </p>
    </div>
  );
}

export function ScrollReveal({
  children,
  className = '',
  stagger = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('reveal-active');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const staggerClass = stagger > 0 ? `stagger-${stagger}` : '';

  return (
    <div ref={ref} className={`reveal-init ${staggerClass} ${className}`}>
      {children}
    </div>
  );
}

export function PropertyManagementFeature() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
        const translateY = (scrollPercent - 0.5) * 32;
        imageRef.current.style.transform = `scale(1.08) translateY(${translateY}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-[440px] md:min-h-full relative overflow-hidden bg-[#0d1a2d]">
      <div
        ref={imageRef}
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: 'scale(1.08)' }}
      >
        <img
          className="cover"
          src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85"
          alt="Carefully managed premium UAE residence"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#112239]/95 via-[#112239]/25 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 p-6 border border-white/15 bg-[#112239]/85 backdrop-blur-md">
        <p className="text-[10px] uppercase tracking-[.2em] text-[#d6b98f] font-semibold">
          Asset Preservation Ethos
        </p>
        <p className="serif text-xl md:text-2xl text-white mt-1.5 leading-snug">
          &ldquo;More than a property. A long-term asset.&rdquo;
        </p>
        <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center text-[11px] text-[#bfc7d0]">
          <span>Institutional standard</span>
          <span className="text-[#d6b98f] uppercase tracking-wider">Active oversight</span>
        </div>
      </div>
    </div>
  );
}

export function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setActiveIdx((prev) => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, images.length]);

  return (
    <>
      <div className="grid md:grid-cols-[2.1fr_1fr] gap-3 h-auto md:h-[580px] w-full max-w-full overflow-hidden">
        {/* Main Feature Image */}
        <div
          onClick={() => setLightboxOpen(true)}
          className="h-[260px] sm:h-[360px] md:h-full relative overflow-hidden bg-[#e8e4dc] shimmer-placeholder group cursor-zoom-in border border-black/5"
        >
          <img
            key={activeIdx}
            className="cover transition-transform duration-700 ease-out group-hover:scale-103 animate-hero-fade"
            src={images[activeIdx]}
            alt={`${title} view`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute bottom-4 right-4 bg-[#112239]/85 backdrop-blur-xs text-white text-[11px] uppercase tracking-[.14em] px-3.5 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 font-medium">
            Open gallery ({activeIdx + 1}/{images.length})
          </span>
        </div>

        {/* Thumbnail Sidebar */}
        <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-3 h-[100px] sm:h-[130px] md:h-full">
          {images.slice(1, 3).map((img, i) => {
            const actualIdx = i + 1;
            const isSelected = activeIdx === actualIdx;
            return (
              <div
                key={img}
                onClick={() => setActiveIdx(actualIdx)}
                className={`relative overflow-hidden cursor-pointer group bg-[#e8e4dc] shimmer-placeholder transition-all duration-300 border border-black/5 ${
                  isSelected ? 'ring-2 ring-[#b39062] opacity-100' : 'opacity-85 hover:opacity-100'
                }`}
              >
                <img
                  className="cover transition-transform duration-500 group-hover:scale-105"
                  src={img}
                  alt={`${title} view ${actualIdx + 1}`}
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal rendered via Portal directly to body */}
      {lightboxOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="lightbox-backdrop !z-[9999]"
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="lightbox-content relative w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center w-full max-w-4xl text-white mb-3 px-2">
                <span className="text-xs uppercase tracking-[.18em] text-[#d6b98f] font-medium">
                  {title} · Photo {activeIdx + 1} of {images.length}
                </span>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="text-white/80 hover:text-white p-1.5 transition-colors cursor-pointer bg-white/10 hover:bg-white/20 rounded-full"
                  aria-label="Close lightbox"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative max-h-[75vh] overflow-hidden flex items-center justify-center">
                <img
                  src={images[activeIdx]}
                  alt={`${title} fullscreen view`}
                  className="max-h-[75vh] max-w-full object-contain shadow-2xl"
                />
              </div>

              <div className="flex gap-4 mt-5">
                <button
                  onClick={() => setActiveIdx((prev) => (prev - 1 + images.length) % images.length)}
                  className="btn btn-outline !border-white/40 !text-white hover:!border-white hover:!bg-white/10 !py-2 !px-5"
                >
                  Previous
                </button>
                <button
                  onClick={() => setActiveIdx((prev) => (prev + 1) % images.length)}
                  className="btn !bg-white !text-[#112239] !border-white hover:!bg-[#f0ebe1] !py-2 !px-5"
                >
                  Next
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export const icons = { Building2, ArrowRight };

export function FloatingContactButton() {
  const pathname = usePathname();

  // Hide on contact page
  if (pathname === '/contact' || pathname?.startsWith('/contact/')) {
    return null;
  }

  return (
    <Link
      href="/contact"
      aria-label="Contact Us"
      title="Contact Us"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2.5 bg-[#0B1528]/95 hover:bg-[#0B1528] text-white border border-white/10 hover:border-[#b39062]/40 rounded-full shadow-2xl hover:shadow-[0_12px_32px_rgba(179,144,98,0.25)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 active:scale-95 group w-12 h-12 sm:w-auto sm:h-auto sm:py-3 sm:px-5"
    >
      <MessageSquare className="w-4 h-4 text-[#b39062] transition-transform duration-300 group-hover:scale-110 shrink-0" />
      <span className="hidden sm:inline text-xs uppercase tracking-widest font-medium text-white">
        Contact Us
      </span>
    </Link>
  );
}

export function FloorPlanSection({ property }: { property: Property }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  // Plot and built-up area display
  const plotDisplay = '14,200 sq ft';
  const builtUpDisplay = property.area ? `${property.area.toLocaleString()} sq ft` : '11,850 sq ft';

  return (
    <>
      <div className="mt-10 sm:mt-14 relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-xs p-6 sm:p-8 transition-all hover:shadow-md">
        {/* Architectural Blueprint Vector Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05] select-none overflow-hidden"
          aria-hidden="true"
        >
          <svg className="w-full h-full" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blueprint-grid-detail" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#112239" strokeWidth="1" strokeDasharray="2,2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint-grid-detail)" />
            <rect x="40" y="30" width="520" height="340" stroke="#112239" strokeWidth="3" fill="none" />
            <line x1="220" y1="30" x2="220" y2="370" stroke="#112239" strokeWidth="2" />
            <line x1="390" y1="30" x2="390" y2="230" stroke="#112239" strokeWidth="2" />
            <line x1="220" y1="230" x2="560" y2="230" stroke="#112239" strokeWidth="2" />
            <line x1="40" y1="170" x2="220" y2="170" stroke="#112239" strokeWidth="2" />
            <circle cx="305" cy="130" r="42" stroke="#112239" strokeWidth="1.5" strokeDasharray="3,3" />
            <path d="M 220 170 A 35 35 0 0 1 255 205" stroke="#112239" strokeWidth="1.5" fill="none" />
            <path d="M 390 170 A 35 35 0 0 1 425 205" stroke="#112239" strokeWidth="1.5" fill="none" />
            <text x="65" y="100" fill="#112239" fontSize="13" fontFamily="monospace" letterSpacing="2">GRAND SALON</text>
            <text x="65" y="260" fill="#112239" fontSize="13" fontFamily="monospace" letterSpacing="2">FORMAL DINING</text>
            <text x="245" y="135" fill="#112239" fontSize="13" fontFamily="monospace" letterSpacing="2">ATRIUM</text>
            <text x="410" y="100" fill="#112239" fontSize="13" fontFamily="monospace" letterSpacing="2">MASTER WING</text>
            <text x="280" y="300" fill="#112239" fontSize="13" fontFamily="monospace" letterSpacing="2">INFINITY POOL DECK</text>
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-[11px] uppercase tracking-widest font-semibold text-stone-700">
              <Layers size={13} className="text-[#b39062]" />
              Architectural Layout · Level 01 & 02
            </span>
            <span className="text-[11px] uppercase tracking-widest text-stone-400 font-medium">
              Scale 1:100 Metric
            </span>
          </div>

          <div className="max-w-xl">
            <h3 className="serif text-2xl sm:text-3xl text-[#112239] font-medium">
              Considered Spatial Flow & Volume
            </h3>
            <p className="text-[#657080] text-sm sm:text-base mt-2 leading-relaxed">
              Expansive indoor-outdoor floor plan engineered for effortless entertaining and complete familial privacy. Includes private lift, show and service kitchens, and subterranean wellness suite.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="btn !py-3 !px-6 rounded-xl text-xs flex items-center gap-2.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <FileText size={14} className="text-[#b39062]" />
              <span>Request Full Dossier & Floor Plans</span>
              <ArrowRight size={13} className="opacity-75" />
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="btn btn-outline !py-3 !px-4 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>Brochure (PDF)</span>
            </button>
          </div>

          {/* Key Dimensions Horizontal Strip */}
          <div className="mt-8 pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-2 sm:gap-4 text-left">
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                Plot
              </span>
              <span className="serif text-base sm:text-xl font-medium text-[#112239]">
                {plotDisplay}
              </span>
            </div>
            <div className="border-l border-stone-200/80 pl-3 sm:pl-5">
              <span className="block text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                Built-up Area
              </span>
              <span className="serif text-base sm:text-xl font-medium text-[#112239]">
                {builtUpDisplay}
              </span>
            </div>
            <div className="border-l border-stone-200/80 pl-3 sm:pl-5">
              <span className="block text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                Elevation
              </span>
              <span className="serif text-base sm:text-xl font-medium text-[#112239]">
                3 Levels
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Dossier Request / Download */}
      {modalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="bg-white max-w-md w-full rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xl relative animate-card-entrance"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 p-1 rounded-md cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-2 text-[#b39062]">
                <Layers size={18} />
                <span className="text-[11px] uppercase tracking-widest font-semibold">Architectural Dossier</span>
              </div>
              <h4 className="serif text-2xl text-[#112239] font-medium">
                {property.name}
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Receive the confidential CAD floor plans, structural schematics, and material specifications.
              </p>

              {submitted ? (
                <div className="py-8 text-center animate-hero-fade">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full grid place-items-center mx-auto text-emerald-600 mb-3">
                    <CheckCircle2 size={24} />
                  </div>
                  <h5 className="serif text-xl text-[#112239]">Dossier Dispatched</h5>
                  <p className="text-xs text-stone-500 mt-1.5 max-w-xs mx-auto">
                    The complete architectural floor plans have been sent to <span className="font-semibold text-stone-800">{email}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setModalOpen(false);
                    }}
                    className="btn !py-2.5 !px-5 text-xs mt-5"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) setSubmitted(true);
                  }}
                  className="mt-5 space-y-3"
                >
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-semibold mb-1">
                      Your Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="advisory@client.com"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-[#112239] focus:outline-none focus:border-[#b39062] focus:bg-white transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn w-full !py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download size={14} className="text-[#b39062]" />
                    <span>Download Dossier Now</span>
                  </button>
                  <p className="text-[10px] text-stone-400 text-center">
                    Confidential demonstration. Instant access.
                  </p>
                </form>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export function LocationSection({ property }: { property: Property }) {
  const travelDistances = [
    { landmark: 'Palm West Beach', time: '3 mins', icon: Waves, desc: 'Beach Club & Promenade' },
    { landmark: 'Dubai Marina', time: '10 mins', icon: Compass, desc: 'Yacht Club & Marina Mall' },
    { landmark: 'Downtown & Burj Khalifa', time: '20 mins', icon: Building2, desc: 'Opera & Business Bay' },
    { landmark: 'Dubai Int. Airport (DXB)', time: '25 mins', icon: Plane, desc: 'Terminals 1 & 3' },
  ];

  return (
    <div className="mt-10 sm:mt-14">
      <p className="eyebrow">Location & Connectivity</p>
      <h2 className="serif text-2xl sm:text-3xl mt-2 text-[#112239]">
        Connected to what matters.
      </h2>
      <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
        Situated in prestigious {property.place}, with direct access to prime arterial corridors and international transit gateways.
      </p>

      {/* Part A: Map Preview (Light/Warm Stone Theme) */}
      <div className="mt-5 relative overflow-hidden rounded-2xl border border-stone-200/80 bg-[#f4f1ea] h-64 sm:h-72 shadow-xs group">
        {/* Editorial Styled Vector Map */}
        <svg className="w-full h-full object-cover" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          {/* Water Body (Arabian Gulf) */}
          <path d="M 0 0 L 800 0 L 800 140 C 650 160 550 100 400 130 C 250 160 150 120 0 150 Z" fill="#dce7ed" />
          <path d="M 0 0 L 800 0 L 800 125 C 680 145 520 90 380 115 C 240 140 120 110 0 135 Z" fill="#e6eff4" opacity="0.6" />

          {/* Palm Fronds Silhouette */}
          <path d="M 400 130 C 400 60 410 40 400 20" stroke="#d5cfc2" strokeWidth="8" strokeLinecap="round" />
          <path d="M 360 40 Q 400 55 440 40 M 350 60 Q 400 75 450 60 M 340 80 Q 400 95 460 80 M 330 100 Q 400 115 470 100" stroke="#d5cfc2" strokeWidth="4" strokeLinecap="round" />

          {/* Main Arterial Highways */}
          <path d="M 0 240 Q 400 210 800 250" stroke="#e3ddcf" strokeWidth="12" />
          <path d="M 0 240 Q 400 210 800 250" stroke="#ffffff" strokeWidth="4" strokeDasharray="8 6" />
          <path d="M 0 320 Q 400 290 800 330" stroke="#e3ddcf" strokeWidth="16" />
          <path d="M 0 320 Q 400 290 800 330" stroke="#ffffff" strokeWidth="4" strokeDasharray="12 8" />

          {/* Connecting Streets */}
          <line x1="200" y1="140" x2="250" y2="400" stroke="#e8e2d5" strokeWidth="6" />
          <line x1="400" y1="130" x2="400" y2="400" stroke="#e8e2d5" strokeWidth="8" />
          <line x1="600" y1="140" x2="570" y2="400" stroke="#e8e2d5" strokeWidth="6" />

          {/* Editorial Map Labels */}
          <text x="50" y="70" fill="#7a92a3" fontSize="11" fontFamily="sans-serif" letterSpacing="3" fontWeight="600">ARABIAN GULF</text>
          <text x="620" y="315" fill="#8c8577" fontSize="10" fontFamily="sans-serif" letterSpacing="2" fontWeight="600">SHEIKH ZAYED ROAD (E11)</text>
          <text x="50" y="380" fill="#9e978a" fontSize="10" fontFamily="sans-serif" letterSpacing="2">PRIME UAE DISTRICT</text>
        </svg>

        {/* Custom Gold Property Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#b39062] opacity-40" />
            <div className="relative z-10 w-9 h-9 rounded-full bg-[#0B1528] border-2 border-[#b39062] flex items-center justify-center shadow-xl">
              <MapPin size={16} className="text-[#b39062]" />
            </div>
          </div>
          <div className="mt-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-stone-200/90 shadow-lg text-center whitespace-nowrap">
            <p className="text-[11px] font-semibold text-[#112239] uppercase tracking-wider">{property.name}</p>
            <p className="text-[9px] text-stone-500 uppercase tracking-widest">{property.place} · Dubai</p>
          </div>
        </div>

        {/* External Map Action */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.name} ${property.place} Dubai`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-stone-700 hover:text-[#0B1528] text-xs font-medium border border-stone-200 shadow-xs backdrop-blur-xs transition-all hover:shadow-sm"
          >
            <span>Google Maps</span>
            <ExternalLink size={12} className="text-stone-400" />
          </a>
        </div>
      </div>

      {/* Part B: Key Travel Distances (4-Column Minimal Stat Bar) */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {travelDistances.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.landmark}
              className="bg-white/90 border border-stone-200/80 rounded-xl p-3.5 sm:p-4 shadow-xs hover:border-[#b39062]/50 hover:bg-white transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon size={16} className="text-[#b39062] transition-transform duration-300 group-hover:scale-110" />
                <span className="serif text-base sm:text-lg font-medium text-[#112239]">
                  {item.time}
                </span>
              </div>
              <p className="text-xs font-semibold text-stone-800 line-clamp-1">
                {item.landmark}
              </p>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5 line-clamp-1">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PropertyEnquiryForm({
  propertyName,
  advisorName = 'Maya Rahman',
}: {
  propertyName: string;
  advisorName?: string;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Field-specific validation
  const validateField = (field: 'name' | 'email' | 'phone' | 'message', val: string) => {
    const trimmed = val.trim();
    if (field === 'name') {
      if (!trimmed) return 'Please enter your name';
      if (trimmed.length < 2) return 'Name must be at least 2 characters';
      return '';
    }
    if (field === 'email') {
      if (!trimmed) return 'Please enter your email address';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) return 'Please enter a valid email address';
      return '';
    }
    if (field === 'phone') {
      if (!trimmed) return 'Please enter your phone number';
      const digitsOnly = trimmed.replace(/\D/g, '');
      if (digitsOnly.length < 7) return 'Please enter a valid phone number (at least 7 digits)';
      return '';
    }
    return '';
  };

  const errors = {
    name: validateField('name', formData.name),
    email: validateField('email', formData.email),
    phone: validateField('phone', formData.phone),
    message: '',
  };

  const hasErrors = Boolean(errors.name || errors.email || errors.phone);

  const handleBlur = (field: 'name' | 'email' | 'phone' | 'message') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field: 'name' | 'email' | 'phone' | 'message', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
    });

    if (hasErrors) {
      const firstInvalidKey = (['name', 'email', 'phone'] as const).find((k) => errors[k]);
      if (firstInvalidKey) {
        const el = document.getElementById(`enquiry-${firstInvalidKey}`);
        el?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTouched({ name: false, email: false, phone: false, message: false });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="py-6 animate-hero-fade">
        <div className="w-12 h-12 rounded-full bg-[#b39062]/15 text-[#b39062] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={26} />
        </div>
        <div className="text-center">
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#b39062]">
            Viewing Request Received
          </span>
          <h3 className="serif text-2xl mt-1 text-[#112239] font-medium">
            Thank you, {formData.name.trim().split(' ')[0]}
          </h3>
          <p className="text-xs text-[#657080] mt-2 leading-relaxed">
            Our private advisor, {advisorName}, has received your viewing request for{' '}
            <strong className="text-[#112239] font-medium">{propertyName}</strong>.
          </p>
        </div>

        <div className="mt-5 p-3.5 bg-stone-50 border border-stone-200/80 rounded-xl text-left text-xs text-stone-600 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-stone-400 uppercase text-[10px] tracking-wider">Contact</span>
            <span className="font-medium text-[#112239]">{formData.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-400 uppercase text-[10px] tracking-wider">Email</span>
            <span className="font-medium text-[#112239]">{formData.email}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-stone-200/60">
            <span className="text-stone-400 uppercase text-[10px] tracking-wider">Response time</span>
            <span className="text-[#b39062] font-medium">Within 2 hours</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-5 w-full py-2.5 text-xs uppercase tracking-widest font-semibold text-stone-600 hover:text-[#112239] border border-stone-200 hover:border-stone-300 rounded-xl transition-colors cursor-pointer"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-3">
      {/* Name Field */}
      <div>
        <div className="relative">
          <input
            id="enquiry-name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={touched.name && errors.name ? 'enquiry-name-error' : undefined}
            placeholder="Your name"
            className={`field rounded-xl text-sm transition-all duration-200 ${
              touched.name && errors.name
                ? '!border-rose-400 !bg-rose-50/20 focus:!border-rose-500 focus:!ring-1 focus:!ring-rose-500'
                : touched.name && !errors.name && formData.name.trim()
                ? '!border-emerald-400/80 pr-9'
                : ''
            }`}
          />
          {touched.name && !errors.name && formData.name.trim() && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none">
              <Check size={14} />
            </span>
          )}
        </div>
        {touched.name && errors.name && (
          <p id="enquiry-name-error" className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1 pl-1" role="alert">
            <AlertCircle size={12} className="shrink-0" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <div className="relative">
          <input
            id="enquiry-email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={touched.email && !!errors.email}
            aria-describedby={touched.email && errors.email ? 'enquiry-email-error' : undefined}
            placeholder="Email address"
            className={`field rounded-xl text-sm transition-all duration-200 ${
              touched.email && errors.email
                ? '!border-rose-400 !bg-rose-50/20 focus:!border-rose-500 focus:!ring-1 focus:!ring-rose-500'
                : touched.email && !errors.email && formData.email.trim()
                ? '!border-emerald-400/80 pr-9'
                : ''
            }`}
          />
          {touched.email && !errors.email && formData.email.trim() && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none">
              <Check size={14} />
            </span>
          )}
        </div>
        {touched.email && errors.email && (
          <p id="enquiry-email-error" className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1 pl-1" role="alert">
            <AlertCircle size={12} className="shrink-0" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <div className="relative">
          <input
            id="enquiry-phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            aria-invalid={touched.phone && !!errors.phone}
            aria-describedby={touched.phone && errors.phone ? 'enquiry-phone-error' : undefined}
            placeholder="Phone number"
            className={`field rounded-xl text-sm transition-all duration-200 ${
              touched.phone && errors.phone
                ? '!border-rose-400 !bg-rose-50/20 focus:!border-rose-500 focus:!ring-1 focus:!ring-rose-500'
                : touched.phone && !errors.phone && formData.phone.trim()
                ? '!border-emerald-400/80 pr-9'
                : ''
            }`}
          />
          {touched.phone && !errors.phone && formData.phone.trim() && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none">
              <Check size={14} />
            </span>
          )}
        </div>
        {touched.phone && errors.phone && (
          <p id="enquiry-phone-error" className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1 pl-1" role="alert">
            <AlertCircle size={12} className="shrink-0" />
            <span>{errors.phone}</span>
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <textarea
          id="enquiry-message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Tell us what you’re looking for"
          className="field rounded-xl h-24 resize-none text-sm transition-all duration-200"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn group mt-1 rounded-xl cursor-pointer w-full flex items-center justify-center gap-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={15} className="animate-spin text-[#b39062]" />
            <span>Requesting viewing...</span>
          </>
        ) : (
          <>
            <span>Request a viewing</span>
            <CalendarDays size={15} className="transition-transform duration-200 group-hover:scale-110" />
          </>
        )}
      </button>
    </form>
  );
}
