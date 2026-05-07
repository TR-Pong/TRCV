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
    <section id="home" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="absolute inset-x-0 top-0 -z-10 h-[660px] bg-[radial-gradient(circle_at_top_right,rgba(214,177,123,0.22),transparent_30%),radial-gradient(circle_at_top_left,rgba(193,167,206,0.12),transparent_28%)]" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-16 border-b border-border/80 pb-24 md:grid-cols-[minmax(0,1.18fr)_minmax(300px,0.82fr)] md:items-start md:pb-32">
          <div className="max-w-4xl md:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className={`inline-flex rounded-full border border-border bg-[rgba(252,251,248,0.85)] px-4 py-2 text-[11px] font-semibold text-primary backdrop-blur ${
                lang === 'th' ? 'tracking-[0.03em]' : 'uppercase tracking-[0.22em]'
              }`}
            >
              {t('public:hero.eyebrow')}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06 }}
              className={`mt-8 text-sm font-medium text-primary/80 ${
                lang === 'th' ? 'tracking-[0.02em]' : 'uppercase tracking-[0.22em]'
              }`}
            >
              {t('public:hero.strapline')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`mt-5 max-w-4xl text-5xl font-outfit font-semibold leading-[0.97] text-foreground md:text-7xl ${
                lang === 'th' ? 'tracking-normal' : 'tracking-[-0.04em]'
              }`}
            >
              {profile.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-7 max-w-[46rem] text-lg leading-9 text-foreground/80 md:text-[1.65rem] md:leading-10"
            >
              {profile.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-8 max-w-[42rem] text-base leading-8 text-muted-foreground md:text-lg"
            >
              {profile.bio}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-12 grid gap-3 text-sm text-foreground/80 md:max-w-2xl md:text-base"
            >
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_0_6px_rgba(29,78,216,0.12)]" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-3 rounded-md bg-primary px-6 py-4 text-sm font-semibold text-[#fcfbf8] shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px] transition hover:-translate-y-0.5 hover:opacity-80"
              >
                <span>{t('public:hero.primaryCta')}</span>
                <FaArrowRight size={12} />
              </a>
              <a
                href="./Tanakhom CV.pdf"
                target="_blank"
                className="inline-flex items-center justify-center gap-3 rounded-md border border-[rgba(28,28,28,0.4)] bg-transparent px-6 py-4 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:opacity-80"
              >
                <span>{t('public:hero.secondaryCta')}</span>
                <FaFileDownload size={13} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-8 md:pt-0"
          >
            <div className="md:translate-y-10">
              <div className="bg-[rgba(252,251,248,0.58)] p-4 backdrop-blur">
                <div className="overflow-hidden rounded-[28px] border border-border/60 bg-[linear-gradient(180deg,rgba(2,6,23,0.02),rgba(2,6,23,0.08))]">
                  <Image
                    src="/img/profile.JPG"
                    alt={profile.name}
                    width={720}
                    height={900}
                    priority
                    className="h-[360px] w-full object-cover object-center md:h-[430px]"
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-6 md:pl-8">
              <div className="grid gap-5 border-t border-border/55 pt-5 md:grid-cols-2">
                <div>
                  <div
                    className={`text-[11px] font-semibold text-primary/80 ${
                      lang === 'th' ? 'tracking-[0.02em]' : 'uppercase tracking-[0.2em]'
                    }`}
                  >
                    {t('public:hero.location')}
                  </div>
                  <div className="mt-2 text-base font-medium text-foreground md:text-lg">{profile.location}</div>
                </div>
                <div>
                  <div
                    className={`text-[11px] font-semibold text-primary/80 ${
                      lang === 'th' ? 'tracking-[0.02em]' : 'uppercase tracking-[0.2em]'
                    }`}
                  >
                    {t('public:hero.email')}
                  </div>
                  <div className="mt-2 break-all text-sm text-foreground md:text-base">{profile.email}</div>
                </div>
              </div>

              <div className="max-w-sm border-l border-primary/25 pl-5">
                <div
                  className={`text-[11px] font-semibold text-primary/80 ${
                    lang === 'th' ? 'tracking-[0.02em]' : 'uppercase tracking-[0.22em]'
                  }`}
                >
                  {t('public:hero.statementTitle')}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                  {t('public:hero.statement')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
