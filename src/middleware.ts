import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Locales supported by the app and the default locale
const supportedLocales = ['hu', 'en', 'de', 'pl'] as const;
const defaultLocale = 'hu';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, API, and Next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/');
  const first = segments[1];

  // If no locale segment, redirect to default locale preserving the rest of the path
  if (!supportedLocales.includes(first as any)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all paths except for static files and Next internals
  matcher: ['/((?!_next|.*\..*|api).*)'],
};
