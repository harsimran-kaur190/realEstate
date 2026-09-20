'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Loader2,
  MessageSquare,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import { FILTER_OPTIONS, type PropertyFilters } from '@/lib/properties';

const NAV_ITEMS = [
  { name: 'Properties', href: '/properties' },
  { name: 'Services', href: '/services' },
  { name: 'Locations', href: '/#locations' },
  { name: 'Approach', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

function isNavItemActive(href: string, pathname: string) {
  if (href.startsWith('/#')) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar({ transparentOverHero = false }: { transparentOverHero?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock page scroll and move focus into the menu while it is open
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  // Escape closes; Tab is kept inside the menu
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== 'Tab' || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isTransparent = transparentOverHero && !scrolled;

  const headerClass = [
    'site-nav',
    transparentOverHero ? 'site-nav-fixed' : '',
    scrolled ? 'site-nav-scrolled' : '',
    isTransparent ? 'site-nav-over-hero' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className="shell site-nav__inner">
          {/* Wordmark */}
          <Link href="/" className="brand" aria-label="Altiere Estates — Home">
            <span className="brand__name">Altiere</span>
            <span className="brand__descriptor">Estates · Dubai</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="nav-links" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = isNavItemActive(item.href, pathname);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-link"
                  aria-current={active ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="nav-actions">
            <Link href="/contact" className="nav-quiet-link">
              List Your Property
            </Link>
            <Link href="/contact" className="nav-cta-btn" aria-label="Schedule a private viewing">
              <span>Private Viewing</span>
              <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle__bar" aria-hidden="true" />
            <span className="nav-toggle__bar" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile navigation — always mounted so it can animate open and closed */}
      {mounted &&
        createPortal(
          <div
            ref={menuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            aria-hidden={!open}
            inert={!open}
            data-state={open ? 'open' : 'closed'}
            className="mobile-menu"
          >
            <div className="shell mobile-menu__bar site-nav__inner">
              <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="Altiere Estates — Home">
                <span className="brand__name">Altiere</span>
                <span className="brand__descriptor">Estates · Dubai</span>
              </Link>
              <button
                ref={closeRef}
                type="button"
                className="mobile-menu__close"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <div className="shell mobile-menu__body">
              <p className="eyebrow">Menu</p>
              <nav className="mobile-menu__list" aria-label="Primary (mobile)">
                {NAV_ITEMS.map((item, idx) => {
                  const active = isNavItemActive(item.href, pathname);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="mobile-menu__link"
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className="mobile-menu__index" aria-hidden="true">
                        0{idx + 1}
                      </span>
                      <span className="mobile-menu__label">{item.name}</span>
                      <ArrowRight size={16} strokeWidth={1.5} className="mobile-menu__arrow" aria-hidden="true" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="shell mobile-menu__foot">
              <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-block">
                <span>Private Viewing</span>
                <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
              </Link>
              <div className="mobile-menu__meta">
                <span>Dubai · Abu Dhabi · Advisory</span>
                <a href="tel:+97145550182">+971 4 555 0182</a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ft on-dark">
      <div className="shell ft__grid">
        <div className="ft__brand">
          <Link href="/" className="brand ft__wordmark" aria-label="Altiere Estates — Home">
            <span className="brand__name">Altiere</span>
            <span className="brand__descriptor">Estates · Dubai</span>
          </Link>
          <p className="ft__blurb">
            A boutique UAE property advisory. This site is an independent design and development
            demonstration for a fictional brand.
          </p>
        </div>

        <FooterColumn
          title="Properties"
          items={[
            ['Buy', '/properties?purpose=Buy'],
            ['Rent', '/properties?purpose=Rent'],
            ['Commercial', '/properties?purpose=Commercial'],
            ['The Collection', '/properties'],
          ]}
        />
        <FooterColumn
          title="Services"
          items={[
            ['Acquisition', '/services#service-01'],
            ['Private Viewings', '/services#service-02'],
            ['Advisory', '/services#service-03'],
            ['Property Management', '/services#service-04'],
          ]}
        />
        <div className="ft__col">
          <p className="ft__title">Contact</p>
          <address className="ft__address">
            Al Saqr Business Tower
            <br />
            Sheikh Zayed Road, Dubai
            <br />
            <a href="tel:+97145550182" className="ft__link">+971 4 555 0182</a>
          </address>
          <Link href="/contact" className="btn-link ft__cta">
            <span>Private Viewing</span>
            <ArrowRight size={12} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="shell ft__bottom">
        <span>© {year} Altiere Estates. Demonstration website.</span>
        <nav className="ft__legal" aria-label="Secondary">
          <Link href="/about" className="ft__link">Approach</Link>
          <Link href="/contact" className="ft__link">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div className="ft__col">
      <p className="ft__title">{title}</p>
      <ul className="ft__list">
        {items.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="ft__link">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SearchPanel({
  filters,
  onChange,
  onSearch,
  onReset,
}: {
  filters: PropertyFilters;
  onChange: (next: PropertyFilters) => void;
  onSearch: () => void;
  onReset: () => void;
}) {
  const { purpose, city, type, price, beds } = filters;
  const set = (patch: Partial<PropertyFilters>) => onChange({ ...filters, ...patch });

  const hasActiveFilters =
    city !== 'All' || type !== 'All' || price !== 'All' || beds !== 'All' || purpose !== 'All';

  return (
    <form
      className="search-dock"
      role="search"
      aria-label="Search the collection"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      {/* Purpose tabs */}
      <div className="search-dock__head">
        <div className="search-dock__tabs" role="group" aria-label="Purpose">
          {FILTER_OPTIONS.purposes.map((x) => (
            <button
              type="button"
              key={x}
              aria-pressed={purpose === x}
              onClick={() => set({ purpose: purpose === x ? 'All' : x })}
              className={`search-dock__tab ${purpose === x ? 'search-dock__tab--active' : ''}`}
            >
              {x}
            </button>
          ))}
        </div>

        {hasActiveFilters ? (
          <button type="button" onClick={onReset} className="search-dock__reset" title="Reset all filters">
            <RotateCcw size={12} aria-hidden="true" />
            <span>Reset filters</span>
          </button>
        ) : (
          <p className="search-dock__scope">
            <span className="search-dock__scope-dot" aria-hidden="true" />
            <span>UAE Curated Portfolio</span>
          </p>
        )}
      </div>

      {/* Filters + search */}
      <div className="search-dock__fields">
        <SearchField
          label="Location"
          value={city}
          set={(v) => set({ city: v })}
          options={['All', ...FILTER_OPTIONS.cities]}
          defaultLabel="Any location"
        />
        <SearchField
          label="Property Type"
          value={type}
          set={(v) => set({ type: v })}
          options={['All', ...FILTER_OPTIONS.types]}
          defaultLabel="Any type"
        />
        <SearchField
          label="Price Range"
          value={price}
          set={(v) => set({ price: v })}
          options={['All', ...FILTER_OPTIONS.prices]}
          defaultLabel="Any price"
        />
        <SearchField
          label="Bedrooms"
          value={beds}
          set={(v) => set({ beds: v })}
          options={['All', ...FILTER_OPTIONS.beds]}
          defaultLabel="Any bedrooms"
        />

        <button type="submit" className="btn search-dock__submit">
          <Search size={14} strokeWidth={1.75} aria-hidden="true" />
          <span>Search</span>
        </button>
      </div>
    </form>
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
      className="search-dock__field"
    >
      <span className="search-dock__label">{label}</span>
      <div className="search-dock__control">
        <select
          ref={selectRef}
          aria-label={label}
          value={value}
          onChange={(e) => set(e.target.value)}
          className="search-dock__select"
        >
          {options.map((x) => (
            <option key={x} value={x}>
              {x === 'All' ? defaultLabel : x}
            </option>
          ))}
        </select>
        <ChevronDown size={14} strokeWidth={1.5} className="search-dock__chevron" aria-hidden="true" />
      </div>
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

export function FloatingContactButton() {
  const pathname = usePathname();

  // Hidden where the page already carries its own primary contact action:
  // the contact page itself, and the property routes whose fixed bottom
  // bars (filter dock, viewing bar) would otherwise overlap this button.
  if (
    pathname === '/contact' ||
    pathname?.startsWith('/contact/') ||
    pathname === '/properties' ||
    pathname?.startsWith('/properties/')
  ) {
    return null;
  }

  return (
    <Link href="/contact" aria-label="Contact Us" title="Contact Us" className="floating-contact">
      <MessageSquare size={16} strokeWidth={1.75} aria-hidden="true" />
      <span className="floating-contact__label">Contact Us</span>
    </Link>
  );
}

export function PropertyEnquiryForm({
  propertyName,
}: {
  propertyName: string;
}) {
  type FieldKey = 'name' | 'email' | 'phone' | 'message';

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, phone: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (field: FieldKey, val: string) => {
    const trimmed = val.trim();
    if (field === 'name') {
      if (!trimmed) return 'Please enter your name';
      if (trimmed.length < 2) return 'Name must be at least 2 characters';
      return '';
    }
    if (field === 'email') {
      if (!trimmed) return 'Please enter your email address';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Please enter a valid email address';
      return '';
    }
    if (field === 'phone') {
      if (!trimmed) return 'Please enter your phone number';
      if (trimmed.replace(/\D/g, '').length < 7) return 'Please enter a valid phone number';
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

  const handleBlur = (field: FieldKey) => setTouched((prev) => ({ ...prev, [field]: true }));
  const handleChange = (field: FieldKey, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });

    if (hasErrors) {
      const firstInvalidKey = (['name', 'email', 'phone'] as const).find((k) => errors[k]);
      if (firstInvalidKey) document.getElementById(`enquiry-${firstInvalidKey}`)?.focus();
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
      <div className="form-success form-success--compact" role="status">
        <span className="form-success__icon" aria-hidden="true">
          <CheckCircle2 size={22} strokeWidth={1.5} />
        </span>
        <p className="form-success__eyebrow">Viewing request received</p>
        <h3 className="form-success__title">Thank you, {formData.name.trim().split(' ')[0]}</h3>
        <p className="form-success__copy">
          Our advisory team has received your viewing request for{' '}
          <strong>{propertyName}</strong>.
        </p>
        <dl className="form-success__meta">
          <div>
            <dt>Contact</dt>
            <dd>{formData.phone}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{formData.email}</dd>
          </div>
        </dl>
        <button type="button" onClick={handleReset} className="btn-secondary btn-block form-success__action">
          <span>Submit another enquiry</span>
        </button>
      </div>
    );
  }

  const textField = (
    field: 'name' | 'email' | 'phone',
    label: string,
    type: string,
    autoComplete: string,
    placeholder: string
  ) => {
    const showError = touched[field] && Boolean(errors[field]);
    const showValid = touched[field] && !errors[field] && formData[field].trim() !== '';
    return (
      <div className="form__field">
        <label htmlFor={`enquiry-${field}`} className="form__label">
          {label}
        </label>
        <span className="form__control">
          <input
            id={`enquiry-${field}`}
            type={type}
            autoComplete={autoComplete}
            value={formData[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            onBlur={() => handleBlur(field)}
            aria-invalid={showError}
            aria-describedby={showError ? `enquiry-${field}-error` : undefined}
            placeholder={placeholder}
            className={`field ${showError ? 'field--invalid' : ''} ${showValid ? 'field--valid' : ''}`}
          />
          {showValid && (
            <span className="form__check" aria-hidden="true">
              <Check size={14} strokeWidth={2} />
            </span>
          )}
        </span>
        {showError && (
          <p id={`enquiry-${field}-error`} className="form__error" role="alert">
            <AlertCircle size={12} aria-hidden="true" />
            <span>{errors[field]}</span>
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="form form--compact">
      {textField('name', 'Name', 'text', 'name', 'Your name')}
      {textField('email', 'Email', 'email', 'email', 'Email address')}
      {textField('phone', 'Phone', 'tel', 'tel', 'Phone number')}

      <div className="form__field">
        <label htmlFor="enquiry-message" className="form__label">
          Message <span className="form__optional">Optional</span>
        </label>
        <textarea
          id="enquiry-message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Tell us what you’re looking for"
          className="field field--area field--area-sm"
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn btn-block form__submit" aria-busy={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 size={15} className="form__spinner" aria-hidden="true" />
            <span>Requesting viewing…</span>
          </>
        ) : (
          <>
            <span>Request a viewing</span>
            <CalendarDays size={14} strokeWidth={1.75} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
