export default function ExecutiveSummaryTab() {
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
                <li>Denmark's "bevare or forklare" (preserve or explain) policy movement</li>
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
