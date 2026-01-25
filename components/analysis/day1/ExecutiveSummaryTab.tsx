export default function ExecutiveSummaryTab() {
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
