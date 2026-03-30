'use client';

import { motion } from 'framer-motion';
import { IExperienceResolved } from '@/models/CVData';
import SectionHeading from '@/components/SectionHeading';

interface ExperienceProps {
  experiences: IExperienceResolved[];
  lang: 'en' | 'th';
}

export default function Experience({ experiences, lang }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          lang={lang}
          eyebrow={lang === 'th' ? '\u0e1b\u0e23\u0e30\u0e2a\u0e1a\u0e01\u0e32\u0e23\u0e13\u0e4c' : 'Experience'}
          title={lang === 'th' ? '\u0e40\u0e2a\u0e49\u0e19\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23\u0e17\u0e33\u0e07\u0e32\u0e19' : 'Professional Experience'}
          description={
            lang === 'th'
              ? '\u0e1c\u0e25\u0e07\u0e32\u0e19\u0e41\u0e25\u0e30\u0e1a\u0e17\u0e1a\u0e32\u0e17\u0e17\u0e35\u0e48\u0e2a\u0e30\u0e17\u0e49\u0e2d\u0e19\u0e27\u0e34\u0e18\u0e35\u0e04\u0e34\u0e14 \u0e01\u0e32\u0e23\u0e17\u0e33\u0e07\u0e32\u0e19\u0e23\u0e48\u0e27\u0e21\u0e01\u0e31\u0e1a\u0e17\u0e35\u0e21 \u0e41\u0e25\u0e30\u0e01\u0e32\u0e23\u0e2a\u0e48\u0e07\u0e21\u0e2d\u0e1a\u0e07\u0e32\u0e19\u0e08\u0e23\u0e34\u0e07'
              : 'A concise timeline of roles, responsibilities, and outcomes across the teams I have worked with.'
          }
        />

        <div className="mt-14 grid gap-6">
          {experiences.map((exp, index) => (
            <motion.article
              key={`${exp.company}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="rounded-[32px] border border-border bg-surface p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)] md:p-8"
            >
              <div className="grid gap-8 md:grid-cols-[250px_minmax(0,1fr)]">
                <div>
                  <div className="text-xs font-semibold uppercase text-primary/75">
                    {exp.period}
                  </div>
                  <h3 className="mt-4 text-2xl font-outfit font-semibold text-foreground">{exp.title}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{exp.company}</p>
                </div>

                <ul className="grid gap-3 text-sm leading-7 text-muted-foreground md:text-base">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex gap-3">
                      <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
