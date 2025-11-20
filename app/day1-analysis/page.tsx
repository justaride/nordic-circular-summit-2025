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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Day 1 Complete Analysis</h1>
        <p className="text-lg text-gray-600 mb-2">
          Nordic Circular Summit 2025 - November 19, 2025 | Nuuk, Greenland
        </p>
        <p className="text-gray-600">
          Comprehensive synthesis of all 6 Day 1 sessions
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-cyan-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-cyan-900">6</div>
          <div className="text-sm text-cyan-700">Sessions</div>
        </div>
        <div className="bg-blue-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-900">5.5h</div>
          <div className="text-sm text-blue-700">Content</div>
        </div>
        <div className="bg-purple-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-900">24+</div>
          <div className="text-sm text-purple-700">Speakers</div>
        </div>
        <div className="bg-green-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-900">8</div>
          <div className="text-sm text-green-700">Themes</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'executive' && <ExecutiveSummaryTab />}
        {activeTab === 'themes' && <ThemesTab />}
        {activeTab === 'numbers' && <NumbersTab />}
        {activeTab === 'social' && <SocialTab />}
      </div>

      {/* Download Section */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-bold text-lg mb-4">Download Full Reports</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <a
            href="/executive/day1-executive-summary.md"
            download
            className="flex items-center p-4 bg-white rounded border hover:border-blue-500 transition-colors"
          >
            <span className="text-2xl mr-3">📋</span>
            <div>
              <div className="font-semibold">Executive Summary</div>
              <div className="text-sm text-gray-600">2,562 words • Markdown</div>
            </div>
          </a>
          <a
            href="/highlights/day1-cross-session-themes.md"
            download
            className="flex items-center p-4 bg-white rounded border hover:border-purple-500 transition-colors"
          >
            <span className="text-2xl mr-3">🔗</span>
            <div>
              <div className="font-semibold">Cross-Session Themes</div>
              <div className="text-sm text-gray-600">4,778 words • Markdown</div>
            </div>
          </a>
          <a
            href="/highlights/day1-by-the-numbers.md"
            download
            className="flex items-center p-4 bg-white rounded border hover:border-green-500 transition-colors"
          >
            <span className="text-2xl mr-3">📊</span>
            <div>
              <div className="font-semibold">Data Visualization</div>
              <div className="text-sm text-gray-600">3,087 words • Markdown</div>
            </div>
          </a>
          <a
            href="/social-media/day1-holistic-posts.json"
            download
            className="flex items-center p-4 bg-white rounded border hover:border-pink-500 transition-colors"
          >
            <span className="text-2xl mr-3">📱</span>
            <div>
              <div className="font-semibold">Social Media Posts</div>
              <div className="text-sm text-gray-600">20 posts • JSON</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-4">Day 1 Overview</h2>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
        <p className="text-blue-900 font-semibold">
          On November 19, 2025, the Nordic Circular Summit made history by convening in Nuuk, Greenland—
          the first time this annual event has been held in one of the Nordic region's self-governing territories.
        </p>
      </div>

      <h3 className="text-xl font-bold mt-6 mb-3">8 Cross-Session Themes Identified</h3>
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
          <div key={i} className="flex items-start p-4 bg-gray-50 rounded">
            <span className="text-3xl mr-3">{theme.icon}</span>
            <div>
              <div className="font-semibold">{theme.title}</div>
              <div className="text-sm text-gray-600">{theme.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mt-6 mb-3">Day 1 Sessions</h3>
      <div className="space-y-3">
        {[
          { time: '09:15-10:30', title: 'Circular Frontiers: Shaping our Future', topics: 'Entrepreneurship, funding, Green Deal' },
          { time: '10:45-11:45', title: 'Circular Ocean Industries', topics: 'Nordic blue economy, fisheries, marine resources' },
          { time: '12:45-13:30', title: 'Locally Rooted: Materialising a Circular Future', topics: 'Regenerative business, bioeconomy, local materials' },
          { time: '13:45-14:45', title: 'Arctic & Nordic Lifestyles', topics: 'Circular culture, textiles, traditional knowledge' },
          { time: '15:00-16:00', title: 'Circular Cities & Regions', topics: 'AI, digitalization, regional leadership' },
          { time: '16:15-16:45', title: 'Day 1 Summary: Closing Reflections', topics: 'Trust, quality of life, implementation' }
        ].map((session, i) => (
          <div key={i} className="p-4 border-l-4 border-gray-300 bg-gray-50">
            <div className="flex items-center mb-2">
              <span className="font-mono text-sm text-gray-600 mr-3">{session.time}</span>
              <span className="font-bold">{session.title}</span>
            </div>
            <div className="text-sm text-gray-600">{session.topics}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExecutiveSummaryTab() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-6">Executive Summary</h2>
      <p className="text-sm text-gray-600 mb-6">Prepared for: Decision-makers, funders, policymakers</p>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4">Top 5 Cross-Session Themes</h3>

        <div className="space-y-6">
          {/* Theme 1 */}
          <div className="border-l-4 border-cyan-500 pl-4">
            <h4 className="font-bold text-lg mb-2">1. Trust as Infrastructure</h4>
            <p className="text-gray-700 mb-2">
              <em>Appears in: Sessions 1, 2, 4, 5, Closing</em>
            </p>
            <p className="mb-3">
              In regions with sparse populations and limited physical infrastructure, trust serves as invisible infrastructure enabling commerce, collaboration, and collective action.
            </p>
            <div className="bg-cyan-50 p-3 rounded mb-3">
              <p className="italic text-gray-800">
                "The real infrastructure in Greenland is trust, I would say. Not the roads. Trust is the real infrastructure."
                <span className="block text-sm text-gray-600 mt-1">— Edvard Lybert Mørk, Nalek Ventures</span>
              </p>
            </div>
            <div className="text-sm space-y-1">
              <p><strong>Examples:</strong></p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Royal Greenland's transformation required cultural buy-in from factory workers</li>
                <li>Denmark's Circular Furniture Network: 30 competing brands collaborating</li>
                <li>Greenland's construction strategy operates without mandatory legislation</li>
                <li>Cesis bioregion's memorandum took one year with 13 institutions</li>
              </ul>
            </div>
          </div>

          {/* Theme 2 */}
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-bold text-lg mb-2">2. Indigenous Knowledge & Circularity</h4>
            <p className="text-gray-700 mb-2">
              <em>Appears in: Sessions 1, 3, 4, 5, Closing</em>
            </p>
            <p className="mb-3">
              Traditional Arctic and Indigenous practices aren't romantic historical artifacts—they're sophisticated circular economy systems that sustained communities for millennia.
            </p>
            <div className="bg-green-50 p-3 rounded mb-3">
              <p className="italic text-gray-800">
                "We've never thought of seal skin as a waste product in Greenland. Inuit have survived in the Arctic because of the seal and the seal skin."
                <span className="block text-sm text-gray-600 mt-1">— Mia Chemnitz, Grevilliot</span>
              </p>
            </div>
            <div className="text-sm space-y-1">
              <p><strong>Examples:</strong></p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Complete animal utilization: meat, skin, bones, organs all used</li>
                <li>Design for disassembly: Houses constructed to be moved with families</li>
                <li>Quota limitations as sustainability features built into business models</li>
                <li>Traditional materials trusted over laboratory-tested alternatives</li>
              </ul>
            </div>
          </div>

          {/* Theme 3 */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-bold text-lg mb-2">3. Place-Based Solutions</h4>
            <p className="text-gray-700 mb-2">
              <em>Appears in: All sessions</em>
            </p>
            <p className="mb-3">
              Circular economy cannot be imposed through universal blueprints. Solutions must emerge from specific contexts, honoring local geography, culture, resources, and constraints.
            </p>
            <div className="bg-purple-50 p-3 rounded mb-3">
              <p className="italic text-gray-800">
                "Being poor makes us think different."
                <span className="block text-sm text-gray-600 mt-1">— Mayor Malene Vahl Rasmussen, Kommune Kujalleq</span>
              </p>
            </div>
            <div className="text-sm space-y-1">
              <p><strong>Examples:</strong></p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Cesis bioregion: 4 municipalities forming voluntary alliance</li>
                <li>Riga's 8 thematic areas adapted to capital city context</li>
                <li>Greenland's 38 Royal Greenland outposts, some with just 3 people</li>
                <li>Nuuk housing renovation at 50% cost of new builds</li>
              </ul>
            </div>
          </div>

          {/* Theme 4 */}
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-bold text-lg mb-2">4. Economic Resilience Through Circularity</h4>
            <p className="text-gray-700 mb-2">
              <em>Appears in: Sessions 1, 2, 3, 5</em>
            </p>
            <p className="mb-3">
              Circular economy has evolved from environmental nice-to-have to strategic competitiveness and security imperative. Supply chain resilience now has quantifiable economic value.
            </p>
            <div className="bg-orange-50 p-3 rounded mb-3">
              <p className="italic text-gray-800">
                "Circularity is no longer an environmental agenda. It is now a matter of competitiveness and security."
                <span className="block text-sm text-gray-600 mt-1">— Mika Sulkinoja, Sitra</span>
              </p>
            </div>
            <div className="text-sm space-y-1">
              <p><strong>Key Numbers:</strong></p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Atlantic cod: $12 → $5,000 per fish through 100% utilization (Iceland)</li>
                <li>Greenland renovation: 50% cost savings vs. new construction</li>
                <li>Europe remanufacturing: €31B → €100B by 2030 (500,000 jobs)</li>
                <li>Royal Greenland: loss-making factory → profitable chitosan production</li>
              </ul>
            </div>
          </div>

          {/* Theme 5 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-lg mb-2">5. Inner Loops & Product Longevity</h4>
            <p className="text-gray-700 mb-2">
              <em>Appears in: Sessions 2, 3, 4, 5</em>
            </p>
            <p className="mb-3">
              Recycling is the last loop of circularity. The strongest economic and social benefits come from keeping products in use: repair, reuse, refurbishment, remanufacturing.
            </p>
            <div className="bg-blue-50 p-3 rounded mb-3">
              <p className="italic text-gray-800">
                "The person who made the garment is probably the best in the world to repair it."
                <span className="block text-sm text-gray-600 mt-1">— Grevilliot model</span>
              </p>
            </div>
            <div className="text-sm space-y-1">
              <p><strong>Policy Drivers:</strong></p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>ESPR mandates durability, repairability, upgradability</li>
                <li>Nordic LCA: reused products set to zero emissions</li>
                <li>Digital Product Passports enable repair instructions</li>
                <li>Royal Greenland's 38 outposts enable local repair</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4">Strategic Insights for Leaders</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">1. Small Scale Enables Rapid Learning</h4>
            <p className="text-sm text-gray-700">
              Greenland's constraints force innovation but also enable rapid feedback and visible impact.
              Use small-scale pilots in constrained environments to test circular models before scaling.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">2. Cultural Values Determine Adoption</h4>
            <p className="text-sm text-gray-700">
              Technical solutions fail without cultural alignment. Map circular economy principles to existing cultural values.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">3. Youth Inclusion is Non-Negotiable</h4>
            <p className="text-sm text-gray-700">
              Establish formal mechanisms for youth participation in decisions with 10-30 year timeframes.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">4. Bioregions Offer Natural Boundaries</h4>
            <p className="text-sm text-gray-700">
              Ecological boundaries often better define collaboration zones than administrative borders.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">5. Financing Follows Implementation</h4>
            <p className="text-sm text-gray-700">
              Show concrete results first. Financial institutions increasingly value circular business models with proven track records.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">Implementation Priorities</h3>
        <div className="space-y-3">
          {[
            { title: 'ArcCirc Initiative', desc: 'Establish Arctic Circular Hotspot following Baltic model, recognizing Arctic\'s 4M residents deserve coordinated circular support' },
            { title: 'Retrofit-First Economics', desc: 'Mandate lifecycle costing including renovation options before new construction approvals' },
            { title: '100% Utilization Standard', desc: 'Set fish/marine utilization rates as KPIs for ocean industries across Nordic region' },
            { title: 'DPP Interoperability', desc: 'Ensure Digital Product Passport systems work across Nordic-Baltic borders' },
            { title: 'Trust Infrastructure Investment', desc: 'Fund cluster development, peer learning networks, industry associations as critical infrastructure' }
          ].map((priority, i) => (
            <div key={i} className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">{i + 1}.</span>
              <div>
                <div className="font-semibold">{priority.title}</div>
                <div className="text-sm text-gray-700">{priority.desc}</div>
              </div>
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
      <h2 className="text-2xl font-bold mb-6">8 Cross-Session Themes</h2>
      <p className="mb-6 text-gray-700">
        Deep analysis of themes that appeared across multiple Day 1 sessions, showing how ideas evolved and connected throughout the day.
      </p>

      <div className="space-y-8">
        {[
          {
            num: 1,
            title: 'Trust as Infrastructure',
            sessions: 'All 6 sessions',
            color: 'cyan',
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
            color: 'green',
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
            color: 'purple',
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
            color: 'orange',
            insight: 'Supply chain resilience now has quantifiable economic value. This shift is structural, not cyclical.',
            manifestations: [
              'Ocean: $12 → $5,000 cod value through complete utilization',
              'Construction: 50% cost savings through renovation vs. new builds',
              'Remanufacturing: €31B → €100B European market by 2030',
              'Financing: NIB can now "put a kroner sign" on resilience value'
            ]
          },
          {
            num: 5,
            title: 'Technology as Enabler, Not Solution',
            sessions: 'Sessions 1, 5',
            color: 'blue',
            insight: 'Digital tools enable transparency and traceability. But technology alone won\'t create circular systems.',
            manifestations: [
              'Digital Product Passports: Enable repair, resale, material recovery',
              'LCA data: Make environmental impacts visible and comparable',
              'Local manufacturing advantage: Ludwig Svensson easily complies with DPP',
              'AI for optimization: Terje Eide\'s food waste prevention example'
            ]
          },
          {
            num: 6,
            title: 'Quality of Life as Ultimate Purpose',
            sessions: 'Sessions 3, 4, Closing',
            color: 'pink',
            insight: 'Why are we doing circular economy? For human flourishing, not just environmental metrics.',
            manifestations: [
              'Marthe: "Quality of life. That is why we\'re doing circular economy, isn\'t it?"',
              'Lifestyle session: Sufficiency and wellbeing over consumption',
              'Local food: Mayor\'s priority for kindergartens and elder homes',
              'Design for circularity: Enabling practices that enhance daily life'
            ]
          },
          {
            num: 7,
            title: 'Nordic-Arctic-Baltic Collaboration as Model',
            sessions: 'All 6 sessions',
            color: 'indigo',
            insight: 'Respectful market and deep cultures create immense learning potential across this natural region.',
            manifestations: [
              'Geographic representation: Greenland, Iceland, Norway, Sweden, Denmark, Latvia',
              'Ocean clusters: Nordic and Arctic collaboration models',
              'Textile transition: Nordic-Baltic working group',
              'Proposal: Arctic Circular Hotspot following Baltic model'
            ]
          },
          {
            num: 8,
            title: 'Implementation Over Planning',
            sessions: 'Sessions 1, 5, Closing',
            color: 'emerald',
            insight: 'We\'ve moved from planning phase to implementation phase. Show concrete results.',
            manifestations: [
              'Marthe: "We have moved from planning to implementation"',
              'Malene: Municipal actions with measurable local impact',
              'Business cases: Companies demonstrating collaboration works',
              'Financing shift: NIB funding proven circular models'
            ]
          }
        ].map(theme => (
          <div key={theme.num} className={`border-l-4 border-${theme.color}-500 pl-4`}>
            <h3 className="font-bold text-lg mb-2">{theme.num}. {theme.title}</h3>
            <p className="text-sm text-gray-600 mb-3"><em>{theme.sessions}</em></p>
            <div className={`bg-${theme.color}-50 p-3 rounded mb-3`}>
              <p className="text-sm font-semibold">Core Insight:</p>
              <p className="text-gray-800">{theme.insight}</p>
            </div>
            <p className="text-sm font-semibold mb-2">How It Manifested:</p>
            <ul className="space-y-1 text-sm text-gray-700">
              {theme.manifestations.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2">•</span>
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
      <h2 className="text-2xl font-bold mb-6">Day 1 By The Numbers</h2>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4">Summit Statistics</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: 'Sessions', value: '6', color: 'blue' },
            { label: 'Total Duration', value: '5.5 hours', color: 'purple' },
            { label: 'Speakers', value: '24+', color: 'green' },
            { label: 'Countries', value: '10+', color: 'orange' },
            { label: 'Organizations', value: '70+', color: 'pink' },
            { label: 'Words Generated', value: '28,819', color: 'cyan' }
          ].map((stat, i) => (
            <div key={i} className={`bg-${stat.color}-50 p-4 rounded`}>
              <div className={`text-3xl font-bold text-${stat.color}-900`}>{stat.value}</div>
              <div className={`text-sm text-${stat.color}-700`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4">Top 20 Most Significant Numbers</h3>
        <div className="space-y-2 text-sm">
          {[
            { num: '4%', desc: 'Current global circularity (96% still linear)' },
            { num: '23M tons', desc: 'Global edible seafood wasted annually' },
            { num: '$12 → $5,000', desc: 'Atlantic cod value increase through 100% utilization (400x)' },
            { num: '45% → 90%+', desc: 'Iceland\'s fish utilization transformation' },
            { num: '€31B → €100B', desc: 'Europe\'s remanufacturing market growth by 2030' },
            { num: '500,000', desc: 'Jobs from remanufacturing expansion' },
            { num: '50%', desc: 'Cost savings: renovation vs. new construction in Greenland' },
            { num: '4 million', desc: 'Arctic residents deserving coordinated circular support' },
            { num: '80%', desc: 'World\'s biodiversity in indigenous-stewarded lands' },
            { num: '38', desc: 'Royal Greenland outposts across Greenland' },
            { num: '30', desc: 'Competing furniture brands in Denmark\'s Circular Network' },
            { num: '13', desc: 'Institutions in Cesis bioregion memorandum of goodwill' },
            { num: '28M', desc: 'Nordic region population' },
            { num: '56,000', desc: 'Greenland population (0.00068% of world)' },
            { num: '250 years', desc: 'Timeline to close material loops at current pace' },
            { num: '10-30 years', desc: 'Decision timeframe requiring youth inclusion' },
            { num: '2023-2030', desc: 'ESPR implementation timeline' },
            { num: '2025', desc: 'Nordic LCA regulation harmonization target' },
            { num: '100%', desc: 'Fish utilization target for ocean industries' },
            { num: '0%', desc: 'What people know about their clothes (Gisle Mariani Mardal)' }
          ].map((item, i) => (
            <div key={i} className="flex items-baseline p-3 bg-gray-50 rounded">
              <span className="font-bold text-blue-600 mr-3 min-w-[120px]">{item.num}</span>
              <span className="text-gray-700">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4">Before → After Transformations</h3>
        <div className="space-y-3">
          {[
            { before: 'Fish: 45% utilization', after: '90%+ utilization', impact: '$12 → $5,000 per cod' },
            { before: 'Shrimp meal factory (loss)', after: 'Chitosan production (profit)', impact: 'Royal Greenland turnaround' },
            { before: 'Environmental agenda', after: 'Competitiveness & security', impact: 'Circularity reframing' },
            { before: 'Recycling focus', after: 'Inner loops priority', impact: '500,000 remanufacturing jobs' },
            { before: 'Planning phase', after: 'Implementation phase', impact: 'Concrete results visible' }
          ].map((trans, i) => (
            <div key={i} className="p-4 border rounded">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-500 text-xs mb-1">BEFORE</div>
                  <div className="font-semibold">{trans.before}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-1">AFTER</div>
                  <div className="font-semibold text-green-700">{trans.after}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-1">IMPACT</div>
                  <div className="text-blue-700">{trans.impact}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">Geographic Representation</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded">
            <h4 className="font-semibold mb-2">Countries Represented</h4>
            <div className="text-sm space-y-1">
              <div>🇬🇱 Greenland • 🇮🇸 Iceland • 🇳🇴 Norway</div>
              <div>🇸🇪 Sweden • 🇩🇰 Denmark • 🇫🇮 Finland</div>
              <div>🇱🇻 Latvia • 🇦🇽 Åland • 🇪🇺 EU institutions</div>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded">
            <h4 className="font-semibold mb-2">Sectors Represented</h4>
            <div className="text-sm space-y-1">
              <div>• Government & Municipal</div>
              <div>• Ocean Industries</div>
              <div>• Construction & Materials</div>
              <div>• Fashion & Textiles</div>
              <div>• Technology & Digital</div>
              <div>• Finance & Investment</div>
              <div>• Research & Academia</div>
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
      content: 'Day 1 of Nordic Circular Summit 2025 in Nuuk revealed something profound: "Trust is the infrastructure of Greenland." Not roads. Not fiber optics. Trust.\n\nIn sparse populations where collaboration can\'t be mandated, social capital becomes more valuable than physical infrastructure. Royal Greenland\'s transformation, Denmark\'s Circular Furniture Network (30 competing brands), Cesis bioregion\'s year-long memorandum with 13 institutions—all built on trust.\n\nFor circular economy, this matters enormously. Circular models require:\n• Collaboration between competitors\n• Long-term thinking without immediate ROI\n• Transparency about challenges\n• Willingness to experiment\n\nAll require trust. Regions rich in social capital may be better positioned for circular transitions than those rich only in financial capital.',
      theme: 'Trust as Infrastructure',
      hashtags: ['#CircularEconomy', '#NordicCollaboration', '#SocialCapital']
    },
    {
      platform: 'Twitter',
      content: 'What the circular economy movement is trying to codify—complete utilization, waste elimination, community sharing—Indigenous peoples have practiced for centuries.\n\n"We\'ve never thought of seal skin as waste in Greenland. Inuit survived because of the seal and seal skin." - Mia Chemnitz\n\n#CircularEconomy #IndigenousKnowledge',
      theme: 'Indigenous Knowledge',
      hashtags: ['#CircularEconomy', '#IndigenousKnowledge', '#Arctic']
    },
    {
      platform: 'LinkedIn',
      content: 'Circular economy is no longer an environmental agenda. It\'s now a matter of competitiveness and security.\n\nKey numbers from Day 1:\n• Atlantic cod: $12 → $5,000 value through 100% utilization (400x increase)\n• Iceland fish utilization: 45% → 90%+ transformation\n• Europe remanufacturing: €31B → €100B by 2030\n• 500,000 jobs from remanufacturing expansion\n• Greenland renovation: 50% cost savings vs. new construction\n\nWhen you can "put a kroner sign" on supply chain resilience, circular business models make financial sense. This shift is structural, not cyclical.',
      theme: 'Economic Resilience',
      hashtags: ['#CircularEconomy', '#BusinessModel', '#Resilience']
    },
    {
      platform: 'Twitter',
      content: '"Being poor makes us think different."\n\nMayor Malene Vahl Rasmussen (30, youngest mayor in Greenland) on how economic constraints drive circular innovation in Kommune Kujalleq.\n\nCan\'t afford imports → develop local solutions\nConstraints → creativity\n\n#CircularEconomy #LocalSolutions #Arctic',
      theme: 'Place-Based Solutions',
      hashtags: ['#CircularEconomy', '#LocalSolutions', '#Innovation']
    },
    {
      platform: 'LinkedIn',
      content: 'Why are we doing circular economy?\n\n"Quality of life. That is why we\'re doing circular economy, isn\'t it?" - Marthe Haugland, Nordic Innovation\n\nDay 1 closing reflections reminded us: the circular economy isn\'t ultimately about metrics, compliance, or even environmental targets. It\'s about human flourishing.\n\nMunicipal examples from Kommune Kujalleq:\n• Local food partnerships (hunters, fishermen → kindergartens)\n• Youth inclusion (Negusa agreement for decision-making)\n• Kindergarten gardens teaching food growing\n• Mining negotiations ensuring community benefits\n\nCircular economy lived in places, by people, for wellbeing.',
      theme: 'Quality of Life',
      hashtags: ['#CircularEconomy', '#QualityOfLife', '#MunicipalLeadership']
    }
  ];

  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-6">Social Media Highlights</h2>
      <p className="text-gray-700 mb-6">
        20 ready-to-publish social media posts covering Day 1 cross-session themes, key quotes, and implementation insights.
      </p>

      <div className="space-y-6">
        {posts.map((post, i) => (
          <div key={i} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className={`px-3 py-1 rounded text-sm font-semibold ${
                post.platform === 'LinkedIn' ? 'bg-blue-100 text-blue-700' : 'bg-cyan-100 text-cyan-700'
              }`}>
                {post.platform}
              </span>
              <span className="text-sm text-gray-500">{post.theme}</span>
            </div>
            <p className="text-gray-800 whitespace-pre-line mb-3">{post.content}</p>
            <div className="flex flex-wrap gap-2">
              {post.hashtags.map((tag, j) => (
                <span key={j} className="text-sm text-blue-600">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded">
        <p className="text-sm text-blue-900">
          <strong>Full social media package:</strong> Download the complete JSON file with 20 posts (13 LinkedIn, 7 Twitter)
          covering all 8 cross-session themes, formatted and ready to publish.
        </p>
      </div>
    </div>
  );
}
