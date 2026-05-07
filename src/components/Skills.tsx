'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ISkillResolved } from '@/models/CVData';
import SectionHeading from '@/components/SectionHeading';

interface SkillsProps {
  skills: ISkillResolved[];
  lang: 'en' | 'th';
}

export default function Skills({ skills, lang }: SkillsProps) {
  const { t } = useTranslation(['public']);

  return (
    <section id="skills" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          lang={lang}
          eyebrow={t('public:skills.eyebrow')}
          title={t('public:skills.title')}
          description={t('public:skills.description')}
        />

        <div className="mt-14 grid gap-10 border-t border-border/70 pt-8 lg:grid-cols-3">
          {skills.map((skillGroup, index) => (
            <motion.article
              key={`${skillGroup.category}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="border-l border-border/80 pl-5 md:pl-6"
            >
              <div className="h-px w-12 bg-[linear-gradient(90deg,rgba(29,78,216,0.9),rgba(15,23,42,0.25))]" />
              <h3 className="mt-5 text-2xl font-outfit font-semibold text-foreground">{skillGroup.category}</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {skillGroup.items.map((item, itemIndex) => (
                  <span
                    key={`${item}-${itemIndex}`}
                    className="rounded-full bg-muted/80 px-4 py-2 text-sm text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
