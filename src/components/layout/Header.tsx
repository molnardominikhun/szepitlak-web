import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.css';
import { navItems, PHONE_LINK, PHONE_NUMBER } from '../../data/navigation';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { useConversionEvent } from '../../hooks/useConversionEvent';
import { CONVERSION_EVENTS } from '../../utils/analytics';

export const Header: React.FC = () => {
  const { track } = useConversionEvent();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLLIElement | null>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement | null>(null);

  // Görgetés figyelés
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ESC billentyű
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Mobilmenü megnyitásakor fókuszt az első elemre
  useEffect(() => {
    if (mobileOpen && firstMenuItemRef.current) {
      firstMenuItemRef.current.focus();
    }
  }, [mobileOpen]);

  // Mobilmenü nyitva: body scroll tiltása
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Kattintás a menün kívülre → dropdown bezárása
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const closeAll = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={closeAll} aria-label="Szépít-Lak Kft. – Főoldal">
          <img
            src="/images/brand/szepit-lak-logo.png"
            alt="Szépít-Lak Kft. embléma"
            className={styles.logoImg}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className={styles.logoText}>
            Szépít-Lak<span className={styles.logoKft}>Kft.</span>
          </span>
        </Link>

        {/* Desktop navigáció */}
        <nav className={styles.desktopNav} aria-label="Főnavigáció">
          <ul className={styles.navList} role="list">
            {navItems.map((item) =>
              item.children ? (
                <li key={item.href} ref={dropdownRef} className={styles.navItem}>
                  <div className={styles.dropdownWrapper}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                      }
                    >
                      {item.label}
                    </NavLink>
                    <button
                      className={styles.dropdownTrigger}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                      aria-label="Almenü megnyitása"
                      onClick={() => setDropdownOpen((v) => !v)}
                    >
                      <ChevronDown
                        size={14}
                        className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`}
                      />
                    </button>
                  </div>
                  {dropdownOpen && (
                    <ul className={styles.dropdown} role="list">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavLink
                            to={child.href}
                            className={({ isActive }) =>
                              `${styles.dropdownItem} ${isActive ? styles.dropdownItemActive : ''}`
                            }
                            onClick={() => setDropdownOpen(false)}
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href} className={styles.navItem}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                    }
                    end={item.href === '/'}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Desktop CTA-k */}
        <div className={styles.desktopCta}>
          <a
            href={PHONE_LINK}
            className={styles.phoneLink}
            onClick={() => track(CONVERSION_EVENTS.PHONE_CLICK, { location: 'header' })}
            aria-label={`Hívás: ${PHONE_NUMBER}`}
          >
            <Phone size={15} aria-hidden="true" />
            {PHONE_NUMBER}
          </a>
          <Link
            to="/kapcsolat"
            className="btn btn--primary"
            onClick={() => track(CONVERSION_EVENTS.QUOTE_CTA_CLICK, { location: 'header' })}
          >
            Ajánlatkérés
          </Link>
        </div>

        {/* Hamburger (mobil) */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Menü bezárása' : 'Menü megnyitása'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobil navigáció */}
      {mobileOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={(e) => { if (e.target === e.currentTarget) closeAll(); }}
          aria-modal="true"
        >
          <nav
            id="mobile-nav"
            ref={navRef}
            className={styles.mobileNav}
            aria-label="Mobil főnavigáció"
          >
            <ul role="list" className={styles.mobileNavList}>
              {navItems.map((item, i) => (
                <React.Fragment key={item.href}>
                  <li>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                      }
                      onClick={closeAll}
                      ref={i === 0 ? firstMenuItemRef : undefined}
                      end={item.href === '/'}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                  {item.children?.map((child) => (
                    <li key={child.href} className={styles.mobileSubItem}>
                      <NavLink
                        to={child.href}
                        className={({ isActive }) =>
                          `${styles.mobileSubLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                        }
                        onClick={closeAll}
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </React.Fragment>
              ))}
            </ul>
            <div className={styles.mobileCta}>
              <a
                href={PHONE_LINK}
                className="btn btn--outline"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => { track(CONVERSION_EVENTS.PHONE_CLICK, { location: 'mobile_nav' }); closeAll(); }}
              >
                <Phone size={16} /> {PHONE_NUMBER}
              </a>
              <Link
                to="/kapcsolat"
                className="btn btn--primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => { track(CONVERSION_EVENTS.QUOTE_CTA_CLICK, { location: 'mobile_nav' }); closeAll(); }}
              >
                Ajánlatkérés
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
