// Szépít-Lak – Konverziós eseménynevek és hook
// Az első (helyi) verzióban csak console.log-ot írunk.
// Élesítéskor ez a hook köthető be a GTM dataLayer-be.

export const CONVERSION_EVENTS = {
  PHONE_CLICK: 'phone_click',
  QUOTE_CTA_CLICK: 'quote_cta_click',
  CONTACT_FORM_START: 'contact_form_start',
  CONTACT_FORM_TEST_SUBMIT: 'contact_form_test_submit',
  CALLBACK_FORM_OPEN: 'callback_form_open',
  CALLBACK_FORM_TEST_SUBMIT: 'callback_form_test_submit',
  SERVICE_CARD_CLICK: 'service_card_click',
  CATALOG_PDF_CLICK: 'catalog_pdf_click',
  REFERENCE_SLIDER_INTERACTION: 'reference_slider_interaction',
  OUTBOUND_LINK_CLICK: 'outbound_link_click',
} as const;

export type ConversionEventName =
  (typeof CONVERSION_EVENTS)[keyof typeof CONVERSION_EVENTS];

export interface ConversionEventPayload {
  event: ConversionEventName;
  [key: string]: unknown;
}

/**
 * Konverziós esemény küldése.
 * Tesztmódban: console.log.
 * Élesítéskor: window.dataLayer.push(payload) stb.
 */
export function trackEvent(payload: ConversionEventPayload): void {
  // --- TESZTMÓD ---
  console.log('[Szépít-Lak Analytics – TEST]', payload);

  // --- ÉLESÍTÉSKOR aktiválni: ---
  // if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
  //   (window as any).dataLayer.push(payload);
  // }
}
