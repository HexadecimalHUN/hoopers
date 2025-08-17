import { cn } from '@/lib/utils';
import { brandNames, Locale } from '@/i18n/config';

interface LogoProps {
  locale: Locale;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ locale, className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={cn(
      'font-heading font-bold text-foreground',
      sizeClasses[size],
      className
    )}>
      {brandNames[locale]}
    </div>
  );
}
