'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { IProjectResolved } from '@/models/CVData';
import SectionHeading from '@/components/SectionHeading';

interface ProjectsProps {
  projects: IProjectResolved[];
  lang: 'en' | 'th';
}

export default function Projects({ projects, lang }: ProjectsProps) {
  return (
    <section id="portfolio" className="border-t border-border bg-surface/50 py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          lang={lang}
          eyebrow={lang === 'th' ? 'ผลงาน' : 'Projects'}
          title={lang === 'th' ? 'ผลงานที่ผ่านมา' : 'Selected Work'}
          description={
            lang === 'th'
              ? 'ผลงานที่คัดสรรมาจัดแสดง เพื่อสะท้อนแนวทางการออกแบบ พัฒนา และปรับปรุงผลิตภัณฑ์ดิจิทัลของฉัน'
              : 'A selection of projects that reflect how I design, build, and refine digital products.'
          }
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={`${project.title}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="flex h-full flex-col overflow-hidden rounded-[32px] border border-border bg-white shadow-[0_20px_50px_rgba(15,23,42,0.05)]"
            >
              <div className="relative aspect-[594/241] border-b border-border bg-muted/50">
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
                  <div className="flex h-full items-center justify-center px-6 text-center">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/75">
                        {lang === 'th' ? 'ตัวอย่างโปรเจกต์' : 'Project Preview'}
                      </div>
                      <div className="mt-4 text-2xl font-outfit font-semibold text-slate-400">{project.title}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex h-full flex-col p-6 md:p-8">
                <div className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/75">
                  {lang === 'th' ? 'ผลงาน' : 'Project'}
                </div>
                <h3 className="mt-4 text-3xl font-outfit font-semibold text-foreground">{project.title}</h3>
                <p className="mt-5 flex-grow text-sm leading-7 text-muted-foreground md:text-base">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={`${tech}-${techIndex}`}
                      className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-border pt-6">
                  {project.github && project.github !== '#' ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                    >
                      <FaGithub size={16} />
                      <span>GitHub</span>
                    </a>
                  ) : null}
                  {project.link && project.link !== '#' ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                    >
                      <FaExternalLinkAlt size={14} />
                      <span>{lang === 'th' ? 'เยี่ยมชมผลงาน' : 'Visit Project'}</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
