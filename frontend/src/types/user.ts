export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: "participant" | "organizer"; // Added role
  avatar?: string;
  bio?: string;
  skills: string[];
  techStack: string[];
  githubUrl?: string;
  portfolioUrl?: string;
  xp: number;
  level: number;
  badges: Badge[];
  hackathonsParticipated: number;
  hackathonsWon: number;
  reputationScore: number;
  createdAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface SkillRadar {
  frontend: number;
  backend: number;
  design: number;
  devops: number;
  mobile: number;
  ai: number;
}
