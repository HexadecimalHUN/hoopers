import { notFound } from 'next/navigation';
import { isValidLocale, Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import PrivacyPolicy from '@/components/privacy/PrivacyPolicy';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  const dictionary = await getDictionary(locale as Locale);

  return <PrivacyPolicy dictionary={dictionary} />;
}
