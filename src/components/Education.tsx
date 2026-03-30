'use client';

import { motion } from 'framer-motion';
import { IEducationResolved } from '@/models/CVData';
import SectionHeading from '@/components/SectionHeading';

interface EducationProps {
  education: IEducationResolved[];
  lang: 'en' | 'th';
}

export default function Education({ education, lang }: EducationProps) {
  return (
    <section id="education" className="border-t border-border bg-surface/50 py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          lang={lang}
          eyebrow={lang === 'th' ? 'การศึกษา' : 'Education'}
          title={lang === 'th' ? 'ประวัติการศึกษา' : 'Academic Background'}
          description={
            lang === 'th'
              ? 'สรุปเส้นทางการศึกษาและจุดเปลี่ยนที่สำคัญในการสร้างพื้นฐานทางเทคนิคของฉัน'
              : 'Formal education and learning milestones that shaped my technical foundation.'
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {education.map((edu, index) => (
            <motion.article
              key={`${edu.institution}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="rounded-[32px] border border-border bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)] md:p-8"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/75">{edu.period}</div>
              <h3 className="mt-4 text-2xl font-outfit font-semibold text-foreground">{edu.degree}</h3>
              <p className="mt-2 text-base text-muted-foreground">{edu.institution}</p>
              <p className="mt-6 text-sm leading-7 text-muted-foreground md:text-base">{edu.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
