export const strategicRoles = [
  {
    id: 'knowledge_hub',
    title: 'Knowledge Hub',
    description: 'Maintain and disseminate summit intelligence, produce regional reports',
    activities: [
      'Maintain Summit Intelligence Hub',
      'Publish annual "State of Nordic-Baltic Circular Economy"',
      'Provide data services to partners',
      'Document case studies and best practices'
    ],
    revenue: 'Membership fees, commissioned research, sponsorship'
  },
  {
    id: 'network_convener',
    title: 'Network Convener',
    description: 'Facilitate connections and collaboration across the region',
    activities: [
      'Host follow-up events and webinars',
      'Facilitate cross-sector introductions',
      'Support new network development',
      'Coordinate Summit 2026'
    ],
    revenue: 'Event fees, membership, sponsorship'
  },
  {
    id: 'project_developer',
    title: 'Project Developer',
    description: 'Lead and coordinate funding applications and project implementation',
    activities: [
      'Write funding applications',
      'Provide project management services',
      'Offer communication/dissemination support',
      'Coordinate multi-partner consortia'
    ],
    revenue: 'Project fees, overhead recovery, coordination fees'
  },
  {
    id: 'policy_interface',
    title: 'Policy Interface',
    description: 'Aggregate and channel business perspectives to policymakers',
    activities: [
      'Compile industry input on regulations (EPR, DPP, ESPR)',
      'Coordinate regional positions toward EU',
      'Support advocacy efforts',
      'Policy briefings and recommendations'
    ],
    revenue: 'Commissioned policy work, membership value'
  }
];

export const priorityOpportunities = [
  {
    id: 'nbtt-coordination',
    title: 'Nordic-Baltic Textile Transition Group Coordination',
    description: 'Support or co-lead the newly launched textile platform',
    role: 'Co-coordinator / Communication partner',
    partners: ['Lifestyle & Design Cluster', 'Baltic Circular Hotspot'],
    timeline: 'Immediate (Dec 2025 deadline for input)',
    priority: 'high',
    nextSteps: [
      'Contact Frederik Thrane re: coordination role',
      'Submit topic suggestions before Dec 1',
      'Draft funding application outline'
    ]
  },
  {
    id: 'arccirc-initiative',
    title: 'ArcCirc Development Initiative',
    description: 'Lead development of proposed Arctic CE Resource Centre',
    role: 'Initiator / Lead developer',
    partners: ['Natural State', 'Arctic stakeholders'],
    timeline: '2026 development, 2027 launch',
    priority: 'high',
    nextSteps: [
      'Discuss with Cathrine Barth (original proposer)',
      'Map Arctic stakeholders',
      'Develop 2-page concept note'
    ]
  },
  {
    id: 'construction-catalog',
    title: 'Circular Construction Catalog Platform',
    description: 'Host/distribute Nordic circular construction solutions catalog',
    role: 'Platform partner / Distribution',
    partners: ['Natural State', 'Nordic Circular Construction'],
    timeline: 'Q1 2026',
    priority: 'high',
    nextSteps: [
      'Meet with Jan Thomas Odegard',
      'Assess technical integration requirements',
      'Develop co-promotion plan'
    ]
  },
  {
    id: 'toolbox-deployment',
    title: 'Circular Design Toolbox Regional Deployment',
    description: 'Deploy Estonian toolbox across Nordic-Baltic region',
    role: 'Deployment partner / Training provider',
    partners: ['HI Advisory', 'Enterprise Estonia'],
    timeline: '2026',
    priority: 'medium',
    nextSteps: [
      'Contact Dan Mikkin re: partnership',
      'Identify pilot companies',
      'Draft deployment plan'
    ]
  },
  {
    id: 'epr-coordination',
    title: 'Nordic-Baltic EPR Harmonization Coordination',
    description: 'Coordinate regional position on textile EPR implementation',
    role: 'Facilitator / Coordinator',
    partners: ['NBTT Group', 'National EPR bodies'],
    timeline: '2025-2026 (urgent)',
    priority: 'medium',
    nextSteps: [
      'Assess via NBTT Group',
      'Map current EPR status by country',
      'Identify harmonization gaps'
    ]
  }
];

