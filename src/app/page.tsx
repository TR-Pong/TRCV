import connectToDatabase from '@/lib/mongoose';
import { 
  ProfileModel, 
  ExperienceModel, 
  EducationModel, 
  SkillModel, 
  ProjectModel 
} from '@/models/CVData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';

// Helper to resolve language strings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveLang(data: any, lang: 'en' | 'th'): any {
  if (data === null || data === undefined) return data;
  
  // Handle Mongoose documents
  const dataObj = data.toObject ? data.toObject() : data;
  let sanitized = dataObj;
  
  if (dataObj._id) {
    sanitized = JSON.parse(JSON.stringify(dataObj));
  }

  if (typeof sanitized === 'object') {
    if ('en' in sanitized && 'th' in sanitized) {
      return resolveLang(sanitized[lang as keyof typeof sanitized] || sanitized['en'], lang); 
    }
    if (Array.isArray(sanitized)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return sanitized.map((item: any) => resolveLang(item, lang));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resolvedObj: Record<string, any> = {};
    for (const key in sanitized) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolvedObj[key] = resolveLang((sanitized as any)[key], lang);
    }
    return resolvedObj;
  }
  return sanitized;
}

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const lang = (params.lang === 'th' ? 'th' : 'en') as 'en' | 'th';

  await connectToDatabase();

  // Fetch all data from separate collections concurrently
  const [profileRaw, experiencesRaw, educationRaw, skillsRaw, projectsRaw] = await Promise.all([
    ProfileModel.findOne().lean(),
    ExperienceModel.find().lean(),
    EducationModel.find().lean(),
    SkillModel.find().lean(),
    ProjectModel.find().lean(),
  ]);

  if (!profileRaw) {
    return <div className="min-h-screen flex items-center justify-center text-foreground bg-background">No Data Found. Did you run the seed script?</div>;
  }

  // Resolve localized strings
  const profile = resolveLang(profileRaw, lang);
  const experiences = resolveLang(experiencesRaw, lang);
  const education = resolveLang(educationRaw, lang);
  const skills = resolveLang(skillsRaw, lang);
  const projects = resolveLang(projectsRaw, lang);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground scroll-smooth">
      <Header lang={lang} />

      <main className="flex-grow">
        <Hero profile={profile} lang={lang} />
        <Experience experiences={experiences} lang={lang} />
        <Education education={education} lang={lang} />
        <Skills skills={skills} lang={lang} />
        <Projects projects={projects} lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
