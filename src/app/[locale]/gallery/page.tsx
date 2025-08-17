import { notFound } from 'next/navigation';
import { isValidLocale, Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { Section } from '@/components/common/Section';
import GalleryGrid from '@/components/gallery/GalleryGrid';

interface GalleryPageProps {
  params: Promise<{ locale: string }>
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  const dictionary = await getDictionary(locale as Locale);

  return (
    <Section padding="xl">
      <GalleryGrid dictionary={dictionary} />
    </Section>
  );
}
