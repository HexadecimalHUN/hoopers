import { notFound } from "next/navigation";
import { Hero } from "@/components/home/Hero";
import { RoomsPreview } from "@/components/home/RoomsPreview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { AboutPreview } from "@/components/home/AboutPreview";
import { CtaBar } from "@/components/home/CtaBar";
import { getDictionary } from "@/i18n/getDictionary";
import { isValidLocale, Locale } from "@/i18n/config";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dictionary={dictionary} />
      <RoomsPreview locale={locale} dictionary={dictionary} />
      <GalleryPreview locale={locale} dictionary={dictionary} />
      <AboutPreview locale={locale} dictionary={dictionary} />
      <CtaBar locale={locale} dictionary={dictionary} />
    </>
  );
}
