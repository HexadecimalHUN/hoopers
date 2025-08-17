import { ReactNode } from 'react';
import type { JSX as JSXNamespace } from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export function Heading({ level, children, className, size }: HeadingProps) {
  const Component = `h${level}` as keyof JSXNamespace.IntrinsicElements;
  
  const defaultSizes = {
    1: '3xl',
    2: '2xl', 
    3: 'xl',
    4: 'lg',
    5: 'md',
    6: 'sm'
  } as const;

  const actualSize = size || defaultSizes[level];

  const sizeClasses = {
    sm: 'text-lg font-semibold',
    md: 'text-xl font-semibold',
    lg: 'text-2xl font-semibold',
    xl: 'text-3xl font-bold',
    '2xl': 'text-4xl font-bold',
    '3xl': 'text-5xl font-bold'
  } as const;

  return (
    <Component className={cn(
      'font-heading text-foreground',
      sizeClasses[actualSize],
      className
    )}>
      {children}
    </Component>
  );
}
