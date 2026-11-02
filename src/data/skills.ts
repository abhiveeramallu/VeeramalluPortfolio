export interface SkillItem {
  name: string;
  category: 'Languages' | 'Frameworks' | 'AI & ML' | 'Databases' | 'Tools & Cloud';
  description: string;
  tag: string;
  iconName: string;
}

export const skillsData: SkillItem[] = [
  // Languages
  { name: 'Python', category: 'Languages', description: 'ML architectures, FastAPI, numerical analysis & data pipelines', tag: 'Core', iconName: 'Terminal' },
  { name: 'TypeScript', category: 'Languages', description: 'Type-safe enterprise web applications & real-time client systems', tag: 'Core', iconName: 'Code' },
  { name: 'JavaScript', category: 'Languages', description: 'Modern ESNext, asynchronous runtime, interactive canvas & DOM', tag: 'Frontend', iconName: 'FileCode' },
  { name: 'Java', category: 'Languages', description: 'Object-oriented patterns, multithreading & algorithmic problem solving', tag: 'Systems', iconName: 'Cpu' },
  { name: 'C++', category: 'Languages', description: 'Low-level performance, memory management, algorithms & data structures', tag: 'Performance', iconName: 'Binary' },
  { name: 'SQL', category: 'Languages', description: 'Relational query design, indexing strategies, CTEs & schema design', tag: 'Data', iconName: 'Database' },

  // Frameworks
  { name: 'React', category: 'Frameworks', description: 'Declarative component architecture, custom hooks, R3F & WebGL integration', tag: 'Frontend', iconName: 'Layers' },
  { name: 'FastAPI', category: 'Frameworks', description: 'Asynchronous Python microservices, OpenAPI spec & high-throughput endpoints', tag: 'Backend', iconName: 'Zap' },
  { name: 'Node.js', category: 'Frameworks', description: 'Event-driven server architecture, RESTful APIs & WebSocket servers', tag: 'Backend', iconName: 'Server' },
  { name: 'Flask', category: 'Frameworks', description: 'Lightweight Python web services, quick prototyping & ML model serving', tag: 'Backend', iconName: 'Flame' },

  // AI & ML
  { name: 'Ollama & Local LLMs', category: 'AI & ML', description: 'Private on-premise LLM inference, quantized models & prompt orchestration', tag: 'GenAI', iconName: 'Bot' },
  { name: 'Generative AI', category: 'AI & ML', description: 'RAG pipelines, vector search, embeddings & intelligent autonomous agents', tag: 'GenAI', iconName: 'Sparkles' },
  { name: 'Machine Learning', category: 'AI & ML', description: 'Supervised/unsupervised algorithms, evaluation metrics & feature engineering', tag: 'ML', iconName: 'Brain' },
  { name: 'XGBoost', category: 'AI & ML', description: 'Gradient boosting decision trees for tabular classification & threat analysis', tag: 'ML', iconName: 'TrendingUp' },

  // Databases
  { name: 'PostgreSQL', category: 'Databases', description: 'ACID transactions, spatial PostGIS queries & relational optimizations', tag: 'Database', iconName: 'Database' },
  { name: 'MySQL', category: 'Databases', description: 'Relational data modeling, indexing, foreign keys & stored procedures', tag: 'Database', iconName: 'Table' },
  { name: 'SQLite', category: 'Databases', description: 'Embedded zero-configuration local storage for edge and offline systems', tag: 'Database', iconName: 'HardDrive' },

  // Tools & Cloud
  { name: 'Git & GitHub', category: 'Tools & Cloud', description: 'Version control, collaborative workflows, CI/CD pipelines & code review', tag: 'DevOps', iconName: 'GitBranch' },
  { name: 'Docker', category: 'Tools & Cloud', description: 'Containerization, reproducible environments & multi-stage Dockerfiles', tag: 'DevOps', iconName: 'Box' },
  { name: 'VS Code', category: 'Tools & Cloud', description: 'Custom extension configurations, remote development & debugging', tag: 'Tooling', iconName: 'Laptop' },
  { name: 'Three.js / WebGL', category: 'Tools & Cloud', description: 'Interactive 3D graphics, shaders, particle systems & scene graphs', tag: 'Creative', iconName: 'Eye' },
];

export const skillCategories = ['All', 'Languages', 'Frameworks', 'AI & ML', 'Databases', 'Tools & Cloud'] as const;
