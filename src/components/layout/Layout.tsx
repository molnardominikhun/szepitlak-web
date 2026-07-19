import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBottomBar } from './MobileBottomBar';
import { FloatingCallbackButton } from './FloatingCallbackButton';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();

  // Kapcsolat oldalon a lebegő gomb felesleges, mert az űrlap ott van
  const showFloating = pathname !== '/kapcsolat';

  return (
    <>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomBar />
      {showFloating && <FloatingCallbackButton />}
    </>
  );
};
