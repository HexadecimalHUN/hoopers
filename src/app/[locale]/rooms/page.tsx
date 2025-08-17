import { notFound } from 'next/navigation';
import { isValidLocale, Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { Section } from '@/components/common/Section';
import { RoomsGrid } from '@/components/rooms/RoomsGrid';

interface RoomsIndexPageProps {
  params: Promise<{ locale: string }>
}

export default async function RoomsIndexPage({ params }: RoomsIndexPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  const dictionary = await getDictionary(locale as Locale);

  return (
    <Section padding="xl">
      <RoomsGrid locale={locale as Locale} dictionary={dictionary} />
    </Section>
  );
}
