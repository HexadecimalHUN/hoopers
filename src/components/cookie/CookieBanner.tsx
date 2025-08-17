'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import { Text } from '@/components/common/Text';
import { Container } from '@/components/common/Container';
import { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface CookieBannerProps {
  locale: Locale;
  dictionary: any;
}

export function CookieBanner({ locale, dictionary }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 bg-surface-elevated border-t border-border shadow-lg z-50',
      'transform transition-transform duration-300',
      isVisible ? 'translate-y-0' : 'translate-y-full'
    )}>
      <Container>
        <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <Text size="sm" className="text-foreground">
              {dictionary.cookie?.message || 'This website uses cookies to improve your experience.'}
              {' '}
              <a 
                href={`/${locale}/privacy`} 
                className="text-primary hover:underline"
              >
                {dictionary.cookie?.privacy || 'Privacy Policy'}
              </a>
            </Text>
          </div>
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleAccept}
            >
              {dictionary.cookie?.accept || 'Accept'}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
