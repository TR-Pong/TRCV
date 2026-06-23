'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import PageLoader from '@/components/PageLoader';

interface HeaderProps {
  lang: 'en' | 'th';
}

export default function Header({ lang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loadingTarget, setLoadingTarget] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useTranslation(['common', 'public']);
  const currentRouteKey = `${pathname}?${searchParams.toString()}`;
  const isLanguageLoading = loadingTarget !== null && loadingTarget !== currentRouteKey;
  const nextLanguageLabel = lang === 'en' ? t('public:header.thaiLanguage') : t('public:header.englishLanguage');

  const navLinks = useMemo(
    () => [
      { name: t('public:header.home'), href: '#home' },
      { name: t('public:header.projects'), href: '#portfolio' },
      { name: t('public:header.experience'), href: '#experience' },
      { name: t('public:header.skills'), href: '#skills' },
      { name: t('public:header.education'), href: '#education' },
    ],
    [t]
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace('#', ''));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-28% 0px -58% 0px',
        threshold: [0.08, 0.18, 0.32, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navLinks]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const closeOnResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', closeOnResize);
    return () => window.removeEventListener('resize', closeOnResize);
  }, [isMobileMenuOpen]);

  const toggleLanguage = () => {
    if (isLanguageLoading) {
      return;
    }

    const newLang = lang === 'en' ? 'th' : 'en';
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', newLang);
    setLoadingTarget(`${pathname}?${params.toString()}`);
    setIsMobileMenuOpen(false);
    router.push(`${pathname}?${params.toString()}`);
  };

  const navigateToSection = (href: string) => {
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
    const scrollToTarget = () => {
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `${pathname}${window.location.search}${href}`);
    };

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      window.setTimeout(scrollToTarget, 240);
      return;
    }

    scrollToTarget();
  };

  return (
    <>
      <AnimatePresence>
        {isLanguageLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-[var(--color-header-overlay)] backdrop-blur-sm"
          >
            <PageLoader label={t('common:loading')} fullscreen={false} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <header className="fixed inset-x-0 top-0 z-50">
        <a
          href="#main-content"
          className="focus-ring sr-only left-4 top-4 z-[80] rounded-full bg-primary px-4 py-2 text-sm font-semibold text-[var(--color-on-dark)] focus:not-sr-only focus:fixed"
        >
          {t('public:header.skipToContent')}
        </a>
        <div className="pt-[env(safe-area-inset-top)]">
          <div
            className={`overflow-hidden border-b transition-[background-color,border-color] duration-200 ${
              isMobileMenuOpen
                ? 'border-border bg-[var(--public-header)]'
                : isScrolled
                  ? 'border-border bg-[var(--public-header)] backdrop-blur-xl'
                  : 'border-transparent bg-transparent'
            }`}
          >
            <div className="public-container flex min-h-16 items-center justify-between gap-3">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`focus-ring shrink-0 rounded-md text-lg font-display font-bold text-foreground sm:text-xl md:text-2xl ${
                  lang === 'th' ? 'tracking-normal' : 'tracking-[-0.03em]'
                }`}
              >
                Tana<span className="text-primary">.</span>CV
              </Link>

              <nav className="hidden items-center gap-1 lg:flex">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace('#', '');
                  const isActive = activeSection === sectionId;

                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      aria-current={isActive ? 'location' : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        navigateToSection(link.href);
                      }}
                      className={`focus-ring whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive ? 'text-foreground underline decoration-[var(--signal)] decoration-2 underline-offset-8' : 'text-foreground/65 hover:text-foreground'
                      } ${lang === 'th' ? 'tracking-normal' : ''}`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </nav>

              <div className="hidden items-center gap-3 lg:flex">
                <button
                  onClick={toggleLanguage}
                  disabled={isLanguageLoading}
                  aria-label={t('public:header.switchLanguage', { language: nextLanguageLabel })}
                  className={`focus-ring min-h-11 rounded-md border border-[var(--color-interactive-border)] bg-transparent px-4 py-2 text-[11px] font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 ${
                    lang === 'th' ? 'tracking-[0.05em]' : 'uppercase tracking-[0.22em]'
                  }`}
                >
                  {lang === 'en' ? 'TH' : 'EN'}
                </button>
                <a
                  href="mailto:tanakhom.rattana@hotmail.com"
                  aria-label={t('public:header.contactLabel')}
                  className="focus-ring inline-flex min-h-11 items-center whitespace-nowrap rounded-md bg-[var(--signal)] px-5 py-2.5 text-sm font-semibold text-[var(--color-signal-ink)] transition-colors hover:bg-[var(--color-signal-hover)]"
                >
                  {t('common:contact')}
                </a>
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <button
                  onClick={toggleLanguage}
                  disabled={isLanguageLoading}
                  aria-label={t('public:header.switchLanguage', { language: nextLanguageLabel })}
                  className={`focus-ring inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-interactive-border)] bg-transparent px-3 text-[11px] font-semibold text-foreground disabled:cursor-not-allowed disabled:opacity-50 ${
                    lang === 'th' ? 'tracking-[0.05em]' : 'uppercase tracking-[0.18em]'
                  }`}
                >
                  {lang === 'en' ? 'TH' : 'EN'}
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen((value) => !value)}
                  disabled={isLanguageLoading}
                  className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--color-interactive-border)] bg-transparent text-foreground"
                  aria-label={isMobileMenuOpen ? t('public:header.closeMenu') : t('public:header.openMenu')}
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? <HiX size={20} /> : <HiMenu size={20} />}
                </button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {isMobileMenuOpen ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="overflow-hidden border-t border-border bg-[var(--public-header)] lg:hidden"
                >
                  <div className="px-4 pb-4 pt-3">
                    <nav className="grid gap-2">
                      {navLinks.map((link) => {
                        const sectionId = link.href.replace('#', '');
                        const isActive = activeSection === sectionId;

                        return (
                          <a
                            key={link.name}
                            href={link.href}
                            aria-current={isActive ? 'location' : undefined}
                            onClick={(event) => {
                              event.preventDefault();
                              navigateToSection(link.href);
                            }}
                            className={`focus-ring min-h-11 rounded-md px-4 py-3 text-sm font-medium transition hover:bg-muted hover:text-foreground ${
                              isActive ? 'bg-[var(--signal-soft)] text-foreground' : 'text-foreground/85'
                            } ${lang === 'th' ? 'tracking-normal' : ''}`}
                          >
                            {link.name}
                          </a>
                        );
                      })}
                    </nav>

                    <a
                      href="mailto:tanakhom.rattana@hotmail.com"
                      aria-label={t('public:header.contactLabel')}
                      className="public-primary-action focus-ring mt-4 inline-flex w-full items-center justify-center rounded-md px-5 py-3 text-sm font-semibold"
                    >
                      {t('common:contact')}
                    </a>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
}
