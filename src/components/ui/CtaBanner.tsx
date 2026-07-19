import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CtaBanner.module.css';
import { useConversionEvent } from '../../hooks/useConversionEvent';
import { CONVERSION_EVENTS } from '../../utils/analytics';
import { PHONE_LINK, PHONE_NUMBER } from '../../data/navigation';

interface CtaBannerProps {
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  showPhone?: boolean;
  variant?: 'default' | 'dark';
  trustLine?: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  title,
  description,
  primaryLabel = 'Ajánlatot kérek',
  primaryHref = '/kapcsolat',
  showPhone = true,
  variant = 'default',
  trustLine,
}) => {
  const { track } = useConversionEvent();

  return (
    <section
      className={`${styles.banner} ${variant === 'dark' ? styles.dark : ''}`}
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <div className={styles.actions}>
          <Link
            to={primaryHref}
            className={`btn btn--primary ${styles.btnPrimary}`}
            onClick={() => track(CONVERSION_EVENTS.QUOTE_CTA_CLICK, { location: 'cta_banner' })}
          >
            {primaryLabel}
          </Link>
          {showPhone && (
            <a
              href={PHONE_LINK}
              className={`btn btn--outline ${styles.btnPhone}`}
              onClick={() => track(CONVERSION_EVENTS.PHONE_CLICK, { location: 'cta_banner' })}
            >
              Hívj minket
              <span className={styles.phoneNum}>{PHONE_NUMBER}</span>
            </a>
          )}
        </div>
        {trustLine && <p className={styles.trustLine}>{trustLine}</p>}
      </div>
    </section>
  );
};
