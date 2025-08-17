import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'surface' | 'elevated';
}

export function Section({ 
  children, 
  className, 
  containerSize = 'lg',
  padding = 'lg',
  background = 'default'
}: SectionProps) {
  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24'
  };

  const backgroundClasses = {
    default: '',
    surface: 'bg-surface',
    elevated: 'bg-surface-elevated'
  };

  return (
    <section className={cn(
      paddingClasses[padding],
      backgroundClasses[background],
      className
    )}>
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}
