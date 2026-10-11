import { company, contact, services } from '@/content/siteContent';
import { SITE_URL } from '@/lib/siteUrl';

/**
 * LocalBusiness structured data, built from content/siteContent.ts.
 * Opening hours and price range are left out on purpose: they would be guesses.
 * Replace the placeholder name, phone, email and address before launch.
 */
export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: company.name,
    description: company.shortDescription,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    telephone: contact.phone.href,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.street,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    areaServed: company.serviceArea,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Security guard services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, description: service.description },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so content can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
