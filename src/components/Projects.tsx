'use client';

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
          eyebrow={lang === 'th' ? '\u0e1c\u0e25\u0e07\u0e32\u0e19' : 'Projects'}
          title={lang === 'th' ? '\u0e42\u0e1b\u0e23\u0e40\u0e08\u0e01\u0e15\u0e4c\u0e17\u0e35\u0e48\u0e04\u0e31\u0e14\u0e21\u0e32' : 'Selected Work'}
          description={
            lang === 'th'
              ? '\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e07\u0e32\u0e19\u0e17\u0e35\u0e48\u0e2a\u0e30\u0e17\u0e49\u0e2d\u0e19\u0e41\u0e19\u0e27\u0e04\u0e34\u0e14\u0e43\u0e19\u0e01\u0e32\u0e23\u0e2d\u0e2d\u0e01\u0e41\u0e1a\u0e1a\u0e1b\u0e23\u0e30\u0e2a\u0e1a\u0e01\u0e32\u0e23\u0e13\u0e4c \u0e1e\u0e31\u0e12\u0e19\u0e32\u0e23\u0e30\u0e1a\u0e1a \u0e41\u0e25\u0e30\u0e41\u0e01\u0e49\u0e1b\u0e31\u0e0d\u0e2b\u0e32\u0e08\u0e23\u0e34\u0e07'
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
              className="flex h-full flex-col rounded-[32px] border border-border bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)] md:p-8"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/75">
                {lang === 'th' ? '\u0e42\u0e1b\u0e23\u0e40\u0e08\u0e01\u0e15\u0e4c' : 'Project'}
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
                    <span>{lang === 'th' ? '\u0e40\u0e22\u0e35\u0e48\u0e22\u0e21\u0e0a\u0e21\u0e42\u0e1b\u0e23\u0e40\u0e08\u0e01\u0e15\u0e4c' : 'Visit Project'}</span>
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
