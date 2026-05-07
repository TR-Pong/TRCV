'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeading from '@/components/SectionHeading';

interface CapabilityHighlightsProps {
  lang: 'en' | 'th';
}

export default function CapabilityHighlights({ lang }: CapabilityHighlightsProps) {
  const { t } = useTranslation(['public']);
  const items = [
    {
      title: t('public:capability.items.firstTitle'),
      description: t('public:capability.items.firstDescription'),
    },
    {
      title: t('public:capability.items.secondTitle'),
      description: t('public:capability.items.secondDescription'),
    },
    {
      title: t('public:capability.items.thirdTitle'),
      description: t('public:capability.items.thirdDescription'),
    },
    {
      title: t('public:capability.items.fourthTitle'),
      description: t('public:capability.items.fourthDescription'),
    },
  ];

  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <SectionHeading
            lang={lang}
            eyebrow={t('public:capability.eyebrow')}
            title={t('public:capability.title')}
            description={t('public:capability.description')}
          />

          <div className="grid gap-5 md:grid-cols-2">
            {items.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="group rounded-xl border border-border bg-surface p-6 shadow-none transition hover:border-[rgba(28,28,28,0.4)]"
              >
                <div className="h-10 w-10 rounded-full bg-[rgba(28,28,28,0.04)]" />
                <h3 className="mt-6 text-xl font-outfit font-semibold text-foreground">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
