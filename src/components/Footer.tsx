 'use client';

import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  lang: 'en' | 'th';
}

export default function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation(['common', 'public']);

  return (
    <footer className="border-t border-border/70 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="rounded-2xl border border-border bg-[linear-gradient(135deg,rgba(252,251,248,0.98),rgba(247,244,237,0.96))] p-8 shadow-none md:p-10 lg:-ml-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-end">
            <div>
              <div className={`text-xs font-semibold text-primary/80 ${lang === 'th' ? 'tracking-[0.03em]' : 'uppercase tracking-[0.22em]'}`}>
                {t('public:footer.eyebrow')}
              </div>
              <h2 className={`mt-5 max-w-3xl text-4xl font-outfit font-semibold text-foreground md:text-5xl ${lang === 'th' ? 'tracking-normal' : 'tracking-[-0.03em]'}`}>
                {t('public:footer.title')}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                {t('public:footer.description')}
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-start lg:pl-10">
              <a
                href="mailto:tanakhom.rattana@hotmail.com"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-4 text-sm font-semibold text-[#fcfbf8] shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px] transition hover:opacity-80"
              >
                {t('public:footer.contact')}
              </a>
              <div className="flex items-center gap-5">
                <a
                  href="https://github.com/tr-pong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition hover:text-foreground"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/tanakhom-rat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition hover:text-foreground"
                >
                  <FaLinkedin size={20} />
                </a>
                <a href="mailto:tanakhom.rattana@hotmail.com" className="text-muted-foreground transition hover:text-foreground">
                  <FaEnvelope size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-border/70 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>
              © {currentYear} Tanakhom Rattanasrisawat. {t('public:footer.rights')}.
            </p>
            <p className="text-xs opacity-80">
              {t('public:footer.builtWith')} Next.js, Tailwind CSS & Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
