import {
  defaultPublicLocale,
  isPublicLocale,
  LANGUAGE_COOKIE_KEY,
  publicResources,
  type PublicLocale,
} from '@/lib/i18n/public-resources';

type CookieReader = {
  get(name: string): { value: string } | undefined;
};

export function resolvePublicLocale(
  queryLang?: string | string[],
  cookieStore?: CookieReader
): PublicLocale {
  const queryValue = Array.isArray(queryLang) ? queryLang[0] : queryLang;
  if (isPublicLocale(queryValue)) {
    return queryValue;
  }

  const cookieValue = cookieStore?.get(LANGUAGE_COOKIE_KEY)?.value;
  if (isPublicLocale(cookieValue)) {
    return cookieValue;
  }

  return defaultPublicLocale;
}

export function getPublicTranslation(locale: PublicLocale, key: string): string {
  const segments = key.split('.');
  let current: unknown = publicResources[locale];

  for (const segment of segments) {
    if (!current || typeof current !== 'object' || !(segment in current)) {
      return key;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return typeof current === 'string' ? current : key;
}
