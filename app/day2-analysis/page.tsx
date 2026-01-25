'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import OverviewTab from '@/components/analysis/day2/OverviewTab';
import ExecutiveSummaryTab from '@/components/analysis/day2/ExecutiveSummaryTab';
import ThemesTab from '@/components/analysis/day2/ThemesTab';
import NumbersTab from '@/components/analysis/day2/NumbersTab';
import SocialTab from '@/components/analysis/day2/SocialTab';

export default function Day2AnalysisPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'executive', label: 'Executive Summary', icon: '📊' },
    { id: 'themes', label: 'Cross-Session Themes', icon: '🔗' },
    { id: 'numbers', label: 'By The Numbers', icon: '📈' },
    { id: 'social', label: 'Social Media', icon: '📱' }
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Day 2 Complete Analysis"
        subtitle="Nordic Circular Summit 2025 - November 20, 2025 | Digital Partner Sessions"
        icon="📊"
        showBackLink={true}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="frost-card rounded-xl shadow-lg p-4" style={{ borderLeft: '4px solid var(--glacial-400)' }}>
            <div className="text-2xl font-bold" style={{ color: 'var(--glacial-800)' }}>3</div>
            <div className="text-sm" style={{ color: 'var(--sage-600)' }}>Sessions</div>
          </div>
          <div className="frost-card rounded-xl shadow-lg p-4" style={{ borderLeft: '4px solid var(--sage-400)' }}>
            <div className="text-2xl font-bold" style={{ color: 'var(--sage-800)' }}>3h</div>
            <div className="text-sm" style={{ color: 'var(--glacial-600)' }}>Content</div>
          </div>
          <div className="frost-card rounded-xl shadow-lg p-4" style={{ borderLeft: '4px solid var(--glacial-500)' }}>
            <div className="text-2xl font-bold" style={{ color: 'var(--glacial-700)' }}>10+</div>
            <div className="text-sm" style={{ color: 'var(--sage-600)' }}>Speakers</div>
          </div>
          <div className="frost-card rounded-xl shadow-lg p-4" style={{ borderLeft: '4px solid var(--sage-500)' }}>
            <div className="text-2xl font-bold" style={{ color: 'var(--sage-700)' }}>3</div>
            <div className="text-sm" style={{ color: 'var(--glacial-600)' }}>Themes</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="frost-card rounded-xl shadow-lg mb-6 p-1">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors rounded-lg ${
                  activeTab === tab.id
                    ? 'text-white'
                    : ''
                }`}
                style={{
                  background: activeTab === tab.id ? 'var(--glacial-500)' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'var(--glacial-700)'
                }}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="frost-card rounded-xl shadow-lg p-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'executive' && <ExecutiveSummaryTab />}
          {activeTab === 'themes' && <ThemesTab />}
          {activeTab === 'numbers' && <NumbersTab />}
          {activeTab === 'social' && <SocialTab />}
        </div>

        {/* Download Section */}
        <div className="mt-8 frost-card rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--glacial-800)' }}>Download Full Reports</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/executive/day2-executive-summary.md"
              download
              className="flex items-center p-4 rounded-xl border transition-all hover:shadow-lg"
              style={{ background: 'var(--arctic-50)', borderColor: 'var(--glacial-200)' }}
            >
              <span className="text-2xl mr-3">📋</span>
              <div>
                <div className="font-semibold" style={{ color: 'var(--glacial-800)' }}>Executive Summary</div>
                <div className="text-sm" style={{ color: 'var(--sage-600)' }}>1,800 words • Markdown</div>
              </div>
            </a>
            <a
              href="/highlights/day2-by-the-numbers.md"
              download
              className="flex items-center p-4 rounded-xl border transition-all hover:shadow-lg"
              style={{ background: 'var(--arctic-50)', borderColor: 'var(--glacial-200)' }}
            >
              <span className="text-2xl mr-3">📊</span>
              <div>
                <div className="font-semibold" style={{ color: 'var(--glacial-800)' }}>By The Numbers</div>
                <div className="text-sm" style={{ color: 'var(--sage-600)' }}>1,450 words • Markdown</div>
              </div>
            </a>
            <a
              href="/social-media/day2-holistic-posts.json"
              download
              className="flex items-center p-4 rounded-xl border transition-all hover:shadow-lg"
              style={{ background: 'var(--arctic-50)', borderColor: 'var(--glacial-200)' }}
            >
              <span className="text-2xl mr-3">📱</span>
              <div>
                <div className="font-semibold" style={{ color: 'var(--glacial-800)' }}>Social Media Posts</div>
                <div className="text-sm" style={{ color: 'var(--sage-600)' }}>15 posts • JSON</div>
              </div>
            </a>
            <a
              href="/articles/day2-circular-construction-article.md"
              download
              className="flex items-center p-4 rounded-xl border transition-all hover:shadow-lg"
              style={{ background: 'var(--arctic-50)', borderColor: 'var(--glacial-200)' }}
            >
              <span className="text-2xl mr-3">🏗️</span>
              <div>
                <div className="font-semibold" style={{ color: 'var(--glacial-800)' }}>Construction Article</div>
                <div className="text-sm" style={{ color: 'var(--sage-600)' }}>Full session article • Markdown</div>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}