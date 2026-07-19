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

export const NyilaszaroPage: React.FC = () => {
  useSeo({
    title: 'Nyílászárók beépítése és cseréje Tatabányán – Szépít-Lak Kft.',
    description:
      'Műanyag, fa és alumínium ablakok, bejárati ajtók, terasz- és tolóajtók. Felmérés, tanácsadás, szakszerű beépítés Tatabányán és környékén.',
  });
  const { track } = useConversionEvent();
  const catalogs = getCatalogsForService('nyilaszaro');

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <h1 className={styles.h1}>
              Nyílászárók beépítése és cseréje Tatabányán és környékén
            </h1>
            <p className={styles.intro}>
              A megfelelő nyílászárók nemcsak az otthon megjelenését határozzák
              meg, hanem a hőszigetelésben, a zajvédelemben, a biztonságban és
              az energiafelhasználásban is fontos szerepet töltenek be. A
              felméréstől a régi szerkezetek bontásán át az új ablakok és ajtók
              szakszerű beépítéséig végigkísérjük a teljes folyamatot.
            </p>
            <div className={styles.heroCtas}>
              <Link
                to="/kapcsolat"
                className="btn btn--primary"
                onClick={() => track(CONVERSION_EVENTS.QUOTE_CTA_CLICK, { location: 'nyilaszaro_hero' })}
              >
                Ajánlatot kérek
              </Link>
              <a
                href={PHONE_LINK}
                className="btn btn--outline"
                onClick={() => track(CONVERSION_EVENTS.PHONE_CLICK, { location: 'nyilaszaro_hero' })}
                aria-label={`Hívás: ${PHONE_NUMBER}`}
              >
                <Phone size={16} aria-hidden="true" /> Hívj minket
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img
              src="/images/services/nyilaszaro/nyilaszaro-szolgaltatas.png"
              alt="Prémium modern ablakok minimalista homlokzaton"
              className={styles.heroImg}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const ph = e.currentTarget.nextElementSibling as HTMLElement;
                if (ph) ph.style.display = 'flex';
              }}
            />
            <div className={styles.placeholder} aria-hidden="true" style={{ display: 'none' }}>
              <span>📷</span>
              <small>Nyílászáró kép<br />/images/services/nyilaszaro/nyilaszaro-szolgaltatas.png</small>
            </div>
          </div>
        </div>
      </section>

      {/* Anyagtípusok */}
      <section className={`section ${styles.content}`}>
        <div className="container">
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Műanyag, fa és alumínium nyílászárók</h2>
            <p className={styles.blockLead}>
              Nem minden ingatlanhoz ugyanaz az ablakrendszer jelenti a legjobb
              választást. Az épület adottságai, a kívánt megjelenés, a használat
              módja és a költségkeret alapján segítünk kiválasztani a megfelelő
              műanyag, fa vagy alumínium megoldást.
            </p>
            <div className={styles.threeCol}>
              <MaterialCard
                title="Műanyag"
                desc="Jó ár-érték arányú, könnyen karbantartható megoldás, amely megfelelő profillal és üvegezéssel jó hő- és hangszigetelést biztosíthat."
              />
              <MaterialCard
                title="Fa"
                desc="Természetes és időtálló megjelenésű választás, amely különösen jól illik klasszikus vagy természetes anyagokat előnyben részesítő otthonokhoz."
              />
              <MaterialCard
                title="Alumínium"
                desc="Stabil, modern és tartós rendszer, amely nagyobb üvegfelületekhez és letisztult építészeti kialakításokhoz is megfelelő lehet."
              />
            </div>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Bejárati ajtók</h2>
            <p className={styles.blockDesc}>
              A bejárati ajtó egyszerre határozza meg az épület első benyomását,
              biztonságát és hőszigetelését. Többféle anyagú, stílusú, színű és
              felszereltségű modell közül segítünk kiválasztani az ingatlanhoz
              legjobban illő megoldást. Igény szerint oldal- vagy felülvilágítóval,
              különböző üvegezéssel és egyedi kiegészítőkkel is tervezhető.
            </p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Teraszajtók és tolóajtók</h2>
            <p className={styles.blockDesc}>
              A teraszajtók és nagy méretű tolóajtók világosabbá, tágasabbá teszik
              a belső tereket, és kényelmes kapcsolatot teremtenek a lakótér, a
              terasz és a kert között. A nyílás mérete, a rendelkezésre álló hely,
              a használat módja és a kívánt komfort alapján segítünk kiválasztani
              a megfelelő hagyományos, bukó-nyíló vagy toló rendszert.
            </p>
          </div>

          {/* Egyedi CTA */}
          <div className={styles.inlineCta}>
            <h2 className={styles.inlineCtaTitle}>Egyedi elképzelésed van?</h2>
            <p className={styles.blockDesc}>
              Legyen szó különleges méretről, egyedi színről, nagy üvegfelületről
              vagy speciális kialakításról, segítünk megtalálni a megfelelő
              megoldást.
            </p>
            <div className={styles.heroCtas}>
              <Link to="/kapcsolat" className="btn btn--primary"
                onClick={() => track(CONVERSION_EVENTS.QUOTE_CTA_CLICK, { location: 'nyilaszaro_inline' })}>
                Kérj személyre szabott ajánlatot
              </Link>
              <a href={PHONE_LINK} className="btn btn--outline"
                onClick={() => track(CONVERSION_EVENTS.PHONE_CLICK, { location: 'nyilaszaro_inline' })}>
                <Phone size={16} aria-hidden="true" /> Hívj minket
              </a>
            </div>
          </div>
        </div>
      </section>

      <CatalogSection items={catalogs} />
      <CtaBanner title="Kérd személyre szabott ajánlatunkat" primaryLabel="Ajánlatot kérek" />
    </>
  );
};

const MaterialCard: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className={styles.materialCard}>
    <h3 className={styles.materialTitle}>{title}</h3>
    <p className={styles.materialDesc}>{desc}</p>
  </div>
);
