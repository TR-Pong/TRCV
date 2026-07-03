import type {
  EducationFormData,
  ExperienceFormData,
  LocalizedFieldValue,
  ProfileFormData,
  ProjectFormData,
  SkillFormData,
} from '@/lib/admin/types';

export function createLocalizedField(): LocalizedFieldValue {
  return { en: '', th: '' };
}

export function createProfileData(): ProfileFormData {
  return {
    name: createLocalizedField(),
    role: createLocalizedField(),
    bio: createLocalizedField(),
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    location: createLocalizedField(),
  };
}

export function createExperienceItem(): ExperienceFormData {
  return {
    title: createLocalizedField(),
    company: createLocalizedField(),
    period: createLocalizedField(),
    description: [createLocalizedField()],
  };
}

export function createEducationItem(): EducationFormData {
  return {
    degree: createLocalizedField(),
    institution: createLocalizedField(),
    period: createLocalizedField(),
    description: createLocalizedField(),
  };
}

export function createSkillItem(): SkillFormData {
  return {
    category: createLocalizedField(),
    items: [createLocalizedField()],
    order: 0,
    enabled: true,
  };
}

export function createProjectItem(): ProjectFormData {
  return {
    title: createLocalizedField(),
    description: createLocalizedField(),
    techStack: [],
    link: '',
    github: '',
    iosLink: '',
    androidLink: '',
    windowsLink: '',
    macLink: '',
    imageUrl: '',
    order: 0,
    enabled: true,
  };
}


