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
          eyebrow={lang === 'th' ? '\u0e01\u0e32\u0e23\u0e28\u0e36\u0e01\u0e29\u0e32' : 'Education'}
          title={lang === 'th' ? '\u0e1e\u0e37\u0e49\u0e19\u0e10\u0e32\u0e19\u0e17\u0e32\u0e07\u0e27\u0e34\u0e0a\u0e32\u0e01\u0e32\u0e23' : 'Academic Background'}
          description={
            lang === 'th'
              ? '\u0e2a\u0e23\u0e38\u0e1b\u0e40\u0e2a\u0e49\u0e19\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23\u0e28\u0e36\u0e01\u0e29\u0e32\u0e41\u0e25\u0e30\u0e01\u0e32\u0e23\u0e40\u0e23\u0e35\u0e22\u0e19\u0e23\u0e39\u0e49\u0e17\u0e35\u0e48\u0e40\u0e1b\u0e47\u0e19\u0e10\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e07\u0e32\u0e19\u0e14\u0e49\u0e32\u0e19\u0e40\u0e17\u0e04\u0e42\u0e19\u0e42\u0e25\u0e22\u0e35\u0e41\u0e25\u0e30\u0e01\u0e32\u0e23\u0e1e\u0e31\u0e12\u0e19\u0e32\u0e1c\u0e25\u0e34\u0e15\u0e20\u0e31\u0e13\u0e11\u0e4c'
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
