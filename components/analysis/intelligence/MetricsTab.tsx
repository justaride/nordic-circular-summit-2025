import { successMetrics } from '@/lib/intelligence-data';
import { MetricsIcon } from '@/components/Icons';

export default function MetricsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
        <MetricsIcon size={24} color="var(--glacial-500)" /> Success Metrics
      </h2>
      <p className="text-sm" style={{ color: 'var(--sage-600)' }}>
        Tracking NCH progress against summit-derived opportunities
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl" style={{ background: 'var(--glacial-50)', border: '1px solid var(--glacial-200)' }}>
          <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--glacial-700)' }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: 'var(--glacial-500)', color: 'white' }}>6</span>
            Short Term (6 months)
          </h3>
          <ul className="space-y-2">
            {successMetrics.shortTerm.map((metric, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#111827' }}>
                <span className="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: 'var(--glacial-300)' }} />
                {metric}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-xl" style={{ background: 'var(--sage-50)', border: '1px solid var(--sage-200)' }}>
          <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--sage-700)' }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: 'var(--sage-500)', color: 'white' }}>12</span>
            Medium Term (1 year)
          </h3>
          <ul className="space-y-2">
            {successMetrics.mediumTerm.map((metric, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#111827' }}>
                <span className="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: 'var(--sage-300)' }} />
                {metric}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-xl" style={{ background: 'var(--arctic-50)', border: '1px solid var(--arctic-200)' }}>
          <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--arctic-700)' }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: 'var(--arctic-500)', color: 'white' }}>36</span>
            Long Term (3 years)
          </h3>
          <ul className="space-y-2">
            {successMetrics.longTerm.map((metric, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#111827' }}>
                <span className="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: 'var(--arctic-300)' }} />
                {metric}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
