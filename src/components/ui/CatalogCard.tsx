import React from 'react';
import styles from './CatalogCard.module.css';
import { FileText } from 'lucide-react';
import { useConversionEvent } from '../../hooks/useConversionEvent';
import { CONVERSION_EVENTS } from '../../utils/analytics';
import type { CatalogItem } from '../../data/catalogs';

interface CatalogCardProps {
  catalog: CatalogItem;
}

export const CatalogCard: React.FC<CatalogCardProps> = ({ catalog }) => {
  const { track } = useConversionEvent();

  if (catalog.available) {
    return (
      <a
        href={catalog.filePath}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
        aria-label={`${catalog.name} – PDF megnyitása új ablakban`}
        onClick={() =>
          track(CONVERSION_EVENTS.CATALOG_PDF_CLICK, {
            catalog: catalog.id,
            filePath: catalog.filePath,
          })
        }
      >
        <FileText className={styles.icon} aria-hidden="true" size={20} />
        <span className={styles.name}>{catalog.name}</span>
        <span className={styles.cta}>PDF megnyitása →</span>
      </a>
    );
  }

  return (
    <div
      className={`${styles.card} ${styles.soon}`}
      aria-label={`${catalog.name} – hamarosan elérhető`}
    >
      <FileText className={styles.icon} aria-hidden="true" size={20} />
      <span className={styles.name}>{catalog.name}</span>
      <span className={styles.soonLabel}>Hamarosan elérhető</span>
    </div>
  );
};
