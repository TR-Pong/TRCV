'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultPublicLocale, publicResources, type PublicLocale } from '@/lib/i18n/public-resources';

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: publicResources,
    lng: defaultPublicLocale,
    fallbackLng: defaultPublicLocale,
    defaultNS: 'public',
    ns: ['common', 'public'],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export function setPublicLanguage(locale: PublicLocale) {
  if (i18n.language !== locale) {
    void i18n.changeLanguage(locale);
  }
}

export default i18n;
