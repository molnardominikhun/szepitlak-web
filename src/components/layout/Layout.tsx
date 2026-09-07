import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingCallbackButton } from './FloatingCallbackButton';
import { CookieConsent } from '../ui/CookieConsent';
import { useSeo } from '../../hooks/useSeo';

export const Layout: React.FC = () => {
  const { pathname, search } = useLocation();

  // Automatikus SEO metaadat frissítés (title, description, canonical URL, OG tégek)
  useSeo();

  // Route váltáskor: görgetés az oldal tetejére + GA4 / dataLayer page_view esemény küldése
  useEffect(() => {
    window.scrollTo(0, 0);

    const fullUrl = window.location.href;
    const pagePath = pathname + search;

    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: unknown[];
    };

    if (typeof w.gtag === 'function') {
      w.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: fullUrl,
        page_path: pagePath,
      });
    }

    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({
        event: 'page_view',
        page_title: document.title,
        page_location: fullUrl,
        page_path: pagePath,
      });
    }
  }, [pathname, search]);

  // Kapcsolat oldalon a lebegő gomb felesleges, mert az űrlap ott van
  const showFloating = pathname !== '/kapcsolat';

  return (
    <>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      {showFloating && <FloatingCallbackButton />}
      <CookieConsent />
    </>
  );
};
