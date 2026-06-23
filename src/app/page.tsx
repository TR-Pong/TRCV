import { cookies } from 'next/headers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import CapabilityHighlights from '@/components/CapabilityHighlights';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import PublicI18nProvider from '@/components/PublicI18nProvider';
import { resolvePublicLocale } from '@/lib/i18n/public-server';
import { getPublicPortfolioData } from '@/features/public/data';

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const lang = resolvePublicLocale(params.lang, cookieStore);

  const { profile, experiences, education, skills, projects } =
    await getPublicPortfolioData(lang);

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center text-foreground bg-background">No Data Found. Did you run the seed script?</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground scroll-smooth">
      <PublicI18nProvider locale={lang}>
        <Header lang={lang} />

        <main id="main-content" className="flex-grow" tabIndex={-1}>
          <Hero profile={profile} lang={lang} />
          <Projects projects={projects} lang={lang} />
          <Experience experiences={experiences} lang={lang} />
          <CapabilityHighlights lang={lang} />
          <Skills skills={skills} lang={lang} />
          <Education education={education} lang={lang} />
        </main>

        <Footer lang={lang} />
      </PublicI18nProvider>
    </div>
  );
}
