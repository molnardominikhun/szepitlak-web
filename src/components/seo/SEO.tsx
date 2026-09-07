import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routesSeoData, SITE_URL } from '../../data/seoData';

interface SEOProps {
  route?: string;
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

export const SEO: React.FC<SEOProps> = ({ route, title, description, canonicalUrl }) => {
  const location = useLocation();
  const currentPath = route || location.pathname;
  const seoInfo = routesSeoData[currentPath] || routesSeoData['/'];

  const finalTitle = title || seoInfo.title;
  const finalDescription = description || seoInfo.description;
  const finalCanonical = canonicalUrl || seoInfo.canonicalUrl || `${SITE_URL}${currentPath}`;

  useEffect(() => {
    // Update Document Title
    document.title = finalTitle;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', finalDescription);

    // Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', finalCanonical);

    // Update OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', finalTitle);

    // Update OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', finalDescription);

    // Update OG URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', finalCanonical);
  }, [finalTitle, finalDescription, finalCanonical]);

  return null;
};
