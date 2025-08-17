'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Logo } from './Logo';
import { NavLink } from './NavLink';
import { LanguageMenu } from './LanguageMenu';
import { MobileMenu } from './MobileMenu';
import { Container } from './Container';
import { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface HeaderProps {
  locale: Locale;
  dictionary: any;
  className?: string;
}

export function Header({ locale, dictionary, className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: dictionary.nav?.home || 'Home' },
    { href: `/${locale}/rooms`, label: dictionary.nav?.rooms || 'Rooms' },
    { href: `/${locale}/gallery`, label: dictionary.nav?.gallery || 'Gallery' },
    { href: `/${locale}/about`, label: dictionary.nav?.about || 'About' },
    { href: `/${locale}/contact`, label: dictionary.nav?.contact || 'Contact' },
  ];

  return (
    <>
      <header 
        className={cn(
          'sticky top-0 z-40 border-b border-border/50',
          'bg-surface-glass backdrop-blur-md supports-[backdrop-filter]:bg-surface-glass/80',
          className
        )}
      >
        <Container>
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <NavLink href={`/${locale}`}>
                <Logo locale={locale} size="lg" />
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Contact Icons - Desktop Only */}
              <div className="hidden md:flex items-center gap-2">
                <a
                  href="tel:+36-1-234-5678"
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    'text-text-muted hover:text-primary hover:bg-surface',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                  )}
                  title={dictionary.hero?.callUs || 'Call Us'}
                >
                  <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                </a>
                
                <a
                  href="mailto:info@hoopersvendeghaz.hu"
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    'text-text-muted hover:text-primary hover:bg-surface',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                  )}
                  title={dictionary.hero?.emailUs || 'Email Us'}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                </a>
              </div>

              {/* Language Switcher - Desktop */}
              <div className="hidden md:block">
                <LanguageMenu currentLocale={locale} />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  'md:hidden p-2 rounded-lg transition-colors',
                  'text-text-muted hover:text-foreground hover:bg-surface',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                )}
                aria-label="Open mobile menu"
              >
                <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        locale={locale}
        dictionary={dictionary}
      />
    </>
  );
}
