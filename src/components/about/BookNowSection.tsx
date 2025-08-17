import Link from 'next/link';
import { Section } from '@/components/common/Section';
import { Button } from '@/components/common/Button';
import { Heading } from '@/components/common/Heading';
import { Locale } from '@/i18n/config';

interface Dictionary {
  about?: {
    bookNow?: {
      title?: string;
    };
  };
  hero?: {
    bookingCom?: string;
    szallasHu?: string;
  };
}

export default function BookNowSection({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <Section background="surface" padding="xl">
      <div className="max-w-3xl mx-auto text-center">
        <Heading level={2} className="mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">
            {dictionary.about?.bookNow?.title || 'Book your stay now'}
          </span>
        </Heading>
        <div className="flex items-center justify-center gap-4">
          <Link href="https://www.booking.com/hotel/hu/hooper-39-s-vendeghaz.hu.html" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-gradient-to-r from-primary to-chocolate-martini text-white hover:from-primary-hover hover:to-chocolate-martini/90 border border-white/10">
              {dictionary.hero?.bookingCom || 'Book on Booking.com'}
            </Button>
          </Link>
          <Link href="https://szallas.hu/hooper-s-vendeghaz-eger" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="btn-glass">
              {dictionary.hero?.szallasHu || 'Book on Szallas.hu'}
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
