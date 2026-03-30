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
          eyebrow={lang === 'th' ? 'ประสบการณ์' : 'Experience'}
          title={lang === 'th' ? 'ประสบการณ์การทำงาน' : 'Professional Experience'}
          description={
            lang === 'th'
              ? 'สรุปเส้นทางการทำงานและจุดเปลี่ยนที่สำคัญในการสร้างทักษะและความสามารถของฉัน'
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
