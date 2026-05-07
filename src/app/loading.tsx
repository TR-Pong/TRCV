import { cookies } from 'next/headers';
import PageLoader from '@/components/PageLoader';
import { getPublicTranslation, resolvePublicLocale } from '@/lib/i18n/public-server';

export default async function Loading() {
  const cookieStore = await cookies();
  const locale = resolvePublicLocale(undefined, cookieStore);

  return <PageLoader label={getPublicTranslation(locale, 'common.loading')} />;
}
