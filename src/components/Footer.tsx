import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { getPublicTranslation } from '@/lib/i18n/public-server';

interface FooterProps {
  lang: 'en' | 'th';
}

export default function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = (key: string) => getPublicTranslation(lang, key);
  const socialLinkClass =
    'focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border border-transparent transition-colors';

  return (
    <footer className="public-footer py-16 md:py-24">
      <div className="public-container">
        <div>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-end">
            <div>
              <div className={`text-sm font-semibold text-[var(--color-signal-muted)] ${lang === 'th' ? 'tracking-normal' : 'tracking-[0.02em]'}`}>
                {t('public.footer.eyebrow')}
              </div>
              <h2 className={`mt-5 max-w-3xl text-4xl font-display font-bold text-[var(--color-signal-ink)] md:text-6xl ${lang === 'th' ? 'font-thai tracking-normal' : 'tracking-[-0.03em]'}`}>
                {t('public.footer.title')}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-signal-muted)] md:text-lg">
                {t('public.footer.description')}
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-start lg:pl-10">
              <a
                href="mailto:tanakhom.rattana@hotmail.com"
                aria-label={t('public.footer.emailLabel')}
                className="focus-ring inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[var(--color-signal-ink)] px-6 py-4 text-sm font-semibold text-[var(--signal)] transition-colors hover:bg-[var(--color-paper)]"
              >
                {t('public.footer.contact')}
              </a>
              <div className="public-footer-links flex items-center gap-2" role="group" aria-label={t('public.footer.socialGroupLabel')}>
                <a
                  href="https://github.com/tr-pong"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('public.footer.githubLabel')}
                  className={socialLinkClass}
                >
                  <FaGithub size={20} aria-hidden="true" focusable="false" />
                </a>
                <a
                  href="https://www.linkedin.com/in/tanakhom-rat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('public.footer.linkedinLabel')}
                  className={socialLinkClass}
                >
                  <FaLinkedin size={20} aria-hidden="true" focusable="false" />
                </a>
                <a
                  href="mailto:tanakhom.rattana@hotmail.com"
                  aria-label={t('public.footer.emailLabel')}
                  className={socialLinkClass}
                >
                  <FaEnvelope size={20} aria-hidden="true" focusable="false" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-[var(--color-dark-rule)] pt-6 text-sm text-[var(--color-signal-muted)] md:flex-row md:items-center md:justify-between">
            <p>
              &copy; {currentYear} Tanakhom Rattanasrisawat. {t('public.footer.rights')}.
            </p>
            <p className="text-xs opacity-80">
              {t('public.footer.builtWith')} Next.js, Tailwind CSS & Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
