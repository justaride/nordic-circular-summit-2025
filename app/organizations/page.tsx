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

                      {org.website && (
                        <a
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-cyan-600 hover:text-cyan-700 font-medium inline-flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          Visit Website
                        </a>
                      )}

                      {org.contact && (
                        <div className="mt-4 space-y-2">
                          {org.contact.email && (
                            <div className="text-sm text-gray-600 flex items-center gap-2">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <a href={`mailto:${org.contact.email}`} className="hover:text-cyan-600">{org.contact.email}</a>
                            </div>
                          )}
                          {org.contact.phone && (
                            <div className="text-sm text-gray-600 flex items-center gap-2">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              {org.contact.phone}
                            </div>
                          )}
                          {org.contact.linkedin && (
                            <div className="text-sm">
                              <a
                                href={org.contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                                LinkedIn
                              </a>
                            </div>
                          )}
                          {org.contact.address && (
                            <div className="text-sm text-gray-600 flex items-start gap-2">
                              <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{org.contact.address}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {org.details && org.details.focus && (
                        <div className="mt-4">
                          <p className="text-xs font-semibold text-gray-700 mb-2">Focus Areas</p>
                          <div className="flex flex-wrap gap-2">
                            {org.details.focus.map((area, idx) => (
                              <span key={idx} className="text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded">
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

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
