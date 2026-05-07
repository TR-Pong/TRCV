'use client';

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { setPublicLanguage } from '@/lib/i18n/public-client';
import {
  defaultPublicLocale,
  LANGUAGE_COOKIE_KEY,
  type PublicLocale,
} from '@/lib/i18n/public-resources';

export default function PublicI18nProvider({
  locale,
  children,
}: {
  locale: PublicLocale;
  children: React.ReactNode;
}) {
  useEffect(() => {
    setPublicLanguage(locale);
    document.cookie = `${LANGUAGE_COOKIE_KEY}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  }, [locale]);

  useEffect(() => {
    if (!i18n.language) {
      setPublicLanguage(defaultPublicLocale);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
