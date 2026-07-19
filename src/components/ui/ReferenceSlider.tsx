import React, { useRef, useState, useCallback, useEffect } from 'react';
import styles from './ReferenceSlider.module.css';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ReferenceItem } from '../../data/references';
import { useConversionEvent } from '../../hooks/useConversionEvent';
import { CONVERSION_EVENTS } from '../../utils/analytics';

interface ReferenceSliderProps {
  items: ReferenceItem[];
}

export const ReferenceSlider: React.FC<ReferenceSliderProps> = ({ items }) => {
  const { track } = useConversionEvent();
  const trackOnce = useRef(false);
  const [current, setCurrent] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const total = items.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
      if (!trackOnce.current) {
        track(CONVERSION_EVENTS.REFERENCE_SLIDER_INTERACTION, {});
        trackOnce.current = true;
      }
    },
    [total, track]
  );

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  // Billentyűzet kezelés a sliderhez
  useEffect(() => {
    const el = sliderRef.current;
    if (!el || lightboxIndex !== null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  });

  // Billentyűzet kezelés a lightboxhoz
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onLightboxKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setLightboxIndex(null);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightboxIndex((prev) => (prev! - 1 + total) % total);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightboxIndex((prev) => (prev! + 1) % total);
      }
    };
    window.addEventListener('keydown', onLightboxKey);
    return () => window.removeEventListener('keydown', onLightboxKey);
  }, [lightboxIndex, total]);

  // Görgetés a megfelelő pozícióba gomb/dot kattintás után (mobilon)
  useEffect(() => {
    if (window.innerWidth < 768 && sliderRef.current) {
      const trackElement = sliderRef.current.querySelector(`.${styles.track}`);
      if (trackElement) {
        const slideWidth = trackElement.clientWidth;
        trackElement.scrollTo({
          left: current * slideWidth,
          behavior: 'smooth'
        });
      }
    }
  }, [current]);

  // Görgetés figyelése a dot-ok szinkronizálásához mobilon
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return;
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    if (width > 0) {
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex >= 0 && newIndex < total && newIndex !== current) {
        setCurrent(newIndex);
      }
    }
  };

  if (total === 0) return null;

  return (
    <div
      className={styles.wrapper}
      ref={sliderRef}
      tabIndex={0}
      role="region"
      aria-label="Referencia galéria – kattints a képre a nagyításhoz"
    >
      <div
        className={styles.track}
        onScroll={handleScroll}
      >
        {items.map((item, idx) => {
          const offset = ((idx - current + total) % total + total) % total;
          return (
            <div
              key={item.id}
              className={`${styles.slide} ${offset === 0 ? styles.active : ''} ${offset === 1 ? styles.next : ''} ${offset === total - 1 ? styles.prev : ''}`}
              aria-hidden={offset !== 0}
              style={{ '--offset': offset } as React.CSSProperties}
            >
              <div
                className={styles.imageWrap}
                onClick={() => setLightboxIndex(idx)}
                title="Kattints a kép nagyításához"
              >
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className={styles.image}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const ph = e.currentTarget.nextElementSibling as HTMLElement;
                    if (ph) ph.style.display = 'flex';
                  }}
                />
                <div className={styles.placeholder} aria-hidden="true">
                  <span>📷 Kép hamarosan</span>
                  <small>{item.imageAlt}</small>
                </div>
              </div>
              <div className={styles.caption}>
                <p className={styles.work}>{item.workDescription}</p>
                {item.quote && item.quoteAuthor && (
                  <blockquote className={styles.quote}>
                    <p>„{item.quote}"</p>
                    <footer>— {item.quoteAuthor}</footer>
                  </blockquote>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button
          className={styles.arrow}
          onClick={prev}
          aria-label="Előző referencia"
        >
          <ChevronLeft size={20} />
        </button>
        <div className={styles.dots} role="tablist" aria-label="Referencia navigáció">
          {items.map((item, idx) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={idx === current}
              aria-label={`Referencia ${idx + 1}: ${item.workDescription}`}
              className={`${styles.dot} ${idx === current ? styles.dotActive : ''}`}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>
        <button
          className={styles.arrow}
          onClick={next}
          aria-label="Következő referencia"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <p className={styles.counter} aria-live="polite" aria-atomic="true">
        {current + 1} / {total}
      </p>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Képnagyítás"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxIndex(null);
          }}
        >
          <button
            className={styles.lightboxClose}
            onClick={() => setLightboxIndex(null)}
            aria-label="Nagyítás bezárása"
          >
            <X size={26} />
          </button>
          
          <button
            className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev! - 1 + total) % total);
            }}
            aria-label="Előző kép"
          >
            <ChevronLeft size={36} />
          </button>

          <div className={styles.lightboxContent}>
            <img
              src={items[lightboxIndex].imageSrc}
              alt={items[lightboxIndex].imageAlt}
              className={styles.lightboxImg}
            />
            <p className={styles.lightboxCaption}>
              {items[lightboxIndex].workDescription}
            </p>
          </div>

          <button
            className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev! + 1) % total);
            }}
            aria-label="Következő kép"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </div>
  );
};
