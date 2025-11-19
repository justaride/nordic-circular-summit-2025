import Link from 'next/link';
import { speakers } from '@/lib/data';

export default function SpeakersPage() {
  const categories = {
    government: 'Government & Policy',
    municipal: 'Municipal Leaders',
    corporate: 'Corporate & Industry',
    academic: 'Academic & Research',
    industry: 'Industry Specialists',
    organization: 'Organizations & Clusters',
    sustainability: 'Sustainability Leaders'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-cyan-600 hover:text-cyan-700 mb-2 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Speakers</h1>
          <p className="text-gray-600 mt-2">{speakers.length} speakers from across the Nordic region and beyond</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {Object.entries(categories).map(([key, label]) => {
          const categorySpeakers = speakers.filter(s => s.category === key);
          if (categorySpeakers.length === 0) return null;

          return (
            <section key={key} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{label}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorySpeakers.map(speaker => (
                  <div key={speaker.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900">{speaker.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{speaker.title}</p>
                    <p className="text-sm text-cyan-600 mt-2 font-medium">{speaker.organization}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {speaker.country}
                      </span>
                    </div>

                    {speaker.bio && (
                      <p className="text-sm text-gray-700 mt-4 line-clamp-3">{speaker.bio}</p>
                    )}

                    {speaker.contact && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {speaker.contact.linkedin && (
                          <a
                            href={speaker.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded hover:bg-blue-100 transition-colors inline-flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            LinkedIn
                          </a>
                        )}
                        {speaker.contact.email && (
                          <a
                            href={`mailto:${speaker.contact.email}`}
                            className="text-xs bg-gray-50 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-100 transition-colors inline-flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email
                          </a>
                        )}
                        {speaker.contact.website && (
                          <a
                            href={speaker.contact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-gray-50 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-100 transition-colors inline-flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            Website
                          </a>
                        )}
                      </div>
                    )}

                    {speaker.topics.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {speaker.topics.slice(0, 3).map((topic, idx) => (
                          <span key={idx} className="text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
