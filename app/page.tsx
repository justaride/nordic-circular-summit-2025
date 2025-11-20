import Link from 'next/link';
import { event, speakers, sessions, organizations, participants } from '@/lib/data';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{event.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{event.theme}</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Event Overview */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Date & Location</h3>
              <p className="text-gray-600">
                {new Date(event.dates.start).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric'
                })} - {new Date(event.dates.end).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <p className="text-gray-600">
                {event.location.venue}, {event.location.city}, {event.location.country}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {event.format.inPerson && event.format.online ? 'Hybrid Event (In-person + Online)' :
                 event.format.inPerson ? 'In-person Event' : 'Online Event'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Tagline</h3>
              <p className="text-gray-600 italic">{event.tagline}</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-700">{event.description}</p>
          </div>
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-cyan-100 rounded-lg p-6">
            <div className="text-3xl font-bold text-cyan-900">{speakers.length}</div>
            <div className="text-cyan-700">Speakers</div>
          </div>
          <div className="bg-blue-100 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-900">{sessions.length}</div>
            <div className="text-blue-700">Sessions</div>
          </div>
          <div className="bg-purple-100 rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-900">{organizations.length}</div>
            <div className="text-purple-700">Organizations</div>
          </div>
          <div className="bg-indigo-100 rounded-lg p-6">
            <div className="text-3xl font-bold text-indigo-900">{participants.length}</div>
            <div className="text-indigo-700">Participants</div>
          </div>
          <div className="bg-green-100 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-900">2</div>
            <div className="text-green-700">Days</div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/speakers" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Speakers</h3>
            <p className="text-gray-600">
              Browse all speakers from government, industry, academia, and civil society
            </p>
          </Link>

          <Link href="/sessions" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sessions</h3>
            <p className="text-gray-600">
              Explore keynotes, panels, and workshops across two days
            </p>
          </Link>

          <Link href="/organizations" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Organizations</h3>
            <p className="text-gray-600">
              View all participating organizations and partners
            </p>
          </Link>

          <Link href="/participants" className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-white">
            <h3 className="text-xl font-bold mb-2">Participant Network</h3>
            <p className="opacity-90">
              Explore the complete summit network with {participants.length}+ participants from 2020-2025
            </p>
          </Link>

          <Link href="/transcripts" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Transcripts</h3>
            <p className="text-gray-600">
              Access session transcripts and recordings
            </p>
          </Link>

          <Link href="/social-media" className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-white">
            <h3 className="text-xl font-bold mb-2">Social Media</h3>
            <p className="opacity-90">
              Historical posts, workflow, and content calendar
            </p>
          </Link>

          <Link href="/content" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Content Outputs</h3>
            <p className="text-gray-600">
              Download transcripts, articles, quotes, and social media content
            </p>
          </Link>

          <Link href="/search" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Search</h3>
            <p className="text-gray-600">
              Search across all summit content and materials
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
