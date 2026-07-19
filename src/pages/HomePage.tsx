import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import { useSeo } from '../hooks/useSeo';
import { useReveal } from '../hooks/useReveal';
import { services } from '../data/services';
import { references } from '../data/references';
import { ServiceCard } from '../components/ui/ServiceCard';
import { ReferenceSlider } from '../components/ui/ReferenceSlider';
import { CtaBanner } from '../components/ui/CtaBanner';
import { Phone, CheckCircle, ClipboardList, Wrench, MessageCircle } from 'lucide-react';
import { useConversionEvent } from '../hooks/useConversionEvent';
import { CONVERSION_EVENTS } from '../utils/analytics';
import { PHONE_LINK, PHONE_NUMBER } from '../data/navigation';

const TrustItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className={styles.trustItem}>
    <CheckCircle size={14} className={styles.trustIcon} aria-hidden="true" />
    {children}
  </li>
);

const processSteps = [
  { icon: MessageCircle, label: 'Kapcsolatfelvétel', desc: 'Írd meg, miben segíthetünk, vagy hívj minket!' },
  { icon: ClipboardList, label: 'Egyeztetés és felmérés', desc: 'Átbeszéljük az igényeidet, és szükség esetén helyszíni felmérést végzünk.' },
  { icon: CheckCircle, label: 'Átlátható ajánlat', desc: 'Személyre szabott ajánlatot készítünk, rejtett költségek nélkül.' },
  { icon: Wrench, label: 'Precíz kivitelezés', desc: 'A megbeszélt időpontban, pontosan és szakszerűen elvégezzük a munkát.' },
];

