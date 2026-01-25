export default function OverviewTab() {
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
