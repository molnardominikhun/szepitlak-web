import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { Phone, Mail, MapPin } from 'lucide-react';
import { navItems, PHONE_LINK, PHONE_NUMBER, EMAIL, SERVICE_AREA } from '../../data/navigation';
import { useConversionEvent } from '../../hooks/useConversionEvent';
import { CONVERSION_EVENTS } from '../../utils/analytics';

export const Footer: React.FC = () => {
  const { track } = useConversionEvent();
  const services = navItems.find((n) => n.href === '/szolgaltatasaink');

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Márka */}
        <div className={styles.col}>
          <Link to="/" className={styles.brand}>
            <img
              src="/images/brand/szepit-lak-logo.png"
              alt="Szépít-Lak Kft. embléma"
              className={styles.brandImg}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className={styles.brandName}>
              Szépít-Lak<span className={styles.brandKft}>Kft.</span>
            </span>
          </Link>
          <p className={styles.slogan}>Ahol a minőség ajtót nyit.</p>
          <p className={styles.brandDesc}>
            Komplett nyílászáró-, beltéri ajtó-, árnyékolástechnikai és
            szúnyogháló-megoldások a felméréstől a szakszerű beépítésig.
          </p>
        </div>

        {/* Szolgáltatásaink */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Szolgáltatásaink</h3>
          <ul className={styles.linkList}>
            {services?.children?.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className={styles.footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kapcsolat */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Kapcsolat</h3>
          <ul className={styles.contactList}>
            <li>
              <a
                href={PHONE_LINK}
                className={styles.contactLink}
                onClick={() => track(CONVERSION_EVENTS.PHONE_CLICK, { location: 'footer' })}
              >
                <Phone size={14} aria-hidden="true" />
                {PHONE_NUMBER}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className={styles.contactLink}>
                <Mail size={14} aria-hidden="true" />
                {EMAIL}
              </a>
            </li>
            <li className={styles.contactArea}>
              <MapPin size={14} aria-hidden="true" />
              {SERVICE_AREA}
            </li>
            <li>
              <Link
                to="/kapcsolat"
                className={styles.footerLink}
                style={{ fontWeight: 600 }}
                onClick={() => track(CONVERSION_EVENTS.QUOTE_CTA_CLICK, { location: 'footer' })}
              >
                Ajánlatkérés →
              </Link>
            </li>
          </ul>
        </div>

        {/* Jogi */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Gyorslinkek</h3>
          <ul className={styles.linkList}>
            <li>
              <Link to="/referenciak" className={styles.footerLink}>
                Referenciáink
              </Link>
            </li>
            <li>
              <Link to="/adatkezelesi-tajekoztato" className={styles.footerLink}>
                Adatkezelési tájékoztató
              </Link>
            </li>
            <li>
              <Link to="/cookie-tajekoztato" className={styles.footerLink}>
                Cookie-tájékoztató
              </Link>
            </li>
            <li>
              <Link to="/impresszum" className={styles.footerLink}>
                Impresszum
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Szépít-Lak Kft. Minden jog fenntartva.
        </p>
        <p className={styles.area}>{SERVICE_AREA}</p>
      </div>
    </footer>
  );
};
