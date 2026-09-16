'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { Footer, Navbar, PropertyCard } from '@/components/site';
import { properties } from '@/lib/properties';

const quickTags = [
  { id: 'all', label: 'All' },
  { id: 'villas', label: 'Villas', type: 'Villa' },
  { id: 'apartments', label: 'Apartments', type: 'Apartment' },
  { id: 'penthouses', label: 'Penthouses', query: 'Penthouse' },
  { id: 'palm', label: 'Palm Jumeirah', query: 'Palm Jumeirah' },
  { id: 'downtown', label: 'Downtown', query: 'Downtown' },
  { id: 'dubai', label: 'Dubai', city: 'Dubai' },
  { id: 'abudhabi', label: 'Abu Dhabi', city: 'Abu Dhabi' },
  { id: 'buy', label: 'Buy', purpose: 'Buy' },
  { id: 'rent', label: 'Rent', purpose: 'Rent' },
];

export default function PropertiesClient() {
  const [purpose, setPurpose] = useState('All');
  const [city, setCity] = useState('All');
  const [type, setType] = useState('All');
  const [price, setPrice] = useState('All');
  const [beds, setBeds] = useState('All');
  const [sort, setSort] = useState('Featured');
  const [query, setQuery] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileFilterModalOpen, setMobileFilterModalOpen] = useState(false);
  const [mobileSortModalOpen, setMobileSortModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile modals are active
  useEffect(() => {
    if (mobileFilterModalOpen || mobileSortModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileFilterModalOpen, mobileSortModalOpen]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setPurpose(p.get('purpose') || 'All');
    setCity(p.get('city') || 'All');
    setType(p.get('type') || 'All');
    setPrice(p.get('price') || 'All');
    setBeds(p.get('beds') || 'All');
  }, []);

  const triggerTransition = (action: () => void) => {
    setIsTransitioning(true);
    action();
    setTimeout(() => setIsTransitioning(false), 220);
  };

  const list = useMemo(
    () =>
      properties
        .filter((p) => {
          const priceOk =
            price === 'All' ||
            (price === 'Under 1m' && p.price < 1000000) ||
            (price === '1m–5m' && p.price >= 1000000 && p.price <= 5000000) ||
            (price === '5m+' && p.price > 5000000);
          const bedOk = beds === 'All' || p.beds >= Number(beds[0]);
          return (
            (purpose === 'All' || p.purpose === purpose) &&
            (city === 'All' || p.city === city) &&
            (type === 'All' || p.type === type) &&
            priceOk &&
            bedOk &&
            `${p.name} ${p.place} ${p.type} ${p.description}`.toLowerCase().includes(query.toLowerCase())
          );
        })
        .sort((a, b) =>
          sort === 'Price: low to high'
            ? a.price - b.price
            : sort === 'Price: high to low'
            ? b.price - a.price
            : sort === 'Featured'
            ? (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.price - a.price
            : a.name.localeCompare(b.name)
        ),
    [purpose, city, type, price, beds, sort, query]
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (purpose !== 'All') count++;
    if (city !== 'All') count++;
    if (type !== 'All') count++;
    if (price !== 'All') count++;
    if (beds !== 'All') count++;
    if (sort !== 'Featured') count++;
    if (query.trim() !== '') count++;
    return count;
  }, [purpose, city, type, price, beds, sort, query]);

  const reset = () => {
    triggerTransition(() => {
      setPurpose('All');
      setCity('All');
      setType('All');
      setPrice('All');
      setBeds('All');
      setQuery('');
      setSort('Featured');
    });
  };

  const isQuickTagActive = (tag: (typeof quickTags)[number]) => {
    if (tag.id === 'all') {
      return (
        purpose === 'All' &&
        city === 'All' &&
        type === 'All' &&
        price === 'All' &&
        beds === 'All' &&
        !query
      );
    }
    if (tag.type && type === tag.type) return true;
    if (tag.city && city === tag.city) return true;
    if (tag.purpose && purpose === tag.purpose) return true;
    if (tag.query && query.toLowerCase() === tag.query.toLowerCase()) return true;
    return false;
  };

  const handleQuickTagClick = (tag: (typeof quickTags)[number]) => {
    triggerTransition(() => {
      if (tag.id === 'all') {
        reset();
        return;
      }
      if (tag.type) {
        setType(type === tag.type ? 'All' : tag.type);
      }
      if (tag.city) {
        setCity(city === tag.city ? 'All' : tag.city);
      }
      if (tag.purpose) {
        setPurpose(purpose === tag.purpose ? 'All' : tag.purpose);
      }
      if (tag.query) {
        setQuery(query.toLowerCase() === tag.query.toLowerCase() ? '' : tag.query);
      }
    });
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Header Hero - Full-bleed 50/50 split matching About page */}
        <section className="grid md:grid-cols-2 min-h-[420px] lg:min-h-[480px] border-b border-[#20344d] w-full max-w-full overflow-hidden">
          <div className="bg-[#112239] text-white p-6 sm:p-8 md:p-14 lg:p-20 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d6b98f] font-semibold animate-hero-fade">
              <span className="w-1.5 h-1.5 bg-[#d6b98f] rounded-full inline-block" />
              <span>Our collection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4 animate-hero-fade delay-1 serif leading-[1.15]">
              Properties with presence.
            </h1>
            <p className="text-[#c3ccd5] leading-7 mt-5 max-w-lg text-sm sm:text-base animate-hero-fade delay-2">
              An edited selection of homes and workplaces across the UAE’s most sought-after neighbourhoods.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 mt-8 border-t border-white/10 text-xs animate-hero-fade delay-3">
              <div>
                <strong className="block text-white font-medium text-sm">AED 4.8B+</strong>
                <span className="text-[#93a1b2] text-[11px] uppercase tracking-wider">Curated Value</span>
              </div>
              <div>
                <strong className="block text-white font-medium text-sm">100% Verified</strong>
                <span className="text-[#93a1b2] text-[11px] uppercase tracking-wider">RERA Compliant</span>
              </div>
              <div>
                <strong className="block text-white font-medium text-sm">Prime UAE</strong>
                <span className="text-[#93a1b2] text-[11px] uppercase tracking-wider">Waterfront & City</span>
              </div>
            </div>
          </div>
          <div className="overflow-hidden bg-[#112239] relative min-h-[300px] md:min-h-full">
            <img
              className="absolute inset-0 w-full h-full object-cover animate-hero-fade"
              src="/images/collection-uae-hero.jpg"
              alt="Curated UAE luxury properties"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-[#112239]/20 pointer-events-none" />
          </div>
        </section>

        {/* Filter & Collection Panel */}
        <section className="shell pt-6 pb-24 md:pb-16">
          <div className="border border-[#E6E1DA] bg-white p-4 md:p-7 shadow-xs w-full max-w-full rounded-2xl">
            {/* Desktop Category Tabs */}
            <div className="hidden md:flex gap-6 border-b border-[#E6E1DA] mb-5 overflow-auto">
              {['All', 'Buy', 'Rent', 'Commercial'].map((x) => (
                <button
                  onClick={() => triggerTransition(() => setPurpose(x))}
                  key={x}
                  type="button"
                  className={`pb-3 uppercase text-xs tracking-[.14em] shrink-0 font-medium transition-all duration-200 cursor-pointer ${
                    purpose === x
                      ? 'border-b-2 border-[#b39062] text-[#112239] font-semibold'
                      : 'text-[#657080] hover:text-[#112239]'
                  }`}
                >
                  {x}
                </button>
              ))}
            </div>

            {/* Mobile Filter UI (Spacious Search + Filter Modal Trigger + Clean Quick Tags) */}
            <div className="md:hidden space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a959f] pointer-events-none"
                    size={16}
                  />
                  <input
                    aria-label="Search properties"
                    className="w-full bg-[#faf9f6] border border-[#E6E1DA] h-11 pl-10 pr-9 text-xs sm:text-sm text-[#112239] placeholder:text-[#8a959f] focus:outline-none focus:border-[#b39062] focus:ring-1 focus:ring-[#b39062] transition-colors rounded-xl"
                    placeholder="Search properties..."
                    value={query}
                    onChange={(e) => triggerTransition(() => setQuery(e.target.value))}
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => triggerTransition(() => setQuery(''))}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a959f] hover:text-[#112239] p-1 cursor-pointer"
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setMobileFilterModalOpen(true)}
                  className={`h-11 px-3.5 border rounded-xl text-xs uppercase tracking-[0.12em] font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                    activeFilterCount > 0
                      ? 'bg-[#112239] text-white border-[#112239] shadow-sm'
                      : 'bg-white text-[#112239] border-[#E6E1DA] hover:border-[#b39062]'
                  }`}
                >
                  <SlidersHorizontal
                    size={14}
                    className={activeFilterCount > 0 ? 'text-[#d6b98f]' : 'text-[#b39062]'}
                  />
                  <span>Filter</span>
                  {activeFilterCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#b39062] text-white text-[9px] font-bold grid place-items-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Horizontal Scrollable Row of Quick Filter Tags (No clipping, smooth scroll) */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 w-full">
                {quickTags.map((tag) => {
                  const isActive = isQuickTagActive(tag);
                  return (
                    <button
                      key={tag.label}
                      type="button"
                      onClick={() => handleQuickTagClick(tag)}
                      className={`shrink-0 px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#112239] text-white border-[#112239] shadow-xs'
                          : 'bg-[#faf9f6] text-[#657080] border-[#E6E1DA] hover:border-[#b39062] hover:text-[#112239]'
                      }`}
                    >
                      {tag.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop Filters (Always visible on md+) */}
            <div className="hidden md:block">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[.14em] text-[#657080] mb-3 font-semibold">
                <SlidersHorizontal size={14} className="text-[#b39062]" /> Refine your collection
              </div>

              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="relative">
                  <Search
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a959f] pointer-events-none"
                    size={15}
                  />
                  <input
                    aria-label="Search properties"
                    className="w-full bg-white border border-[#E6E1DA] h-[48px] pl-10 pr-4 py-2.5 text-sm text-[#112239] placeholder:text-[#8a959f] focus:outline-none focus:border-[#b39062] focus:ring-1 focus:ring-[#b39062] transition-colors rounded-[2px]"
                    placeholder="Search properties..."
                    value={query}
                    onChange={(e) => triggerTransition(() => setQuery(e.target.value))}
                  />
                </div>
                <Filter
                  val={city}
                  change={(v) => triggerTransition(() => setCity(v))}
                  options={['All', 'Dubai', 'Abu Dhabi', 'Sharjah']}
                  label="Location"
                />
                <Filter
                  val={type}
                  change={(v) => triggerTransition(() => setType(v))}
                  options={['All', 'Villa', 'Apartment', 'Office']}
                  label="Property type"
                />
                <Filter
                  val={price}
                  change={(v) => triggerTransition(() => setPrice(v))}
                  options={['All', 'Under 1m', '1m–5m', '5m+']}
                  label="Price"
                />
                <Filter
                  val={beds}
                  change={(v) => triggerTransition(() => setBeds(v))}
                  options={['All', '2+', '3+', '4+']}
                  label="Bedrooms"
                />
                <Filter
                  val={sort}
                  change={(v) => triggerTransition(() => setSort(v))}
                  options={['Featured', 'Price: low to high', 'Price: high to low']}
                  label="Sort"
                />
              </div>

              <button
                onClick={reset}
                type="button"
                className="mt-4 text-xs uppercase tracking-[.12em] text-[#657080] hover:text-[#112239] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={12} />
                <span className="underline underline-offset-4">Reset all filters</span>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 mb-5">
            <p className="text-sm text-[#657080]">
              Showing <span className="font-semibold text-[#112239]">{list.length}</span> exceptional properties
            </p>
            <p className="text-xs uppercase tracking-[.14em] text-[#8e98a5]">UAE Curated Portfolio</p>
          </div>

          {/* Smooth animated property grid */}
          <div className={`filter-grid-wrapper ${isTransitioning ? 'filter-grid-updating' : ''}`}>
            <div
              className="grid-3"
              key={`${purpose}-${city}-${type}-${price}-${beds}-${sort}-${query}`}
            >
              {list.map((p, idx) => (
                <div
                  key={p.slug}
                  className="property-card-enter"
                  style={{ animationDelay: `${Math.min(idx * 0.04, 0.24)}s` }}
                >
                  <PropertyCard p={p} index={idx} reveal={false} />
                </div>
              ))}
            </div>
          </div>

          {!list.length && (
            <div className="text-center py-20 text-[#657080] bg-white border border-[#E6E1DA] mt-4">
              <p className="serif text-2xl text-[#112239]">No properties match these criteria.</p>
              <p className="text-sm mt-2 text-[#657080]">
                Try adjusting your filters or resetting to view the full collection.
              </p>
              <button onClick={reset} type="button" className="btn btn-outline mt-6">
                Reset all filters
              </button>
            </div>
          )}
        </section>

        {/* Sticky Mobile Filter & Sort Bar */}
        <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-40 md:hidden flex items-center bg-[#112239]/95 backdrop-blur-md text-white px-2 py-1.5 rounded-full shadow-2xl border border-white/15 max-w-[calc(100vw-2rem)]">
          <button
            type="button"
            onClick={() => setMobileFilterModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] font-semibold text-white hover:text-[#d6b98f] transition-colors cursor-pointer"
          >
            <SlidersHorizontal size={13} className="text-[#b39062]" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#b39062] text-white text-[9px] font-bold grid place-items-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          <span className="w-px h-4 bg-white/20" />
          <button
            type="button"
            onClick={() => setMobileSortModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] font-semibold text-white hover:text-[#d6b98f] transition-colors cursor-pointer"
          >
            <ArrowUpDown size={13} className="text-[#b39062]" />
            <span>Sort</span>
          </button>
        </div>

        {/* Mobile Filter Sheet Modal */}
        {mounted &&
          mobileFilterModalOpen &&
          createPortal(
            <div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center md:hidden w-full max-w-[100vw] overflow-x-hidden animate-fade-in"
              onClick={() => setMobileFilterModalOpen(false)}
            >
              <div
                className="bg-white w-full max-w-lg rounded-t-3xl border-t border-[#E6E1DA] shadow-2xl animate-card-entrance flex flex-col max-h-[88vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#E6E1DA] shrink-0 bg-white">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-[#b39062]" />
                    <h3 className="serif text-xl text-[#112239]">Filter Properties</h3>
                    {activeFilterCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-[#112239] text-[#d6b98f] text-[10px] font-bold grid place-items-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {activeFilterCount > 0 && (
                      <button
                        type="button"
                        onClick={reset}
                        className="text-xs text-[#657080] hover:text-[#112239] underline underline-offset-2 cursor-pointer font-medium"
                      >
                        Clear all
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setMobileFilterModalOpen(false)}
                      className="p-1.5 text-[#657080] hover:text-[#112239] rounded-lg hover:bg-black/5 cursor-pointer"
                      aria-label="Close filter modal"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Scrollable Filters Content */}
                <div className="overflow-y-auto px-5 py-4 space-y-5 flex-1">
                  {/* Purpose / Status */}
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-[#657080] font-semibold mb-2">
                      Purpose
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {['All', 'Buy', 'Rent', 'Commercial'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => triggerTransition(() => setPurpose(opt))}
                          className={`py-2 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                            purpose === opt
                              ? 'bg-[#112239] text-white border-[#112239] shadow-xs'
                              : 'bg-[#faf9f6] text-[#657080] border-[#E6E1DA] hover:border-[#b39062]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-[#657080] font-semibold mb-2">
                      Location
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {['All', 'Dubai', 'Abu Dhabi', 'Sharjah'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => triggerTransition(() => setCity(opt))}
                          className={`py-2.5 px-3 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                            city === opt
                              ? 'bg-[#112239] text-white border-[#112239] shadow-xs'
                              : 'bg-[#faf9f6] text-[#657080] border-[#E6E1DA] hover:border-[#b39062]'
                          }`}
                        >
                          {opt === 'All' ? 'All Locations' : opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-[#657080] font-semibold mb-2">
                      Property Type
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {['All', 'Villa', 'Apartment', 'Office'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => triggerTransition(() => setType(opt))}
                          className={`py-2.5 px-3 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                            type === opt
                              ? 'bg-[#112239] text-white border-[#112239] shadow-xs'
                              : 'bg-[#faf9f6] text-[#657080] border-[#E6E1DA] hover:border-[#b39062]'
                          }`}
                        >
                          {opt === 'All' ? 'All Types' : opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-[#657080] font-semibold mb-2">
                      Price Range
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {['All', 'Under 1m', '1m–5m', '5m+'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => triggerTransition(() => setPrice(opt))}
                          className={`py-2.5 px-3 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                            price === opt
                              ? 'bg-[#112239] text-white border-[#112239] shadow-xs'
                              : 'bg-[#faf9f6] text-[#657080] border-[#E6E1DA] hover:border-[#b39062]'
                          }`}
                        >
                          {opt === 'All' ? 'Any Price' : opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-[#657080] font-semibold mb-2">
                      Bedrooms
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {['All', '2+', '3+', '4+'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => triggerTransition(() => setBeds(opt))}
                          className={`py-2 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                            beds === opt
                              ? 'bg-[#112239] text-white border-[#112239] shadow-xs'
                              : 'bg-[#faf9f6] text-[#657080] border-[#E6E1DA] hover:border-[#b39062]'
                          }`}
                        >
                          {opt === 'All' ? 'Any' : `${opt} Beds`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sticky Footer */}
                <div className="p-4 border-t border-[#E6E1DA] bg-white shrink-0 flex items-center gap-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
                  <button
                    type="button"
                    onClick={reset}
                    className="px-4 py-3 border border-[#E6E1DA] text-xs font-semibold uppercase tracking-[0.12em] text-[#657080] hover:text-[#112239] rounded-xl flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <RotateCcw size={13} />
                    <span>Reset</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileFilterModalOpen(false)}
                    className="flex-1 py-3 px-4 bg-[#112239] hover:bg-[#1a3354] text-white text-xs font-semibold uppercase tracking-[0.14em] rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>
                      Show {list.length} {list.length === 1 ? 'Property' : 'Properties'}
                    </span>
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}

        {/* Mobile Sort Sheet Modal */}
        {mounted &&
          mobileSortModalOpen &&
          createPortal(
            <div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center md:hidden w-full max-w-[100vw] overflow-x-hidden animate-fade-in"
              onClick={() => setMobileSortModalOpen(false)}
            >
              <div
                className="bg-white w-full max-w-lg rounded-t-3xl p-6 border-t border-[#E6E1DA] shadow-2xl animate-card-entrance overflow-hidden pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#E6E1DA]">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown size={16} className="text-[#b39062]" />
                    <h3 className="serif text-xl text-[#112239]">Sort Properties</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileSortModalOpen(false)}
                    className="p-1.5 text-[#657080] hover:text-[#112239] rounded-lg hover:bg-black/5 cursor-pointer"
                    aria-label="Close sort modal"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="py-3 space-y-1.5">
                  {['Featured', 'Price: low to high', 'Price: high to low'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        triggerTransition(() => setSort(opt));
                        setMobileSortModalOpen(false);
                      }}
                      className={`w-full text-left py-3 px-3.5 flex items-center justify-between text-sm transition-all cursor-pointer rounded-xl ${
                        sort === opt
                          ? 'bg-[#112239] text-white font-medium shadow-xs'
                          : 'text-[#657080] hover:bg-black/5'
                      }`}
                    >
                      <span>{opt}</span>
                      {sort === opt && <Check size={16} className="text-[#d6b98f]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>,
            document.body
          )}
      </main>
      <Footer />
    </>
  );
}

function Filter({
  val,
  change,
  options,
  label,
}: {
  val: string;
  change: (x: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        className="w-full appearance-none bg-white border border-[#E6E1DA] h-[48px] pl-3.5 pr-8 py-2.5 text-xs sm:text-sm text-[#112239] focus:outline-none focus:border-[#b39062] focus:ring-1 focus:ring-[#b39062] transition-colors rounded-[2px] cursor-pointer"
        value={val}
        onChange={(e) => change(e.target.value)}
      >
        {options.map((x) => (
          <option key={x} value={x}>
            {x === 'All' ? `Any ${label.toLowerCase()}` : x}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8a959f]"
      />
    </div>
  );
}

