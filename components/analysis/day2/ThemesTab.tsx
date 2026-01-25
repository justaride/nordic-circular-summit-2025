export default function ThemesTab() {
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
          <div key={i} className="p-3 rounded-xl flex justify-between items-center" style={{ background: 'var(--arctic-5)' }}>
            <span className="font-semibold" style={{ color: 'var(--glacial-800)' }}>{i + 1}. {item.priority}</span>
            <span className="text-sm px-2 py-1 rounded" style={{ background: 'var(--sage-100)', color: 'var(--sage-700)' }}>{item.deadline}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
