
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  status?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  icon: string;
  location?: string;
  result?: string;
  color?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface Certification {
  name: string;
  provider: string;
  badge?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Language {
  name: string;
  level: string;
  proficiency: number; // 0-100 for visual indicator
}
