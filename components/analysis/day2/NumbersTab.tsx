export default function NumbersTab() {
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
            <div key={i} className="flex items-baseline p-3 rounded-xl" style={{ background: 'var(--sage-5)' }}>
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
