'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChartIcon,
  BuildingIcon,
  NetworkIcon,
  DocumentIcon,
  LocationIcon,
  GlobeIcon,
  UsersIcon
} from '@/components/Icons';

// Icon components for this page
const TargetIcon = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const RocketIcon = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const FundingIcon = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <path d="M12 18V6" />
  </svg>
);

const ContactIcon = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <circle cx="12" cy="10" r="2" />
    <line x1="8" x2="8" y1="2" y2="4" />
    <line x1="16" x2="16" y1="2" y2="4" />
  </svg>
);

const ChecklistIcon = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const MetricsIcon = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const ArrowRightIcon = ({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// Data
const strategicRoles = [
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

const priorityOpportunities = [
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

const projects = [
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

const fundingSources = [
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

const keyContacts = [
  { name: 'Frederik Thrane', organization: 'Lifestyle & Design Cluster', opportunity: 'NBTT Group coordination', priority: 'high' },
  { name: 'Cathrine Barth', organization: 'Natural State', opportunity: 'ArcCirc development', priority: 'high' },
  { name: 'Jan Thomas Odegard', organization: 'Natural State', opportunity: 'Construction catalog', priority: 'high' },
  { name: 'Marthe Haugland', organization: 'Nordic Innovation', opportunity: 'Funding discussions', priority: 'high' },
  { name: 'Dan Mikkin', organization: 'HI Advisory', opportunity: 'Toolbox deployment', priority: 'medium' },
  { name: 'Kerli Kant Hvass', organization: 'Aalborg University', opportunity: 'Research collaboration', priority: 'medium' }
];

const quickWins = [
  { action: 'Join NBTT mailing list and submit topic suggestions', deadline: 'December 1, 2025', effort: 'Low', impact: 'Medium' },
  { action: 'Publish Summit Intelligence Hub on NCH website', deadline: 'December 2025', effort: 'Medium', impact: 'High' },
  { action: 'Create summit impact report for stakeholders', deadline: 'January 2026', effort: 'Medium', impact: 'High' },
  { action: 'Schedule follow-up calls with priority contacts', deadline: 'December 2025', effort: 'Low', impact: 'High' }
];

const successMetrics = {
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

const summitStats = {
  speakers: 50,
  organizations: 85,
  projects: 11,
  opportunities: 6,
  fundingSources: 10,
  countries: 10
};

type TabId = 'overview' | 'opportunities' | 'projects' | 'funding' | 'contacts' | 'quickwins' | 'metrics';

export default function SummitIntelligencePage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <ChartIcon size={18} /> },
    { id: 'opportunities', label: 'Strategic Opportunities', icon: <TargetIcon size={18} /> },
    { id: 'projects', label: 'Project Pipeline', icon: <RocketIcon size={18} /> },
    { id: 'funding', label: 'Funding Sources', icon: <FundingIcon size={18} /> },
    { id: 'contacts', label: 'Key Contacts', icon: <ContactIcon size={18} /> },
    { id: 'quickwins', label: 'Quick Wins', icon: <ChecklistIcon size={18} /> },
    { id: 'metrics', label: 'Success Metrics', icon: <MetricsIcon size={18} /> }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="frost-card-strong border-b" style={{ borderColor: 'var(--glacial-200)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--sage-600)' }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--glacial-700)' }}>Summit Intelligence</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, var(--glacial-500) 0%, var(--sage-600) 100%)' }}>
              <ChartIcon size={32} color="white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--glacial-800)' }}>Summit Intelligence Hub</h1>
              <p className="text-lg mt-1" style={{ color: 'var(--sage-600)' }}>Strategic Insights & Actionable Opportunities from NCS 2025</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          <div className="frost-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--glacial-700)' }}>{summitStats.speakers}</div>
            <div className="text-sm" style={{ color: 'var(--sage-600)' }}>Speakers</div>
          </div>
          <div className="frost-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--glacial-700)' }}>{summitStats.organizations}+</div>
            <div className="text-sm" style={{ color: 'var(--sage-600)' }}>Organizations</div>
          </div>
          <div className="frost-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--glacial-700)' }}>{summitStats.projects}</div>
            <div className="text-sm" style={{ color: 'var(--sage-600)' }}>Projects</div>
          </div>
          <div className="frost-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--glacial-700)' }}>{summitStats.opportunities}</div>
            <div className="text-sm" style={{ color: 'var(--sage-600)' }}>Opportunities</div>
          </div>
          <div className="frost-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--glacial-700)' }}>{summitStats.fundingSources}</div>
            <div className="text-sm" style={{ color: 'var(--sage-600)' }}>Funding Sources</div>
          </div>
          <div className="frost-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--glacial-700)' }}>{summitStats.countries}</div>
            <div className="text-sm" style={{ color: 'var(--sage-600)' }}>Countries</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="frost-card rounded-xl shadow-lg overflow-hidden">
          <div className="border-b overflow-x-auto" style={{ borderColor: 'var(--glacial-200)' }}>
            <div className="flex min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-b-2'
                      : 'hover:bg-opacity-50'
                  }`}
                  style={{
                    borderColor: activeTab === tab.id ? 'var(--glacial-500)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--glacial-700)' : 'var(--sage-600)',
                    background: activeTab === tab.id ? 'var(--glacial-50)' : 'transparent'
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
                    <TargetIcon size={24} color="var(--glacial-500)" /> NCH Strategic Roles
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {strategicRoles.map((role) => (
                      <div key={role.id} className="p-4 rounded-xl border" style={{ background: 'var(--sage-50)', borderColor: 'var(--sage-200)' }}>
                        <h3 className="font-bold mb-2" style={{ color: 'var(--glacial-700)' }}>{role.title}</h3>
                        <p className="text-sm mb-3" style={{ color: '#111827' }}>{role.description}</p>
                        <div className="text-xs mb-2" style={{ color: 'var(--sage-600)' }}>Key Activities:</div>
                        <ul className="text-sm space-y-1 mb-3">
                          {role.activities.slice(0, 2).map((activity, i) => (
                            <li key={i} className="flex items-start gap-2" style={{ color: '#111827' }}>
                              <span style={{ color: 'var(--glacial-500)' }}>•</span>
                              {activity}
                            </li>
                          ))}
                        </ul>
                        <div className="text-xs px-2 py-1 rounded-full inline-block" style={{ background: 'var(--glacial-100)', color: 'var(--glacial-700)' }}>
                          Revenue: {role.revenue.split(',')[0]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
                    <ChecklistIcon size={24} color="var(--sage-500)" /> Immediate Actions Required
                  </h2>
                  <div className="space-y-3">
                    {quickWins.filter(qw => qw.impact === 'High').map((qw, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl border" style={{ background: 'white', borderColor: 'var(--glacial-200)' }}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--glacial-100)' }}>
                            <ArrowRightIcon size={16} color="var(--glacial-600)" />
                          </div>
                          <span style={{ color: '#111827' }}>{qw.action}</span>
                        </div>
                        <span className="text-sm px-3 py-1 rounded-full" style={{ background: 'var(--sage-100)', color: 'var(--sage-700)' }}>
                          {qw.deadline}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
                    <RocketIcon size={24} color="var(--glacial-500)" /> Top Priority Opportunities
                  </h2>
                  <div className="space-y-3">
                    {priorityOpportunities.filter(o => o.priority === 'high').slice(0, 3).map((opp) => (
                      <div key={opp.id} className="p-4 rounded-xl border" style={{ background: 'var(--glacial-50)', borderColor: 'var(--glacial-200)' }}>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold" style={{ color: 'var(--glacial-700)' }}>{opp.title}</h3>
                          <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: 'var(--glacial-500)', color: 'white' }}>
                            High Priority
                          </span>
                        </div>
                        <p className="text-sm mb-2" style={{ color: '#111827' }}>{opp.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span style={{ color: 'var(--sage-600)' }}>NCH Role: <strong style={{ color: 'var(--glacial-700)' }}>{opp.role}</strong></span>
                          <span style={{ color: 'var(--sage-600)' }}>Timeline: <strong style={{ color: 'var(--glacial-700)' }}>{opp.timeline}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab('opportunities')}
                    className="mt-4 text-sm font-medium flex items-center gap-1 hover:underline"
                    style={{ color: 'var(--glacial-600)' }}
                  >
                    View all opportunities <ArrowRightIcon size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Strategic Opportunities Tab */}
            {activeTab === 'opportunities' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
                  <TargetIcon size={24} color="var(--glacial-500)" /> Priority Opportunities for NCH
                </h2>
                <div className="space-y-4">
                  {priorityOpportunities.map((opp) => (
                    <div key={opp.id} className="p-5 rounded-xl border" style={{ background: 'white', borderColor: 'var(--glacial-200)' }}>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold" style={{ color: 'var(--glacial-700)' }}>{opp.title}</h3>
                        <span
                          className="text-xs px-3 py-1 rounded-full font-medium"
                          style={{
                            background: opp.priority === 'high' ? 'var(--glacial-500)' : 'var(--sage-400)',
                            color: 'white'
                          }}
                        >
                          {opp.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                        </span>
                      </div>
                      <p className="mb-4" style={{ color: '#111827' }}>{opp.description}</p>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-xs font-medium mb-1" style={{ color: 'var(--sage-600)' }}>NCH Role</div>
                          <div className="text-sm font-medium" style={{ color: 'var(--glacial-700)' }}>{opp.role}</div>
                        </div>
                        <div>
                          <div className="text-xs font-medium mb-1" style={{ color: 'var(--sage-600)' }}>Partners</div>
                          <div className="text-sm" style={{ color: '#111827' }}>{opp.partners.join(', ')}</div>
                        </div>
                        <div>
                          <div className="text-xs font-medium mb-1" style={{ color: 'var(--sage-600)' }}>Timeline</div>
                          <div className="text-sm font-medium" style={{ color: 'var(--glacial-700)' }}>{opp.timeline}</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg" style={{ background: 'var(--sage-50)' }}>
                        <div className="text-xs font-medium mb-2" style={{ color: 'var(--sage-700)' }}>Next Steps:</div>
                        <ul className="space-y-1">
                          {opp.nextSteps.map((step, i) => (
                            <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#111827' }}>
                              <span className="font-bold" style={{ color: 'var(--glacial-500)' }}>{i + 1}.</span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Pipeline Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
                  <RocketIcon size={24} color="var(--glacial-500)" /> Project Pipeline
                </h2>
                <p className="text-sm" style={{ color: 'var(--sage-600)' }}>
                  Projects mentioned, launched, or proposed at Nordic Circular Summit 2025
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: 'var(--glacial-50)' }}>
                        <th className="text-left p-3 font-semibold" style={{ color: 'var(--glacial-700)' }}>Project</th>
                        <th className="text-left p-3 font-semibold" style={{ color: 'var(--glacial-700)' }}>Status</th>
                        <th className="text-left p-3 font-semibold" style={{ color: 'var(--glacial-700)' }}>Sector</th>
                        <th className="text-left p-3 font-semibold" style={{ color: 'var(--glacial-700)' }}>Lead</th>
                        <th className="text-left p-3 font-semibold" style={{ color: 'var(--glacial-700)' }}>NCH Opportunity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project, i) => (
                        <tr key={i} className="border-b" style={{ borderColor: 'var(--glacial-100)' }}>
                          <td className="p-3 font-medium" style={{ color: '#111827' }}>{project.name}</td>
                          <td className="p-3">
                            <span
                              className="text-xs px-2 py-1 rounded-full"
                              style={{
                                background: project.status === 'launched' ? 'var(--glacial-100)' :
                                           project.status === 'active' ? 'var(--sage-100)' : 'var(--arctic-100)',
                                color: project.status === 'launched' ? 'var(--glacial-700)' :
                                       project.status === 'active' ? 'var(--sage-700)' : 'var(--arctic-700)'
                              }}
                            >
                              {project.status}
                            </span>
                          </td>
                          <td className="p-3" style={{ color: 'var(--sage-600)' }}>{project.sector}</td>
                          <td className="p-3" style={{ color: '#111827' }}>{project.lead}</td>
                          <td className="p-3 text-sm" style={{ color: 'var(--glacial-600)' }}>{project.nchOpportunity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Funding Sources Tab */}
            {activeTab === 'funding' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
                  <FundingIcon size={24} color="var(--glacial-500)" /> Funding Sources
                </h2>
                <p className="text-sm" style={{ color: 'var(--sage-600)' }}>
                  Relevant funding opportunities for circular economy projects in the Nordic-Baltic region
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {fundingSources.map((source, i) => (
                    <div key={i} className="p-4 rounded-xl border" style={{ background: 'white', borderColor: 'var(--glacial-200)' }}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold" style={{ color: 'var(--glacial-700)' }}>{source.name}</h3>
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            background: source.relevance === 'High' ? 'var(--glacial-100)' : 'var(--sage-100)',
                            color: source.relevance === 'High' ? 'var(--glacial-700)' : 'var(--sage-700)'
                          }}
                        >
                          {source.relevance} Relevance
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs mb-2">
                        <span className="px-2 py-0.5 rounded" style={{ background: 'var(--arctic-100)', color: 'var(--arctic-700)' }}>
                          {source.type}
                        </span>
                        <span style={{ color: 'var(--sage-500)' }}>•</span>
                        <span style={{ color: 'var(--sage-600)' }}>{source.geography}</span>
                      </div>
                      <p className="text-sm mb-2" style={{ color: '#111827' }}>{source.focus}</p>
                      <p className="text-xs italic" style={{ color: 'var(--sage-500)' }}>{source.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
                  <ContactIcon size={24} color="var(--glacial-500)" /> Key Contacts for Follow-Up
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {keyContacts.map((contact, i) => (
                    <div key={i} className="p-4 rounded-xl border flex items-start gap-4" style={{ background: 'white', borderColor: 'var(--glacial-200)' }}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: 'var(--glacial-100)', color: 'var(--glacial-600)' }}>
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold" style={{ color: 'var(--glacial-700)' }}>{contact.name}</h3>
                          {contact.priority === 'high' && (
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--glacial-500)', color: 'white' }}>
                              Priority
                            </span>
                          )}
                        </div>
                        <p className="text-sm" style={{ color: 'var(--sage-600)' }}>{contact.organization}</p>
                        <p className="text-sm mt-1" style={{ color: '#111827' }}>
                          <span style={{ color: 'var(--sage-500)' }}>Opportunity:</span> {contact.opportunity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Wins Tab */}
            {activeTab === 'quickwins' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
                  <ChecklistIcon size={24} color="var(--glacial-500)" /> Quick Wins
                </h2>
                <p className="text-sm" style={{ color: 'var(--sage-600)' }}>
                  Immediate actions to capitalize on summit momentum
                </p>
                <div className="space-y-3">
                  {quickWins.map((qw, i) => (
                    <div key={i} className="p-4 rounded-xl border" style={{ background: 'white', borderColor: 'var(--glacial-200)' }}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center mt-0.5" style={{ background: 'var(--glacial-100)' }}>
                            <span className="text-sm font-bold" style={{ color: 'var(--glacial-600)' }}>{i + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium" style={{ color: '#111827' }}>{qw.action}</p>
                            <div className="flex items-center gap-3 mt-2 text-sm">
                              <span className="flex items-center gap-1" style={{ color: 'var(--sage-600)' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="12" r="10" />
                                  <path d="M12 6v6l4 2" />
                                </svg>
                                {qw.deadline}
                              </span>
                              <span className="px-2 py-0.5 rounded text-xs" style={{ background: 'var(--arctic-100)', color: 'var(--arctic-700)' }}>
                                Effort: {qw.effort}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span
                          className="text-xs px-3 py-1 rounded-full font-medium"
                          style={{
                            background: qw.impact === 'High' ? 'var(--glacial-500)' : 'var(--sage-400)',
                            color: 'white'
                          }}
                        >
                          {qw.impact} Impact
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Success Metrics Tab */}
            {activeTab === 'metrics' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
                  <MetricsIcon size={24} color="var(--glacial-500)" /> Success Metrics
                </h2>
                <p className="text-sm" style={{ color: 'var(--sage-600)' }}>
                  Tracking NCH progress against summit-derived opportunities
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-xl" style={{ background: 'var(--glacial-50)', border: '1px solid var(--glacial-200)' }}>
                    <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--glacial-700)' }}>
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: 'var(--glacial-500)', color: 'white' }}>6</span>
                      Short Term (6 months)
                    </h3>
                    <ul className="space-y-2">
                      {successMetrics.shortTerm.map((metric, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#111827' }}>
                          <span className="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: 'var(--glacial-300)' }} />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 rounded-xl" style={{ background: 'var(--sage-50)', border: '1px solid var(--sage-200)' }}>
                    <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--sage-700)' }}>
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: 'var(--sage-500)', color: 'white' }}>12</span>
                      Medium Term (1 year)
                    </h3>
                    <ul className="space-y-2">
                      {successMetrics.mediumTerm.map((metric, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#111827' }}>
                          <span className="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: 'var(--sage-300)' }} />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 rounded-xl" style={{ background: 'var(--arctic-50)', border: '1px solid var(--arctic-200)' }}>
                    <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--arctic-700)' }}>
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: 'var(--arctic-500)', color: 'white' }}>36</span>
                      Long Term (3 years)
                    </h3>
                    <ul className="space-y-2">
                      {successMetrics.longTerm.map((metric, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#111827' }}>
                          <span className="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: 'var(--arctic-300)' }} />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-8 frost-card rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
            <DocumentIcon size={20} color="var(--glacial-500)" /> Download Raw Data
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/summit-intelligence/analysis/nch-opportunities.json"
              download
              className="p-4 rounded-lg border text-center hover:shadow-md transition-shadow"
              style={{ background: 'white', borderColor: 'var(--glacial-200)' }}
            >
              <div className="font-medium mb-1" style={{ color: 'var(--glacial-700)' }}>NCH Opportunities</div>
              <div className="text-xs" style={{ color: 'var(--sage-500)' }}>JSON • Strategic analysis</div>
            </a>
            <a
              href="/summit-intelligence/opportunities/projects.json"
              download
              className="p-4 rounded-lg border text-center hover:shadow-md transition-shadow"
              style={{ background: 'white', borderColor: 'var(--glacial-200)' }}
            >
              <div className="font-medium mb-1" style={{ color: 'var(--glacial-700)' }}>Project Pipeline</div>
              <div className="text-xs" style={{ color: 'var(--sage-500)' }}>JSON • 11 projects</div>
            </a>
            <a
              href="/summit-intelligence/opportunities/funding.json"
              download
              className="p-4 rounded-lg border text-center hover:shadow-md transition-shadow"
              style={{ background: 'white', borderColor: 'var(--glacial-200)' }}
            >
              <div className="font-medium mb-1" style={{ color: 'var(--glacial-700)' }}>Funding Sources</div>
              <div className="text-xs" style={{ color: 'var(--sage-500)' }}>JSON • 10 sources</div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t text-center" style={{ borderColor: 'var(--glacial-200)' }}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Image
              src="/media/nch-logo.svg"
              alt="Nordic Circular Hotspot"
              width={32}
              height={32}
              className="h-8 w-auto opacity-70"
            />
            <span className="text-lg font-semibold" style={{ color: 'var(--glacial-700)' }}>Nordic Circular Summit 2025</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--sage-500)' }}>
            Summit Intelligence Hub • Strategic Insights for NCH
          </p>
        </footer>
      </main>
    </div>
  );
}
