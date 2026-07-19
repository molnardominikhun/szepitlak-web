import React, { useState, useEffect } from 'react';
import styles from './ReferencesPage.module.css';
import { references, ReferenceItem } from '../data/references';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { CtaBanner } from '../components/ui/CtaBanner';

type FilterType = 'all' | 'nyilaszaro' | 'belteri-ajtok' | 'szunyoghalok' | 'arnyekolok';

export const ReferencesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Kategória felismerése az útvonal alapján
  const getCategoryOfItem = (item: ReferenceItem): string => {
    if (item.imageSrc.includes('/nyilaszaro/')) return 'nyilaszaro';
    if (item.imageSrc.includes('/belteri-ajtok/')) return 'belteri-ajtok';
    if (item.imageSrc.includes('/szunyoghalok/')) return 'szunyoghalok';
    if (item.imageSrc.includes('/arnyekolok/')) return 'arnyekolok';
    return 'other';
  };

  // Szűrt elemek listája
  const filteredReferences = references.filter((item) => {
    if (activeFilter === 'all') return true;
    return getCategoryOfItem(item) === activeFilter;
  });

  // Billentyűzet kezelés a Lightbox-hoz
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null && prev < filteredReferences.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : filteredReferences.length - 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredReferences]);

  // Görgetés letiltása megnyitott Lightbox esetén
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <>
      <section className={styles.section}>
        <div className="container">
          <header className={styles.header}>
            <h1 className={styles.title}>Referencia galériánk</h1>
            <p className={styles.subtitle}>
              Válogass a Tatabányán és környékén elvégzett prémium nyílászárócsere, beltéri ajtó beépítés
              és árnyékolástechnikai munkáink fotói között.
            </p>
          </header>

          {/* Szűrők */}
          <div className={styles.filters}>
            <button
              className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.filterBtnActive : ''}`}
              onClick={() => {
                setActiveFilter('all');
                setLightboxIndex(null);
              }}
            >
              Mindegyik
            </button>
            <button
              className={`${styles.filterBtn} ${activeFilter === 'nyilaszaro' ? styles.filterBtnActive : ''}`}
              onClick={() => {
                setActiveFilter('nyilaszaro');
                setLightboxIndex(null);
              }}
            >
              Nyílászárók
            </button>
            <button
              className={`${styles.filterBtn} ${activeFilter === 'belteri-ajtok' ? styles.filterBtnActive : ''}`}
              onClick={() => {
                setActiveFilter('belteri-ajtok');
                setLightboxIndex(null);
              }}
            >
              Beltéri ajtók
            </button>
            <button
              className={`${styles.filterBtn} ${activeFilter === 'szunyoghalok' ? styles.filterBtnActive : ''}`}
              onClick={() => {
                setActiveFilter('szunyoghalok');
                setLightboxIndex(null);
              }}
            >
              Szúnyoghálók
            </button>
            <button
              className={`${styles.filterBtn} ${activeFilter === 'arnyekolok' ? styles.filterBtnActive : ''}`}
              onClick={() => {
                setActiveFilter('arnyekolok');
                setLightboxIndex(null);
              }}
            >
              Árnyékolók
            </button>
          </div>

          {/* Galéria rács */}
          <div className={styles.grid}>
            {filteredReferences.map((item, index) => (
              <article
                key={item.id}
                className={styles.card}
                onClick={() => setLightboxIndex(index)}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    className={styles.image}
                    loading="lazy"
                  />
                  <div className={styles.overlay}>
                    <div className={styles.zoomIcon} aria-hidden="true">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{item.workDescription}</h2>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredReferences[lightboxIndex] && (
        <div
          className={styles.lightbox}
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxIndex(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Képnagyító galéria"
        >
          <div className={styles.lightboxContent}>
            {/* Bezáró gomb */}
            <button
              className={styles.closeBtn}
              onClick={() => setLightboxIndex(null)}
              aria-label="Galéria bezárása"
            >
              <X size={28} />
            </button>

            {/* Balra lapozó nyíl */}
            <button
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null && prev > 0 ? prev - 1 : filteredReferences.length - 1
                )
              }
              aria-label="Előző kép"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Nagyított kép */}
            <div className={styles.lightboxImageWrapper}>
              <img
                src={filteredReferences[lightboxIndex].imageSrc}
                alt={filteredReferences[lightboxIndex].imageAlt}
                className={styles.lightboxImage}
              />
            </div>

            {/* Jobbra lapozó nyíl */}
            <button
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null && prev < filteredReferences.length - 1 ? prev + 1 : 0
                )
              }
              aria-label="Következő kép"
            >
              <ChevronRight size={24} />
            </button>

            {/* Infó sáv */}
            <div className={styles.lightboxInfo}>
              <p className={styles.lightboxTitle}>
                {filteredReferences[lightboxIndex].workDescription}
              </p>
            </div>
          </div>
        </div>
      )}

      <CtaBanner title="Kérd személyre szabott ajánlatunkat" primaryLabel="Ajánlatot kérek" />
    </>
  );
};
