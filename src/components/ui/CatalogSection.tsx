import React from 'react';
import styles from './CatalogSection.module.css';
import { CatalogCard } from './CatalogCard';
import type { CatalogItem } from '../../data/catalogs';

interface CatalogSectionProps {
  items: CatalogItem[];
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({ items }) => {
  // Ha nincs egyetlen katalógus sem, a szekció teljesen rejtve marad
  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Gyártói katalógusok</h2>
          <p className={styles.subtitle}>
            Szeretnél részletesebben körülnézni? Tekintsd meg gyártóink
            termékkatalógusait, vagy kérj személyre szabott segítséget a
            választáshoz.
          </p>
        </div>
        <div className={styles.grid}>
          {items.map((catalog) => (
            <CatalogCard key={catalog.id} catalog={catalog} />
          ))}
        </div>
      </div>
    </section>
  );
};
