import { AchievementItem } from '../types';

export const achievementsData: AchievementItem[] = [
  {
    id: 'vit-cs',
    year: '2023 — 2027',
    title: 'B.Tech in Computer Science and Engineering',
    organization: 'Vellore Institute of Technology (VIT), Vellore',
    type: 'Education',
    description: 'Pursuing undergraduate degree in Computer Science. Core coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, Artificial Intelligence, and Software Engineering.',
    tags: ['Algorithms', 'Systems', 'AI', 'Distributed Systems'],
    verified: true
  },
  {
    id: 'vit-scholarship',
    year: '2023 — Present',
    title: 'VIT Merit Scholarship',
    organization: 'Vellore Institute of Technology',
    type: 'Award',
    description: 'Awarded institutional merit scholarship in recognition of exceptional academic performance and competitive rank standing.',
    tags: ['Academic Excellence', 'Merit Rank', 'Competitive Standing'],
    verified: true
  },
  {
    id: 'ibm-genai',
    year: '2024',
    title: 'IBM Generative AI Engineering Professional Certificate',
    organization: 'IBM',
    type: 'Certification',
    description: 'Rigorous professional credential covering foundational Large Language Models, prompt engineering, RAG (Retrieval-Augmented Generation), vector databases, model fine-tuning, and production deployment of AI applications.',
    tags: ['Generative AI', 'LLMs', 'Prompt Engineering', 'RAG'],
    verified: true
  },
  {
    id: 'ai-dev-projects',
    year: '2024 — Present',
    title: 'Independent AI & Systems Engineering',
    organization: 'Open Source & Research Projects',
    type: 'Experience',
    description: 'Architecting and publishing production-grade open-source systems including RouteFusion (Hungarian algorithm optimization), ThreatLensAI (gradient boosted bot telemetry analysis), and local LLM document intelligence platforms.',
    tags: ['Open Source', 'FastAPI', 'React', 'Hungarian Algo', 'XGBoost'],
    verified: true
  }
];
