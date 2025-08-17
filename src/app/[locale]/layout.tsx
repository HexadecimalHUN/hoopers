import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { CookieBanner } from "@/components/cookie/CookieBanner";
import { getDictionary } from "@/i18n/getDictionary";
import { isValidLocale, locales, brandNames, Locale } from "@/i18n/config";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  
  if (!isValidLocale(locale)) {
    return {};
  }

  const dictionary = await getDictionary(locale);
  const brandName = brandNames[locale];

  const title = `${brandName} - ${dictionary.hero?.subtitle || 'Modern Guesthouse in Eger'}`;
  const description = dictionary.hero?.subtitle || 'Experience the magical atmosphere of Eger in our modern guesthouse. Comfortable rooms and excellent service await you.';

  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = `https://hoopersvendeghaz.hu/${loc}`;
  });

  return {
    title,
    description,
    keywords: "guesthouse, Eger, Hungary, accommodation, rooms, vendégház",
    authors: [{ name: brandName }],
    robots: "index, follow",
    alternates: {
      canonical: `https://hoopersvendeghaz.hu/${locale}`,
      languages: alternateLanguages,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'hu' ? 'hu_HU' : locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : 'pl_PL',
      url: `https://hoopersvendeghaz.hu/${locale}`,
      siteName: brandName,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header locale={locale} dictionary={dictionary} />
      <main className="flex-1">
        {children}
      </main>
      <Footer locale={locale} dictionary={dictionary} />
      <CookieBanner locale={locale} dictionary={dictionary} />
    </div>
  );
}
