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
