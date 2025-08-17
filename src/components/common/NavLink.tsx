'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  // Active logic:
  // - Home (locale-root) should be active only on exact match
  // - Other links active if exact match or when pathname starts with href plus a segment boundary
  const isHomeLike = /^\/[a-z]{2}(?:\/[a-z]{2})?$/.test(href) || /^\/[a-z]{2}$/.test(href);
  let isActive = false;
  if (isHomeLike) {
    isActive = pathname === href;
  } else {
    isActive = pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <Link
      href={href}
      className={cn(
        'nav-link px-3 py-2 text-sm font-medium transition-colors duration-200',
        'text-foreground hover:text-primary focus:outline-none focus:text-primary',
        isActive && 'text-primary active',
        className
      )}
    >
      {children}
    </Link>
  );
}
