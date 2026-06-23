import type { Metadata, Viewport } from 'next';
import { cookies, headers } from 'next/headers';
import './globals.css';
import { defaultPublicLocale, isPublicLocale, LANGUAGE_COOKIE_KEY } from '@/lib/i18n/public-resources';

const PUBLIC_LOCALE_HEADER = 'x-public-locale';

export const metadata: Metadata = {
  title: 'Tanakhom Rattanasrisawat | Portfolio',
  description: 'Front-end Developer Portfolio built with Next.js and Tailwind CSS',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headerStore, cookieStore] = await Promise.all([headers(), cookies()]);
  const headerLocale = headerStore.get(PUBLIC_LOCALE_HEADER) ?? undefined;
  const cookieLocale = cookieStore.get(LANGUAGE_COOKIE_KEY)?.value;
  const locale = isPublicLocale(headerLocale)
    ? headerLocale
    : isPublicLocale(cookieLocale)
      ? cookieLocale
      : defaultPublicLocale;

  return (
    <html lang={locale} dir="ltr" className="scroll-smooth">
      <body className="bg-background text-foreground antialiased selection:bg-[var(--signal)] selection:text-[var(--color-signal-ink)]">
        {children}
      </body>
    </html>
  );
}
