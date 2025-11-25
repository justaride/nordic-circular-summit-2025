'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Day1AnalysisPage() {
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
              <h1 className="text-3xl font-bold" style={{ color: 'var(--glacial-800)' }}>Day 1 Complete Analysis</h1>
              <p className="mt-1" style={{ color: 'var(--sage-600)' }}>
                Nordic Circular Summit 2025 - November 19, 2025 | Nuuk, Greenland
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="frost-card rounded-xl shadow-lg p-4" style={{ borderLeft: '4px solid var(--glacial-400)' }}>
            <div className="text-2xl font-bold" style={{ color: 'var(--glacial-800)' }}>6</div>
            <div className="text-sm" style={{ color: 'var(--sage-600)' }}>Sessions</div>
          </div>
          <div className="frost-card rounded-xl shadow-lg p-4" style={{ borderLeft: '4px solid var(--sage-400)' }}>
            <div className="text-2xl font-bold" style={{ color: 'var(--sage-800)' }}>5.5h</div>
            <div className="text-sm" style={{ color: 'var(--glacial-600)' }}>Content</div>
          </div>
          <div className="frost-card rounded-xl shadow-lg p-4" style={{ borderLeft: '4px solid var(--glacial-500)' }}>
            <div className="text-2xl font-bold" style={{ color: 'var(--glacial-700)' }}>24+</div>
            <div className="text-sm" style={{ color: 'var(--sage-600)' }}>Speakers</div>
          </div>
          <div className="frost-card rounded-xl shadow-lg p-4" style={{ borderLeft: '4px solid var(--sage-500)' }}>
            <div className="text-2xl font-bold" style={{ color: 'var(--sage-700)' }}>8</div>
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
              href="/executive/day1-executive-summary.md"
              download
              className="flex items-center p-4 rounded-xl border transition-all hover:shadow-lg"
              style={{ background: 'var(--arctic-50)', borderColor: 'var(--glacial-200)' }}
            >
              <span className="text-2xl mr-3">📋</span>
              <div>
                <div className="font-semibold" style={{ color: 'var(--glacial-800)' }}>Executive Summary</div>
                <div className="text-sm" style={{ color: 'var(--sage-600)' }}>2,562 words • Markdown</div>
              </div>
            </a>
            <a
              href="/highlights/day1-cross-session-themes.md"
              download
              className="flex items-center p-4 rounded-xl border transition-all hover:shadow-lg"
              style={{ background: 'var(--arctic-50)', borderColor: 'var(--glacial-200)' }}
            >
              <span className="text-2xl mr-3">🔗</span>
              <div>
                <div className="font-semibold" style={{ color: 'var(--glacial-800)' }}>Cross-Session Themes</div>
                <div className="text-sm" style={{ color: 'var(--sage-600)' }}>4,778 words • Markdown</div>
              </div>
            </a>
            <a
              href="/highlights/day1-by-the-numbers.md"
              download
              className="flex items-center p-4 rounded-xl border transition-all hover:shadow-lg"
              style={{ background: 'var(--arctic-50)', borderColor: 'var(--glacial-200)' }}
            >
              <span className="text-2xl mr-3">📊</span>
              <div>
                <div className="font-semibold" style={{ color: 'var(--glacial-800)' }}>Data Visualization</div>
                <div className="text-sm" style={{ color: 'var(--sage-600)' }}>3,087 words • Markdown</div>
              </div>
            </a>
            <a
              href="/social-media/day1-holistic-posts.json"
              download
              className="flex items-center p-4 rounded-xl border transition-all hover:shadow-lg"
              style={{ background: 'var(--arctic-50)', borderColor: 'var(--glacial-200)' }}
            >
              <span className="text-2xl mr-3">📱</span>
              <div>
                <div className="font-semibold" style={{ color: 'var(--glacial-800)' }}>Social Media Posts</div>
                <div className="text-sm" style={{ color: 'var(--sage-600)' }}>20 posts • JSON</div>
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
      <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--glacial-800)' }}>Day 1 Overview</h2>

      <div className="p-4 mb-6 rounded-xl" style={{ background: 'var(--glacial-50)', borderLeft: '4px solid var(--glacial-400)' }}>
        <p className="font-semibold" style={{ color: 'var(--glacial-800)' }}>
          On November 19, 2025, the Nordic Circular Summit made history by convening in Nuuk, Greenland—
          the first time this annual event has been held in one of the Nordic region's self-governing territories.
        </p>
      </div>

      <h3 className="text-xl font-bold mt-6 mb-3" style={{ color: 'var(--glacial-700)' }}>8 Cross-Session Themes Identified</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {[
          { icon: '🤝', title: 'Trust as Infrastructure', desc: 'Social capital enabling circular transitions' },
          { icon: '🌱', title: 'Indigenous Knowledge & Circularity', desc: 'Traditional practices as contemporary innovation' },
          { icon: '📍', title: 'Place-Based Solutions', desc: 'Local context over universal templates' },
          { icon: '💪', title: 'Economic Resilience', desc: 'Shortened supply chains as competitive advantage' },
          { icon: '🔧', title: 'Technology as Enabler', desc: 'Tools for transparency, not solutions themselves' },
          { icon: '✨', title: 'Quality of Life as Purpose', desc: 'Beyond metrics to human flourishing' },
          { icon: '🌍', title: 'Nordic-Arctic-Baltic Collaboration', desc: 'Regional partnership as model' },
          { icon: '🚀', title: 'Implementation Over Planning', desc: 'From strategy to concrete action' }
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

      <h3 className="text-xl font-bold mt-6 mb-3" style={{ color: 'var(--glacial-700)' }}>Day 1 Sessions</h3>
      <div className="space-y-3">
        {[
          { time: '09:15-10:30', title: 'Circular Frontiers: Shaping our Future', topics: 'Entrepreneurship, funding, Green Deal' },
          { time: '10:45-11:45', title: 'Circular Ocean Industries', topics: 'Nordic blue economy, fisheries, marine resources' },
          { time: '12:45-13:30', title: 'Locally Rooted: Materialising a Circular Future', topics: 'Regenerative business, bioeconomy, local materials' },
          { time: '13:45-14:45', title: 'Arctic & Nordic Lifestyles', topics: 'Circular culture, textiles, traditional knowledge' },
          { time: '15:00-16:00', title: 'Circular Cities & Regions', topics: 'AI, digitalization, regional leadership' },
          { time: '16:15-16:45', title: 'Day 1 Summary: Closing Reflections', topics: 'Trust, quality of life, implementation' }
        ].map((session, i) => (
          <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--arctic-50)', borderLeft: '4px solid var(--sage-400)' }}>
            <div className="flex items-center mb-2">
              <span className="font-mono text-sm mr-3" style={{ color: 'var(--arctic-600)' }}>{session.time}</span>
              <span className="font-bold" style={{ color: 'var(--glacial-800)' }}>{session.title}</span>
            </div>
            <div className="text-sm" style={{ color: 'var(--sage-600)' }}>{session.topics}</div>
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

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--glacial-700)' }}>Top 5 Cross-Session Themes</h3>

        <div className="space-y-6">
          {/* Theme 1 */}
          <div className="pl-4" style={{ borderLeft: '4px solid var(--glacial-400)' }}>
            <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--glacial-800)' }}>1. Trust as Infrastructure</h4>
            <p className="mb-2" style={{ color: 'var(--sage-600)' }}>
              <em>Appears in: Sessions 1, 2, 4, 5, Closing</em>
            </p>
            <p className="mb-3" style={{ color: 'var(--foreground)' }}>
              In regions with sparse populations and limited physical infrastructure, trust serves as invisible infrastructure enabling commerce, collaboration, and collective action.
            </p>
            <div className="p-3 rounded-xl mb-3" style={{ background: 'var(--glacial-50)' }}>
              <p className="italic" style={{ color: 'var(--glacial-800)' }}>
                "The real infrastructure in Greenland is trust, I would say. Not the roads. Trust is the real infrastructure."
                <span className="block text-sm mt-1" style={{ color: 'var(--sage-600)' }}>— Edvard Lybert Mørk, Nalek Ventures</span>
              </p>
            </div>
            <div className="text-sm space-y-1">
              <p className="font-semibold" style={{ color: 'var(--glacial-700)' }}>Examples:</p>
              <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                <li>Royal Greenland's transformation required cultural buy-in from factory workers</li>
                <li>Denmark's Circular Furniture Network: 30 competing brands collaborating</li>
                <li>Greenland's construction strategy operates without mandatory legislation</li>
                <li>Cesis bioregion's memorandum took one year with 13 institutions</li>
              </ul>
            </div>
          </div>

          {/* Theme 2 */}
          <div className="pl-4" style={{ borderLeft: '4px solid var(--sage-400)' }}>
            <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--glacial-800)' }}>2. Indigenous Knowledge & Circularity</h4>
            <p className="mb-2" style={{ color: 'var(--sage-600)' }}>
              <em>Appears in: Sessions 1, 3, 4, 5, Closing</em>
            </p>
            <p className="mb-3" style={{ color: 'var(--foreground)' }}>
              Traditional Arctic and Indigenous practices aren't romantic historical artifacts—they're sophisticated circular economy systems that sustained communities for millennia.
            </p>
            <div className="p-3 rounded-xl mb-3" style={{ background: 'var(--sage-50)' }}>
              <p className="italic" style={{ color: 'var(--sage-800)' }}>
                "We've never thought of seal skin as a waste product in Greenland. Inuit have survived in the Arctic because of the seal and the seal skin."
                <span className="block text-sm mt-1" style={{ color: 'var(--sage-600)' }}>— Mia Chemnitz, Grevilliot</span>
              </p>
            </div>
            <div className="text-sm space-y-1">
              <p className="font-semibold" style={{ color: 'var(--glacial-700)' }}>Examples:</p>
              <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                <li>Complete animal utilization: meat, skin, bones, organs all used</li>
                <li>Design for disassembly: Houses constructed to be moved with families</li>
                <li>Quota limitations as sustainability features built into business models</li>
                <li>Traditional materials trusted over laboratory-tested alternatives</li>
              </ul>
            </div>
          </div>

          {/* Theme 3 */}
          <div className="pl-4" style={{ borderLeft: '4px solid var(--glacial-500)' }}>
            <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--glacial-800)' }}>3. Place-Based Solutions</h4>
            <p className="mb-2" style={{ color: 'var(--sage-600)' }}>
              <em>Appears in: All sessions</em>
            </p>
            <p className="mb-3" style={{ color: 'var(--foreground)' }}>
              Circular economy cannot be imposed through universal blueprints. Solutions must emerge from specific contexts, honoring local geography, culture, resources, and constraints.
            </p>
            <div className="p-3 rounded-xl mb-3" style={{ background: 'var(--glacial-50)' }}>
              <p className="italic" style={{ color: 'var(--glacial-800)' }}>
                "Being poor makes us think different."
                <span className="block text-sm mt-1" style={{ color: 'var(--sage-600)' }}>— Mayor Malene Vahl Rasmussen, Kommune Kujalleq</span>
              </p>
            </div>
          </div>

          {/* Theme 4 */}
          <div className="pl-4" style={{ borderLeft: '4px solid var(--sage-500)' }}>
            <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--glacial-800)' }}>4. Economic Resilience Through Circularity</h4>
            <p className="mb-2" style={{ color: 'var(--sage-600)' }}>
              <em>Appears in: Sessions 1, 2, 3, 5</em>
            </p>
            <p className="mb-3" style={{ color: 'var(--foreground)' }}>
              Circular economy has evolved from environmental nice-to-have to strategic competitiveness and security imperative. Supply chain resilience now has quantifiable economic value.
            </p>
            <div className="p-3 rounded-xl mb-3" style={{ background: 'var(--sage-50)' }}>
              <p className="italic" style={{ color: 'var(--sage-800)' }}>
                "Circularity is no longer an environmental agenda. It is now a matter of competitiveness and security."
                <span className="block text-sm mt-1" style={{ color: 'var(--sage-600)' }}>— Mika Sulkinoja, Sitra</span>
              </p>
            </div>
          </div>

          {/* Theme 5 */}
          <div className="pl-4" style={{ borderLeft: '4px solid var(--arctic-400)' }}>
            <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--glacial-800)' }}>5. Inner Loops & Product Longevity</h4>
            <p className="mb-2" style={{ color: 'var(--sage-600)' }}>
              <em>Appears in: Sessions 2, 3, 4, 5</em>
            </p>
            <p className="mb-3" style={{ color: 'var(--foreground)' }}>
              Recycling is the last loop of circularity. The strongest economic and social benefits come from keeping products in use: repair, reuse, refurbishment, remanufacturing.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--glacial-700)' }}>Strategic Insights for Leaders</h3>
        <div className="space-y-4">
          {[
            { title: 'Small Scale Enables Rapid Learning', desc: 'Greenland\'s constraints force innovation but also enable rapid feedback and visible impact.' },
            { title: 'Cultural Values Determine Adoption', desc: 'Technical solutions fail without cultural alignment. Map circular economy principles to existing cultural values.' },
            { title: 'Youth Inclusion is Non-Negotiable', desc: 'Establish formal mechanisms for youth participation in decisions with 10-30 year timeframes.' },
            { title: 'Bioregions Offer Natural Boundaries', desc: 'Ecological boundaries often better define collaboration zones than administrative borders.' },
            { title: 'Financing Follows Implementation', desc: 'Show concrete results first. Financial institutions increasingly value circular business models with proven track records.' }
          ].map((insight, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--arctic-50)', border: '1px solid var(--glacial-200)' }}>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--glacial-800)' }}>{i + 1}. {insight.title}</h4>
              <p className="text-sm" style={{ color: 'var(--foreground)' }}>{insight.desc}</p>
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
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--glacial-800)' }}>8 Cross-Session Themes</h2>
      <p className="mb-6" style={{ color: 'var(--foreground)' }}>
        Deep analysis of themes that appeared across multiple Day 1 sessions, showing how ideas evolved and connected throughout the day.
      </p>

      <div className="space-y-8">
        {[
          {
            num: 1,
            title: 'Trust as Infrastructure',
            sessions: 'All 6 sessions',
            color: 'glacial-400',
            insight: 'In sparse populations, social capital is more critical infrastructure than physical infrastructure',
            manifestations: [
              'Ocean industries: cluster networks depend on years of trust-building',
              'Arctic lifestyles: maker-customer relationships enable repair',
              'Circular cities: Greenland\'s sustainability strategy relies on collective agreement',
              'Business models: Royal Greenland transformation required cultural buy-in'
            ]
          },
          {
            num: 2,
            title: 'Indigenous Knowledge & Circular Economy Alignment',
            sessions: 'Sessions 1, 3, 4, 5, Closing',
            color: 'sage-400',
            insight: 'What people describe as "new time" circular thinking is actually very old time in Arctic sense',
            manifestations: [
              'Complete utilization: Nothing wasted from harvest or hunt',
              'Design for disassembly: Structures built to be moved',
              'Ecological limits: Quotas as sustainability features, not constraints',
              'Material trust: Traditional knowledge valued over laboratory testing'
            ]
          },
          {
            num: 3,
            title: 'Place-Based Solutions Over Universal Models',
            sessions: 'All 6 sessions',
            color: 'glacial-500',
            insight: 'Adaptability matters more than scalability. Context determines implementation.',
            manifestations: [
              'Cesis bioregion: Voluntary 4-municipality alliance around National Park',
              'Riga approach: 8 thematic areas adapted to capital city context',
              'Greenland model: 38 outposts, some with just 3 people and a freezer',
              'Place economy framework: Triangulate place + approach + topic for value'
            ]
          },
          {
            num: 4,
            title: 'Economic Resilience Through Shortened Supply Chains',
            sessions: 'Sessions 1, 2, 3, 5',
            color: 'sage-500',
            insight: 'Supply chain resilience now has quantifiable economic value. This shift is structural, not cyclical.',
            manifestations: [
              'Ocean: $12 → $5,000 cod value through complete utilization',
              'Construction: 50% cost savings through renovation vs. new builds',
              'Remanufacturing: €31B → €100B European market by 2030',
              'Financing: NIB can now "put a kroner sign" on resilience value'
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
            <ul className="space-y-1 text-sm" style={{ color: 'var(--foreground)' }}>
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
    </div>
  );
}

function NumbersTab() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--glacial-800)' }}>Day 1 By The Numbers</h2>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--glacial-700)' }}>Summit Statistics</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: 'Sessions', value: '6', bg: 'glacial' },
            { label: 'Total Duration', value: '5.5 hours', bg: 'sage' },
            { label: 'Speakers', value: '24+', bg: 'glacial' },
            { label: 'Countries', value: '10+', bg: 'sage' },
            { label: 'Organizations', value: '70+', bg: 'glacial' },
            { label: 'Words Generated', value: '28,819', bg: 'sage' }
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: `var(--${stat.bg}-50)` }}>
              <div className="text-3xl font-bold" style={{ color: `var(--${stat.bg}-800)` }}>{stat.value}</div>
              <div className="text-sm" style={{ color: `var(--${stat.bg}-600)` }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--glacial-700)' }}>Top Significant Numbers</h3>
        <div className="space-y-2 text-sm">
          {[
            { num: '4%', desc: 'Current global circularity (96% still linear)' },
            { num: '23M tons', desc: 'Global edible seafood wasted annually' },
            { num: '$12 → $5,000', desc: 'Atlantic cod value increase through 100% utilization (400x)' },
            { num: '45% → 90%+', desc: 'Iceland\'s fish utilization transformation' },
            { num: '€31B → €100B', desc: 'Europe\'s remanufacturing market growth by 2030' },
            { num: '500,000', desc: 'Jobs from remanufacturing expansion' },
            { num: '50%', desc: 'Cost savings: renovation vs. new construction in Greenland' },
            { num: '4 million', desc: 'Arctic residents deserving coordinated circular support' }
          ].map((item, i) => (
            <div key={i} className="flex items-baseline p-3 rounded-xl" style={{ background: 'var(--arctic-50)' }}>
              <span className="font-bold mr-3 min-w-[120px]" style={{ color: 'var(--glacial-600)' }}>{item.num}</span>
              <span style={{ color: 'var(--foreground)' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--glacial-700)' }}>Geographic Representation</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl" style={{ background: 'var(--glacial-50)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--glacial-800)' }}>Countries Represented</h4>
            <div className="text-sm space-y-1" style={{ color: 'var(--foreground)' }}>
              <div>🇬🇱 Greenland • 🇮🇸 Iceland • 🇳🇴 Norway</div>
              <div>🇸🇪 Sweden • 🇩🇰 Denmark • 🇫🇮 Finland</div>
              <div>🇱🇻 Latvia • 🇦🇽 Åland • 🇪🇺 EU institutions</div>
            </div>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--sage-50)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--sage-800)' }}>Sectors Represented</h4>
            <div className="text-sm space-y-1" style={{ color: 'var(--foreground)' }}>
              <div>• Government & Municipal</div>
              <div>• Ocean Industries</div>
              <div>• Construction & Materials</div>
              <div>• Fashion & Textiles</div>
              <div>• Technology & Digital</div>
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
      content: 'Day 1 of Nordic Circular Summit 2025 in Nuuk revealed something profound: "Trust is the infrastructure of Greenland." Not roads. Not fiber optics. Trust.\n\nIn sparse populations where collaboration can\'t be mandated, social capital becomes more valuable than physical infrastructure.',
      theme: 'Trust as Infrastructure',
      hashtags: ['#CircularEconomy', '#NordicCollaboration', '#SocialCapital']
    },
    {
      platform: 'Twitter',
      content: 'What the circular economy movement is trying to codify—complete utilization, waste elimination, community sharing—Indigenous peoples have practiced for centuries.\n\n"We\'ve never thought of seal skin as waste in Greenland."',
      theme: 'Indigenous Knowledge',
      hashtags: ['#CircularEconomy', '#IndigenousKnowledge', '#Arctic']
    },
    {
      platform: 'LinkedIn',
      content: 'Circular economy is no longer an environmental agenda. It\'s now a matter of competitiveness and security.\n\nKey numbers from Day 1:\n• Atlantic cod: $12 → $5,000 value through 100% utilization\n• Europe remanufacturing: €31B → €100B by 2030\n• 500,000 jobs from remanufacturing expansion',
      theme: 'Economic Resilience',
      hashtags: ['#CircularEconomy', '#BusinessModel', '#Resilience']
    }
  ];

  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--glacial-800)' }}>Social Media Highlights</h2>
      <p className="mb-6" style={{ color: 'var(--foreground)' }}>
        20 ready-to-publish social media posts covering Day 1 cross-session themes, key quotes, and implementation insights.
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
            <p className="whitespace-pre-line mb-3" style={{ color: 'var(--foreground)' }}>{post.content}</p>
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
          <strong>Full social media package:</strong> Download the complete JSON file with 20 posts (13 LinkedIn, 7 Twitter)
          covering all 8 cross-session themes, formatted and ready to publish.
        </p>
      </div>
    </div>
  );
}