export const HomePage: React.FC = () => {
  useSeo({
    title: 'Szépít-Lak Kft. – Nyílászárók, beltéri ajtók, árnyékolástechnika, szúnyoghálók Tatabányán',
    description:
      'Komplett nyílászáró-, beltéri ajtó-, árnyékolástechnikai és szúnyogháló-megoldások felméréssel, tanácsadással és precíz beépítéssel Tatabányán és környékén.',
  });
  const { track } = useConversionEvent();
  const heroRef = useReveal<HTMLDivElement>();
  const trustRef = useReveal<HTMLElement>();
  const servicesRef = useReveal<HTMLElement>();
  const processRef = useReveal<HTMLElement>();
  const refSliderRef = useReveal<HTMLElement>();
  const aboutRef = useReveal<HTMLElement>();

  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText} ref={heroRef}>
            <p className={styles.heroSlogan}>Ahol a minőség ajtót nyit.</p>
            <h1 className={styles.heroH1}>
              Komplett nyílászáró&#8209;megoldások kompromisszumok nélkül
            </h1>
            <p className={styles.heroSubtitle}>
              Ablakok, beltéri ajtók, árnyékolástechnika és szúnyoghálók
              felméréssel, szakmai tanácsadással és precíz beépítéssel{' '}
              <strong>Tatabányán és környékén.</strong>
            </p>
            <div className={styles.heroCtas}>
              <Link
                to="/kapcsolat"
                className="btn btn--primary"
                style={{ fontSize: 'var(--text-base)', padding: 'var(--space-4) var(--space-8)' }}
                onClick={() => track(CONVERSION_EVENTS.QUOTE_CTA_CLICK, { location: 'hero' })}
              >
                Kérj ingyenes konzultációt
              </Link>
              <a
                href={PHONE_LINK}
                className="btn btn--outline"
                style={{ fontSize: 'var(--text-base)', padding: 'var(--space-4) var(--space-8)' }}
                onClick={() => track(CONVERSION_EVENTS.PHONE_CLICK, { location: 'hero' })}
                aria-label={`Hívás: ${PHONE_NUMBER}`}
              >
                <Phone size={16} aria-hidden="true" /> Hívj minket
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img
              src="/images/hero/hero-modern-house.png"
              alt="Prémium modern családi ház nagy üvegfelületekkel és beépített minőségi nyílászárókkal"
              className={styles.heroImg}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const ph = e.currentTarget.nextElementSibling as HTMLElement;
                if (ph) ph.style.display = 'flex';
              }}
            />
            <div className={styles.heroPlaceholder} aria-hidden="true" style={{ display: 'none' }}>
              <span>📷</span>
              <span>Hero kép<br /><small>Forrás: /images/hero/hero-modern-house.png</small></span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bizalmi előnysor ── */}
      <section className={styles.trust} ref={trustRef} aria-label="Miért válasszon minket?">
        <div className="container">
          <ul className={styles.trustList}>
            <TrustItem>Tartós, bevált termékek</TrustItem>
            <TrustItem>Átlátható ajánlat</TrustItem>
            <TrustItem>Precíz kivitelezés</TrustItem>
            <TrustItem>Személyre szabott tanácsadás</TrustItem>
          </ul>
        </div>
      </section>

      {/* ── Szolgáltatások kártyák ── */}
      <section className={`section ${styles.servicesSection}`} ref={servicesRef}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Szolgáltatásaink</h2>
          <div className={styles.cardsGrid}>
            {services.map((s) => (
              <ServiceCard
                key={s.id}
                id={s.id}
                name={s.name}
                description={s.shortDescription}
                href={s.href}
                imageSrc={s.imageSrc}
                imageAlt={s.imageAlt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Köztes CTA ── */}
      <CtaBanner
        title="Nem tudod még pontosan, melyik megoldás lenne ideális?"
        description="Beszéljük át az elképzelésed, és segítünk megtalálni az otthonodhoz és a költségkeretedhez legjobban illő megoldást."
        primaryLabel="Ingyenes konzultáció"
      />

      {/* ── Hogyan dolgozunk? ── */}
      <section className={`section ${styles.process}`} ref={processRef}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Hogyan dolgozunk?</h2>
          <ol className={styles.steps}>
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.label} className={styles.step}>
                  <div className={styles.stepNum} aria-hidden="true">{i + 1}</div>
                  <Icon size={24} className={styles.stepIcon} aria-hidden="true" />
                  <h3 className={styles.stepTitle}>{step.label}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── Referenciák ── */}
      <section className={`section ${styles.references}`} ref={refSliderRef}>
        <div className="container">
          <div className={styles.refHeader}>
            <h2 className={styles.sectionTitle}>Referenciáink</h2>
            <p className={styles.refSubtitle}>Valódi munkák, tartós megoldások</p>
          </div>
          <ReferenceSlider items={references} />
        </div>
      </section>

      {/* ── Bemutatkozás ── */}
      <section className={`section ${styles.about}`} ref={aboutRef}>
        <div className="container">
          <div className={styles.aboutInner}>
            <div className={styles.aboutImage}>
              <img
                src="/images/services/nyilaszaro/intro-detail.png"
                alt="Prémium minőségű ablakprofil és sarokillesztés részletfotó"
                className={styles.aboutImg}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const ph = e.currentTarget.nextElementSibling as HTMLElement;
                  if (ph) ph.style.display = 'flex';
                }}
              />
              <div className={styles.heroPlaceholder} aria-hidden="true" style={{ display: 'none' }}>
                <span>📷</span>
                <span>Bemutatkozás kép<br /><small>Forrás: /images/services/nyilaszaro/intro-detail.png</small></span>
              </div>
            </div>
            <div className={styles.aboutText}>
              <h2 className={styles.sectionTitle}>Minden otthonhoz más megoldás illik</h2>
              <p>
                A Szépít-Lak komplett nyílászáró-, beltéri ajtó-,
                árnyékolástechnikai és szúnyogháló-megoldásokat kínál a
                felméréstől a szakszerű beépítésig.
              </p>
              <p>
                Több, előzetesen bevált gyártó termékeivel dolgozunk, így mindig
                az adott ingatlanhoz, igényekhez és költségkerethez legjobban
                illő, hosszú távon is megbízható megoldást javasoljuk.
              </p>
              <p>
                Számunkra fontos a pontos munkavégzés, az átlátható ajánlat és a
                személyes kommunikáció. Nem csupán egy ajánlatkérőt látunk
                benned, hanem olyan ügyfelet, akinek a projektjére kiemelt
                figyelmet fordítunk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Záró CTA ── */}
      <CtaBanner
        title="Kezdjük egy kötetlen egyeztetéssel"
        description="Írd meg, milyen megoldást keresel, vagy hívj minket, és segítünk megtalálni az otthonodhoz legjobban illő megoldást."
        primaryLabel="Ajánlatot kérek"
        trustLine="Személyre szabott tanácsadás, átlátható ajánlat és precíz kivitelezés."
        variant="dark"
      />
    </>
  );
};
