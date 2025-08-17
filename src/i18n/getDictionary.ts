import { Locale } from './config';

const dictionaries = {
  hu: () => import('./locales/hu.json').then((module) => module.default),
  en: () => import('./locales/en.json').then((module) => module.default),
  de: () => import('./locales/de.json').then((module) => module.default),
  pl: () => import('./locales/pl.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
