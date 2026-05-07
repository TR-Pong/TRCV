'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { IEducationResolved } from '@/models/CVData';
import SectionHeading from '@/components/SectionHeading';

interface EducationProps {
  education: IEducationResolved[];
  lang: 'en' | 'th';
}

export default function Education({ education, lang }: EducationProps) {
  const { t } = useTranslation(['public']);

  return (
    <section id="education" className="border-t border-border/70 bg-surface/40 py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          lang={lang}
          eyebrow={t('public:education.eyebrow')}
          title={t('public:education.title')}
          description={t('public:education.description')}
        />

        <div className="mt-14 border-t border-border/70">
          {education.map((edu, index) => (
            <motion.article
              key={`${edu.institution}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="grid gap-5 border-b border-border/70 py-8 md:grid-cols-[180px_minmax(0,1fr)] md:gap-8 md:py-10"
            >
              <div className={`text-xs font-semibold text-primary/80 ${lang === 'th' ? 'tracking-[0.03em]' : 'uppercase tracking-[0.22em]'}`}>
                {edu.period}
              </div>
              <div>
                <h3 className="text-2xl font-outfit font-semibold text-foreground">{edu.degree}</h3>
                <p className="mt-2 text-base text-muted-foreground">{edu.institution}</p>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">{edu.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
