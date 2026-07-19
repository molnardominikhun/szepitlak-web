import React, { useState, useRef, useEffect } from 'react';
import styles from './FloatingCallbackButton.module.css';
import { PhoneCall, X } from 'lucide-react';
import { CallbackForm } from '../forms/CallbackForm';
import { useConversionEvent } from '../../hooks/useConversionEvent';
import { CONVERSION_EVENTS } from '../../utils/analytics';

export const FloatingCallbackButton: React.FC = () => {
  const { track } = useConversionEvent();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const openPanel = () => {
    setOpen(true);
    track(CONVERSION_EVENTS.CALLBACK_FORM_OPEN, {});
  };

  const closePanel = () => {
    setOpen(false);
    btnRef.current?.focus();
  };

  // ESC bezárás
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Fókuszcsapda a panelben
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'button, input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className={styles.backdrop}
          onClick={closePanel}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="Visszahíváskérő"
        >
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Visszahívást kérek</h2>
              <p className={styles.panelDesc}>
                Add meg az elérhetőséged, és hamarosan felvesszük veled a
                kapcsolatot.
              </p>
            </div>
            <button
              className={styles.closeBtn}
              onClick={closePanel}
              aria-label="Visszahíváskérő bezárása"
            >
              <X size={18} />
            </button>
          </div>
          <CallbackForm onSuccess={closePanel} />
        </div>
      )}

      {/* Lebegő gomb */}
      <button
        ref={btnRef}
        className={styles.fab}
        onClick={openPanel}
        aria-label="Visszahívást kérek"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <PhoneCall size={20} aria-hidden="true" />
        <span className={styles.fabLabel}>Visszahívást kérek</span>
      </button>
    </>
  );
};
