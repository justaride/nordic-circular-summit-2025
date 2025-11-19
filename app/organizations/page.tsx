import Link from 'next/link';
import { organizations, getSpeakersByOrganization } from '@/lib/data';

export default function OrganizationsPage() {
  const typeLabels = {
    host: 'Host Organizations',
    partner: 'Regional Partners',
    corporate: 'Corporate Partners',
    financial: 'Financial Institutions',
    innovation: 'Innovation Organizations',
    research: 'Research Institutions',
    academic: 'Academic Institutions'
  };

  const typeColors = {
    host: 'bg-purple-100 text-purple-800 border-purple-200',
    partner: 'bg-blue-100 text-blue-800 border-blue-200',
    corporate: 'bg-green-100 text-green-800 border-green-200',
    financial: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    innovation: 'bg-orange-100 text-orange-800 border-orange-200',
    research: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    academic: 'bg-pink-100 text-pink-800 border-pink-200'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-cyan-600 hover:text-cyan-700 mb-2 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
          <p className="text-gray-600 mt-2">{organizations.length} participating organizations</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {Object.entries(typeLabels).map(([key, label]) => {
          const typeOrgs = organizations.filter(o => o.type === key);
          if (typeOrgs.length === 0) return null;

          return (
            <section key={key} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{label}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {typeOrgs.map(org => {
                  const representatives = getSpeakersByOrganization(org.id);
                  return (
                    <div
                      key={org.id}
                      className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${typeColors[org.type as keyof typeof typeColors]}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{org.name}</h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {org.country}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{org.description}</p>

                      {representatives.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm font-semibold text-gray-700 mb-2">
                            Representatives ({representatives.length})
                          </p>
                          <div className="space-y-1">
                            {representatives.map(rep => (
                              <div key={rep.id} className="text-sm text-gray-600">
                                {rep.name} - <span className="text-gray-500">{rep.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
