'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { LanguageMenu } from './LanguageMenu';
import { Logo } from './Logo';
import { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  dictionary: any;
}

export function MobileMenu({ isOpen, onClose, locale, dictionary }: MobileMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const navLinks = [
    { href: `/${locale}`, label: dictionary.nav?.home || 'Home' },
    { href: `/${locale}/rooms`, label: dictionary.nav?.rooms || 'Rooms' },
    { href: `/${locale}/gallery`, label: dictionary.nav?.gallery || 'Gallery' },
    { href: `/${locale}/about`, label: dictionary.nav?.about || 'About' },
    { href: `/${locale}/contact`, label: dictionary.nav?.contact || 'Contact' },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div 
        className={cn(
          'fixed top-0 right-0 h-full w-80 max-w-[90vw] z-50 md:hidden',
          'bg-background border-l border-border shadow-xl',
          'transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <Logo locale={locale} size="md" />
          <button
            onClick={onClose}
            className={cn(
              'p-2 rounded-lg transition-colors',
              'text-text-muted hover:text-foreground hover:bg-surface',
              'focus:outline-none focus:ring-2 focus:ring-primary'
            )}
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>

        {/* Language Switcher */}
        <div className="p-6 border-b border-border">
          <h3 className="text-sm font-medium text-text-muted mb-3">
            {dictionary.nav?.language || 'Language'}
          </h3>
          <LanguageMenu currentLocale={locale} variant="mobile" />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'block px-4 py-3 rounded-lg transition-colors',
                    'text-foreground hover:bg-surface hover:text-primary',
                    'focus:outline-none focus:bg-surface focus:text-primary',
                    'font-medium text-lg'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Actions */}
        <div className="p-6 border-t border-border">
          <div className="space-y-3">
            <a
              href="tel:+36-1-234-5678"
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                'text-foreground hover:bg-surface hover:text-primary',
                'focus:outline-none focus:bg-surface focus:text-primary'
              )}
            >
              <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-primary" />
              <span className="font-medium">
                {dictionary.hero?.callUs || 'Call Us'}
              </span>
            </a>
            
            <a
              href="mailto:info@hoopersvendeghaz.hu"
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                'text-foreground hover:bg-surface hover:text-primary',
                'focus:outline-none focus:bg-surface focus:text-primary'
              )}
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-primary" />
              <span className="font-medium">
                {dictionary.hero?.emailUs || 'Email Us'}
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
