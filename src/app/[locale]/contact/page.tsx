import { notFound } from 'next/navigation';
import { isValidLocale, Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import ContactHero from '@/components/contact/ContactHero';
import ContactDetails from '@/components/contact/ContactDetails';
import { Section } from '@/components/common/Section';
import Map from '@/components/contact/Map';

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  const dictionary = await getDictionary(locale as Locale);

  const address = 'Bem tábornok tér 2, Eger, Hungary';
  // Default to Eger center if not specified
  const lat = Number(process.env.NEXT_PUBLIC_CONTACT_LAT ?? 47.9025);
  const lng = Number(process.env.NEXT_PUBLIC_CONTACT_LNG ?? 20.3772);

  return (
    <>
      <ContactHero dictionary={dictionary} />
      <ContactDetails dictionary={dictionary} />

      <Section padding="xl">
        <div className="max-w-5xl mx-auto">
          <Map lat={lat} lng={lng} zoom={15} address={address} />
        </div>
      </Section>
    </>
  );
}
