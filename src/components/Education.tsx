import { IEducationResolved } from '@/models/CVData';
import SectionHeading from '@/components/SectionHeading';
import { getPublicTranslation } from '@/lib/i18n/public-server';

interface EducationProps {
  education: IEducationResolved[];
  lang: 'en' | 'th';
}

export default function Education({ education, lang }: EducationProps) {
  const t = (key: string) => getPublicTranslation(lang, key);

  return (
    <section id="education" className="border-t border-border bg-surface/40 py-16 md:py-20">
      <div className="public-container">
        <SectionHeading
          lang={lang}
          eyebrow={t('public.education.eyebrow')}
          title={t('public.education.title')}
          description={t('public.education.description')}
        />

        <div className="mt-10 border-t public-rule">
          {education.map((edu, index) => (
            <article
              key={`${edu.institution}-${index}`}
              className="grid gap-5 border-b public-rule py-7 md:grid-cols-[180px_minmax(0,1fr)] md:gap-8"
            >
              <div className={`text-sm font-semibold text-primary/80 ${lang === 'th' ? 'tracking-normal' : 'tracking-[0.02em]'}`}>
                {edu.period}
              </div>
              <div className="min-w-0">
                <h3 className="break-words text-2xl font-display font-bold text-foreground">{edu.degree}</h3>
                <p className="mt-2 break-words text-base text-muted-foreground">{edu.institution}</p>
                <p className="mt-5 max-w-3xl break-words text-sm leading-7 text-muted-foreground md:text-base">{edu.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
