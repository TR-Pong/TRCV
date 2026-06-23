import connectToDatabase from '@/lib/mongoose';
import {
  EducationModel,
  ExperienceModel,
  ProfileModel,
  ProjectModel,
  SkillModel,
  type IEducationResolved,
  type IExperienceResolved,
  type IProfileResolved,
  type IProjectResolved,
  type ISkillResolved,
} from '@/models/CVData';
import type { PublicLocale } from '@/lib/i18n/public-resources';

type LocalizedRecord = Record<string, unknown>;

export interface PublicPortfolioData {
  profile: IProfileResolved | null;
  experiences: IExperienceResolved[];
  education: IEducationResolved[];
  skills: ISkillResolved[];
  projects: IProjectResolved[];
}

function isRecord(value: unknown): value is LocalizedRecord {
  return typeof value === 'object' && value !== null;
}

function toPlainValue(value: unknown): unknown {
  if (isRecord(value) && typeof value.toObject === 'function') {
    return value.toObject();
  }

  return value;
}

export function resolveLocalizedValue(value: unknown, locale: PublicLocale): unknown {
  const plainValue = toPlainValue(value);

  if (Array.isArray(plainValue)) {
    return plainValue.map((item) => resolveLocalizedValue(item, locale));
  }

  if (!isRecord(plainValue)) {
    return plainValue;
  }

  if ('en' in plainValue && 'th' in plainValue) {
    return resolveLocalizedValue(plainValue[locale] ?? plainValue.en, locale);
  }

  return Object.fromEntries(
    Object.entries(plainValue).map(([key, item]) => [key, resolveLocalizedValue(item, locale)])
  );
}

export function normalizeVisibleItems<T extends { order?: number | null; enabled?: boolean | null }>(
  items: T[]
): T[] {
  return items
    .filter((item) => item.enabled ?? true)
    .sort((left, right) => {
      const leftOrder = typeof left.order === 'number' ? left.order : Number.MAX_SAFE_INTEGER;
      const rightOrder = typeof right.order === 'number' ? right.order : Number.MAX_SAFE_INTEGER;
      return leftOrder - rightOrder;
    });
}

export async function getPublicPortfolioData(locale: PublicLocale): Promise<PublicPortfolioData> {
  await connectToDatabase();

  const [profileRaw, experiencesRaw, educationRaw, skillsRaw, projectsRaw] = await Promise.all([
    ProfileModel.findOne().lean().exec(),
    ExperienceModel.find().lean().exec(),
    EducationModel.find().lean().exec(),
    SkillModel.find().sort({ order: 1, _id: 1 }).lean().exec(),
    ProjectModel.find().sort({ order: 1, _id: 1 }).lean().exec(),
  ]);

  const profile = profileRaw
    ? (resolveLocalizedValue(profileRaw, locale) as IProfileResolved)
    : null;

  return {
    profile,
    experiences: resolveLocalizedValue(experiencesRaw, locale) as IExperienceResolved[],
    education: resolveLocalizedValue(educationRaw, locale) as IEducationResolved[],
    skills: normalizeVisibleItems(
      resolveLocalizedValue(skillsRaw, locale) as ISkillResolved[]
    ),
    projects: normalizeVisibleItems(
      resolveLocalizedValue(projectsRaw, locale) as IProjectResolved[]
    ),
  };
}
