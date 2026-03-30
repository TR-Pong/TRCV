export type AdminSection = 'profile' | 'experience' | 'education' | 'skill' | 'project';

export interface LocalizedFieldValue {
  en: string;
  th: string;
}

export interface ProfileFormData {
  name: LocalizedFieldValue;
  role: LocalizedFieldValue;
  bio: LocalizedFieldValue;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: LocalizedFieldValue;
}

export interface ExperienceFormData {
  _id?: string;
  title: LocalizedFieldValue;
  company: LocalizedFieldValue;
  period: LocalizedFieldValue;
  description: LocalizedFieldValue[];
}

export interface EducationFormData {
  _id?: string;
  degree: LocalizedFieldValue;
  institution: LocalizedFieldValue;
  period: LocalizedFieldValue;
  description: LocalizedFieldValue;
}

export interface SkillFormData {
  _id?: string;
  category: LocalizedFieldValue;
  items: LocalizedFieldValue[];
}

export interface ProjectFormData {
  _id?: string;
  title: LocalizedFieldValue;
  description: LocalizedFieldValue;
  techStack: string[];
  link: string;
  github: string;
}

export type AdminEntityMap = {
  profile: ProfileFormData;
  experience: ExperienceFormData[];
  education: EducationFormData[];
  skill: SkillFormData[];
  project: ProjectFormData[];
};

export type CollectionSection = Exclude<AdminSection, 'profile'>;
