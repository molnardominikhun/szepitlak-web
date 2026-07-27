import React, { useEffect, useRef } from 'react';

interface TurnstileProps {
  siteKey: string;
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

export const TurnstileWidget: React.FC<TurnstileProps> = ({
  siteKey,
  onSuccess,
  onError,
  onExpire,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Store callbacks in refs so changes to inline callback props don't re-trigger useEffect & re-render the Turnstile widget
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    let widgetId: string | null = null;
    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !containerRef.current || !window.turnstile) return;

      // Clean container if it already has child nodes
      containerRef.current.innerHTML = '';

      try {
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            if (onSuccessRef.current) onSuccessRef.current(token);
          },
          'error-callback': () => {
            if (onErrorRef.current) onErrorRef.current();
          },
          'expired-callback': () => {
            if (onExpireRef.current) onExpireRef.current();
          },
        });
      } catch (err) {
        console.error('Turnstile render error:', err);
      }
    };

    // Dynamic Cloudflare Turnstile script injection
    if (!document.getElementById('cloudflare-turnstile-script')) {
      const script = document.createElement('script');
      script.id = 'cloudflare-turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        renderWidget();
      };
      document.body.appendChild(script);
    }

    if (window.turnstile) {
      renderWidget();
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          renderWidget();
        }
      }, 100);
      return () => {
        isMounted = false;
        clearInterval(interval);
        if (widgetId && window.turnstile) {
          try {
            window.turnstile.remove(widgetId);
          } catch (e) {
            // ignore cleanup errors
          }
        }
      };
    }

    return () => {
      isMounted = false;
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  }, [siteKey]);

  return <div ref={containerRef} style={{ minHeight: '65px', marginBlock: 'var(--space-4)' }} />;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}
