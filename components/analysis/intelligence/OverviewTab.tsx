import { strategicRoles, quickWins, priorityOpportunities } from '@/lib/intelligence-data';
import { TargetIcon, ChecklistIcon, RocketIcon, ArrowRightIcon } from '@/components/Icons';

interface OverviewTabProps {
  setActiveTab: (tab: any) => void;
}

export default function OverviewTab({ setActiveTab }: OverviewTabProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
          <TargetIcon size={24} color="var(--glacial-500)" /> NCH Strategic Roles
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {strategicRoles.map((role) => (
            <div key={role.id} className="p-4 rounded-xl border" style={{ background: 'var(--sage-50)', borderColor: 'var(--sage-200)' }}>
              <h3 className="font-bold mb-2" style={{ color: 'var(--glacial-700)' }}>{role.title}</h3>
              <p className="text-sm mb-3" style={{ color: '#111827' }}>{role.description}</p>
              <div className="text-xs mb-2" style={{ color: 'var(--sage-600)' }}>Key Activities:</div>
              <ul className="text-sm space-y-1 mb-3">
                {role.activities.slice(0, 2).map((activity, i) => (
                  <li key={i} className="flex items-start gap-2" style={{ color: '#111827' }}>
                    <span style={{ color: 'var(--glacial-500)' }}>•</span>
                    {activity}
                  </li>
                ))}
              </ul>
              <div className="text-xs px-2 py-1 rounded-full inline-block" style={{ background: 'var(--glacial-100)', color: 'var(--glacial-700)' }}>
                Revenue: {role.revenue.split(',')[0]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
          <ChecklistIcon size={24} color="var(--sage-500)" /> Immediate Actions Required
        </h2>
        <div className="space-y-3">
          {quickWins.filter(qw => qw.impact === 'High').map((qw, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border" style={{ background: 'white', borderColor: 'var(--glacial-200)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--glacial-100)' }}>
                  <ArrowRightIcon size={16} color="var(--glacial-600)" />
                </div>
                <span style={{ color: '#111827' }}>{qw.action}</span>
              </div>
              <span className="text-sm px-3 py-1 rounded-full" style={{ background: 'var(--sage-100)', color: 'var(--sage-700)' }}>
                {qw.deadline}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
          <RocketIcon size={24} color="var(--glacial-500)" /> Top Priority Opportunities
        </h2>
        <div className="space-y-3">
          {priorityOpportunities.filter(o => o.priority === 'high').slice(0, 3).map((opp) => (
            <div key={opp.id} className="p-4 rounded-xl border" style={{ background: 'var(--glacial-50)', borderColor: 'var(--glacial-200)' }}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold" style={{ color: 'var(--glacial-700)' }}>{opp.title}</h3>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: 'var(--glacial-500)', color: 'white' }}>
                  High Priority
                </span>
              </div>
              <p className="text-sm mb-2" style={{ color: '#111827' }}>{opp.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span style={{ color: 'var(--sage-600)' }}>NCH Role: <strong style={{ color: 'var(--glacial-700)' }}>{opp.role}</strong></span>
                <span style={{ color: 'var(--sage-600)' }}>Timeline: <strong style={{ color: 'var(--glacial-700)' }}>{opp.timeline}</strong></span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setActiveTab('opportunities')}
          className="mt-4 text-sm font-medium flex items-center gap-1 hover:underline"
          style={{ color: 'var(--glacial-600)' }}
        >
          View all opportunities <ArrowRightIcon size={14} />
        </button>
      </div>
    </div>
  );
}
