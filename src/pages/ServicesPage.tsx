import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ServicesPage.module.css';
import { useSeo } from '../hooks/useSeo';
import { services } from '../data/services';
import { CtaBanner } from '../components/ui/CtaBanner';
import { useConversionEvent } from '../hooks/useConversionEvent';
import { CONVERSION_EVENTS } from '../utils/analytics';
import { useReveal } from '../hooks/useReveal';

export const ServicesPage: React.FC = () => {
  useSeo({
    title: 'Szolgáltatásaink – Szépít-Lak Kft.',
    description:
      'Komplett megoldások nyílászárók, beltéri ajtók, árnyékolók és szúnyoghálók területén Tatabányán és környékén. Több bevált gyártó termékeivel dolgozunk.',
  });
  const { track } = useConversionEvent();
  const heroRef = useReveal<HTMLDivElement>();

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`} ref={heroRef}>
          <h1 className={styles.h1}>Szolgáltatásaink</h1>
          <p className={styles.intro}>
            Komplett megoldásokat kínálunk nyílászárók, beltéri ajtók,
            árnyékolók és szúnyoghálók területén. Több bevált gyártó
            termékeivel dolgozunk, így az adott ingatlanhoz, igényekhez és
            költségkerethez megfelelő megoldást tudjuk javasolni.
          </p>
        </div>
      </section>

      {/* Blokkok */}
      <section className={`section ${styles.blocks}`}>
        <div className="container">
          {services.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <ServiceBlock
                key={service.id}
                name={service.name}
                description={service.fullDescription}
                href={service.href}
                imageSrc={service.imageSrc}
                imageAlt={service.imageAlt}
                imageLeft={isEven}
                onDetails={() =>
                  track(CONVERSION_EVENTS.SERVICE_CARD_CLICK, { service: service.id, location: 'services_page' })
                }
              />
            );
          })}
        </div>
      </section>

      <CtaBanner
        title="Kérdésed van? Szívesen segítünk."
        description="Kérj személyre szabott ajánlatot, vagy hívj minket, és megbeszéljük, milyen megoldás lenne a legjobb."
      />
    </>
  );
};

interface ServiceBlockProps {
  name: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageLeft: boolean;
  onDetails: () => void;
}

const ServiceBlock: React.FC<ServiceBlockProps> = ({
  name, description, href, imageSrc, imageAlt, imageLeft, onDetails,
}) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${styles.block} ${imageLeft ? styles.imageLeft : styles.imageRight}`}
    >
      <div className={styles.blockImage}>
        <img
          src={imageSrc}
          alt={imageAlt}
          className={styles.img}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const ph = e.currentTarget.nextElementSibling as HTMLElement;
            if (ph) ph.style.display = 'flex';
          }}
        />
        <div className={styles.imgPlaceholder} aria-hidden="true">
          <span>📷</span>
          <small>{imageAlt}</small>
        </div>
      </div>
      <div className={styles.blockText}>
        <h2 className={styles.blockTitle}>{name}</h2>
        <p className={styles.blockDesc}>{description}</p>
        <Link to={href} className="btn btn--primary" onClick={onDetails}>
          Részletek
        </Link>
      </div>
    </div>
  );
};
