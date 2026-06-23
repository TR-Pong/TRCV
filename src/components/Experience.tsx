import { IExperienceResolved } from '@/models/CVData';
import SectionHeading from '@/components/SectionHeading';
import { getPublicTranslation } from '@/lib/i18n/public-server';

interface ExperienceProps {
  experiences: IExperienceResolved[];
  lang: 'en' | 'th';
}

export default function Experience({ experiences, lang }: ExperienceProps) {
  const t = (key: string) => getPublicTranslation(lang, key);

  return (
    <section id="experience" className="public-section">
      <div className="public-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(240px,0.5fr)_minmax(0,1.5fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              lang={lang}
              eyebrow={t('public.experience.eyebrow')}
              title={t('public.experience.title')}
              description={t('public.experience.description')}
            />
          </div>

        <div className="border-t public-rule">
          {experiences.map((exp, index) => (
            <article
              key={`${exp.company}-${index}`}
              className="border-b public-rule py-8 md:py-10"
            >
              <div className="grid gap-7 md:grid-cols-[160px_minmax(0,1fr)]">
                <div className="md:pt-1">
                  <div className={`text-sm font-semibold text-primary/80 ${lang === 'th' ? 'tracking-normal' : 'tracking-[0.02em]'}`}>
                    {exp.period}
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="break-words text-2xl font-display font-bold text-foreground md:text-[2rem]">{exp.title}</h3>
                  <p className="mt-3 break-words text-base text-muted-foreground">{exp.company}</p>
                  <div className={`mt-7 text-sm font-semibold text-primary/80 ${lang === 'th' ? 'tracking-normal' : 'tracking-[0.02em]'}`}>
                    {t('public.experience.outcomeLabel')}
                  </div>
                  <ul className="mt-4 grid gap-3 text-base leading-7 text-muted-foreground">
                    {exp.description.slice(0, 3).map((item, itemIndex) => (
                      <li key={itemIndex} className="flex gap-3">
                        <span className="mt-[11px] h-px w-5 shrink-0 bg-primary/55" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {exp.description.length > 3 ? (
                    <>
                      <details className="public-disclosure mt-4 md:hidden">
                        <summary>{t('public.experience.outcomeLabel')}</summary>
                        <ul className="mt-4 grid gap-3 text-base leading-7 text-muted-foreground">
                          {exp.description.slice(3).map((item, itemIndex) => (
                            <li key={itemIndex} className="flex gap-3">
                              <span className="mt-[11px] h-px w-5 shrink-0 bg-primary/55" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </details>
                      <ul className="mt-3 hidden gap-3 text-base leading-7 text-muted-foreground md:grid">
                        {exp.description.slice(3).map((item, itemIndex) => (
                          <li key={itemIndex} className="flex gap-3">
                            <span className="mt-[11px] h-px w-5 shrink-0 bg-primary/55" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
