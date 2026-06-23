import { ISkillResolved } from '@/models/CVData';
import SectionHeading from '@/components/SectionHeading';
import { getPublicTranslation } from '@/lib/i18n/public-server';

interface SkillsProps {
  skills: ISkillResolved[];
  lang: 'en' | 'th';
}

export default function Skills({ skills, lang }: SkillsProps) {
  const t = (key: string) => getPublicTranslation(lang, key);

  return (
    <section id="skills" className="public-section">
      <div className="public-container">
        <SectionHeading
          lang={lang}
          eyebrow={t('public.skills.eyebrow')}
          title={t('public.skills.title')}
          description={t('public.skills.description')}
        />

        <div className="mt-12 border-t public-rule">
          {skills.map((skillGroup, index) => (
            <article
              key={`${skillGroup.category}-${index}`}
              className="grid gap-5 border-b public-rule py-7 md:grid-cols-[minmax(200px,0.55fr)_minmax(0,1.45fr)] md:items-start"
            >
              <h3 className="text-2xl font-display font-bold text-foreground">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-x-5 gap-y-3">
                {skillGroup.items.map((item, itemIndex) => (
                  <span
                    key={`${item}-${itemIndex}`}
                    className="border-b border-[var(--signal)] pb-1 text-sm font-medium text-foreground/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
