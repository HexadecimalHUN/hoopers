export const locales = ['hu', 'en', 'de', 'pl'] as const;
export const defaultLocale = 'hu' as const;

export type Locale = (typeof locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export const localeNames: Record<Locale, string> = {
  hu: 'Magyar',
  en: 'English',
  de: 'Deutsch',
  pl: 'Polski',
};

export const brandNames: Record<Locale, string> = {
  hu: 'Hoopers Vendégház',
  en: 'Hoopers Guesthouse',
  de: 'Hoopers Gästehaus',
  pl: 'Hoopers Pensjonat',
};
