import { useCallback } from 'react';
import {
  trackEvent,
  type ConversionEventName,
} from '../utils/analytics';

/**
 * Hook a konverziós eseményekhez.
 * Használat: const { track } = useConversionEvent();
 *            track('phone_click', { location: 'header' });
 */
export function useConversionEvent() {
  const track = useCallback(
    (event: ConversionEventName, extra?: Record<string, unknown>) => {
      trackEvent({ event, ...extra });
    },
    []
  );

  return { track };
}
