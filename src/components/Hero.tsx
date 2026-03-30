'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaArrowRight, FaFileDownload } from 'react-icons/fa';
import { IProfileResolved } from '@/models/CVData';

interface HeroProps {
  profile: IProfileResolved;
  lang: 'en' | 'th';
}

export default function Hero({ profile, lang }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-16 border-b border-border pb-24 md:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] md:items-end md:pb-28">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className={`inline-flex rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-primary/80 ${
                lang === 'th' ? 'tracking-[0.04em]' : 'uppercase tracking-[0.26em]'
              }`}
            >
              {lang === 'th' ? 'พอร์ตโฟลิโอของฉัน' : 'Portfolio'}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className={`mt-8 text-5xl font-outfit font-semibold leading-[1.02] text-foreground md:text-7xl ${
                lang === 'th' ? 'tracking-normal' : 'tracking-tight'
              }`}
            >
              {profile.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 max-w-2xl text-xl leading-9 text-muted-foreground md:text-2xl"
            >
              {profile.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-8 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <span>{lang === 'th' ? 'ดูผลงาน' : 'View Projects'}</span>
                <FaArrowRight size={12} />
              </a>
              <a
                href="./Tanakhom CV.pdf"
                target='_blank'
                className="inline-flex items-center justify-center gap-3 rounded-full border border-border bg-surface px-6 py-4 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                <span>{lang === 'th' ? 'ดาวน์โหลด CV' : 'Download CV'}</span>
                <FaFileDownload size={13} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-4"
          >
            <div className="rounded-[36px] border border-border bg-surface p-4 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
              <div className="overflow-hidden rounded-[28px] bg-muted">
                <Image
                  src="/img/profile.JPG"
                  alt={profile.name}
                  width={720}
                  height={900}
                  priority
                  className="h-[320px] w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="rounded-[32px] border border-border bg-surface p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
              <div
                className={`text-xs font-semibold text-muted-foreground ${
                  lang === 'th' ? 'tracking-[0.04em]' : 'uppercase tracking-[0.24em]'
                }`}
              >
                {lang === 'th' ? 'ที่อยู่' : 'Location'}
              </div>
              <div className="mt-3 text-2xl font-outfit font-semibold text-foreground">{profile.location}</div>
            </div>
            <div className="rounded-[32px] border border-border bg-surface p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
              <div
                className={`text-xs font-semibold text-muted-foreground ${
                  lang === 'th' ? 'tracking-[0.04em]' : 'uppercase tracking-[0.24em]'
                }`}
              >
                {lang === 'th' ? 'อีเมล' : 'Email'}
              </div>
              <div className="mt-3 break-all text-base text-foreground">{profile.email}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
