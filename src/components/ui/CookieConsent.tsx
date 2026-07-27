import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookieConsent.module.css';

/* ──────────────────────────────────────────────────────────
   Consent categories stored in localStorage
   ────────────────────────────────────────────────────────── */
interface ConsentState {
  necessary: true;           // always on
  analytics: boolean;        // Google Analytics via GTM
  marketing: boolean;        // Google Ads via GTM
}

const STORAGE_KEY = 'szepitlak_cookie_consent';

function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

function writeConsent(consent: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

/* Push Google Consent Mode v2 update via dataLayer */
function pushConsentUpdate(consent: ConsentState) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];

  const updatePayload = {
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
    analytics_storage: consent.analytics ? 'granted' : 'denied',
  };

  if (typeof w.gtag === 'function') {
    w.gtag('consent', 'update', updatePayload);
  } else {
    w.dataLayer.push(['consent', 'update', updatePayload]);
  }
}

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */
export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      // User already consented → push stored preferences
      pushConsentUpdate(existing);
    } else {
      // No consent yet → show banner
      setVisible(true);
    }
  }, []);

  const save = useCallback((consent: ConsentState) => {
    writeConsent(consent);
    pushConsentUpdate(consent);
    setVisible(false);
  }, []);

  const handleAcceptAll = useCallback(() => {
    save({ necessary: true, analytics: true, marketing: true });
  }, [save]);

  const handleSaveSelected = useCallback(() => {
    save({ necessary: true, analytics, marketing });
  }, [save, analytics, marketing]);

  const handleRejectAll = useCallback(() => {
    save({ necessary: true, analytics: false, marketing: false });
  }, [save]);

  if (!visible) return null;

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.banner} role="dialog" aria-label="Cookie beállítások" id="cookie-consent-banner">
        <div className={styles.title}>
          <span className={styles.icon}>🍪</span>
          Süti beállítások
        </div>

        <p className={styles.description}>
          Weboldalunk sütiket használ a működéshez, a forgalom elemzéséhez (Google Analytics)
          és hirdetési célokra (Google Ads). A feltétlenül szükséges sütik a weboldal alapvető
          működéséhez kellenek – ezek nem kapcsolhatók ki. Az analitikai és marketing sütiket
          az Ön hozzájárulásával aktiváljuk.{' '}
          <Link to="/cookie-tajekoztato">Részletes süti tájékoztató →</Link>
        </p>

        <div className={styles.toggles}>
          {/* Necessary – always on */}
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>
              Szükséges sütik
              <span className={styles.toggleHint}>(mindig aktív)</span>
            </span>
            <label className={styles.switch}>
              <input type="checkbox" checked disabled />
              <span className={styles.slider} />
            </label>
          </div>

          {/* Analytics */}
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>Analitikai sütik</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                id="consent-analytics"
              />
              <span className={styles.slider} />
            </label>
          </div>

          {/* Marketing */}
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>Marketing sütik</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                id="consent-marketing"
              />
              <span className={styles.slider} />
            </label>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.btnAcceptAll} onClick={handleAcceptAll} id="consent-accept-all">
            Összes elfogadása
          </button>
          <button className={styles.btnSave} onClick={handleSaveSelected} id="consent-save">
            Kiválasztottak mentése
          </button>
          <button className={styles.btnReject} onClick={handleRejectAll} id="consent-reject">
            Elutasítás
          </button>
        </div>
      </div>
    </>
  );
};
