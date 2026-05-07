'use client';

import { useEffect, useState } from 'react';
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useTranslation(['common', 'public']);
  const currentRouteKey = `${pathname}?${searchParams.toString()}`;
  const isLanguageLoading = loadingTarget !== null && loadingTarget !== currentRouteKey;

  const navLinks = [
    { name: t('public:header.home'), href: '#home' },
    { name: t('public:header.projects'), href: '#portfolio' },
    { name: t('public:header.experience'), href: '#experience' },
    { name: t('public:header.skills'), href: '#skills' },
    { name: t('public:header.education'), href: '#education' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const closeOnResize = () => {
      if (window.innerWidth >= 768) {
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
            className="fixed inset-0 z-[70] bg-[rgba(247,244,237,0.82)] backdrop-blur-sm"
          >
            <PageLoader label={t('common:loading')} fullscreen={false} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 pt-4 md:px-8">
          <div
            className={`overflow-hidden border ${
              isMobileMenuOpen
                ? 'rounded-[30px] border-[rgba(28,28,28,0.08)] bg-[rgba(252,251,248,0.96)] shadow-[rgba(0,0,0,0.08)_0px_18px_48px] transition-none'
                : isScrolled
                  ? 'rounded-full border-[rgba(28,28,28,0.08)] bg-[rgba(252,251,248,0.82)] shadow-[rgba(0,0,0,0.06)_0px_12px_32px] backdrop-blur-xl transition-[border-color,background-color,box-shadow,border-radius] duration-300'
                  : 'rounded-full border-transparent bg-[rgba(252,251,248,0.54)] backdrop-blur-md transition-[border-color,background-color,box-shadow,border-radius] duration-300'
            }`}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`shrink-0 text-lg font-outfit font-semibold text-foreground sm:text-xl md:text-2xl ${
                  lang === 'th' ? 'tracking-normal' : 'tracking-[-0.03em]'
                }`}
              >
                Tana<span className="text-primary">.</span>CV
              </Link>

              <nav className="hidden items-center gap-7 md:flex">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateToSection(link.href);
                    }}
                    className={`text-sm font-medium text-foreground/72 transition-colors hover:text-foreground ${
                      lang === 'th' ? 'tracking-normal' : ''
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              <div className="hidden items-center gap-3 md:flex">
                <button
                  onClick={toggleLanguage}
                  disabled={isLanguageLoading}
                  className={`rounded-full border border-[rgba(28,28,28,0.4)] bg-transparent px-4 py-2 text-[11px] font-semibold text-foreground transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 ${
                    lang === 'th' ? 'tracking-[0.05em]' : 'uppercase tracking-[0.22em]'
                  }`}
                >
                  {lang === 'en' ? 'TH' : 'EN'}
                </button>
                <a
                  href="mailto:tanakhom.rattana@hotmail.com"
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-[#fcfbf8] shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px] transition hover:opacity-80"
                >
                  {t('common:contact')}
                </a>
              </div>

              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={toggleLanguage}
                  disabled={isLanguageLoading}
                  className={`rounded-full border border-[rgba(28,28,28,0.4)] bg-transparent px-3 py-2 text-[11px] font-semibold text-foreground disabled:cursor-not-allowed disabled:opacity-50 ${
                    lang === 'th' ? 'tracking-[0.05em]' : 'uppercase tracking-[0.18em]'
                  }`}
                >
                  {lang === 'en' ? 'TH' : 'EN'}
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen((value) => !value)}
                  disabled={isLanguageLoading}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[rgba(28,28,28,0.4)] bg-transparent text-foreground"
                  aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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
                  className="overflow-hidden border-t border-border/80 md:hidden"
                >
                  <div className="px-4 pb-4 pt-3">
                    <nav className="grid gap-2">
                      {navLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={(event) => {
                            event.preventDefault();
                            navigateToSection(link.href);
                          }}
                          className={`rounded-2xl px-4 py-3 text-sm font-medium text-foreground/85 transition hover:bg-muted hover:text-foreground ${
                            lang === 'th' ? 'tracking-normal' : ''
                          }`}
                        >
                          {link.name}
                        </a>
                      ))}
                    </nav>

                    <a
                      href="mailto:tanakhom.rattana@hotmail.com"
                      className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-[#fcfbf8] shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px]"
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
