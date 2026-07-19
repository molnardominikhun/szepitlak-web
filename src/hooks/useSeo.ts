import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
}

/**
 * SEO hook – frissíti a document title-t és meta description-t.
 * react-helmet-async helyett (nem kompatibilis React 19-gyel).
 */
export function useSeo({ title, description, canonical }: SeoProps): void {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Canonical
    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
  }, [title, description, canonical]);
}
