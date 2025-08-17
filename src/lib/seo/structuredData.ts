import { Locale, brandNames } from '@/i18n/config';

export interface BusinessData {
  name: string;
  description: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone?: string;
  email?: string;
  url: string;
  sameAs?: string[];
}

export function generateLocalBusinessLD(locale: Locale, data: Partial<BusinessData> = {}) {
  const baseUrl = 'https://hoopersvendeghaz.hu';
  const brandName = brandNames[locale];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: data.name || brandName,
    description: data.description || 'Modern guesthouse in the heart of Eger, Hungary. Comfortable rooms with excellent service.',
    url: data.url || `${baseUrl}/${locale}`,
    telephone: data.telephone || '+36-1-234-5678',
    email: data.email || 'info@hoopersvendeghaz.hu',
    address: data.address || {
      '@type': 'PostalAddress',
      streetAddress: 'Placeholder Street 123',
      addressLocality: 'Eger',
      postalCode: '3300',
      addressCountry: 'HU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 47.9024,
      longitude: 20.3767
    },
    priceRange: '$$',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'WiFi' },
      { '@type': 'LocationFeatureSpecification', name: 'Parking' },
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning' }
    ],
    sameAs: data.sameAs || [
      'https://booking.com',
      'https://szallas.hu'
    ]
  };

  return JSON.stringify(structuredData, null, 2);
}

export function generateBreadcrumbLD(locale: Locale, items: Array<{ name: string; url: string }>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return JSON.stringify(structuredData, null, 2);
}
