import Link from 'next/link';
import { sessions } from '@/lib/data';

export default function SessionsPage() {
  const day1Sessions = sessions.filter(s => s.day === 1);
  const day2Sessions = sessions.filter(s => s.day === 2);

  const typeColors = {
    keynote: 'bg-purple-100 text-purple-800',
    panel: 'bg-blue-100 text-blue-800',
    workshop: 'bg-green-100 text-green-800',
    digital: 'bg-orange-100 text-orange-800'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-cyan-600 hover:text-cyan-700 mb-2 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Sessions</h1>
          <p className="text-gray-600 mt-2">Full program across two days</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Day 1 */}
        <section className="mb-12">
          <div className="bg-cyan-100 rounded-lg p-4 mb-6">
            <h2 className="text-2xl font-bold text-cyan-900">Day 1 - November 19, 2025</h2>
            <p className="text-cyan-700">In-person sessions at Hans Egede Hotel, Nuuk</p>
          </div>
          <div className="space-y-6">
            {day1Sessions.map(session => (
              <div key={session.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-gray-500">
                        {session.startTime} - {session.endTime} {session.timezone}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full ${typeColors[session.type as keyof typeof typeColors]}`}>
                        {session.type.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{session.title}</h3>
                    <p className="text-gray-600">{session.description}</p>

                    {session.topics.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {session.topics.map((topic, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                      <span>📍 {session.location}</span>
                      {session.onlineAvailable && <span>🌐 Online Available</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Day 2 */}
        <section>
          <div className="bg-blue-100 rounded-lg p-4 mb-6">
            <h2 className="text-2xl font-bold text-blue-900">Day 2 - November 20, 2025</h2>
            <p className="text-blue-700">Digital partner-hosted sessions</p>
          </div>
          <div className="space-y-6">
            {day2Sessions.map(session => (
              <div key={session.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-gray-500">
                        {session.startTime} - {session.endTime} {session.timezone}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full ${typeColors[session.type as keyof typeof typeColors]}`}>
                        {session.type.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{session.title}</h3>
                    <p className="text-gray-600">{session.description}</p>

                    {session.topics.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {session.topics.map((topic, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                      <span>📍 {session.location}</span>
                      {session.onlineAvailable && <span>🌐 Online Available</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
