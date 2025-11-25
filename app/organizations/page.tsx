import Link from 'next/link';
import { organizations, getSpeakersByOrganization } from '@/lib/data';

export default function OrganizationsPage() {
  const typeLabels: Record<string, { label: string; icon: string }> = {
    host: { label: 'Host Organizations', icon: '🏠' },
    partner: { label: 'Regional Partners', icon: '🌍' },
    corporate: { label: 'Corporate Partners', icon: '🏢' },
    financial: { label: 'Financial Institutions', icon: '💰' },
    innovation: { label: 'Innovation Organizations', icon: '💡' },
    research: { label: 'Research Institutions', icon: '🔬' },
    academic: { label: 'Academic Institutions', icon: '🎓' }
  };

  const typeColors: Record<string, { bg: string; text: string; border: string }> = {
    host: { bg: 'var(--glacial-100)', text: 'var(--glacial-700)', border: 'var(--glacial-400)' },
    partner: { bg: 'var(--sage-100)', text: 'var(--sage-700)', border: 'var(--sage-400)' },
    corporate: { bg: 'var(--glacial-50)', text: 'var(--glacial-600)', border: 'var(--glacial-300)' },
    financial: { bg: 'var(--arctic-100)', text: 'var(--arctic-700)', border: 'var(--arctic-400)' },
    innovation: { bg: 'var(--sage-50)', text: 'var(--sage-600)', border: 'var(--sage-300)' },
    research: { bg: 'var(--glacial-100)', text: 'var(--glacial-700)', border: 'var(--glacial-500)' },
    academic: { bg: 'var(--sage-100)', text: 'var(--sage-700)', border: 'var(--sage-500)' }
  };

  return (
    <div className="min-h-screen">
      <header className="frost-card-strong border-b" style={{ borderColor: 'var(--glacial-200)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="mb-2 inline-block transition-colors" style={{ color: 'var(--glacial-600)' }}>
            ← Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏢</span>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--glacial-800)' }}>Organizations</h1>
              <p className="mt-1" style={{ color: 'var(--sage-600)' }}>{organizations.length} participating organizations</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {Object.entries(typeLabels).map(([key, { label, icon }]) => {
          const typeOrgs = organizations.filter(o => o.type === key);
          if (typeOrgs.length === 0) return null;
          const colors = typeColors[key] || typeColors.partner;

          return (
            <section key={key} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--glacial-800)' }}>
                <span>{icon}</span> {label}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {typeOrgs.map(org => {
                  const representatives = getSpeakersByOrganization(org.id);
                  return (
                    <div
                      key={org.id}
                      className="frost-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
                      style={{ borderLeft: `4px solid ${colors.border}` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold" style={{ color: 'var(--glacial-800)' }}>{org.name}</h3>
                        <span
                          className="text-xs px-2 py-1 rounded"
                          style={{ background: 'var(--sage-100)', color: 'var(--sage-700)' }}
                        >
                          {org.country}
                        </span>
                      </div>
                      <p className="mb-4" style={{ color: 'var(--foreground)' }}>{org.description}</p>

                      {org.website && (
                        <a
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium inline-flex items-center gap-1 transition-colors"
                          style={{ color: 'var(--glacial-600)' }}
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
                            <div className="text-sm flex items-center gap-2" style={{ color: 'var(--sage-600)' }}>
                              <svg className="w-4 h-4" style={{ color: 'var(--arctic-400)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <a href={`mailto:${org.contact.email}`} className="transition-colors" style={{ color: 'var(--glacial-600)' }}>{org.contact.email}</a>
                            </div>
                          )}
                          {org.contact.phone && (
                            <div className="text-sm flex items-center gap-2" style={{ color: 'var(--sage-600)' }}>
                              <svg className="w-4 h-4" style={{ color: 'var(--arctic-400)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                className="inline-flex items-center gap-1 transition-colors"
                                style={{ color: 'var(--glacial-600)' }}
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                                LinkedIn
                              </a>
                            </div>
                          )}
                          {org.contact.address && (
                            <div className="text-sm flex items-start gap-2" style={{ color: 'var(--sage-600)' }}>
                              <svg className="w-4 h-4 mt-0.5" style={{ color: 'var(--arctic-400)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          <p className="text-xs font-semibold mb-2" style={{ color: 'var(--glacial-700)' }}>Focus Areas</p>
                          <div className="flex flex-wrap gap-2">
                            {org.details.focus.map((area, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 rounded"
                                style={{ background: 'var(--glacial-50)', color: 'var(--glacial-700)' }}
                              >
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {representatives.length > 0 && (
                        <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--glacial-200)' }}>
                          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--glacial-700)' }}>
                            Representatives ({representatives.length})
                          </p>
                          <div className="space-y-1">
                            {representatives.map(rep => (
                              <div key={rep.id} className="text-sm" style={{ color: 'var(--sage-600)' }}>
                                {rep.name} - <span style={{ color: 'var(--arctic-500)' }}>{rep.title}</span>
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
