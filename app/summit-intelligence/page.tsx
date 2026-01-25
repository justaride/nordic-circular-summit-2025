'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChartIcon,
  DocumentIcon,
  TargetIcon,
  RocketIcon,
  FundingIcon,
  ContactIcon,
  ChecklistIcon,
  MetricsIcon
} from '@/components/Icons';
import { summitStats } from '@/lib/intelligence-data';
import OverviewTab from '@/components/analysis/intelligence/OverviewTab';
import OpportunitiesTab from '@/components/analysis/intelligence/OpportunitiesTab';
import ProjectsTab from '@/components/analysis/intelligence/ProjectsTab';
import FundingTab from '@/components/analysis/intelligence/FundingTab';
import ContactsTab from '@/components/analysis/intelligence/ContactsTab';
import QuickWinsTab from '@/components/analysis/intelligence/QuickWinsTab';
import MetricsTab from '@/components/analysis/intelligence/MetricsTab';

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
      <Header
        title="Summit Intelligence Hub"
        subtitle="Strategic Insights & Actionable Opportunities from NCS 2025"
        icon={<div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, var(--glacial-500) 0%, var(--sage-600) 100%)' }}><ChartIcon size={32} color="white" /></div>}
        showBackLink={true}
      />

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
            {activeTab === 'overview' && <OverviewTab setActiveTab={setActiveTab} />}
            {activeTab === 'opportunities' && <OpportunitiesTab />}
            {activeTab === 'projects' && <ProjectsTab />}
            {activeTab === 'funding' && <FundingTab />}
            {activeTab === 'contacts' && <ContactsTab />}
            {activeTab === 'quickwins' && <QuickWinsTab />}
            {activeTab === 'metrics' && <MetricsTab />}
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

