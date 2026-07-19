import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MobileBottomBar.module.css';
import { Phone, MessageSquare } from 'lucide-react';
import { PHONE_LINK, PHONE_NUMBER } from '../../data/navigation';
import { useConversionEvent } from '../../hooks/useConversionEvent';
import { CONVERSION_EVENTS } from '../../utils/analytics';

export const MobileBottomBar: React.FC = () => {
  const { track } = useConversionEvent();

  return (
    <div className={styles.bar} role="navigation" aria-label="Konverziós sáv">
      <a
        href={PHONE_LINK}
        className={styles.btn}
        onClick={() => track(CONVERSION_EVENTS.PHONE_CLICK, { location: 'mobile_bottom_bar' })}
        aria-label={`Hívás: ${PHONE_NUMBER}`}
      >
        <Phone size={18} aria-hidden="true" />
        <span>Hívás</span>
      </a>
      <div className={styles.divider} aria-hidden="true" />
      <Link
        to="/kapcsolat"
        className={`${styles.btn} ${styles.btnPrimary}`}
        onClick={() => track(CONVERSION_EVENTS.QUOTE_CTA_CLICK, { location: 'mobile_bottom_bar' })}
        aria-label="Ajánlatkérés oldal megnyitása"
      >
        <MessageSquare size={18} aria-hidden="true" />
        <span>Ajánlatkérés</span>
      </Link>
    </div>
  );
};
