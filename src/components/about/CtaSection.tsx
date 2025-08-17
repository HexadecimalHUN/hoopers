import Link from 'next/link';
import { Section } from '@/components/common/Section';
import { Button } from '@/components/common/Button';
import { Heading } from '@/components/common/Heading';
import { Locale } from '@/i18n/config';

interface Dictionary {
  about?: Record<string, any>;
}

export default function CtaSection({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <Section background="elevated" padding="xl">
      <div className="max-w-3xl mx-auto text-center">
        <Heading level={2} className="mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">
            {dictionary.about?.cta?.title || 'Ready to experience Eger with us?'}
          </span>
        </Heading>
        <div className="flex items-center justify-center gap-4">
          <Link href={`/${locale}/rooms`}>
            <Button size="lg" className="bg-gradient-to-r from-primary to-chocolate-martini text-white hover:from-primary-hover hover:to-chocolate-martini/90 border border-white/10">
              {dictionary.about?.cta?.viewRooms || 'View Rooms'}
            </Button>
          </Link>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" variant="secondary" className="btn-glass">
              {dictionary.about?.cta?.contactUs || 'Contact Us'}
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
