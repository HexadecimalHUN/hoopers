import Link from 'next/link';
import { Logo } from './Logo';
import { Container } from './Container';
import { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface FooterProps {
  locale: Locale;
  dictionary: any;
  className?: string;
}

export function Footer({ locale, dictionary, className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('bg-surface border-t border-border', className)}>
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <Logo locale={locale} size="lg" className="mb-4" />
              <p className="text-text-muted max-w-md">
                {dictionary.hero?.subtitle || 'Experience the magical atmosphere of Eger in our modern guesthouse.'}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">
                {dictionary.nav?.rooms || 'Quick Links'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href={`/${locale}/rooms`}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {dictionary.nav?.rooms || 'Rooms'}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/gallery`}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {dictionary.nav?.gallery || 'Gallery'}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/about`}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {dictionary.nav?.about || 'About'}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/contact`}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {dictionary.nav?.contact || 'Contact'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Booking Links */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">
                {dictionary.rooms?.bookNow || 'Book Now'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://booking.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    Booking.com
                  </a>
                </li>
                <li>
                  <a 
                    href="https://szallas.hu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    Szallas.hu
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+36-1-234-5678"
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {dictionary.contact?.phone || 'Phone'}
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:info@hoopersvendeghaz.hu"
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {dictionary.contact?.email || 'Email'}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-muted text-sm">
              © {currentYear} Hoopers Vendégház. {dictionary.footer?.rights || 'All rights reserved'}.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link 
                href={`/${locale}/privacy`}
                className="text-text-muted hover:text-primary transition-colors text-sm"
              >
                {dictionary.cookie?.privacy || 'Privacy Policy'}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
