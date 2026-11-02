export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  architecture: string;
  algorithms: string[];
  challenges: string[];
  technologies: string[];
  category: 'AI & Systems' | 'Cybersecurity' | 'Machine Learning' | 'Full Stack';
  highlights: string[];
  githubUrl: string;
  liveUrl?: string;
  accentColor: string;
  sceneType: 'routefusion' | 'threatlens' | 'smartdocs' | 'greenhouse';
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: string;
    focus: string;
    icon?: string;
  }[];
}

export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  type: 'Education' | 'Certification' | 'Award' | 'Experience';
  description: string;
  tags: string[];
  verified: boolean;
}
