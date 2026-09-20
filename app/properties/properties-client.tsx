'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowRight,
  ArrowUpDown,
  Check,
  ChevronDown,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { Footer, Navbar } from '@/components/site';
import { PropertyListingCard } from '@/components/property-listing-card';
import { FILTER_OPTIONS, matchesFilters, properties, type PurposeFilter } from '@/lib/properties';

const PURPOSES = ['All', ...FILTER_OPTIONS.purposes];
const CITIES = ['All', ...FILTER_OPTIONS.cities];
const TYPES = ['All', ...FILTER_OPTIONS.types];
const PRICES = ['All', ...FILTER_OPTIONS.prices];
const BEDS = ['All', ...FILTER_OPTIONS.beds];
const SORTS = ['Featured', 'Price: low to high', 'Price: high to low'];

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
  const [purpose, setPurpose] = useState<PurposeFilter>('All');
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

  // Lock body scroll while a mobile sheet is open
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

  // Close sheets on Escape
  useEffect(() => {
    if (!mobileFilterModalOpen && !mobileSortModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileFilterModalOpen(false);
        setMobileSortModalOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileFilterModalOpen, mobileSortModalOpen]);

  // Seed filters from the query string (links from the homepage search + locations)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const purposeParam = p.get('purpose');
    setPurpose(PURPOSES.includes(purposeParam ?? '') ? (purposeParam as PurposeFilter) : 'All');
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
        .filter(
          (p) =>
            matchesFilters(p, { purpose, city, type, price, beds }) &&
            `${p.name} ${p.place} ${p.type} ${p.description}`.toLowerCase().includes(query.toLowerCase())
        )
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
      if (tag.type) setType(type === tag.type ? 'All' : tag.type);
      if (tag.city) setCity(city === tag.city ? 'All' : tag.city);
      if (tag.purpose) setPurpose(purpose === tag.purpose ? 'All' : (tag.purpose as PurposeFilter));
      if (tag.query) setQuery(query.toLowerCase() === tag.query.toLowerCase() ? '' : tag.query);
    });
  };

  const gridKey = `${purpose}-${city}-${type}-${price}-${beds}-${sort}-${query}`;
  const countLabel = `${list.length} ${list.length === 1 ? 'property' : 'properties'}`;

  return (
    <>
      <Navbar />
      <main>
        {/* Page introduction */}
        <section className="pl-intro" aria-labelledby="collection-heading">
          <div className="shell pl-intro__grid">
            <div className="pl-intro__lead">
              <p className="eyebrow animate-hero-reveal">The Collection</p>
              <h1 id="collection-heading" className="pl-intro__title animate-hero-reveal delay-1">
                Properties worth <em>considering.</em>
              </h1>
            </div>
            <div className="pl-intro__aside animate-hero-reveal delay-2">
              <p className="pl-intro__copy">
                A considered selection of residences and spaces across the UAE.
              </p>
              <p className="pl-intro__meta">
                <span>Dubai · Abu Dhabi · Sharjah</span>
                <span className="pl-intro__dot" aria-hidden="true" />
                <span>Residential &amp; commercial</span>
              </p>
            </div>
          </div>
        </section>

        {/* Filters + collection */}
        <section className="shell pl-main" aria-label="Property collection">
          {/* Desktop toolbar */}
          <div className="pl-toolbar">
            <div className="pl-toolbar__row pl-toolbar__row--tabs">
              <div className="pl-tabs" role="group" aria-label="Purpose">
                {PURPOSES.map((x) => (
                  <button
                    key={x}
                    type="button"
                    aria-pressed={purpose === x}
                    onClick={() => triggerTransition(() => setPurpose(x as PurposeFilter))}
                    className={`pl-tab ${purpose === x ? 'pl-tab--active' : ''}`}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <p className="pl-toolbar__count" aria-live="polite">
                {countLabel}
              </p>
            </div>

            <div className="pl-toolbar__row pl-toolbar__row--fields">
              <div className="pl-search">
                <Search size={15} strokeWidth={1.75} className="pl-search__icon" aria-hidden="true" />
                <input
                  aria-label="Search properties"
                  className="pl-search__input"
                  placeholder="Search by name, area or type"
                  value={query}
                  onChange={(e) => triggerTransition(() => setQuery(e.target.value))}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => triggerTransition(() => setQuery(''))}
                    className="pl-search__clear"
                    aria-label="Clear search"
                  >
                    <X size={14} strokeWidth={1.75} aria-hidden="true" />
                  </button>
                )}
              </div>

              <div className="pl-selects">
                <Filter val={city} change={(v) => triggerTransition(() => setCity(v))} options={CITIES} label="Location" />
                <Filter val={type} change={(v) => triggerTransition(() => setType(v))} options={TYPES} label="Property type" />
                <Filter val={price} change={(v) => triggerTransition(() => setPrice(v))} options={PRICES} label="Price" />
                <Filter val={beds} change={(v) => triggerTransition(() => setBeds(v))} options={BEDS} label="Bedrooms" />
                <Filter val={sort} change={(v) => triggerTransition(() => setSort(v))} options={SORTS} label="Sort" sort />
              </div>

              <button
                type="button"
                onClick={() => setMobileFilterModalOpen(true)}
                className={`pl-filter-btn ${activeFilterCount > 0 ? 'pl-filter-btn--active' : ''}`}
                aria-haspopup="dialog"
              >
                <SlidersHorizontal size={14} strokeWidth={1.75} aria-hidden="true" />
                <span>Filter</span>
                {activeFilterCount > 0 && <span className="pl-badge">{activeFilterCount}</span>}
              </button>
            </div>

            <div className="pl-toolbar__row pl-toolbar__row--tags">
              <div className="pl-tags no-scrollbar">
                {quickTags.map((tag) => {
                  const isActive = isQuickTagActive(tag);
                  return (
                    <button
                      key={tag.label}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => handleQuickTagClick(tag)}
                      className={`pl-tag ${isActive ? 'pl-tag--active' : ''}`}
                    >
                      {tag.label}
                    </button>
                  );
                })}
              </div>
              {activeFilterCount > 0 && (
                <button type="button" onClick={reset} className="pl-reset">
                  <RotateCcw size={12} strokeWidth={1.75} aria-hidden="true" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Grid */}
          <div className={`filter-grid-wrapper pl-grid-wrap ${isTransitioning ? 'filter-grid-updating' : ''}`}>
            {list.length > 0 ? (
              <div className="pl-grid" key={gridKey}>
                {list.map((p, idx) => (
                  <div
                    key={p.slug}
                    className="property-card-enter"
                    style={{ animationDelay: `${Math.min(idx * 0.05, 0.3)}s` }}
                  >
                    <PropertyListingCard p={p} index={idx} priority={idx < 2} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="pl-empty" key={`${gridKey}-empty`} role="status">
                <p className="eyebrow">Nothing matches this brief</p>
                <h2 className="pl-empty__title">
                  The collection is deliberately <em>small.</em>
                </h2>
                <p className="pl-empty__copy">
                  No properties match the current filters. Broaden the search, or tell us what
                  you are looking for and we will keep it in mind as the collection evolves.
                </p>
                <div className="pl-empty__actions">
                  <button onClick={reset} type="button" className="btn">
                    <RotateCcw size={13} strokeWidth={1.75} aria-hidden="true" />
                    <span>Reset filters</span>
                  </button>
                  <Link href="/contact" className="btn-secondary">
                    <span>Speak with an advisor</span>
                    <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="pl-foot">
            <p className="pl-foot__note">Every property is presented on its own merits.</p>
            <Link href="/contact" className="btn-link">
              <span>Request a private viewing</span>
              <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Mobile floating filter / sort bar */}
        <div className="pl-dock" aria-label="Filter and sort">
          <button type="button" onClick={() => setMobileFilterModalOpen(true)} className="pl-dock__btn" aria-haspopup="dialog">
            <SlidersHorizontal size={13} strokeWidth={1.75} aria-hidden="true" />
            <span>Filter</span>
            {activeFilterCount > 0 && <span className="pl-badge pl-badge--on-dark">{activeFilterCount}</span>}
          </button>
          <span className="pl-dock__divider" aria-hidden="true" />
          <button type="button" onClick={() => setMobileSortModalOpen(true)} className="pl-dock__btn" aria-haspopup="dialog">
            <ArrowUpDown size={13} strokeWidth={1.75} aria-hidden="true" />
            <span>Sort</span>
          </button>
        </div>

        {/* Filter sheet */}
        {mounted &&
          mobileFilterModalOpen &&
          createPortal(
            <div className="pl-sheet-backdrop animate-fade-in" onClick={() => setMobileFilterModalOpen(false)}>
              <div
                className="pl-sheet"
                role="dialog"
                aria-modal="true"
                aria-labelledby="filter-sheet-title"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="pl-sheet__head">
                  <div className="pl-sheet__title-row">
                    <h2 id="filter-sheet-title" className="pl-sheet__title">Refine the collection</h2>
                    {activeFilterCount > 0 && <span className="pl-badge">{activeFilterCount}</span>}
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileFilterModalOpen(false)}
                    className="pl-sheet__close"
                    aria-label="Close filters"
                  >
                    <X size={18} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>

                <div className="pl-sheet__body">
                  <SheetGroup label="Purpose" options={PURPOSES} value={purpose} onChange={(v) => triggerTransition(() => setPurpose(v as PurposeFilter))} columns={4} />
                  <SheetGroup label="Location" options={CITIES} value={city} onChange={(v) => triggerTransition(() => setCity(v))} allLabel="All locations" />
                  <SheetGroup label="Property type" options={TYPES} value={type} onChange={(v) => triggerTransition(() => setType(v))} allLabel="All types" />
                  <SheetGroup label="Price range" options={PRICES} value={price} onChange={(v) => triggerTransition(() => setPrice(v))} allLabel="Any price" />
                  <SheetGroup label="Bedrooms" options={BEDS} value={beds} onChange={(v) => triggerTransition(() => setBeds(v))} allLabel="Any" columns={4} suffix=" beds" />
                </div>

                <div className="pl-sheet__foot">
                  <button type="button" onClick={reset} className="btn-secondary pl-sheet__reset">
                    <RotateCcw size={13} strokeWidth={1.75} aria-hidden="true" />
                    <span>Reset</span>
                  </button>
                  <button type="button" onClick={() => setMobileFilterModalOpen(false)} className="btn pl-sheet__apply">
                    <span>Show {countLabel}</span>
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}

        {/* Sort sheet */}
        {mounted &&
          mobileSortModalOpen &&
          createPortal(
            <div className="pl-sheet-backdrop animate-fade-in" onClick={() => setMobileSortModalOpen(false)}>
              <div
                className="pl-sheet pl-sheet--compact"
                role="dialog"
                aria-modal="true"
                aria-labelledby="sort-sheet-title"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="pl-sheet__head">
                  <h2 id="sort-sheet-title" className="pl-sheet__title">Sort</h2>
                  <button
                    type="button"
                    onClick={() => setMobileSortModalOpen(false)}
                    className="pl-sheet__close"
                    aria-label="Close sort"
                  >
                    <X size={18} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>
                <div className="pl-sheet__body pl-sheet__body--list">
                  {SORTS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={sort === opt}
                      onClick={() => {
                        triggerTransition(() => setSort(opt));
                        setMobileSortModalOpen(false);
                      }}
                      className={`pl-sort-option ${sort === opt ? 'pl-sort-option--active' : ''}`}
                    >
                      <span>{opt}</span>
                      {sort === opt && <Check size={15} strokeWidth={1.75} aria-hidden="true" />}
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
  sort = false,
}: {
  val: string;
  change: (x: string) => void;
  options: string[];
  label: string;
  sort?: boolean;
}) {
  const active = sort ? val !== 'Featured' : val !== 'All';
  return (
    <label className={`pl-select ${active ? 'pl-select--active' : ''}`}>
      <span className="pl-select__label">{label}</span>
      <span className="pl-select__control">
        <select className="pl-select__input" value={val} onChange={(e) => change(e.target.value)}>
          {options.map((x) => (
            <option key={x} value={x}>
              {x === 'All' ? `Any ${label.toLowerCase()}` : x}
            </option>
          ))}
        </select>
        <ChevronDown size={14} strokeWidth={1.5} className="pl-select__chevron" aria-hidden="true" />
      </span>
    </label>
  );
}

function SheetGroup({
  label,
  options,
  value,
  onChange,
  allLabel = 'All',
  columns = 2,
  suffix = '',
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  allLabel?: string;
  columns?: 2 | 4;
  suffix?: string;
}) {
  return (
    <fieldset className="pl-group">
      <legend className="pl-group__label">{label}</legend>
      <div className={`pl-group__options pl-group__options--${columns}`}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            aria-pressed={value === opt}
            onClick={() => onChange(opt)}
            className={`pl-option ${value === opt ? 'pl-option--active' : ''}`}
          >
            {opt === 'All' ? allLabel : `${opt}${suffix}`}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
