'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { IProjectResolved } from '@/models/CVData';
import SectionHeading from '@/components/SectionHeading';

interface ProjectsProps {
  projects: IProjectResolved[];
  lang: 'en' | 'th';
}

function ProjectLinks({
  github,
  link,
  visitLabel,
  githubLabel,
}: {
  github: string;
  link: string;
  visitLabel: string;
  githubLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-5 border-t border-border/80 pt-6">
      {github && github !== '#' ? (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <FaGithub size={16} />
          <span>{githubLabel}</span>
        </a>
      ) : null}
      {link && link !== '#' ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <FaExternalLinkAlt size={14} />
          <span>{visitLabel}</span>
        </a>
      ) : null}
    </div>
  );
}

export default function Projects({ projects, lang }: ProjectsProps) {
  const { t } = useTranslation(['common', 'public']);
  const [featuredProject, ...secondaryProjects] = projects;

  return (
    <section id="portfolio" className="border-y border-border/70 bg-[linear-gradient(180deg,rgba(252,251,248,0.75),rgba(247,244,237,0.95))] py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          lang={lang}
          eyebrow={t('public:projects.eyebrow')}
          title={t('public:projects.title')}
          description={t('public:projects.description')}
        />

        {featuredProject ? (
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45 }}
            className="mt-14 overflow-hidden rounded-2xl border border-border bg-surface shadow-none md:-mr-8"
          >
            <div className="grid lg:grid-cols-[minmax(0,1.26fr)_minmax(320px,0.74fr)]">
              <div className="relative aspect-[594/241] border-b border-border/70 bg-muted/50 lg:aspect-auto lg:min-h-[420px] lg:border-b-0 lg:border-r">
                {featuredProject.imageUrl ? (
                  <Image
                    src={featuredProject.imageUrl}
                    alt={featuredProject.title}
                    fill
                    sizes="(min-width: 1024px) 720px, 100vw"
                    unoptimized={featuredProject.imageUrl.startsWith('/uploads/')}
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-8 text-center">
                    <div>
                      <div className={`text-xs font-semibold text-primary/80 ${lang === 'th' ? 'tracking-[0.03em]' : 'uppercase tracking-[0.22em]'}`}>
                        {t('public:projects.featuredLabel')}
                      </div>
                      <div className="mt-4 text-3xl font-outfit font-semibold text-slate-400">{featuredProject.title}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between p-7 md:p-10 lg:pl-8">
                <div>
                  <div className={`text-xs font-semibold text-primary/80 ${lang === 'th' ? 'tracking-[0.03em]' : 'uppercase tracking-[0.22em]'}`}>
                    {t('public:projects.featuredLabel')}
                  </div>
                  <h3 className="mt-5 text-3xl font-outfit font-semibold text-foreground md:text-4xl">
                    {featuredProject.title}
                  </h3>
                  <p className="mt-6 text-sm leading-8 text-muted-foreground md:text-base">
                    {featuredProject.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2.5">
                    {featuredProject.techStack.map((tech, techIndex) => (
                      <span
                        key={`${tech}-${techIndex}`}
                        className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-10">
                  <ProjectLinks
                    github={featuredProject.github}
                    link={featuredProject.link}
                    visitLabel={t('public:projects.visit')}
                    githubLabel={t('common:github')}
                  />
                </div>
              </div>
            </div>
          </motion.article>
        ) : null}

        {secondaryProjects.length > 0 ? (
          <div className="mt-16 md:pl-20">
            <div className={`text-sm font-semibold text-primary/80 ${lang === 'th' ? 'tracking-[0.03em]' : 'uppercase tracking-[0.2em]'}`}>
              {t('public:projects.secondaryLabel')}
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
              {secondaryProjects.map((project, index) => (
                <motion.article
                  key={`${project.title}-${index}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-none"
                >
                  <div className="relative aspect-[594/241] border-b border-border/70 bg-muted/50">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(min-width: 1024px) 594px, 100vw"
                        unoptimized={project.imageUrl.startsWith('/uploads/')}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-6 text-center text-slate-400">
                        <div className="text-2xl font-outfit font-semibold">{project.title}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex h-full flex-col p-6 md:p-7">
                    <h3 className="text-2xl font-outfit font-semibold text-foreground">{project.title}</h3>
                    <p className="mt-4 flex-grow text-sm leading-7 text-muted-foreground md:text-base">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={`${tech}-${techIndex}`}
                          className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8">
                      <ProjectLinks
                        github={project.github}
                        link={project.link}
                        visitLabel={t('public:projects.visit')}
                        githubLabel={t('common:github')}
                      />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
