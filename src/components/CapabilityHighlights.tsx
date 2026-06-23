import SectionHeading from '@/components/SectionHeading';
import { getPublicTranslation } from '@/lib/i18n/public-server';

interface CapabilityHighlightsProps {
  lang: 'en' | 'th';
}

export default function CapabilityHighlights({ lang }: CapabilityHighlightsProps) {
  const t = (key: string) => getPublicTranslation(lang, key);
  const items = [
    {
      title: t('public.capability.items.firstTitle'),
      description: t('public.capability.items.firstDescription'),
    },
    {
      title: t('public.capability.items.secondTitle'),
      description: t('public.capability.items.secondDescription'),
    },
    {
      title: t('public.capability.items.thirdTitle'),
      description: t('public.capability.items.thirdDescription'),
    },
    {
      title: t('public.capability.items.fourthTitle'),
      description: t('public.capability.items.fourthDescription'),
    },
  ];

  return (
    <section className="border-y border-border bg-[var(--signal-soft)] py-14 md:py-20">
      <div className="public-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <SectionHeading
            lang={lang}
            eyebrow={t('public.capability.eyebrow')}
            title={t('public.capability.title')}
            description={t('public.capability.description')}
          />

          <div className="grid border-t public-rule sm:grid-cols-2">
            {items.map((item) => (
              <article
                key={item.title}
                className="border-b public-rule py-5 sm:px-5 sm:odd:border-r sm:first:pl-0"
              >
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
