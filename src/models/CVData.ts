import mongoose, { Schema, Document, Model } from 'mongoose';

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
}

export interface ISkill extends ISkillData, Document {}

const SkillSchema = new Schema<ISkill>({
  category: { type: LocalizedStringSchema, required: true },
  items: { type: [LocalizedStringSchema], required: true },
});

// Project
export interface IProjectData {
  title: ILocalizedString;
  description: ILocalizedString;
  techStack: string[];
  link: string;
  github: string;
  imageUrl: string;
}

export interface IProject extends IProjectData, Document {}

const ProjectSchema = new Schema<IProject>({
  title: { type: LocalizedStringSchema, required: true },
  description: { type: LocalizedStringSchema, required: true },
  techStack: { type: [String], required: true },
  link: { type: String, required: false },
  github: { type: String, required: false },
  imageUrl: { type: String, required: false, default: '' },
});

export const ProfileModel = (mongoose.models.Profile as Model<IProfile>) || mongoose.model<IProfile>('Profile', ProfileSchema);
export const ExperienceModel = (mongoose.models.Experience as Model<IExperience>) || mongoose.model<IExperience>('Experience', ExperienceSchema);
export const EducationModel = (mongoose.models.Education as Model<IEducation>) || mongoose.model<IEducation>('Education', EducationSchema);
export const SkillModel = (mongoose.models.Skill as Model<ISkill>) || mongoose.model<ISkill>('Skill', SkillSchema);
export const ProjectModel = (mongoose.models.Project as Model<IProject>) || mongoose.model<IProject>('Project', ProjectSchema);

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
}

export interface IProjectResolved {
  _id?: string;
  title: string;
  description: string;
  techStack: string[];
  link: string;
  github: string;
  imageUrl: string;
}
