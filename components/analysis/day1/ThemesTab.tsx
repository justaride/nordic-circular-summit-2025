export default function ThemesTab() {
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
