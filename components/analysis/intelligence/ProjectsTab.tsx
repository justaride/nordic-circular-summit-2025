import { projects } from '@/lib/intelligence-data';
import { RocketIcon } from '@/components/Icons';

export default function ProjectsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
        <RocketIcon size={24} color="var(--glacial-500)" /> Project Pipeline
      </h2>
      <p className="text-sm" style={{ color: 'var(--sage-600)' }}>
        Projects mentioned, launched, or proposed at Nordic Circular Summit 2025
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--glacial-50)' }}>
              <th className="text-left p-3 font-semibold" style={{ color: 'var(--glacial-700)' }}>Project</th>
              <th className="text-left p-3 font-semibold" style={{ color: 'var(--glacial-700)' }}>Status</th>
              <th className="text-left p-3 font-semibold" style={{ color: 'var(--glacial-700)' }}>Sector</th>
              <th className="text-left p-3 font-semibold" style={{ color: 'var(--glacial-700)' }}>Lead</th>
              <th className="text-left p-3 font-semibold" style={{ color: 'var(--glacial-700)' }}>NCH Opportunity</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, i) => (
              <tr key={i} className="border-b" style={{ borderColor: 'var(--glacial-100)' }}>
                <td className="p-3 font-medium" style={{ color: '#111827' }}>{project.name}</td>
                <td className="p-3">
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: project.status === 'launched' ? 'var(--glacial-100)' :
                                 project.status === 'active' ? 'var(--sage-100)' : 'var(--arctic-100)',
                      color: project.status === 'launched' ? 'var(--glacial-700)' :
                             project.status === 'active' ? 'var(--sage-700)' : 'var(--arctic-700)'
                    }}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="p-3" style={{ color: 'var(--sage-600)' }}>{project.sector}</td>
                <td className="p-3" style={{ color: '#111827' }}>{project.lead}</td>
                <td className="p-3 text-sm" style={{ color: 'var(--glacial-600)' }}>{project.nchOpportunity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
