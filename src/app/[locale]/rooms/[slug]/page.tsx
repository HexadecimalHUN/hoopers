import { notFound } from 'next/navigation';
import { getDictionary } from '@/i18n/getDictionary';
import { isValidLocale, Locale } from '@/i18n/config';
import { Section } from '@/components/common/Section';
import { RoomDetail } from '@/components/rooms/RoomDetail';

interface RoomPageProps {
  params: Promise<{ locale: string; slug: 'room1' | 'room2' | 'room3' }>
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  if (!['room1', 'room2', 'room3'].includes(slug)) notFound();

  const dictionary = await getDictionary(locale as Locale);

  return (
    <Section padding="xl">
      <RoomDetail locale={locale as Locale} dictionary={dictionary} slug={slug} />
    </Section>
  );
}
