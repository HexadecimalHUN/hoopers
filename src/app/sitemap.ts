import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hoopersvendeghaz.hu';
  
  const routes = [
    '',
    '/rooms',
    '/rooms/room1', 
    '/rooms/room2',
    '/rooms/room3',
    '/gallery',
    '/about',
    '/contact',
    '/privacy'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add entries for each locale and route combination
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
