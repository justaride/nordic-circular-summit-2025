'use client';

import { useState } from 'react';
import Link from 'next/link';

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
      {/* Header */}
      <header className="frost-card-strong border-b" style={{ borderColor: 'var(--glacial-200)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="mb-2 inline-block transition-colors" style={{ color: 'var(--glacial-600)' }}>
            ← Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-3xl">📊</span>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--glacial-800)' }}>Day 2 Complete Analysis</h1>
              <p className="mt-1" style={{ color: 'var(--sage-600)' }}>
                Nordic Circular Summit 2025 - November 20, 2025 | Digital Partner Sessions
              </p>
            </div>
          </div>
        </div>
      </header>

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

function OverviewTab() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--glacial-800)' }}>Day 2 Overview</h2>

      <div className="p-4 mb-6 rounded-xl" style={{ background: 'var(--glacial-50)', borderLeft: '4px solid var(--glacial-400)' }}>
        <p className="font-semibold" style={{ color: 'var(--glacial-800)' }}>
          Day 2 shifted from plenary discussions to focused digital partner sessions, marking the transition
          from broad vision-setting to practical implementation across construction, textiles, and design methodology.
        </p>
      </div>

      <h3 className="text-xl font-bold mt-6 mb-3" style={{ color: 'var(--glacial-700)' }}>3 Cross-Session Themes Identified</h3>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {[
          { icon: '🌍', title: 'Regional Collaboration', desc: 'Nordic-Baltic partnership as competitive advantage' },
          { icon: '🏠', title: 'Building on What Exists', desc: 'Preserve, extend, regenerate existing assets' },
          { icon: '📊', title: 'Data & Trust as Enablers', desc: 'Hard metrics + soft infrastructure together' }
        ].map((theme, i) => (
          <div key={i} className="flex items-start p-4 rounded-xl" style={{ background: 'var(--arctic-50)', border: '1px solid var(--glacial-200)' }}>
            <span className="text-3xl mr-3">{theme.icon}</span>
            <div>
              <div className="font-semibold" style={{ color: 'var(--glacial-800)' }}>{theme.title}</div>
              <div className="text-sm" style={{ color: 'var(--sage-600)' }}>{theme.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mt-6 mb-3" style={{ color: 'var(--glacial-700)' }}>Day 2 Sessions</h3>
      <div className="space-y-3">
        {[
          { time: '08:00-09:00', title: 'Circular Construction', topics: 'Nordic building sector, renovation, material reuse', status: 'Transcript available' },
          { time: '10:00-11:00', title: 'Nordic-Baltic Textile Transition', topics: 'NBTT Group launch, EPR, regional collaboration', status: 'Transcript available' },
          { time: '11:30-12:30', title: 'Circular Design Toolbox', topics: 'Estonian methodology, business transformation', status: 'Transcript available' }
        ].map((session, i) => (
          <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--arctic-50)', borderLeft: '4px solid var(--sage-400)' }}>
            <div className="flex items-center mb-2">
              <span className="font-mono text-sm mr-3" style={{ color: 'var(--arctic-600)' }}>{session.time}</span>
              <span className="font-bold" style={{ color: 'var(--glacial-800)' }}>{session.title}</span>
              <span className="ml-auto text-xs px-2 py-1 rounded" style={{ background: 'var(--sage-100)', color: 'var(--sage-700)' }}>
                {session.status}
              </span>
            </div>
            <div className="text-sm" style={{ color: 'var(--sage-600)' }}>{session.topics}</div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mt-6 mb-3" style={{ color: 'var(--glacial-700)' }}>Key Launches & Initiatives</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { icon: '🧵', title: 'Nordic-Baltic Textile Transition Group', desc: '8-country platform for textile circularity' },
          { icon: '🏗️', title: 'Nordic Circular Construction Catalog', desc: '15 solutions, scaling to 100' },
          { icon: '🛠️', title: 'Circular Design Toolbox', desc: '15-tool open-source methodology' },
          { icon: '📋', title: 'Nordic Sustainable Construction Network', desc: 'Government collaboration through 2027' }
        ].map((item, i) => (
          <div key={i} className="flex items-start p-4 rounded-xl" style={{ background: 'var(--sage-50)', border: '1px solid var(--sage-200)' }}>
            <span className="text-2xl mr-3">{item.icon}</span>
            <div>
              <div className="font-semibold" style={{ color: 'var(--glacial-800)' }}>{item.title}</div>
              <div className="text-sm" style={{ color: 'var(--sage-600)' }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExecutiveSummaryTab() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--glacial-800)' }}>Executive Summary</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--sage-600)' }}>Prepared for: Decision-makers, funders, policymakers</p>

      <div className="p-4 mb-6 rounded-xl" style={{ background: 'var(--glacial-50)', borderLeft: '4px solid var(--glacial-400)' }}>
        <p style={{ color: '#111827' }}>
          Day 2's common thread: <strong>the gap between pilot projects and scaled implementation remains the critical challenge</strong>.
          As Jan Thomas Odegard framed it: "We're moving from pilots to practice—the question is how to scale circular construction across the Nordics."
        </p>
      </div>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--glacial-700)' }}>Top 3 Cross-Session Themes</h3>

        <div className="space-y-6">
          {/* Theme 1 */}
          <div className="pl-4" style={{ borderLeft: '4px solid var(--glacial-400)' }}>
            <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--glacial-800)' }}>1. Regional Collaboration as Competitive Advantage</h4>
            <p className="mb-2" style={{ color: 'var(--sage-600)' }}>
              <em>Appears in: All sessions</em>
            </p>
            <p className="mb-3" style={{ color: '#111827' }}>
              No single Nordic or Baltic country can build circular infrastructure alone. Cross-border collaboration
              is essential for achieving the scale and technology mix required for systemic change.
            </p>
            <div className="p-3 rounded-xl mb-3" style={{ background: 'var(--glacial-50)' }}>
              <p className="italic" style={{ color: 'var(--glacial-800)' }}>
                "No single market has scaled feedstock volumes or technology mix available to build a circular textile system alone."
                <span className="block text-sm mt-1" style={{ color: 'var(--sage-600)' }}>— Kerli Kant Hvass, Aalborg University</span>
              </p>
            </div>
            <div className="text-sm space-y-1">
              <p className="font-semibold" style={{ color: 'var(--glacial-700)' }}>Examples:</p>
              <ul className="list-disc pl-5" style={{ color: '#111827' }}>
                <li>Nordic Circular Construction project: 16 companies collaborating across borders</li>
                <li>Nordic-Baltic Textile Transition Group: 8-country platform launched at summit</li>
                <li>Estonian Circular Design Toolbox available as open-source regional resource</li>
              </ul>
            </div>
          </div>

          {/* Theme 2 */}
          <div className="pl-4" style={{ borderLeft: '4px solid var(--sage-400)' }}>
            <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--glacial-800)' }}>2. Building on What Exists</h4>
            <p className="mb-2" style={{ color: 'var(--sage-600)' }}>
              <em>Appears in: Construction, Textiles, Design Toolbox</em>
            </p>
            <p className="mb-3" style={{ color: '#111827' }}>
              The most sustainable building is the one already built. The most circular textile system builds on existing
              sorting expertise. The most effective design process starts with understanding current state.
            </p>
            <div className="p-3 rounded-xl mb-3" style={{ background: 'var(--sage-50)' }}>
              <p className="italic" style={{ color: 'var(--sage-800)' }}>
                "The most sustainable building is the one that is kept in use and loved."
                <span className="block text-sm mt-1" style={{ color: 'var(--sage-600)' }}>— Beyond Zero collaboration</span>
              </p>
            </div>
            <div className="text-sm space-y-1">
              <p className="font-semibold" style={{ color: 'var(--glacial-700)' }}>Examples:</p>
              <ul className="list-disc pl-5" style={{ color: '#111827' }}>
                <li>200,000+ unused buildings in Norwegian districts alone</li>
                <li>Denmark's "bevare eller forklare" (preserve or explain) policy movement</li>
                <li>Helsinki office-to-housing conversions post-COVID</li>
                <li>Baltic expertise in manual sorting for textile reuse</li>
              </ul>
            </div>
          </div>

          {/* Theme 3 */}
          <div className="pl-4" style={{ borderLeft: '4px solid var(--glacial-500)' }}>
            <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--glacial-800)' }}>3. Data and Trust as Enablers</h4>
            <p className="mb-2" style={{ color: 'var(--sage-600)' }}>
              <em>Appears in: All sessions</em>
            </p>
            <p className="mb-3" style={{ color: '#111827' }}>
              Circular transitions require both hard data (material flows, recycling rates) and soft infrastructure
              (trust, pre-competitive collaboration). Without reliable data, policies can't be designed. Without trust,
              competitors won't collaborate.
            </p>
            <div className="p-3 rounded-xl mb-3" style={{ background: 'var(--glacial-50)' }}>
              <p className="italic" style={{ color: 'var(--glacial-800)' }}>
                "We can collaborate only when you have trust. Trust doesn't happen itself."
                <span className="block text-sm mt-1" style={{ color: 'var(--sage-600)' }}>— Kerli Kant Hvass, Aalborg University</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--glacial-700)' }}>Strategic Insights for Leaders</h3>
        <div className="space-y-4">
          {[
            { title: 'Regulation Favors Linear—Change Requires Political Will', desc: 'Regulations still favor linear production. Advocacy for reform must accompany business model innovation.' },
            { title: 'Pre-Competitive Collaboration Works', desc: 'Competing brands now willing to sit together on shared challenges too big for individual businesses.' },
            { title: 'Small Scale Enables Innovation', desc: 'Use small markets and regulatory gaps as innovation laboratories. What\'s proven small can inform policy.' },
            { title: 'Tools Enable Action', desc: 'Companies need step-by-step guidance from self-assessment through implementation planning.' }
          ].map((insight, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--arctic-50)', border: '1px solid var(--glacial-200)' }}>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--glacial-800)' }}>{i + 1}. {insight.title}</h4>
              <p className="text-sm" style={{ color: '#111827' }}>{insight.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ThemesTab() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--glacial-800)' }}>3 Cross-Session Themes</h2>
      <p className="mb-6" style={{ color: '#111827' }}>
        Deep analysis of themes that appeared across Day 2 partner sessions, showing practical implementation approaches.
      </p>

      <div className="space-y-8">
        {[
          {
            num: 1,
            title: 'Regional Collaboration as Competitive Advantage',
            sessions: 'All 3 sessions',
            color: 'glacial-400',
            insight: 'The Nordic-Baltic region represents 36 million people—large enough for meaningful scale, small enough to coordinate effectively',
            manifestations: [
              'Construction: Nordic Circular Construction project with 16 companies',
              'Textiles: NBTT Group launched with 8 Nordic-Baltic countries',
              'Design: Estonian toolbox shared as open-source regional resource',
              'Policy: Nordic Sustainable Construction Network coordinates governments'
            ]
          },
          {
            num: 2,
            title: 'Building on What Exists',
            sessions: 'Construction, Textiles, Design Toolbox',
            color: 'sage-400',
            insight: 'Circular economy isn\'t about creating new systems—it\'s about optimizing, extending, and regenerating existing assets',
            manifestations: [
              'Construction: Building Hierarchy Triangle prioritizes existing buildings',
              'Textiles: Baltic sorting expertise complements Nordic design/tech',
              'Design: Toolbox starts with understanding current state',
              'Heritage: Iceland\'s 900-year turf building tradition as innovation foundation'
            ]
          },
          {
            num: 3,
            title: 'Data and Trust as Enablers',
            sessions: 'All 3 sessions',
            color: 'glacial-500',
            insight: 'Both hard data and soft infrastructure must be built simultaneously for circular transitions',
            manifestations: [
              'Textiles: Danish 40-company collaboration with annual data reporting',
              'Construction: No politician can state specific circularity targets',
              'Data gaps: Iceland has no building material import stats since 2010',
              'Trust-building: 8 years timeline for ACT Cluster (Day 1 reference)'
            ]
          }
        ].map(theme => (
          <div key={theme.num} className="pl-4" style={{ borderLeft: `4px solid var(--${theme.color})` }}>
            <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--glacial-800)' }}>{theme.num}. {theme.title}</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--sage-600)' }}><em>{theme.sessions}</em></p>
            <div className="p-3 rounded-xl mb-3" style={{ background: 'var(--glacial-50)' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--glacial-700)' }}>Core Insight:</p>
              <p style={{ color: 'var(--glacial-800)' }}>{theme.insight}</p>
            </div>
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--glacial-700)' }}>How It Manifested:</p>
            <ul className="space-y-1 text-sm" style={{ color: '#111827' }}>
              {theme.manifestations.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--glacial-400)' }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: 'var(--glacial-700)' }}>Implementation Priorities</h3>
      <div className="space-y-3">
        {[
          { priority: 'Scale Nordic-Baltic Textile Transition Group', deadline: 'Dec 1 suggestions deadline' },
          { priority: 'Establish Circular Construction Product Catalog', deadline: 'Expand to 100 solutions' },
          { priority: 'Deploy Circular Design Toolbox regionally', deadline: 'Ongoing pilots' },
          { priority: 'Harmonize Nordic-Baltic EPR for Textiles', deadline: 'Coordinate before fragmentation' },
          { priority: 'Preserve Existing Building Stock', deadline: 'Implement "preserve or explain"' }
        ].map((item, i) => (
          <div key={i} className="p-3 rounded-xl flex justify-between items-center" style={{ background: 'var(--arctic-50)' }}>
            <span className="font-semibold" style={{ color: 'var(--glacial-800)' }}>{i + 1}. {item.priority}</span>
            <span className="text-sm px-2 py-1 rounded" style={{ background: 'var(--sage-100)', color: 'var(--sage-700)' }}>{item.deadline}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NumbersTab() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--glacial-800)' }}>Day 2 By The Numbers</h2>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--glacial-700)' }}>Summit Statistics</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: 'Sessions', value: '3', bg: 'glacial' },
            { label: 'Total Duration', value: '3 hours', bg: 'sage' },
            { label: 'Speakers', value: '10+', bg: 'glacial' },
            { label: 'Countries', value: '8+', bg: 'sage' },
            { label: 'Key Launches', value: '3', bg: 'glacial' },
            { label: 'Tools Released', value: '15', bg: 'sage' }
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: `var(--${stat.bg}-50)` }}>
              <div className="text-3xl font-bold" style={{ color: `var(--${stat.bg}-800)` }}>{stat.value}</div>
              <div className="text-sm" style={{ color: `var(--${stat.bg}-600)` }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--glacial-700)' }}>Construction Sector Numbers</h3>
        <div className="space-y-2 text-sm">
          {[
            { num: '80%', desc: 'Denmark must reduce new construction by 2030' },
            { num: '72%', desc: 'Norway material use reduction needed by 2030' },
            { num: '50%', desc: 'Amsterdam circular construction target by 2030' },
            { num: '200,000+', desc: 'Unused buildings in Norwegian districts alone' },
            { num: '130,000', desc: 'Potential housing from splitting large houses (Norway/Denmark)' },
            { num: '~80%', desc: 'Iceland buildings made of concrete' },
            { num: '900 years', desc: 'Iceland turf house tradition' },
            { num: '16', desc: 'Companies in Nordic Circular Construction project' }
          ].map((item, i) => (
            <div key={i} className="flex items-baseline p-3 rounded-xl" style={{ background: 'var(--arctic-50)' }}>
              <span className="font-bold mr-3 min-w-[100px]" style={{ color: 'var(--glacial-600)' }}>{item.num}</span>
              <span style={{ color: '#111827' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--glacial-700)' }}>Textile Sector Numbers</h3>
        <div className="space-y-2 text-sm">
          {[
            { num: '8', desc: 'Nordic-Baltic countries in NBTT Group' },
            { num: '~40', desc: 'Danish companies in sector collaboration' },
            { num: '40%', desc: '2030 recycled content target (Denmark)' },
            { num: '10%', desc: '2030 fiber-to-fiber recycling target' },
            { num: '~80%', desc: 'Nordic-Baltic textiles exported to Africa/Asia' },
            { num: 'Jan 1, 2025', desc: 'EU mandatory separate textile collection' }
          ].map((item, i) => (
            <div key={i} className="flex items-baseline p-3 rounded-xl" style={{ background: 'var(--sage-50)' }}>
              <span className="font-bold mr-3 min-w-[100px]" style={{ color: 'var(--sage-600)' }}>{item.num}</span>
              <span style={{ color: '#111827' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--glacial-700)' }}>Nordic Maturity Assessment (Circular Construction)</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl" style={{ background: 'var(--glacial-50)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--glacial-800)' }}>Maturity Levels</h4>
            <div className="text-sm space-y-1" style={{ color: '#111827' }}>
              <div><strong>Pioneer:</strong> Netherlands (benchmark)</div>
              <div><strong>Leading:</strong> Denmark, Finland</div>
              <div><strong>Following:</strong> Sweden</div>
              <div><strong>Catching up:</strong> Norway, Iceland</div>
              <div><strong>Starting:</strong> Greenland</div>
            </div>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--sage-50)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--sage-800)' }}>Circularity Ladder (Design Toolbox)</h4>
            <div className="text-sm space-y-1" style={{ color: '#111827' }}>
              <div><strong>1. Conventional:</strong> No circular initiative</div>
              <div><strong>2. Green:</strong> Circularity = waste management</div>
              <div><strong>3. Sustainable:</strong> Goal, not business model</div>
              <div><strong>4. Restorative:</strong> Core to business model</div>
              <div><strong>5. Regenerative:</strong> Give back more than take</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SocialTab() {
  const posts = [
    {
      platform: 'LinkedIn',
      content: 'Day 2 of Nordic Circular Summit 2025: From vision to implementation.\n\n"No single market has scaled feedstock volumes or technology mix available to build a circular textile system alone."\n\nThe Nordic-Baltic Textile Transition Group launched today—8 countries building regional infrastructure together.',
      theme: 'Regional Collaboration',
      hashtags: ['#CircularEconomy', '#NordicBaltic', '#TextileCircularity']
    },
    {
      platform: 'Twitter',
      content: 'The most sustainable building is the one already built.\n\n200,000+ unused buildings in Norwegian districts.\n130,000 potential housing units from splitting large houses.\n\nWe don\'t need to build more—we need to use what exists. #CircularConstruction',
      theme: 'Building on What Exists',
      hashtags: ['#CircularConstruction', '#SustainableBuilding', '#Nordic']
    },
    {
      platform: 'LinkedIn',
      content: 'Key insight from Day 2:\n\n"Competing brands that would not in a million years sit together five years ago—they\'re actually quite willing to sit together."\n\nPre-competitive collaboration works when challenges are too big for any single company.\n\nDanish textile sector: 40 companies. Shared goals. Annual reporting.',
      theme: 'Pre-Competitive Collaboration',
      hashtags: ['#Collaboration', '#CircularEconomy', '#BusinessTransformation']
    }
  ];

  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--glacial-800)' }}>Social Media Highlights</h2>
      <p className="mb-6" style={{ color: '#111827' }}>
        15 ready-to-publish social media posts covering Day 2 cross-session themes, key quotes, and implementation insights.
      </p>

      <div className="space-y-6">
        {posts.map((post, i) => (
          <div key={i} className="rounded-xl p-4 shadow-lg" style={{ background: 'var(--arctic-50)', border: '1px solid var(--glacial-200)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded text-sm font-semibold" style={{
                background: post.platform === 'LinkedIn' ? 'var(--glacial-100)' : 'var(--sage-100)',
                color: post.platform === 'LinkedIn' ? 'var(--glacial-700)' : 'var(--sage-700)'
              }}>
                {post.platform}
              </span>
              <span className="text-sm" style={{ color: 'var(--arctic-500)' }}>{post.theme}</span>
            </div>
            <p className="whitespace-pre-line mb-3" style={{ color: '#111827' }}>{post.content}</p>
            <div className="flex flex-wrap gap-2">
              {post.hashtags.map((tag, j) => (
                <span key={j} className="text-sm" style={{ color: 'var(--glacial-600)' }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl" style={{ background: 'var(--glacial-50)' }}>
        <p className="text-sm" style={{ color: 'var(--glacial-800)' }}>
          <strong>Full social media package:</strong> Download the complete JSON file with 15 posts
          covering all Day 2 themes, formatted and ready to publish.
        </p>
      </div>
    </div>
  );
}
