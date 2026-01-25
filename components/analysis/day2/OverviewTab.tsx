export default function OverviewTab() {
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
          <div key={i} className="flex items-start p-4 rounded-xl" style={{ background: 'var(--sage-5)', border: '1px solid var(--sage-200)' }}>
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
