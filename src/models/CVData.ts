import mongoose, { Schema, Document, Model } from 'mongoose';

function createModel<T extends Document>(name: string, schema: Schema<T>) {
  if (process.env.NODE_ENV !== 'production' && mongoose.models[name]) {
    delete mongoose.models[name];
  }

  return (mongoose.models[name] as Model<T>) || mongoose.model<T>(name, schema);
}

export interface ILocalizedString {
  en: string;
  th: string;
}

const LocalizedStringSchema = new Schema<ILocalizedString>({
  en: { type: String, required: true },
  th: { type: String, required: true },
}, { _id: false });

// Profile
export interface IProfileData {
  name: ILocalizedString;
  role: ILocalizedString;
  bio: ILocalizedString;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: ILocalizedString;
}

export interface IProfile extends IProfileData, Document {}

const ProfileSchema = new Schema<IProfile>({
  name: { type: LocalizedStringSchema, required: true },
  role: { type: LocalizedStringSchema, required: true },
  bio: { type: LocalizedStringSchema, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  github: { type: String, required: true },
  linkedin: { type: String, required: true },
  location: { type: LocalizedStringSchema, required: true },
});

// Experience
export interface IExperienceData {
  title: ILocalizedString;
  company: ILocalizedString;
  period: ILocalizedString;
  description: ILocalizedString[];
}

export interface IExperience extends IExperienceData, Document {}

const ExperienceSchema = new Schema<IExperience>({
  title: { type: LocalizedStringSchema, required: true },
  company: { type: LocalizedStringSchema, required: true },
  period: { type: LocalizedStringSchema, required: true },
  description: { type: [LocalizedStringSchema], required: true },
});

// Education
export interface IEducationData {
  degree: ILocalizedString;
  institution: ILocalizedString;
  period: ILocalizedString;
  description: ILocalizedString;
}

export interface IEducation extends IEducationData, Document {}

const EducationSchema = new Schema<IEducation>({
  degree: { type: LocalizedStringSchema, required: true },
  institution: { type: LocalizedStringSchema, required: true },
  period: { type: LocalizedStringSchema, required: true },
  description: { type: LocalizedStringSchema, required: true },
});

// Skill
export interface ISkillData {
  category: ILocalizedString;
  items: ILocalizedString[];
  order: number;
  enabled: boolean;
}

export interface ISkill extends ISkillData, Document {}

const SkillSchema = new Schema<ISkill>({
  category: { type: LocalizedStringSchema, required: true },
  items: { type: [LocalizedStringSchema], required: true },
  order: { type: Number, required: false, default: 0 },
  enabled: { type: Boolean, required: false, default: true },
});

// Project
export interface IProjectData {
  title: ILocalizedString;
  description: ILocalizedString;
  techStack: string[];
  link: string;
  github: string;
  iosLink: string;
  androidLink: string;
  windowsLink: string;
  macLink: string;
  imageUrl: string;
  order: number;
  enabled: boolean;
}

export interface IProject extends IProjectData, Document {}

const ProjectSchema = new Schema<IProject>({
  title: { type: LocalizedStringSchema, required: true },
  description: { type: LocalizedStringSchema, required: true },
  techStack: { type: [String], required: true },
  link: { type: String, required: false },
  github: { type: String, required: false },
  iosLink: { type: String, required: false, default: '' },
  androidLink: { type: String, required: false, default: '' },
  windowsLink: { type: String, required: false, default: '' },
  macLink: { type: String, required: false, default: '' },
  imageUrl: { type: String, required: false, default: '' },
  order: { type: Number, required: false, default: 0 },
  enabled: { type: Boolean, required: false, default: true },
});

export const ProfileModel = createModel<IProfile>('Profile', ProfileSchema);
export const ExperienceModel = createModel<IExperience>('Experience', ExperienceSchema);
export const EducationModel = createModel<IEducation>('Education', EducationSchema);
export const SkillModel = createModel<ISkill>('Skill', SkillSchema);
export const ProjectModel = createModel<IProject>('Project', ProjectSchema);

// Resolved types for Frontend
export interface IProfileResolved {
  name: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: string;
}

export interface IExperienceResolved {
  _id?: string;
  title: string;
  company: string;
  period: string;
  description: string[];
}

export interface IEducationResolved {
  _id?: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface ISkillResolved {
  _id?: string;
  category: string;
  items: string[];
  order: number;
  enabled: boolean;
}

export interface IProjectResolved {
  _id?: string;
  title: string;
  description: string;
  techStack: string[];
  link: string;
  github: string;
  iosLink: string;
  androidLink: string;
  windowsLink: string;
  macLink: string;
  imageUrl: string;
  order: number;
  enabled: boolean;
}


