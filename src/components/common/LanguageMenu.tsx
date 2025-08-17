'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { locales, localeNames, Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface LanguageMenuProps {
  currentLocale: Locale;
  className?: string;
  variant?: 'header' | 'mobile';
}

const flagMap = {
  hu: '/flags/hu.svg',
  en: '/flags/en.svg', 
  de: '/flags/de.svg',
  pl: '/flags/pl.svg'
};

const countryMap = {
  hu: 'HU',
  en: 'EN',
  de: 'DE', 
  pl: 'PL'
};

export function LanguageMenu({ currentLocale, className, variant = 'header' }: LanguageMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLocaleChange = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  if (variant === 'mobile') {
    return (
      <div className={cn('grid grid-cols-4 gap-2', className)}>
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className={cn(
              'flex items-center justify-center p-3 rounded-lg transition-all duration-200',
              'border border-border hover:border-primary',
              currentLocale === locale 
                ? 'bg-primary text-background border-primary' 
                : 'bg-surface hover:bg-surface-elevated'
            )}
          >
            <img
              src={flagMap[locale]}
              alt={localeNames[locale]}
              className="w-6 h-4 object-cover rounded-sm"
            />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={menuRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200',
          'bg-surface hover:bg-surface-elevated border border-border hover:border-primary',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          isOpen && 'bg-surface-elevated border-primary'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img
          src={flagMap[currentLocale]}
          alt={localeNames[currentLocale]}
          className="w-5 h-3.5 object-cover rounded-sm"
        />
        <span className="text-sm font-medium text-foreground">
          {countryMap[currentLocale]}
        </span>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={cn(
            'w-3 h-3 text-text-muted transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div 
          className={cn(
            'absolute top-full right-0 mt-2 py-2 w-48 z-50',
            'bg-background border border-border rounded-lg shadow-lg',
            'animate-in fade-in-0 zoom-in-95 duration-200'
          )}
        >
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                'hover:bg-surface focus:bg-surface focus:outline-none',
                currentLocale === locale && 'bg-surface-elevated'
              )}
            >
              <img
                src={flagMap[locale]}
                alt={localeNames[locale]}
                className="w-6 h-4 object-cover rounded-sm"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {localeNames[locale]}
                </span>
                <span className="text-xs text-text-muted">
                  {countryMap[locale]}
                </span>
              </div>
              {currentLocale === locale && (
                <FontAwesomeIcon 
                  icon={faGlobe} 
                  className="w-4 h-4 text-primary ml-auto"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
