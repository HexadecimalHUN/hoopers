import { notFound } from 'next/navigation';
import { isValidLocale, Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import AboutHero from '@/components/about/AboutHero';
import HistorySection from '@/components/about/HistorySection';
import PortraitGallery from '@/components/about/PortraitGallery';
import CtaSection from '@/components/about/CtaSection';
import BookNowSection from '@/components/about/BookNowSection';

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  const dictionary = await getDictionary(locale as Locale);

  return (
    <>
      <AboutHero dictionary={dictionary} />
      <HistorySection dictionary={dictionary} />
      <PortraitGallery dictionary={dictionary} />
      <CtaSection locale={locale as Locale} dictionary={dictionary} />
      <BookNowSection locale={locale as Locale} dictionary={dictionary} />
    </>
  );
}
