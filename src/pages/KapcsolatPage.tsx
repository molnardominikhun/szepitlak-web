import React from 'react';
import styles from './KapcsolatPage.module.css';
import { useSeo } from '../hooks/useSeo';
import { ContactForm } from '../components/forms/ContactForm';
import { Phone, Mail, MapPin } from 'lucide-react';
import { PHONE_LINK, PHONE_NUMBER, EMAIL, SERVICE_AREA } from '../data/navigation';
import { useConversionEvent } from '../hooks/useConversionEvent';
import { CONVERSION_EVENTS } from '../utils/analytics';

export const KapcsolatPage: React.FC = () => {
  useSeo({
    title: 'Kapcsolat és ajánlatkérés – Szépít-Lak Kft.',
    description:
      'Kérj személyre szabott ajánlatot! Írd meg röviden, milyen megoldást keresel, és egy munkanapon belül felvesszük veled a kapcsolatot.',
  });
  const { track } = useConversionEvent();

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.h1}>Kérj személyre szabott ajánlatot</h1>
          <p className={styles.intro}>
            Írd meg röviden, milyen megoldást keresel, és egy munkanapon belül
            felvesszük veled a kapcsolatot.
          </p>
        </div>
      </section>

      <section className={`section ${styles.main}`}>
        <div className="container">
          <div className={styles.grid}>
            {/* Űrlap */}
            <div className={styles.formCol}>
              <ContactForm />
            </div>

            {/* Telefonos kapcsolat + adatok */}
            <aside className={styles.aside}>
              <div className={styles.phoneCard}>
                <h2 className={styles.phoneTitle}>Szívesebben egyeztetnél telefonon?</h2>
                <p className={styles.phoneDesc}>
                  Hívj minket bizalommal, és beszéljük át, milyen megoldásra van
                  szükséged.
                </p>
                <a
                  href={PHONE_LINK}
                  className="btn btn--primary"
                  style={{ alignSelf: 'flex-start' }}
                  onClick={() => track(CONVERSION_EVENTS.PHONE_CLICK, { location: 'kapcsolat_aside' })}
                  aria-label={`Hívás: ${PHONE_NUMBER}`}
                >
                  <Phone size={16} aria-hidden="true" /> Hívás indítása
                </a>
              </div>

              <div className={styles.contactInfo}>
                <h2 className={styles.infoTitle}>Elérhetőségeink</h2>
                <ul className={styles.infoList}>
                  <li>
                    <a
                      href={PHONE_LINK}
                      className={styles.infoLink}
                      onClick={() => track(CONVERSION_EVENTS.PHONE_CLICK, { location: 'kapcsolat_info' })}
                    >
                      <Phone size={16} aria-hidden="true" />
                      {PHONE_NUMBER}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${EMAIL}`} className={styles.infoLink}>
                      <Mail size={16} aria-hidden="true" />
                      {EMAIL}
                    </a>
                  </li>
                  <li className={styles.infoArea}>
                    <MapPin size={16} aria-hidden="true" />
                    <span>
                      <strong>Szolgáltatási terület:</strong>{' '}
                      {SERVICE_AREA}
                      <br />
                      <small>
                        Távolabbi, egyedi projektek egyeztetés alapján
                        vállalhatók.
                      </small>
                    </span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};
