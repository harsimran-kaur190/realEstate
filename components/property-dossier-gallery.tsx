'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';

/*
 * Dossier gallery — the central visual of the property detail page.
 * Large stage image with previous/next controls, a counter, a thumbnail
 * strip, keyboard arrows, touch swipe, and a full-screen lightbox.
 */
export function PropertyDossierGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchStart = useRef<number | null>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const count = images.length;
  const go = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => setMounted(true), []);

  // Keyboard: arrows always, Escape closes the lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'Escape' && lightbox) setLightbox(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, lightbox]);

  // Lightbox: lock scroll and manage focus
  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => closeRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      openerRef.current?.focus();
    };
  }, [lightbox]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
    touchStart.current = null;
  };

  const counter = `${String(active + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;

  return (
    <div className="pd-gallery" role="region" aria-roledescription="carousel" aria-label={`${title} gallery`}>
      <div className="pd-gallery__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {images.map((src, i) => (
          <div
            key={src + i}
            className={`pd-gallery__slide ${i === active ? 'pd-gallery__slide--active' : ''}`}
            aria-hidden={i !== active}
          >
            <Image
              src={src}
              alt={i === active ? `${title}, view ${i + 1} of ${count}` : ''}
              fill
              sizes="(min-width: 1024px) 1280px, 100vw"
              priority={i === 0}
              className="pd-gallery__img"
            />
          </div>
        ))}

        <button
          ref={openerRef}
          type="button"
          className="pd-gallery__expand"
          onClick={() => setLightbox(true)}
          aria-label="Open full-screen gallery"
        >
          <Maximize2 size={15} strokeWidth={1.6} aria-hidden="true" />
        </button>

        <div className="pd-gallery__bar">
          <span className="pd-gallery__counter" aria-live="polite">
            {counter}
          </span>
          {count > 1 && (
            <span className="pd-gallery__controls">
              <button type="button" className="pd-gallery__arrow" onClick={() => go(-1)} aria-label="Previous image">
                <ArrowLeft size={15} strokeWidth={1.6} aria-hidden="true" />
              </button>
              <button type="button" className="pd-gallery__arrow" onClick={() => go(1)} aria-label="Next image">
                <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </span>
          )}
        </div>
      </div>

      {count > 1 && (
        <div className="pd-gallery__thumbs no-scrollbar" role="group" aria-label="Choose image">
          {images.map((src, i) => (
            <button
              key={`t-${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={`Show image ${i + 1}`}
              className={`pd-gallery__thumb ${i === active ? 'pd-gallery__thumb--active' : ''}`}
            >
              <Image src={src} alt="" fill sizes="160px" className="pd-gallery__thumb-img" />
            </button>
          ))}
        </div>
      )}

      {mounted &&
        lightbox &&
        createPortal(
          <div
            className="pd-lightbox animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} full-screen gallery`}
            onClick={() => setLightbox(false)}
          >
            <div className="pd-lightbox__head" onClick={(e) => e.stopPropagation()}>
              <span className="pd-lightbox__title">
                {title} <span className="pd-lightbox__counter">{counter}</span>
              </span>
              <button
                ref={closeRef}
                type="button"
                className="pd-lightbox__close"
                onClick={() => setLightbox(false)}
                aria-label="Close full-screen gallery"
              >
                <X size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <div className="pd-lightbox__stage" onClick={(e) => e.stopPropagation()} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <Image
                key={images[active]}
                src={images[active]}
                alt={`${title}, view ${active + 1} of ${count}`}
                fill
                sizes="100vw"
                className="pd-lightbox__img"
              />
            </div>

            {count > 1 && (
              <div className="pd-lightbox__controls" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="btn-outline-inverse btn-sm" onClick={() => go(-1)}>
                  <ArrowLeft size={13} strokeWidth={1.75} aria-hidden="true" />
                  <span>Previous</span>
                </button>
                <button type="button" className="btn-inverse btn-sm" onClick={() => go(1)}>
                  <span>Next</span>
                  <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
