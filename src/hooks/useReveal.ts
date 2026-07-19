import { useEffect, useRef } from 'react';

/**
 * Intersection Observer alapú reveal hook.
 * Az elemre hozzáadja az 'is-visible' CSS-osztályt,
 * amikor az belép a viewport-ba.
 */
export function useReveal<T extends HTMLElement>(
  threshold = 0.15
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
