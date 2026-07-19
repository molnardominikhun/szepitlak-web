import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ServiceCard.module.css';
import { useConversionEvent } from '../../hooks/useConversionEvent';
import { CONVERSION_EVENTS } from '../../utils/analytics';

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  description,
  href,
  imageSrc,
  imageAlt,
}) => {
  const { track } = useConversionEvent();

  const handleClick = () => {
    track(CONVERSION_EVENTS.SERVICE_CARD_CLICK, { service: id });
  };

  return (
    <Link
      to={href}
      className={styles.card}
      onClick={handleClick}
      aria-label={`${name} – részletek megtekintése`}
    >
      <div className={styles.imageWrap}>
        <img
          src={imageSrc}
          alt={imageAlt}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const placeholder = target.nextElementSibling as HTMLElement;
            if (placeholder) placeholder.style.display = 'flex';
          }}
        />
        <div className={styles.imagePlaceholder} aria-hidden="true">
          <span>📷 Kép hamarosan</span>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <span className={styles.link}>
          Részletek <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
};
