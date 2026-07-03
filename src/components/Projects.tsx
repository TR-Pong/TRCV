import type { ReactNode } from 'react';
import Image from 'next/image';
import { FaAndroid, FaApple, FaExternalLinkAlt, FaGithub, FaWindows } from 'react-icons/fa';
import { IProjectResolved } from '@/models/CVData';
import SectionHeading from '@/components/SectionHeading';
import { getPublicTranslation } from '@/lib/i18n/public-server';

interface ProjectsProps {
  projects: IProjectResolved[];
  lang: 'en' | 'th';
}

type ProjectLink = {
  href?: string;
  label: string;
  icon: ReactNode;
};

function isUsableLink(value?: string) {
  return Boolean(value && value !== '#');
}

function ProjectLinks({ links }: { links: ProjectLink[] }) {
  const visibleLinks = links.filter((link) => isUsableLink(link.href));

  if (!visibleLinks.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-border/80 pt-6 sm:gap-5">
      {visibleLinks.map((link) => (
        <a
          key={`${link.label}-${link.href}`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium text-foreground/72 transition-colors hover:text-foreground"
        >
          {link.icon}
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
}

function getProjectLinks(project: IProjectResolved, t: (key: string) => string): ProjectLink[] {
  return [
    {
      href: project.github,
      label: t('common.github'),
      icon: <FaGithub size={16} aria-hidden="true" focusable="false" />,
    },
    {
      href: project.link,
      label: t('public.projects.visit'),
      icon: <FaExternalLinkAlt size={14} aria-hidden="true" focusable="false" />,
    },
    {
      href: project.iosLink,
      label: t('public.projects.downloadIos'),
      icon: <FaApple size={16} aria-hidden="true" focusable="false" />,
    },
    {
      href: project.androidLink,
      label: t('public.projects.downloadAndroid'),
      icon: <FaAndroid size={16} aria-hidden="true" focusable="false" />,
    },
    {
      href: project.windowsLink,
      label: t('public.projects.downloadWindows'),
      icon: <FaWindows size={16} aria-hidden="true" focusable="false" />,
    },
    {
      href: project.macLink,
      label: t('public.projects.downloadMac'),
      icon: <FaApple size={16} aria-hidden="true" focusable="false" />,
    },
  ];
}

export default function Projects({ projects, lang }: ProjectsProps) {
  const t = (key: string) => getPublicTranslation(lang, key);
  const [featuredProject, ...secondaryProjects] = projects;

  return (
    <section id="portfolio" className="public-dark-section scroll-mt-20">
      <div className="public-container py-14 md:py-24">
        <SectionHeading
          lang={lang}
          eyebrow={t('public.projects.eyebrow')}
          title={t('public.projects.title')}
          description={t('public.projects.description')}
        />

        {featuredProject ? (
          <article className="mt-10 border-t border-[var(--color-dark-rule)] pt-6 md:mt-14 md:pt-8">
            <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-end">
              <div className="relative aspect-[594/241] min-w-0 overflow-hidden bg-[var(--color-dark-surface)]">
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
                      <div className={`text-sm font-semibold text-[var(--color-dark-muted)] ${lang === 'th' ? 'tracking-normal' : 'tracking-[0.02em]'}`}>
                        {t('public.projects.featuredLabel')}
                      </div>
                      <div className="mt-4 text-3xl font-display font-bold text-[var(--color-dark-muted)]">{featuredProject.title}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-col justify-between">
                <div>
                  <div className={`text-sm font-semibold text-[var(--color-dark-muted)] ${lang === 'th' ? 'tracking-normal' : 'tracking-[0.02em]'}`}>
                    {t('public.projects.featuredLabel')}
                  </div>
                  <h3 className="mt-4 text-4xl font-display font-bold text-[var(--color-on-dark)] md:text-5xl">
                    {featuredProject.title}
                  </h3>
                  <p className="mt-5 text-base leading-7 text-[var(--color-dark-muted)] md:mt-6 md:leading-8">
                    {featuredProject.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2.5 md:mt-8">
                    {featuredProject.techStack.slice(0, 6).map((tech, techIndex) => (
                      <span
                        key={`${tech}-${techIndex}`}
                        className="rounded-full border border-[var(--color-dark-rule)] px-3 py-1.5 text-xs font-medium text-[var(--color-on-dark)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="public-dark-links mt-8">
                  <ProjectLinks links={getProjectLinks(featuredProject, t)} />
                </div>
              </div>
            </div>
          </article>
        ) : null}

        {secondaryProjects.length > 0 ? (
          <div className="mt-14 md:mt-20">
            <div className={`text-sm font-semibold text-[var(--color-dark-muted)] ${lang === 'th' ? 'tracking-normal' : 'tracking-[0.02em]'}`}>
              {t('public.projects.secondaryLabel')}
            </div>
            <div className="mt-5 border-t border-[var(--color-dark-rule)]">
              {secondaryProjects.map((project, index) => (
                <article
                  key={`${project.title}-${index}`}
                  className="grid min-w-0 gap-5 border-b border-[var(--color-dark-rule)] py-7 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:items-center md:gap-8 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.9fr)_minmax(190px,0.65fr)]"
                >
                  <div className="relative aspect-[594/241] min-w-0 overflow-hidden bg-[var(--color-dark-surface)]">
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
                      <div className="flex h-full items-center justify-center px-6 text-center text-[var(--color-dark-muted)]">
                        <div className="text-2xl font-display font-bold">{project.title}</div>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-2xl font-display font-bold text-[var(--color-on-dark)] md:text-3xl">{project.title}</h3>
                    <p className="mt-3 text-base leading-7 text-[var(--color-dark-muted)]">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={`${tech}-${techIndex}`}
                          className="rounded-full border border-[var(--color-dark-rule)] px-3 py-1.5 text-xs font-medium text-[var(--color-on-dark)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="public-dark-links md:col-start-2 lg:col-start-auto lg:justify-self-end">
                    <ProjectLinks links={getProjectLinks(project, t)} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}


