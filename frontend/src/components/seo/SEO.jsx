import { useEffect } from 'react';

export default function SEO({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogType = 'website',
  schema = null 
}) {
  useEffect(() => {
    // 1. Update document title
    const fullTitle = title 
      ? `${title} | Sukhwal Auto Services - Bhilwara` 
      : 'Sukhwal Auto Services - Specialized Hero Honda Workshop Bhilwara';
    document.title = fullTitle;

    // Helper function to create or update meta tags
    const updateMetaTag = (attr, name, value) => {
      if (!value) return;
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    // 2. Update meta description and keywords
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);

    // 3. Update Open Graph tags
    updateMetaTag('property', 'og:title', fullTitle);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('property', 'og:url', canonical || window.location.href);
    updateMetaTag('property', 'og:image', 'https://sukhwalautoservice.in/assets/logo.jpg');

    // 4. Update Canonical Link
    const canonicalUrl = canonical || window.location.href;
    let linkEl = document.querySelector('link[rel="canonical"]');
    if (!linkEl) {
      linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'canonical');
      document.head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', canonicalUrl);

    // 5. Update JSON-LD Schema
    const scriptId = 'json-ld-schema';
    let scriptEl = document.getElementById(scriptId);
    if (scriptEl) {
      scriptEl.remove();
    }

    // Default LocalBusiness schema
    const defaultLocalBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      "name": "Sukhwal Auto Services",
      "image": "https://sukhwalautoservice.in/assets/logo.jpg",
      "@id": "https://sukhwalautoservice.in/#localbusiness",
      "url": "https://sukhwalautoservice.in",
      "telephone": "+919413757303",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop no. 2, Near TB Hospital, Manikya Nagar",
        "addressLocality": "Bhilwara",
        "addressRegion": "Rajasthan",
        "postalCode": "311001",
        "addressCountry": "IN"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "19:30"
      },
      "sameAs": [
        "https://maps.app.goo.gl/fMkj48yBKgKGPyNy9"
      ]
    };

    const targetSchema = schema || defaultLocalBusinessSchema;

    scriptEl = document.createElement('script');
    scriptEl.id = scriptId;
    scriptEl.type = 'application/ld+json';
    scriptEl.text = JSON.stringify(targetSchema);
    document.head.appendChild(scriptEl);

    // Cleanup on unmount (optional, but keep it clean)
    return () => {
      // We don't necessarily have to remove canonical/meta tags, but we can clean up schema if desired
    };
  }, [title, description, keywords, canonical, ogType, schema]);

  return null;
}
