'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

interface HeaderProps {
  lang: 'en' | 'th';
}

export default function Header({ lang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const navLinks = [
    { name: lang === 'th' ? '\u0e2b\u0e19\u0e49\u0e32\u0e41\u0e23\u0e01' : 'Home', href: '#home' },
    { name: lang === 'th' ? '\u0e1b\u0e23\u0e30\u0e2a\u0e1a\u0e01\u0e32\u0e23\u0e13\u0e4c' : 'Experience', href: '#experience' },
    { name: lang === 'th' ? '\u0e01\u0e32\u0e23\u0e28\u0e36\u0e01\u0e29\u0e32' : 'Education', href: '#education' },
    { name: lang === 'th' ? '\u0e17\u0e31\u0e01\u0e29\u0e30' : 'Skills', href: '#skills' },
    { name: lang === 'th' ? '\u0e1c\u0e25\u0e07\u0e32\u0e19' : 'Projects', href: '#portfolio' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
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
    const newLang = lang === 'en' ? 'th' : 'en';
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', newLang);
    setIsMobileMenuOpen(false);
    router.push(`${pathname}?${params.toString()}`);
  };

  const navigateToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const scrollToTarget = () => {
      const targetElement = document.getElementById(targetId);

      if (!targetElement) {
        return;
      }

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
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 md:px-8">
        <div
          className={`overflow-hidden border ${
            isMobileMenuOpen
              ? 'rounded-[28px] border-border bg-white shadow-[0_22px_50px_rgba(15,23,42,0.12)] duration-0 transition-none'
            : isScrolled
                ? 'rounded-full border-border bg-white/88 shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur transition-[border-color,background-color,box-shadow,border-radius] duration-300'
                : 'rounded-full border-transparent bg-white/60 backdrop-blur-sm transition-[border-color,background-color,box-shadow,border-radius] duration-300'
          }`}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`shrink-0 text-lg font-outfit font-semibold text-foreground sm:text-xl md:text-2xl ${
                lang === 'th' ? 'tracking-normal' : 'tracking-tight'
              }`}
            >
              Tana<span className="text-primary">.</span>CV
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateToSection(link.href);
                  }}
                  className={`text-sm font-medium text-foreground/70 transition-colors hover:text-foreground ${
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
                className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-foreground transition hover:border-primary hover:text-primary"
              >
                {lang === 'en' ? 'TH' : 'EN'}
              </button>
              <a
                href="mailto:tanakhom.rattana@hotmail.com"
                className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {lang === 'th' ? '\u0e15\u0e34\u0e14\u0e15\u0e48\u0e2d' : 'Contact'}
              </a>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleLanguage}
                className="rounded-full border border-border bg-surface px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground"
              >
                {lang === 'en' ? 'TH' : 'EN'}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen((value) => !value)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground"
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
                className="overflow-hidden border-t border-border md:hidden"
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
                    className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
                  >
                    {lang === 'th' ? '\u0e15\u0e34\u0e14\u0e15\u0e48\u0e2d' : 'Contact'}
                  </a>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
