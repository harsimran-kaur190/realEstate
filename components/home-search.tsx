'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { SearchPanel } from '@/components/site';
import { PropertyListingCard } from '@/components/property-listing-card';
import {
  DEFAULT_FILTERS,
  PRICE_RANGES,
  filterProperties,
  isDefaultFilters,
  properties,
  type PropertyFilters,
} from '@/lib/properties';

/*
 * Homepage search — the search dock plus an in-page results section.
 *
 *  - `draft`   : what the dock's controls currently show.
 *  - `applied` : the criteria in force after the last Search click
 *                (null until the visitor searches for the first time).
 *
 * Results are derived from the shared dataset in lib/properties.ts with
 * the same matching rules the Properties page uses, so the two never drift.
 */

const INITIAL_DRAFT: PropertyFilters = { ...DEFAULT_FILTERS, purpose: 'Buy' };

function describe(f: PropertyFilters) {
  const parts: string[] = [];
  if (f.purpose !== 'All') parts.push(f.purpose);
  if (f.city !== 'All') parts.push(f.city);
  if (f.type !== 'All') parts.push(f.type === 'Office' ? 'Office' : `${f.type}s`);
  if (f.price !== 'All') parts.push(PRICE_RANGES.find((r) => r.id === f.price)?.label ?? f.price);
  if (f.beds !== 'All') parts.push(`${f.beds} bedrooms`);
  return parts;
}

export function HomeSearch() {
  const [draft, setDraft] = useState<PropertyFilters>(INITIAL_DRAFT);
  const [applied, setApplied] = useState<PropertyFilters | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);
  const scrollPending = useRef(false);

  const results = useMemo(() => (applied ? filterProperties(properties, applied) : []), [applied]);

  const transition = (action: () => void) => {
    setIsTransitioning(true);
    action();
    window.setTimeout(() => setIsTransitioning(false), 220);
  };

  const search = () => {
    scrollPending.current = true;
    transition(() => setApplied({ ...draft }));
  };

  // Clear every control and show the full collection.
  const clearFilters = () => {
    setDraft(DEFAULT_FILTERS);
    if (applied) transition(() => setApplied(DEFAULT_FILTERS));
  };

  // Bring the results into view after a search without jumping the page.
  useEffect(() => {
    if (!applied || !scrollPending.current || !resultsRef.current) return;
    scrollPending.current = false;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    resultsRef.current.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, [applied]);

  const count = results.length;
  const countLabel =
    count === 0
      ? 'No properties found'
      : `${String(count).padStart(2, '0')} ${count === 1 ? 'property' : 'properties'} found`;
  const criteria = applied ? describe(applied) : [];
  const resultsKey = applied ? Object.values(applied).join('|') : 'none';

  return (
    <>
      <section className="search-premium-section">
        <div className="shell">
          <SearchPanel filters={draft} onChange={setDraft} onSearch={search} onReset={clearFilters} />
        </div>
      </section>

      {applied && (
        <section
          ref={resultsRef}
          id="search-results"
          className="hs-results"
          aria-labelledby="search-results-heading"
          tabIndex={-1}
        >
          <div className="shell">
            <header className="hs-results__head">
              <div className="hs-results__lead">
                <p className="eyebrow">Property Results</p>
                <h2 id="search-results-heading" className="hs-results__title" aria-live="polite" aria-atomic="true">
                  {countLabel}
                </h2>
              </div>

              <div className="hs-results__aside">
                <p className="hs-results__criteria">
                  {criteria.length > 0 ? (
                    criteria.map((c, i) => (
                      <span key={c} className="hs-results__criterion">
                        {i > 0 && <span className="hs-results__dot" aria-hidden="true" />}
                        {c}
                      </span>
                    ))
                  ) : (
                    <span className="hs-results__criterion">Full collection</span>
                  )}
                </p>
                {!isDefaultFilters(applied) && (
                  <button type="button" onClick={clearFilters} className="hs-results__clear">
                    <RotateCcw size={12} strokeWidth={1.75} aria-hidden="true" />
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>
            </header>

            <div className={`hs-results__body ${isTransitioning ? 'filter-grid-updating' : ''}`}>
              {count > 0 ? (
                <div className="pl-grid hs-grid" key={resultsKey}>
                  {results.map((p, idx) => (
                    <div
                      key={p.slug}
                      className="property-card-enter"
                      style={{ animationDelay: `${Math.min(idx * 0.05, 0.3)}s` }}
                    >
                      <PropertyListingCard p={p} index={idx} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pl-empty hs-empty" key={`${resultsKey}-empty`} role="status">
                  <p className="eyebrow">Nothing matches this brief</p>
                  <h3 className="pl-empty__title">
                    No properties match your <em>current criteria.</em>
                  </h3>
                  <p className="pl-empty__copy">
                    Broaden the search, or tell us what you are looking for and we will keep it in mind
                    as the collection evolves.
                  </p>
                  <div className="pl-empty__actions">
                    <button onClick={clearFilters} type="button" className="btn">
                      <RotateCcw size={13} strokeWidth={1.75} aria-hidden="true" />
                      <span>Clear Filters</span>
                    </button>
                    <Link href="/contact" className="btn-secondary">
                      <span>Speak with an advisor</span>
                      <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {count > 0 && (
              <div className="hs-results__foot">
                <span className="hs-results__note">Full portfolio</span>
                <Link href="/properties" className="btn-link">
                  <span>View All Properties</span>
                  <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
