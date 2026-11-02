import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'routefusion',
    number: '01',
    title: 'RouteFusion',
    subtitle: 'Unified Ride & Parcel Optimization Platform',
    description: 'An intelligent platform that optimizes ride and parcel assignments through mathematical optimization and route evaluation.',
    longDescription: 'RouteFusion solves the combinatorial challenge of multi-modal ride-sharing and parcel co-loading. By pairing passengers and parcel drop-offs into shared journeys, it slashes redundant vehicle miles while guaranteeing strict delivery and drop-off time windows.',
    problem: 'Urban transport networks suffer from fragmented routing: ride-hail vehicles operate with empty seats and deadhead miles, while couriers drive parallel paths. Coordinating passengers with static parcels in real time demands sub-second combinatorial matching.',
    solution: 'Designed a high-throughput assignment engine utilizing the Hungarian Algorithm for optimal bipartite matching, coupled with a spatial grid pruning algorithm that narrows candidate pairings before route cost evaluation.',
    architecture: 'Modular decoupled system: React + TypeScript geospatial dashboard querying a high-concurrency FastAPI microservice. PostGIS-enabled PostgreSQL handles spatial indexing, geofenced zones, and transit nodes.',
    algorithms: [
      'Hungarian (Kuhn-Munkres) Algorithm for optimal bipartite cost matrix matching',
      'Spatial Grid Partitioning & Pruning (reducing O(N*M) candidate search spaces)',
      'Constrained Dijkstra / A* route cost recalculation with detour penalties',
      'Time-window validation heuristics for strict ETA compliance'
    ],
    challenges: [
      'Maintaining sub-100ms assignment response times across high concurrency requests',
      'Balancing passenger passenger comfort (max detour threshold) against parcel delivery urgency',
      'Handling spatial telemetry drift in simulated high-density urban corridors'
    ],
    technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Hungarian Algorithm', 'Tailwind CSS', 'Vite'],
    category: 'AI & Systems',
    highlights: [
      'Hungarian algorithm implementation',
      'Assignment optimization',
      'Route evaluation & detour bounding',
      'Spatial grid pruning',
      'Intelligent multi-tenant matching'
    ],
    githubUrl: 'https://github.com/abhiveeramallu/RouteFusion',
    liveUrl: 'https://route-fusion.vercel.app/',
    accentColor: '#FF5B35',
    sceneType: 'routefusion'
  },
  {
    id: 'threatlensai',
    number: '02',
    title: 'ThreatLensAI',
    subtitle: 'AI-Powered Bot Detection & Threat Analysis',
    description: 'An intelligent cybersecurity platform leveraging machine learning models to identify automated bots, malicious telemetry, and anomalous network patterns in real-time.',
    longDescription: 'ThreatLensAI acts as a security sentinel for modern web infrastructure. By continuously extracting client-side interaction biometric signals and network-layer headers, it accurately classifies traffic without introducing high-friction CAPTCHAs for legitimate users.',
    problem: 'Modern bots simulate human mouse dynamics and spoof browser headers, making naive rate limiters and signature-based WAFs ineffective while irritating genuine human users with intrusive verification loops.',
    solution: 'Implemented an XGBoost and scikit-learn machine learning pipeline trained on behavioural telemetry, keystroke dynamics, mouse trajectory curvature, and request latency distributions to yield probabilistic bot classifications in real time.',
    architecture: 'Telemetry collector SDK -> Node.js & Express high-throughput ingress gateway -> Python asynchronous inference worker using XGBoost -> PostgreSQL for analytical threat logs and audit trails.',
    algorithms: [
      'XGBoost Gradient Boosting Classifier for multi-feature tabular threat scoring',
      'Mouse trajectory curvature & velocity derivative extraction',
      'Sliding window anomaly scoring for burst network requests',
      'Bayesian probability update for session-level confidence accumulation'
    ],
    challenges: [
      'Minimizing false positives for accessibility tools and mobile touch inputs',
      'Executing ML inference within 15 milliseconds per request',
      'Preventing adversarial evasion through synthetic trajectory injection'
    ],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Python', 'XGBoost', 'scikit-learn', 'Tailwind CSS'],
    category: 'Cybersecurity',
    highlights: [
      'Behavioural telemetry extraction',
      'Gradient boosted classification',
      'Real-time threat graph telemetry',
      'Adaptive risk score evaluation',
      'Zero-friction human verification'
    ],
    githubUrl: 'https://github.com/abhiveeramallu/ThreatlensAI',
    accentColor: '#8B5CF6',
    sceneType: 'threatlens'
  },
  {
    id: 'smartdocs',
    number: '03',
    title: 'Smart Document Intelligence',
    subtitle: 'AI-Powered Document Processing & Analysis',
    description: 'A local-first document processing and intelligence platform utilizing local Large Language Models (Ollama) and OCR to extract, index, and query unstructured documents securely.',
    longDescription: 'Smart Document Intelligence enables enterprise-grade document extraction without data leakage. By integrating local LLMs through Ollama alongside multi-format OCR pipelines, users can chat with, analyze, and synthesize large volumes of PDFs and DOCX files entirely on-premise.',
    problem: 'Sensitive corporate and legal documents cannot be sent to public commercial cloud APIs due to compliance and confidentiality mandates, yet manual parsing of multi-page technical contracts is slow and error-prone.',
    solution: 'Built a local-first FastAPI and Ollama architecture capable of parsing multi-format files (PDF, DOCX, scanned images), generating vector-embedded chunk indices, and running local LLM inference with zero external network transmission.',
    architecture: 'React responsive frontend -> FastAPI REST orchestration service -> PyPDF & Tesseract OCR parsing engine -> SQLite vector/metadata catalog -> Ollama local inference backend.',
    algorithms: [
      'Document chunking with contextual overlapping windows',
      'Cosine similarity semantic retrieval over extracted token embeddings',
      'Local prompt conditioning and structured JSON output extraction',
      'Adaptive OCR thresholding for low-contrast scans'
    ],
    challenges: [
      'Handling memory constraints when loading 7B/8B parameter models locally',
      'Accurately parsing complex multi-column tabular data from dense PDF contracts',
      'Ensuring low latency token streaming over WebSocket/SSE to the client interface'
    ],
    technologies: ['FastAPI', 'React', 'SQLite', 'Ollama', 'Python', 'OCR', 'Local LLMs'],
    category: 'AI & Systems',
    highlights: [
      'PDF & DOCX parsing engine',
      'High-accuracy optical character recognition (OCR)',
      'Intelligent contextual document analysis',
      'Zero-cloud private local LLM integration',
      'Interactive citation verification'
    ],
    githubUrl: 'https://github.com/abhiveeramallu',
    accentColor: '#C7D9B5',
    sceneType: 'smartdocs'
  },
  {
    id: 'greenhouse',
    number: '04',
    title: 'Greenhouse Micro-Climate Forecasting',
    subtitle: 'AI-Driven Climate Prediction & Closed-Loop Control',
    description: 'Deep learning time-series forecasting system utilizing GRU and BiLSTM recurrent architectures to model greenhouse micro-climates and automate precision agriculture.',
    longDescription: 'This system captures real-world agricultural sensor feeds (temperature, relative humidity, soil moisture, solar irradiance) and predicts environmental fluctuations up to 12 hours ahead, giving automated actuators time to preempt extreme thermal spikes and frost.',
    problem: 'Enclosed greenhouse environments undergo non-linear micro-climatic swings due to external weather variations. Reactive HVAC control is inefficient, wasting energy and subjecting delicate crops to thermal shock.',
    solution: 'Engineered a dual recurrent neural network architecture comparing Gated Recurrent Units (GRU) and Bidirectional Long Short-Term Memory (BiLSTM) networks, achieving superior root-mean-square error performance in predictive micro-climate modeling.',
    architecture: 'IoT sensor telemetry pipeline -> Python training & serialization pipeline -> FastAPI prediction server -> React dashboard with interactive time-series forecasts and actuator status monitor.',
    algorithms: [
      'Bidirectional LSTM for forward and backward temporal feature extraction',
      'Gated Recurrent Unit (GRU) for low-latency edge deployment',
      'Min-Max multivariable standardizer with seasonal trend decomposition',
      'Predictive thresholding for closed-loop ventilation trigger calculation'
    ],
    challenges: [
      'Mitigating vanishing gradients over multi-step temporal prediction horizons',
      'Compensating for missing sensor data packets in wireless mesh networks',
      'Balancing computational overhead for edge device deployment on local gateways'
    ],
    technologies: ['Python', 'GRU', 'BiLSTM', 'FastAPI', 'React', 'PyTorch / TensorFlow', 'Pandas'],
    category: 'Machine Learning',
    highlights: [
      'BiLSTM & GRU comparative modeling',
      'Multivariable time-series forecasting',
      '12-hour micro-climate trajectory prediction',
      'Proactive environmental actuator heuristics',
      'Interactive sensory dashboard visualization'
    ],
    githubUrl: 'https://github.com/abhiveeramallu',
    accentColor: '#FF5B35',
    sceneType: 'greenhouse'
  }
];
