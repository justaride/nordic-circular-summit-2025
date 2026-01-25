import { priorityOpportunities } from '@/lib/intelligence-data';
import { TargetIcon } from '@/components/Icons';

export default function OpportunitiesTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
        <TargetIcon size={24} color="var(--glacial-500)" /> Priority Opportunities for NCH
      </h2>
      <div className="space-y-4">
        {priorityOpportunities.map((opp) => (
          <div key={opp.id} className="p-5 rounded-xl border" style={{ background: 'white', borderColor: 'var(--glacial-200)' }}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold" style={{ color: 'var(--glacial-700)' }}>{opp.title}</h3>
              <span
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: opp.priority === 'high' ? 'var(--glacial-500)' : 'var(--sage-400)',
                  color: 'white'
                }}
              >
                {opp.priority === 'high' ? 'High Priority' : 'Medium Priority'}
              </span>
            </div>
            <p className="mb-4" style={{ color: '#111827' }}>{opp.description}</p>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-xs font-medium mb-1" style={{ color: 'var(--sage-600)' }}>NCH Role</div>
                <div className="text-sm font-medium" style={{ color: 'var(--glacial-700)' }}>{opp.role}</div>
              </div>
              <div>
                <div className="text-xs font-medium mb-1" style={{ color: 'var(--sage-600)' }}>Partners</div>
                <div className="text-sm" style={{ color: '#111827' }}>{opp.partners.join(', ')}</div>
              </div>
              <div>
                <div className="text-xs font-medium mb-1" style={{ color: 'var(--sage-600)' }}>Timeline</div>
                <div className="text-sm font-medium" style={{ color: 'var(--glacial-700)' }}>{opp.timeline}</div>
              </div>
            </div>

            <div className="p-3 rounded-lg" style={{ background: 'var(--sage-50)' }}>
              <div className="text-xs font-medium mb-2" style={{ color: 'var(--sage-700)' }}>Next Steps:</div>
              <ul className="space-y-1">
                {opp.nextSteps.map((step, i) => (
                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#111827' }}>
                    <span className="font-bold" style={{ color: 'var(--glacial-500)' }}>{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
