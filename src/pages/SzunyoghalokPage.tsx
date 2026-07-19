import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ServicePage.module.css';
import { useSeo } from '../hooks/useSeo';
import { CtaBanner } from '../components/ui/CtaBanner';
import { CatalogSection } from '../components/ui/CatalogSection';
import { getCatalogsForService } from '../data/catalogs';
import { PHONE_LINK, PHONE_NUMBER } from '../data/navigation';
import { Phone } from 'lucide-react';
import { useConversionEvent } from '../hooks/useConversionEvent';
import { CONVERSION_EVENTS } from '../utils/analytics';

export const SzunyoghalokPage: React.FC = () => {
  useSeo({
    title: 'Szúnyoghálók készítése és telepítése Tatabányán – Szépít-Lak Kft.',
    description:
      'Fix, rolós, pliszé és toló szúnyogháló rendszerek egyedi méretre gyártva, ablakokra és ajtókra. Telepítés Tatabányán és környékén.',
  });
  const { track } = useConversionEvent();
  const catalogs = getCatalogsForService('szunyoghalok');

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <h1 className={styles.h1}>
              Szúnyoghálók készítése és telepítése Tatabányán és környékén
            </h1>
            <p className={styles.intro}>
              A megfelelő szúnyogháló lehetővé teszi az otthon természetes
              szellőztetését úgy, hogy közben segít távol tartani a szúnyogokat,
              legyeket és más rovarokat. Ablakokra, teraszajtókra és nagyobb
              nyílásokra is többféle, egyedi méretre készülő rendszer közül
              lehet választani.
            </p>
            <div className={styles.heroCtas}>
              <Link to="/kapcsolat" className="btn btn--primary"
                onClick={() => track(CONVERSION_EVENTS.QUOTE_CTA_CLICK, { location: 'szunyoghalo_hero' })}>
                Ajánlatot kérek
              </Link>
              <a href={PHONE_LINK} className="btn btn--outline"
                onClick={() => track(CONVERSION_EVENTS.PHONE_CLICK, { location: 'szunyoghalo_hero' })}
                aria-label={`Hívás: ${PHONE_NUMBER}`}>
                <Phone size={16} aria-hidden="true" /> Hívj minket
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img
              src="/images/services/szunyoghalok/szunyoghalo-szolgaltatas.png"
              alt="Prémium pliszé szúnyogháló egy modern toló teraszajtón használat közben"
              className={styles.heroImg}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const ph = e.currentTarget.nextElementSibling as HTMLElement;
                if (ph) ph.style.display = 'flex';
              }}
            />
            <div className={styles.placeholder} aria-hidden="true" style={{ display: 'none' }}>
              <span>📷</span>
              <small>Szúnyogháló kép<br />/images/services/szunyoghalok/szunyoghalo-szolgaltatas.png</small>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.content}`}>
        <div className="container">
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Fix keretes szúnyoghálók</h2>
            <p className={styles.blockDesc}>
              Egyszerű, tartós és kedvező ár-érték arányú megoldás rendszeresen
              szellőztetett ablakokra. Mivel nem tartalmaz mozgó alkatrészeket,
              használata egyszerű, karbantartási igénye alacsony.
            </p>
          </div>
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Rolós szúnyoghálók</h2>
            <p className={styles.blockDesc}>
              Használaton kívül visszahúzható a tokjába, ezért praktikus és
              diszkrét megoldás ablakokra, illetve bizonyos kialakítások esetén
              ajtókra is.
            </p>
          </div>
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Pliszé szúnyoghálók</h2>
            <p className={styles.blockDesc}>
              Oldalirányban mozgatható, harmonikaszerűen összecsukódó rendszer.
              Különösen alkalmas teraszajtókhoz, erkélyajtókhoz és nagyobb
              nyílásokhoz, ahol fontos a kényelmes átjárhatóság.
            </p>
          </div>
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Nyíló és toló szúnyogháló ajtók</h2>
            <p className={styles.blockDesc}>
              Gyakran használt terasz- vagy erkélyajtóknál nyíló, nagyobb
              felületeknél pedig tolható szúnyogháló rendszer is alkalmazható.
              A megfelelő megoldás az ajtó méretétől, nyitásmódjától, a
              rendelkezésre álló helytől és a használat gyakoriságától függ.
            </p>
          </div>
        </div>
      </section>

      <CatalogSection items={catalogs} />
      <CtaBanner title="Kérd személyre szabott ajánlatunkat" primaryLabel="Ajánlatot kérek" />
    </>
  );
};
