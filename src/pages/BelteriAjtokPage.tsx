import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ServicePage.module.css';
import { useSeo } from '../hooks/useSeo';
import { CtaBanner } from '../components/ui/CtaBanner';
import { CatalogSection } from '../components/ui/CatalogSection';
import { getCatalogsForService } from '../data/catalogs';
import { PHONE_LINK, PHONE_NUMBER } from '../data/navigation';
import { Phone, PenTool } from 'lucide-react';
import { useConversionEvent } from '../hooks/useConversionEvent';
import { CONVERSION_EVENTS } from '../utils/analytics';

export const BelteriAjtokPage: React.FC = () => {
  useSeo({
    title: 'Beltéri ajtók értékesítése és beépítése Tatabányán – Szépít-Lak Kft.',
    description:
      'Stílusos és tartós beltéri ajtók több gyártó kínálatából. Tömör, üvegezett, toló ajtómegoldások beépítése Tatabányán és környékén.',
  });
  const { track } = useConversionEvent();
  const [clickedDesigner, setClickedDesigner] = useState(false);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const catalogs = getCatalogsForService('belteri-ajtok');

  const handleConfiguratorClick = () => {
    setClickedDesigner(true);
    track(CONVERSION_EVENTS.OUTBOUND_LINK_CLICK || 'outbound_link_click', { destination: 'full_doors_configurator' });
  };

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <h1 className={styles.h1}>
              Beltéri ajtók értékesítése és beépítése Tatabányán és környékén
            </h1>
            <p className={styles.intro}>
              A beltéri ajtók fontos szerepet töltenek be az otthon
              megjelenésében, a helyiségek elválasztásában és a mindennapi
              használat kényelmében. Több megbízható gyártó kínálatából
              biztosítunk különböző stílusú, árkategóriájú és műszaki
              kialakítású modelleket.
            </p>
            <div className={styles.heroCtas}>
              <Link to="/kapcsolat" className="btn btn--primary"
                onClick={() => track(CONVERSION_EVENTS.QUOTE_CTA_CLICK, { location: 'belteri_hero' })}>
                Ajánlatot kérek
              </Link>
              <a href={PHONE_LINK} className="btn btn--outline"
                onClick={() => track(CONVERSION_EVENTS.PHONE_CLICK, { location: 'belteri_hero' })}
                aria-label={`Hívás: ${PHONE_NUMBER}`}>
                <Phone size={16} aria-hidden="true" /> Hívj minket
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img
              src="/images/services/belteri-ajtok/belteri-ajto-szolgaltatas.png"
              alt="Prémium designer beltéri ajtó letisztult vonalakkal és modern antracit színben"
              className={styles.heroImg}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const ph = e.currentTarget.nextElementSibling as HTMLElement;
                if (ph) ph.style.display = 'flex';
              }}
            />
            <div className={styles.placeholder} aria-hidden="true" style={{ display: 'none' }}>
              <span>📷</span>
              <small>Beltéri ajtó kép<br />/images/services/belteri-ajtok/belteri-ajto-szolgaltatas.png</small>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.content}`}>
        <div className="container">
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Beltéri ajtók – széles választék</h2>
            <p className={styles.blockDesc}>
              A széles választéknak köszönhetően letisztult, faerezetes, matt,
              fényes, festett, dekorfóliás, mart vagy üvegbetétes kivitelek is
              szóba jöhetnek. A méret, a nyitásirány, a felület, a szín, a tok,
              a kilincs és az üvegezés is az adott otthonhoz igazítható.
            </p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Tömör és üvegezett beltéri ajtók</h2>
            <p className={styles.blockDesc}>
              A tömör beltéri ajtók nagyobb takarást és elkülönülést
              biztosítanak, ezért hálószobákhoz, fürdőszobákhoz vagy
              dolgozószobákhoz is jó választást jelenthetnek. Az üvegezett
              ajtók több fényt engedhetnek át a helyiségek között, így
              előszobákban, nappalikban, étkezőkben és sötétebb közlekedőkben
              is előnyösek lehetnek.
            </p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Nyíló és helytakarékos ajtómegoldások</h2>
            <p className={styles.blockDesc}>
              A hagyományos nyíló beltéri ajtók mellett keskeny közlekedők,
              kisebb szobák, gardróbok vagy speciális alaprajzok esetén tolóajtó
              vagy más helytakarékos megoldás is szóba jöhet. A falak, a
              burkolatok, az ajtónyílás és a használati mód alapján segítünk
              választani.
            </p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Több gyártó, széles választék</h2>
            <p className={styles.blockDesc}>
              Nem egyetlen gyártó vagy ajtótípus kínálatából dolgozunk. Ez
              lehetőséget ad arra, hogy a kívánt megjelenéshez, műszaki
              tartalomhoz és költségkerethez igazodva keressük meg a megfelelő
              beltéri ajtót. A részletes lehetőségeket a katalógusok és a
              személyes egyeztetés segítik.
            </p>
          </div>

          {/* ── Ajtótervező szekció (a tartalom részeként, azonos háttérrel) ── */}
          <div className={styles.configuratorBlock}>
            <div className={styles.configuratorCard}>
              <div className={styles.configuratorIconWrap}>
                <PenTool size={26} aria-hidden="true" />
              </div>
              <div className={styles.configuratorContent}>
                <h2 className={styles.configuratorTitle}>Tervezd meg saját beltéri ajtódat</h2>
                <p className={styles.configuratorText}>
                  Szeretnéd előre látni, hogyan mutatna az elképzelésed az otthonodban?
                  Partnerünk, a <strong>Full Doors</strong> online ajtótervezőjének segítségével
                  különböző modelleket, színeket és kialakításokat próbálhatsz ki néhány kattintással.
                </p>
                <p className={styles.configuratorText}>
                  A konfigurátor segít az ötletelésben és a megfelelő stílus kiválasztásában,
                  ezt követően pedig mi segítünk megtalálni a számodra legjobb megoldást,
                  valamint elkészítjük személyre szabott ajánlatodat.
                </p>
                
                <a
                  href="https://configurator.full.co.hu/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn--primary ${styles.configuratorAction}`}
                  onClick={handleConfiguratorClick}
                >
                  Full Doors ajtótervező megnyitása
                </a>

                <p className={styles.configuratorNote}>
                  *A konfigurátor jelenleg a Full Doors termékcsaládhoz érhető el.
                  Más gyártók termékeinek kiválasztásában személyes tanácsadással segítünk.
                </p>
              </div>
            </div>

            {clickedDesigner && (
              <div className={styles.returnCard}>
                <div className={styles.returnTextWrap}>
                  <h3 className={styles.returnTitle}>Elkészült az elképzelésed?</h3>
                  <p className={styles.returnText}>
                    Küldj ajánlatkérést, vagy hívj minket bizalommal, és segítünk kiválasztani a
                    megfelelő típust, méretet és műszaki megoldást.
                  </p>
                </div>
                <button
                  className={`btn btn--primary ${styles.returnAction}`}
                  onClick={scrollToContact}
                >
                  Ajánlatot kérek
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <CatalogSection items={catalogs} />
      <div ref={contactRef}>
        <CtaBanner title="Kérd személyre szabott ajánlatunkat" primaryLabel="Ajánlatot kérek" />
      </div>
    </>
  );
};