export const projects = [
  {
    name: 'Nordic-Baltic Textile Transition Group',
    status: 'launched',
    sector: 'Textiles',
    lead: 'Lifestyle & Design Cluster',
    countries: 'All 8 Nordic-Baltic',
    nchOpportunity: 'Co-coordination, communication support, data/research'
  },
  {
    name: 'Nordic Circular Construction',
    status: 'active',
    sector: 'Construction',
    lead: 'Natural State',
    countries: 'Nordic 5',
    nchOpportunity: 'Platform/distribution, catalog hosting'
  },
  {
    name: 'Circular Design Toolbox',
    status: 'launched',
    sector: 'Cross-sectoral',
    lead: 'HI Advisory',
    countries: 'Estonia → Nordic-Baltic',
    nchOpportunity: 'Regional deployment, training programs'
  },
  {
    name: 'ArcCirc (Arctic CE Resource Centre)',
    status: 'proposed',
    sector: 'Cross-sectoral',
    lead: 'To be established',
    countries: 'Arctic region',
    nchOpportunity: 'Lead development, convene stakeholders'
  },
  {
    name: '100% Fish / 100% Shrimp',
    status: 'active',
    sector: 'Seafood',
    lead: 'Iceland Ocean Cluster',
    countries: 'Iceland, Greenland, Denmark, Norway',
    nchOpportunity: 'Case study documentation, methodology spread'
  },
  {
    name: 'Nordic Sustainable Construction Network',
    status: 'active',
    sector: 'Construction',
    lead: 'Danish Authority for Housing',
    countries: 'Nordic 7 (incl. territories)',
    nchOpportunity: 'Knowledge dissemination, business engagement'
  }
];

export const fundingSources = [
  {
    name: 'Nordic Innovation',
    type: 'Public Agency',
    geography: 'Nordic',
    relevance: 'High',
    focus: 'Circular economy, business development, innovation',
    notes: 'Focus on cross-Nordic collaboration, business model innovation'
  },
  {
    name: 'Nordic Council of Ministers',
    type: 'Intergovernmental',
    geography: 'Nordic',
    relevance: 'High',
    focus: 'Policy coordination, research, sustainable development',
    notes: 'Government/institutional applicants, policy relevance'
  },
  {
    name: 'Sitra (Finnish Innovation Fund)',
    type: 'Innovation Fund',
    geography: 'Finland / Nordic / Global',
    relevance: 'High',
    focus: 'Circular economy, systemic change, future prosperity',
    notes: 'Systems-level impact, Finnish connection beneficial'
  },
  {
    name: 'Nordic Investment Bank',
    type: 'Development Bank',
    geography: 'Nordic-Baltic',
    relevance: 'High',
    focus: 'Productivity, environment, infrastructure',
    notes: '€45B balance sheet, longer timelines accepted for circular investments'
  },
  {
    name: 'Horizon Europe',
    type: 'EU Programme',
    geography: 'EU / Associated countries',
    relevance: 'High',
    focus: 'Research, innovation, green transition',
    notes: 'Strong consortia needed, TRL advancement, impact metrics'
  },
  {
    name: 'Interreg Baltic Sea Region',
    type: 'EU Programme',
    geography: 'Baltic Sea Region',
    relevance: 'Medium',
    focus: 'Territorial cooperation, regional development',
    notes: 'Cross-border partnerships, regional impact'
  }
];

export const keyContacts = [
  { name: 'Frederik Thrane', organization: 'Lifestyle & Design Cluster', opportunity: 'NBTT Group coordination', priority: 'high' },
  { name: 'Cathrine Barth', organization: 'Natural State', opportunity: 'ArcCirc development', priority: 'high' },
  { name: 'Jan Thomas Odegard', organization: 'Natural State', opportunity: 'Construction catalog', priority: 'high' },
  { name: 'Marthe Haugland', organization: 'Nordic Innovation', opportunity: 'Funding discussions', priority: 'high' },
  { name: 'Dan Mikkin', organization: 'HI Advisory', opportunity: 'Toolbox deployment', priority: 'medium' },
  { name: 'Kerli Kant Hvass', organization: 'Aalborg University', opportunity: 'Research collaboration', priority: 'medium' }
];

export const quickWins = [
  { action: 'Join NBTT mailing list and submit topic suggestions', deadline: 'December 1, 2025', effort: 'Low', impact: 'Medium' },
  { action: 'Publish Summit Intelligence Hub on NCH website', deadline: 'December 2025', effort: 'Medium', impact: 'High' },
  { action: 'Create summit impact report for stakeholders', deadline: 'January 2026', effort: 'Medium', impact: 'High' },
  { action: 'Schedule follow-up calls with priority contacts', deadline: 'December 2025', effort: 'Low', impact: 'High' }
];

export const successMetrics = {
  shortTerm: [
    'Formal role in NBTT Group secured',
    'Construction catalog integrated',
    'ArcCirc concept note developed',
    '3+ follow-up events hosted'
  ],
  mediumTerm: [
    'Funding secured for coordination role',
    'Summit 2026 planning underway',
    'Toolbox pilots completed',
    'EPR position paper published'
  ],
  longTerm: [
    'ArcCirc established',
    'NCH as recognized policy interface',
    'Sustainable revenue model proven',
    'Regional circular metrics dashboard'
  ]
};

export const summitStats = {
  speakers: 50,
  organizations: 85,
  projects: 11,
  opportunities: 6,
  fundingSources: 10,
  countries: 10
};
