'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaArrowRight, FaFileDownload } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { IProfileResolved } from '@/models/CVData';

interface HeroProps {
  profile: IProfileResolved;
  lang: 'en' | 'th';
}

export default function Hero({ profile, lang }: HeroProps) {
  const { t } = useTranslation(['public']);
  const highlights = [
    t('public:hero.highlights.first'),
    t('public:hero.highlights.second'),
    t('public:hero.highlights.third'),
  ];

  return (
    <section id="home" className="public-hero relative">
      <div className="public-container">
        <div className="border-b public-rule pb-14 md:pb-20">
          <div className="grid min-w-0 gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(240px,0.75fr)] md:items-end md:gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)] lg:gap-12">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className={`inline-flex items-center gap-2 text-sm font-semibold text-[var(--signal)] ${
                lang === 'th' ? 'tracking-[0.02em]' : 'tracking-[0.08em]'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-[var(--signal)]" />
              {t('public:hero.eyebrow')}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06 }}
              className={`mt-8 text-sm font-semibold text-foreground/60 ${
                lang === 'th' ? 'tracking-[0.01em]' : 'tracking-[0.08em]'
              }`}
            >
              {t('public:hero.strapline')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`mt-4 max-w-[13ch] text-[clamp(3.25rem,8vw,6.8rem)] font-display font-bold text-foreground ${
                lang === 'th'
                  ? 'font-thai leading-[1.08] tracking-normal'
                  : 'leading-[0.88] tracking-[-0.04em]'
              }`}
            >
              {profile.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-7 max-w-[34ch] text-xl leading-8 text-foreground/85 md:text-3xl md:leading-10"
            >
              {profile.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-6 max-w-[62ch] text-base leading-8 text-muted-foreground md:text-lg"
            >
              {profile.bio}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-8 grid max-w-3xl gap-0 border-y border-border text-sm text-foreground/80 sm:grid-cols-3 md:mt-10"
            >
              {highlights.map((item) => (
                <li key={item} className="flex min-w-0 items-start border-b border-border py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">
                  <span className="min-w-0 break-words leading-6">{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#portfolio"
                className="public-primary-action focus-ring inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-md px-6 py-3.5 text-sm font-semibold transition-[opacity,transform] hover:-translate-y-0.5 hover:opacity-80 md:py-4"
              >
                <span>{t('public:hero.primaryCta')}</span>
                <FaArrowRight size={12} aria-hidden="true" focusable="false" />
              </a>
              <a
                href="./Tanakhom CV.pdf"
                target="_blank"
                className="public-secondary-action focus-ring inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-md bg-transparent px-6 py-3.5 text-sm font-semibold text-foreground transition-[opacity,transform] hover:-translate-y-0.5 hover:opacity-80 md:py-4"
              >
                <span>{t('public:hero.secondaryCta')}</span>
                <FaFileDownload size={13} aria-hidden="true" focusable="false" />
              </a>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto min-w-0 w-full max-w-[15rem] sm:max-w-[18rem] md:mx-0 md:max-w-[20rem] md:justify-self-end lg:max-w-none"
          >
            <div className="border border-border bg-surface p-2">
                <div className="relative overflow-hidden">
                  <Image
                    src="/img/profile.JPG"
                    alt={profile.name}
                    width={720}
                    height={900}
                    priority
                    className="aspect-[4/5] h-auto w-full object-cover object-center"
                  />
                </div>
            </div>
            <div className="mt-4 grid gap-4 border-t border-border pt-4 md:mt-5 md:gap-5 md:pt-5">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                <div>
                  <div
                    className={`text-xs font-semibold text-primary/80 ${
                      lang === 'th' ? 'tracking-[0.01em]' : 'tracking-[0.08em]'
                    }`}
                  >
                    {t('public:hero.location')}
                  </div>
                  <div className="mt-2 text-base font-medium text-foreground md:text-lg">{profile.location}</div>
                </div>
                <div>
                  <div
                    className={`text-xs font-semibold text-primary/80 ${
                      lang === 'th' ? 'tracking-[0.01em]' : 'tracking-[0.08em]'
                    }`}
                  >
                    {t('public:hero.email')}
                  </div>
                  <div className="mt-2 break-all text-sm text-foreground md:text-base">{profile.email}</div>
                </div>
              </div>

              <div className="hidden max-w-sm border-t border-border pt-5 lg:block">
                <div
                  className={`text-xs font-semibold text-primary/80 ${
                    lang === 'th' ? 'tracking-[0.01em]' : 'tracking-[0.08em]'
                  }`}
                >
                  {t('public:hero.statementTitle')}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                  {t('public:hero.statement')}
                </p>
              </div>
            </div>
          </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}
