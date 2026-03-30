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
          eyebrow={lang === 'th' ? '\u0e17\u0e31\u0e01\u0e29\u0e30' : 'Skills'}
          title={lang === 'th' ? '\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e21\u0e37\u0e2d\u0e41\u0e25\u0e30\u0e04\u0e27\u0e32\u0e21\u0e40\u0e0a\u0e35\u0e48\u0e22\u0e27\u0e0a\u0e32\u0e0d' : 'Tools and Capabilities'}
          description={
            lang === 'th'
              ? '\u0e01\u0e25\u0e38\u0e48\u0e21\u0e17\u0e31\u0e01\u0e29\u0e30\u0e17\u0e35\u0e48\u0e43\u0e0a\u0e49\u0e1a\u0e48\u0e2d\u0e22\u0e43\u0e19\u0e01\u0e32\u0e23\u0e2d\u0e2d\u0e01\u0e41\u0e1a\u0e1a \u0e1e\u0e31\u0e12\u0e19\u0e32 \u0e41\u0e25\u0e30\u0e2a\u0e48\u0e07\u0e21\u0e2d\u0e1a\u0e1b\u0e23\u0e30\u0e2a\u0e1a\u0e01\u0e32\u0e23\u0e13\u0e4c\u0e14\u0e34\u0e08\u0e34\u0e17\u0e31\u0e25'
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
