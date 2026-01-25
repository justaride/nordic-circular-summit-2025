import { quickWins } from '@/lib/intelligence-data';
import { ChecklistIcon, ArrowRightIcon } from '@/components/Icons';

export default function QuickWinsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
        <ChecklistIcon size={24} color="var(--glacial-500)" /> Quick Wins
      </h2>
      <p className="text-sm" style={{ color: 'var(--sage-600)' }}>
        Immediate actions to capitalize on summit momentum
      </p>
      <div className="space-y-3">
        {quickWins.map((qw, i) => (
          <div key={i} className="p-4 rounded-xl border" style={{ background: 'white', borderColor: 'var(--glacial-200)' }}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mt-0.5" style={{ background: 'var(--glacial-100)' }}>
                  <span className="text-sm font-bold" style={{ color: 'var(--glacial-600)' }}>{i + 1}</span>
                </div>
                <div>
                  <p className="font-medium" style={{ color: '#111827' }}>{qw.action}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="flex items-center gap-1" style={{ color: 'var(--sage-600)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      {qw.deadline}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs" style={{ background: 'var(--arctic-100)', color: 'var(--arctic-700)' }}>
                      Effort: {qw.effort}
                    </span>
                  </div>
                </div>
              </div>
              <span
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: qw.impact === 'High' ? 'var(--glacial-500)' : 'var(--sage-400)',
                  color: 'white'
                }}
              >
                {qw.impact} Impact
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
