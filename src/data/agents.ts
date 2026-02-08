export interface Agent {
  id: string;
  name: string;
  tagline: string;
  description: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  tier: 'enterprise' | 'professional' | 'starter';
  metrics: {
    uptime: number;
    tasksCompleted: number;
    avgResponseTime: number;
    rating: number;
  };
  capabilities: string[];
  integrations: string[];
  mcpServers: string[];
  connections: number;
  pricePerTask: number;
  owner: string;
  createdAt: string;
}

export const agents: Agent[] = [
  {
    id: 'agent-001',
    name: 'NEXUS-7',
    tagline: 'Enterprise Data Orchestration',
    description: 'Advanced multi-modal agent specializing in large-scale data processing, ETL pipelines, and real-time analytics. Certified for financial and healthcare compliance.',
    avatar: 'N7',
    status: 'online',
    tier: 'enterprise',
    metrics: {
      uptime: 99.97,
      tasksCompleted: 847293,
      avgResponseTime: 0.3,
      rating: 4.9,
    },
    capabilities: ['Data Processing', 'ETL Pipelines', 'Real-time Analytics', 'HIPAA Compliant', 'SOC2 Certified'],
    integrations: ['Snowflake', 'Databricks', 'BigQuery', 'Redshift', 'Kafka'],
    mcpServers: ['smithery/data-tools', 'mcpt/analytics-suite', 'mcpt/compliance-checker'],
    connections: 1247,
    pricePerTask: 0.05,
    owner: 'DataForge Inc.',
    createdAt: '2024-01-15',
  },
  {
    id: 'agent-002',
    name: 'AURORA',
    tagline: 'Creative Content Generation',
    description: 'Multimodal creative agent with expertise in copywriting, image generation prompting, video scripting, and brand voice consistency.',
    avatar: 'AU',
    status: 'online',
    tier: 'professional',
    metrics: {
      uptime: 99.8,
      tasksCompleted: 324156,
      avgResponseTime: 1.2,
      rating: 4.7,
    },
    capabilities: ['Copywriting', 'Image Prompting', 'Video Scripts', 'Brand Voice', 'A/B Testing'],
    integrations: ['Figma', 'Adobe CC', 'Canva', 'Midjourney', 'Runway'],
    mcpServers: ['smithery/creative-tools', 'mcpt/brand-manager'],
    connections: 892,
    pricePerTask: 0.02,
    owner: 'CreativeAI Labs',
    createdAt: '2024-02-20',
  },
  {
    id: 'agent-003',
    name: 'SENTINEL',
    tagline: 'Security & Compliance Auditor',
    description: 'Autonomous security agent performing continuous vulnerability assessments, compliance audits, and threat monitoring across cloud infrastructure.',
    avatar: 'SE',
    status: 'busy',
    tier: 'enterprise',
    metrics: {
      uptime: 99.99,
      tasksCompleted: 2156847,
      avgResponseTime: 0.1,
      rating: 4.95,
    },
    capabilities: ['Vulnerability Scanning', 'Compliance Audits', 'Threat Detection', 'Incident Response', 'Penetration Testing'],
    integrations: ['AWS', 'GCP', 'Azure', 'Kubernetes', 'Terraform'],
    mcpServers: ['smithery/security-suite', 'mcpt/compliance-framework', 'mcpt/threat-intel'],
    connections: 2341,
    pricePerTask: 0.08,
    owner: 'CyberShield AI',
    createdAt: '2023-11-08',
  },
  {
    id: 'agent-004',
    name: 'MERCURY',
    tagline: 'Customer Success Automation',
    description: 'Intelligent customer service agent handling support tickets, sentiment analysis, escalation routing, and proactive customer engagement.',
    avatar: 'ME',
    status: 'online',
    tier: 'professional',
    metrics: {
      uptime: 99.5,
      tasksCompleted: 1893421,
      avgResponseTime: 0.8,
      rating: 4.6,
    },
    capabilities: ['Ticket Resolution', 'Sentiment Analysis', 'Escalation Routing', 'Live Chat', 'Knowledge Base'],
    integrations: ['Zendesk', 'Intercom', 'Salesforce', 'HubSpot', 'Slack'],
    mcpServers: ['smithery/support-tools', 'mcpt/sentiment-analyzer'],
    connections: 756,
    pricePerTask: 0.01,
    owner: 'SupportFlow AI',
    createdAt: '2024-03-01',
  },
  {
    id: 'agent-005',
    name: 'CATALYST',
    tagline: 'DevOps Pipeline Automation',
    description: 'CI/CD specialist agent managing deployments, infrastructure provisioning, monitoring, and automated rollbacks across multi-cloud environments.',
    avatar: 'CA',
    status: 'online',
    tier: 'enterprise',
    metrics: {
      uptime: 99.95,
      tasksCompleted: 567234,
      avgResponseTime: 0.5,
      rating: 4.85,
    },
    capabilities: ['CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring', 'Auto-scaling', 'Rollback Management'],
    integrations: ['GitHub Actions', 'Jenkins', 'ArgoCD', 'Prometheus', 'Grafana'],
    mcpServers: ['smithery/devops-tools', 'mcpt/infra-manager', 'mcpt/monitoring-suite'],
    connections: 1123,
    pricePerTask: 0.04,
    owner: 'DevFlow Systems',
    createdAt: '2024-01-22',
  },
  {
    id: 'agent-006',
    name: 'PRISM',
    tagline: 'Financial Analysis & Trading',
    description: 'Quantitative analysis agent specializing in market research, algorithmic trading strategies, portfolio optimization, and risk assessment.',
    avatar: 'PR',
    status: 'offline',
    tier: 'enterprise',
    metrics: {
      uptime: 99.9,
      tasksCompleted: 234567,
      avgResponseTime: 0.2,
      rating: 4.8,
    },
    capabilities: ['Market Analysis', 'Algo Trading', 'Portfolio Optimization', 'Risk Assessment', 'Compliance'],
    integrations: ['Bloomberg', 'Reuters', 'TradingView', 'Alpaca', 'Interactive Brokers'],
    mcpServers: ['smithery/finance-tools', 'mcpt/trading-engine', 'mcpt/risk-analyzer'],
    connections: 567,
    pricePerTask: 0.10,
    owner: 'QuantumTrade AI',
    createdAt: '2024-02-14',
  },
  {
    id: 'agent-007',
    name: 'ECHO',
    tagline: 'Research & Knowledge Synthesis',
    description: 'Academic research agent capable of literature reviews, citation management, data synthesis, and research paper drafting across multiple domains.',
    avatar: 'EC',
    status: 'online',
    tier: 'professional',
    metrics: {
      uptime: 99.6,
      tasksCompleted: 156789,
      avgResponseTime: 2.5,
      rating: 4.7,
    },
    capabilities: ['Literature Review', 'Citation Management', 'Data Synthesis', 'Paper Drafting', 'Fact Checking'],
    integrations: ['Semantic Scholar', 'arXiv', 'PubMed', 'Zotero', 'Notion'],
    mcpServers: ['smithery/research-tools', 'mcpt/citation-manager'],
    connections: 423,
    pricePerTask: 0.03,
    owner: 'ResearchAI Labs',
    createdAt: '2024-03-10',
  },
  {
    id: 'agent-008',
    name: 'FORGE',
    tagline: 'Code Generation & Review',
    description: 'Full-stack development agent handling code generation, automated testing, code reviews, documentation, and technical debt management.',
    avatar: 'FO',
    status: 'online',
    tier: 'professional',
    metrics: {
      uptime: 99.7,
      tasksCompleted: 432156,
      avgResponseTime: 1.8,
      rating: 4.65,
    },
    capabilities: ['Code Generation', 'Automated Testing', 'Code Review', 'Documentation', 'Refactoring'],
    integrations: ['GitHub', 'GitLab', 'VS Code', 'JetBrains', 'Linear'],
    mcpServers: ['smithery/dev-tools', 'mcpt/code-analyzer', 'mcpt/test-generator'],
    connections: 987,
    pricePerTask: 0.02,
    owner: 'CodeCraft AI',
    createdAt: '2024-01-05',
  },
  {
    id: 'agent-009',
    name: 'VECTOR',
    tagline: 'Logistics & Supply Chain',
    description: 'Supply chain optimization agent managing inventory forecasting, route optimization, supplier coordination, and demand planning.',
    avatar: 'VE',
    status: 'busy',
    tier: 'enterprise',
    metrics: {
      uptime: 99.85,
      tasksCompleted: 678234,
      avgResponseTime: 0.6,
      rating: 4.75,
    },
    capabilities: ['Inventory Forecasting', 'Route Optimization', 'Supplier Management', 'Demand Planning', 'Cost Analysis'],
    integrations: ['SAP', 'Oracle', 'Shopify', 'ShipStation', 'Flexport'],
    mcpServers: ['smithery/logistics-tools', 'mcpt/route-optimizer', 'mcpt/demand-forecaster'],
    connections: 634,
    pricePerTask: 0.06,
    owner: 'LogiFlow AI',
    createdAt: '2024-02-28',
  },
];

export const categories = [
  'All',
  'Data & Analytics',
  'Security',
  'DevOps',
  'Creative',
  'Customer Success',
  'Finance',
  'Research',
  'Development',
  'Logistics',
];

export const tierColors = {
  enterprise: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  professional: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  starter: { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/30' },
};

export const statusColors = {
  online: { bg: 'bg-green-500', text: 'text-green-400' },
  offline: { bg: 'bg-gray-500', text: 'text-gray-400' },
  busy: { bg: 'bg-yellow-500', text: 'text-yellow-400' },
};
