import { fundingSources } from '@/lib/intelligence-data';
import { FundingIcon } from '@/components/Icons';

export default function FundingTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
        <FundingIcon size={24} color="var(--glacial-500)" /> Funding Sources
      </h2>
      <p className="text-sm" style={{ color: 'var(--sage-600)' }}>
        Relevant funding opportunities for circular economy projects in the Nordic-Baltic region
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {fundingSources.map((source, i) => (
          <div key={i} className="p-4 rounded-xl border" style={{ background: 'white', borderColor: 'var(--glacial-200)' }}>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold" style={{ color: 'var(--glacial-700)' }}>{source.name}</h3>
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  background: source.relevance === 'High' ? 'var(--glacial-100)' : 'var(--sage-100)',
                  color: source.relevance === 'High' ? 'var(--glacial-700)' : 'var(--sage-700)'
                }}
              >
                {source.relevance} Relevance
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs mb-2">
              <span className="px-2 py-0.5 rounded" style={{ background: 'var(--arctic-100)', color: 'var(--arctic-700)' }}>
                {source.type}
              </span>
              <span style={{ color: 'var(--sage-500)' }}>•</span>
              <span style={{ color: 'var(--sage-600)' }}>{source.geography}</span>
            </div>
            <p className="text-sm mb-2" style={{ color: '#111827' }}>{source.focus}</p>
            <p className="text-xs italic" style={{ color: 'var(--sage-500)' }}>{source.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
