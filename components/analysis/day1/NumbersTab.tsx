export default function NumbersTab() {
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
