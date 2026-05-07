'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { IExperienceResolved } from '@/models/CVData';
import SectionHeading from '@/components/SectionHeading';

interface ExperienceProps {
  experiences: IExperienceResolved[];
  lang: 'en' | 'th';
}

export default function Experience({ experiences, lang }: ExperienceProps) {
  const { t } = useTranslation(['public']);

  return (
    <section id="experience" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          lang={lang}
          eyebrow={t('public:experience.eyebrow')}
          title={t('public:experience.title')}
          description={t('public:experience.description')}
        />

        <div className="mt-14 border-t border-border/70">
          {experiences.map((exp, index) => (
            <motion.article
              key={`${exp.company}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="border-b border-border/70 py-8 md:py-10"
            >
              <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,0.8fr)_minmax(0,1.2fr)]">
                <div>
                  <div className={`text-xs font-semibold text-primary/80 ${lang === 'th' ? 'tracking-[0.03em]' : 'uppercase tracking-[0.22em]'}`}>
                    {exp.period}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-outfit font-semibold text-foreground md:text-[2rem]">{exp.title}</h3>
                  <p className="mt-3 text-base text-muted-foreground">{exp.company}</p>
                </div>

                <div>
                  <div className={`text-[11px] font-semibold text-primary/80 ${lang === 'th' ? 'tracking-[0.03em]' : 'uppercase tracking-[0.2em]'}`}>
                    {t('public:experience.outcomeLabel')}
                  </div>
                  <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted-foreground md:text-base">
                    {exp.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex gap-3">
                        <span className="mt-[11px] h-px w-5 shrink-0 bg-primary/55" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
