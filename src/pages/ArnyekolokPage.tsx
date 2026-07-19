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

export const ArnyekolokPage: React.FC = () => {
  useSeo({
    title: 'Árnyékolástechnikai megoldások Tatabányán – Szépít-Lak Kft.',
    description:
      'Redőnyök, zsalúziák, reluxák és textilárnyékolók felmérése, telepítése Tatabányán és környékén. Kézi és motoros rendszerek.',
  });
  const { track } = useConversionEvent();
  const catalogs = getCatalogsForService('arnyekolok');

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <h1 className={styles.h1}>
              Árnyékolástechnikai megoldások Tatabányán és környékén
            </h1>
            <p className={styles.intro}>
              A megfelelő árnyékolás kényelmesebbé teszi az otthont, segít
              szabályozni a helyiségekbe jutó fényt, és hozzájárulhat a nyári
              felmelegedés csökkentéséhez. Külső és belső árnyékolók felmérésével,
              beszerzésével és telepítésével foglalkozunk.
            </p>
            <div className={styles.heroCtas}>
              <Link to="/kapcsolat" className="btn btn--primary"
                onClick={() => track(CONVERSION_EVENTS.QUOTE_CTA_CLICK, { location: 'arnyekolok_hero' })}>
                Ajánlatot kérek
              </Link>
              <a href={PHONE_LINK} className="btn btn--outline"
                onClick={() => track(CONVERSION_EVENTS.PHONE_CLICK, { location: 'arnyekolok_hero' })}
                aria-label={`Hívás: ${PHONE_NUMBER}`}>
                <Phone size={16} aria-hidden="true" /> Hívj minket
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img
              src="/images/services/arnyekolok/arnyekolok-szolgaltatas.png"
              alt="Modern alumínium zsalúzia külső árnyékoló rendszer egy teraszajtón"
              className={styles.heroImg}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const ph = e.currentTarget.nextElementSibling as HTMLElement;
                if (ph) ph.style.display = 'flex';
              }}
            />
            <div className={styles.placeholder} aria-hidden="true" style={{ display: 'none' }}>
              <span>📷</span>
              <small>Árnyékoló kép<br />/images/services/arnyekolok/arnyekolok-szolgaltatas.png</small>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.content}`}>
        <div className="container">
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Redőnyök</h2>
            <p className={styles.blockDesc}>
              A redőny az egyik legsokoldalúbb külső árnyékolási megoldás.
              Szabályozható vele a fény, növelhető a magánszféra, és bizonyos
              kialakítások az ablak védelméhez, valamint a belső terek nyári
              felmelegedésének mérsékléséhez is hozzájárulhatnak. Műanyag és
              alumínium, kézi vagy motoros működtetésű rendszerek közül segítünk
              választani.
            </p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Zsalúziák</h2>
            <p className={styles.blockDesc}>
              A külső zsalúzia modern megjelenésű árnyékoló, amelynek állítható
              lamellái lehetővé teszik a bejutó fény pontos szabályozását.
              Különösen jól illik nagyobb üvegfelületekhez, modern családi
              házakhoz és új építésű ingatlanokhoz. Többféle lamellakialakítással,
              színben, valamint kézi vagy motoros működtetéssel is elérhető.
            </p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Belső árnyékolók</h2>
            <p className={styles.blockLead}>
              Belső árnyékoláshoz több rendszer közül választhatunk az adott
              helyiség, ablak és igény alapján.
            </p>
            <div className={styles.threeCol}>
              <MaterialCard title="Reluxák" desc="Praktikus, könnyen kezelhető belső árnyékolók, amelyek lamelláival egyszerűen szabályozható a fény iránya és mennyisége." />
              <MaterialCard title="Textilárnyékolók" desc="A roletták, pliszéárnyékolók és más textilalapú rendszerek funkcionális és dekoratív megoldást kínálnak, széles szín-, minta- és anyagválasztékkal." />
              <MaterialCard title="Szalagfüggönyök" desc="Elsősorban nagyobb ablakfelületek, teraszajtók, irodák és üzleti helyiségek árnyékolására alkalmas, rugalmasan állítható rendszer." />
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
