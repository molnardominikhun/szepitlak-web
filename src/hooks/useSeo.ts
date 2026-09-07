import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routesSeoData, SITE_URL } from '../data/seoData';

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
}

/**
 * SEO hook – frissíti a document title-t, meta description-t, canonical link-et és OpenGraph tageket.
 */
export function useSeo(props: SeoProps = {}): void {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const defaultData = routesSeoData[path] || routesSeoData['/'];

    const title = props.title || defaultData?.title || 'Szépít-Lak Kft. – Minőségi Nyílászárók Tatabányán';
    const description = props.description || defaultData?.description || 'Nyílászárók, beltéri ajtók, árnyékolástechnika és szúnyoghálók Tatabányán.';
    const canonical = props.canonical || defaultData?.canonicalUrl || `${SITE_URL}${path}`;

    // Document Title
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Canonical link
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    // OG Title
    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = title;

    // OG Description
    let ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description;

    // OG URL
    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = canonical;

  }, [location.pathname, props.title, props.description, props.canonical]);
}
