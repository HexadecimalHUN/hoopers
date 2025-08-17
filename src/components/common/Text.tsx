import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TextProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'muted' | 'accent';
  as?: 'p' | 'span' | 'div';
}

export function Text({ 
  children, 
  className, 
  size = 'md', 
  variant = 'default',
  as: Component = 'p'
}: TextProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const variantClasses = {
    default: 'text-foreground',
    muted: 'text-text-muted',
    accent: 'text-primary'
  };

  return (
    <Component className={cn(
      'font-sans leading-relaxed',
      sizeClasses[size],
      variantClasses[variant],
      className
    )}>
      {children}
    </Component>
  );
}
