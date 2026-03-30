'use client';

import { motion } from 'framer-motion';
import { ISkillResolved } from '@/models/CVData';
import SectionHeading from '@/components/SectionHeading';

interface SkillsProps {
  skills: ISkillResolved[];
  lang: 'en' | 'th';
}

export default function Skills({ skills, lang }: SkillsProps) {
  return (
    <section id="skills" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          lang={lang}
          eyebrow={lang === 'th' ? 'ทักษะ' : 'Skills'}
          title={lang === 'th' ? 'เครื่องมือและความสามารถ' : 'Tools and Capabilities'}
          description={
            lang === 'th'
              ? 'ภาพรวมที่เป็นประโยชน์ของเทคโนโลยี โครงสร้าง และเครื่องมือที่ฉันใช้งานมากที่สุด'
              : 'A practical overview of the technologies, frameworks, and tools I work with most.'
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((skillGroup, index) => (
            <motion.article
              key={`${skillGroup.category}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="rounded-[32px] border border-border bg-surface p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)] md:p-8"
            >
              <h3 className="text-2xl font-outfit font-semibold text-foreground">{skillGroup.category}</h3>
              <div className="mt-6 flex flex-wrap gap-3">
                {skillGroup.items.map((item, itemIndex) => (
                  <span
                    key={`${item}-${itemIndex}`}
                    className="rounded-full border border-border bg-muted px-4 py-2 text-sm text-muted-foreground"
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
