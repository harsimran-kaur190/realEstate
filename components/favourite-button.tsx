'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const STORAGE_KEY = 'altiere:favourites';

function readFavourites(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

function writeFavourites(slugs: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    /* storage unavailable (private mode etc.) — state still works for the session */
  }
}

/**
 * Small, self-contained favourite toggle. Persists per browser via localStorage
 * and stays in sync between instances on the same page.
 */
export function FavouriteButton({
  slug,
  name,
  className = '',
}: {
  slug: string;
  name: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const sync = () => setActive(readFavourites().includes(slug));
    sync();
    window.addEventListener('altiere:favourites', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('altiere:favourites', sync);
      window.removeEventListener('storage', sync);
    };
  }, [slug]);

  const toggle = () => {
    const current = readFavourites();
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
    writeFavourites(next);
    setActive(next.includes(slug));
    window.dispatchEvent(new Event('altiere:favourites'));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from favourites` : `Save ${name} to favourites`}
      className={`fav-btn ${active ? 'fav-btn--active' : ''} ${className}`}
    >
      <Heart size={15} strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}
