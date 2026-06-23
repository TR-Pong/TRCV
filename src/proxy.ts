import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';
import {
  defaultPublicLocale,
  isPublicLocale,
  LANGUAGE_COOKIE_KEY,
  type PublicLocale,
} from '@/lib/i18n/public-resources';

const PUBLIC_LOCALE_HEADER = 'x-public-locale';

function resolveRequestLocale(request: NextRequest): PublicLocale {
  const queryLocale = request.nextUrl.searchParams.get(LANGUAGE_COOKIE_KEY) ?? undefined;
  if (isPublicLocale(queryLocale)) {
    return queryLocale;
  }

  const cookieLang = request.cookies.get(LANGUAGE_COOKIE_KEY)?.value;
  if (isPublicLocale(cookieLang)) {
    return cookieLang;
  }

  return defaultPublicLocale;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  const publicLocale = resolveRequestLocale(request);
  requestHeaders.set(PUBLIC_LOCALE_HEADER, publicLocale);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (pathname === '/' && request.nextUrl.searchParams.has(LANGUAGE_COOKIE_KEY)) {
    response.cookies.set(LANGUAGE_COOKIE_KEY, publicLocale, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = request.cookies.get('session')?.value;

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await decrypt(session);
      return response;
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (pathname.startsWith('/api/cv') && request.method !== 'GET') {
    const session = request.cookies.get('session')?.value;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      await decrypt(session);
      return response;
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  if (pathname.startsWith('/api/upload') && request.method !== 'GET') {
    const session = request.cookies.get('session')?.value;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      await decrypt(session);
      return response;
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/admin/:path*', '/api/cv/:path*', '/api/upload/:path*'],
};
