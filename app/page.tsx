import Link from 'next/link';
import Image from 'next/image';
import { event, speakers, sessions, organizations, participants } from '@/lib/data';
import {
  SnowflakeIcon,
  LocationIcon,
  GlobeIcon,
  LaptopIcon,
  QuoteIcon,
  MicrophoneIcon,
  SessionIcon,
  BuildingIcon,
  NetworkIcon,
  DocumentIcon,
  TranscriptIcon,
  ShareIcon,
  ChartIcon,
  SearchIcon,
  HybridIcon,
  UsersIcon
} from '@/components/Icons';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="frost-card-strong border-b" style={{ borderColor: 'var(--glacial-200)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-2">
            <Image
              src="/media/nch-logo.svg"
              alt="Nordic Circular Hotspot"
              width={56}
              height={56}
              className="h-14 w-auto"
            />
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--glacial-800)' }}>{event.name}</h1>
              <p className="text-lg mt-1" style={{ color: 'var(--sage-600)' }}>{event.theme}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="frost-card-strong rounded-2xl shadow-xl p-8 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10" style={{
            background: 'radial-gradient(circle, var(--glacial-300) 0%, transparent 70%)',
            transform: 'translate(30%, -30%)'
          }} />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <SnowflakeIcon size={28} color="var(--glacial-500)" />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--glacial-800)' }}>Event Overview</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--glacial-700)' }}>
                  <LocationIcon size={18} color="var(--glacial-600)" /> Date & Location
                </h3>
                <p style={{ color: 'var(--foreground)' }}>
                  {new Date(event.dates.start).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric'
                  })} - {new Date(event.dates.end).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                <p style={{ color: 'var(--foreground)' }}>
                  {event.location.venue}, {event.location.city}, {event.location.country}
                </p>
                <p className="text-sm mt-2 px-3 py-1 rounded-full inline-flex items-center gap-1.5" style={{
                  background: 'var(--glacial-100)',
                  color: 'var(--glacial-700)'
                }}>
                  {event.format.inPerson && event.format.online ? <><HybridIcon size={14} /> Hybrid Event</> :
                   event.format.inPerson ? <><LocationIcon size={14} /> In-person</> : <><LaptopIcon size={14} /> Online</>}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--glacial-700)' }}>
                  <QuoteIcon size={18} color="var(--glacial-600)" /> Tagline
                </h3>
                <p className="italic text-lg" style={{ color: 'var(--sage-700)' }}>"{event.tagline}"</p>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl" style={{ background: 'var(--sage-50)', border: '1px solid var(--sage-200)' }}>
              <p style={{ color: 'var(--foreground)' }}>{event.description}</p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="frost-card rounded-xl p-6 text-center shadow-lg transition-transform hover:scale-105" style={{ borderLeft: '4px solid var(--glacial-400)' }}>
            <div className="flex justify-center mb-2"><MicrophoneIcon size={36} color="var(--glacial-500)" /></div>
            <div className="text-3xl font-bold" style={{ color: 'var(--glacial-700)' }}>{speakers.length}</div>
            <div style={{ color: 'var(--sage-600)' }}>Speakers</div>
          </div>
          <div className="frost-card rounded-xl p-6 text-center shadow-lg transition-transform hover:scale-105" style={{ borderLeft: '4px solid var(--sage-400)' }}>
            <div className="flex justify-center mb-2"><SessionIcon size={36} color="var(--sage-500)" /></div>
            <div className="text-3xl font-bold" style={{ color: 'var(--sage-700)' }}>{sessions.length}</div>
            <div style={{ color: 'var(--glacial-600)' }}>Sessions</div>
          </div>
          <div className="frost-card rounded-xl p-6 text-center shadow-lg transition-transform hover:scale-105" style={{ borderLeft: '4px solid var(--glacial-500)' }}>
            <div className="flex justify-center mb-2"><BuildingIcon size={36} color="var(--glacial-500)" /></div>
            <div className="text-3xl font-bold" style={{ color: 'var(--glacial-700)' }}>{organizations.length}</div>
            <div style={{ color: 'var(--sage-600)' }}>Organizations</div>
          </div>
          <div className="frost-card rounded-xl p-6 text-center shadow-lg transition-transform hover:scale-105" style={{ borderLeft: '4px solid var(--sage-500)' }}>
            <div className="flex justify-center mb-2"><SessionIcon size={36} color="var(--sage-500)" /></div>
            <div className="text-3xl font-bold" style={{ color: 'var(--sage-700)' }}>2</div>
            <div style={{ color: 'var(--glacial-600)' }}>Days</div>
          </div>
        </div>

        {/* Navigation Cards */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--glacial-800)' }}>
          <SearchIcon size={24} color="var(--glacial-500)" /> Explore the Summit
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Core Content Cards */}
          <Link href="/speakers" className="frost-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02] group" style={{ borderTop: '4px solid var(--glacial-400)' }}>
            <div className="mb-3 group-hover:scale-110 transition-transform"><MicrophoneIcon size={36} color="var(--glacial-500)" /></div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--glacial-800)' }}>Speakers</h3>
            <p style={{ color: 'var(--sage-600)' }}>
              Browse all speakers from government, industry, academia, and civil society
            </p>
          </Link>

          <Link href="/sessions" className="frost-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02] group" style={{ borderTop: '4px solid var(--sage-400)' }}>
            <div className="mb-3 group-hover:scale-110 transition-transform"><SessionIcon size={36} color="var(--sage-500)" /></div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--glacial-800)' }}>Sessions</h3>
            <p style={{ color: 'var(--sage-600)' }}>
              Explore keynotes, panels, and workshops across two days
            </p>
          </Link>

          <Link href="/organizations" className="frost-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02] group" style={{ borderTop: '4px solid var(--glacial-500)' }}>
            <div className="mb-3 group-hover:scale-110 transition-transform"><BuildingIcon size={36} color="var(--glacial-500)" /></div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--glacial-800)' }}>Organizations</h3>
            <p style={{ color: 'var(--sage-600)' }}>
              View all participating organizations and partners
            </p>
          </Link>

          {/* Featured Cards with Gradients */}
          <Link href="/participants" className="rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02] group text-white" style={{ background: 'linear-gradient(135deg, var(--glacial-600) 0%, var(--glacial-700) 100%)' }}>
            <div className="mb-3 group-hover:scale-110 transition-transform"><UsersIcon size={36} color="white" /></div>
            <h3 className="text-xl font-bold mb-2">Participant Network</h3>
            <p className="opacity-90">
              Explore the complete summit network with {participants.length}+ participants from 2020-2025
            </p>
          </Link>

          <Link href="/network" className="rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02] group text-white" style={{ background: 'linear-gradient(135deg, var(--sage-500) 0%, var(--sage-700) 100%)' }}>
            <div className="mb-3 group-hover:scale-110 transition-transform"><NetworkIcon size={36} color="white" /></div>
            <h3 className="text-xl font-bold mb-2">Interactive Network Map</h3>
            <p className="opacity-90">
              Visualize connections between speakers and participants
            </p>
          </Link>

          <Link href="/transcripts" className="frost-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02] group" style={{ borderTop: '4px solid var(--glacial-400)' }}>
            <div className="mb-3 group-hover:scale-110 transition-transform"><TranscriptIcon size={36} color="var(--glacial-500)" /></div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--glacial-800)' }}>Transcripts</h3>
            <p style={{ color: 'var(--sage-600)' }}>
              Access session transcripts with quotes and themes
            </p>
          </Link>

          <Link href="/social-media" className="rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02] group text-white" style={{ background: 'linear-gradient(135deg, var(--glacial-500) 0%, var(--sage-600) 100%)' }}>
            <div className="mb-3 group-hover:scale-110 transition-transform"><ShareIcon size={36} color="white" /></div>
            <h3 className="text-xl font-bold mb-2">Social Media</h3>
            <p className="opacity-90">
              Ready-to-use posts and content calendar
            </p>
          </Link>

          <Link href="/content" className="frost-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02] group" style={{ borderTop: '4px solid var(--sage-400)' }}>
            <div className="mb-3 group-hover:scale-110 transition-transform"><DocumentIcon size={36} color="var(--sage-500)" /></div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--glacial-800)' }}>Content Outputs</h3>
            <p style={{ color: 'var(--sage-600)' }}>
              Download articles, quotes, and media content
            </p>
          </Link>

          <Link href="/day1-analysis" className="rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02] group text-white" style={{ background: 'linear-gradient(135deg, var(--glacial-600) 0%, var(--sage-600) 100%)' }}>
            <div className="mb-3 group-hover:scale-110 transition-transform"><ChartIcon size={36} color="white" /></div>
            <h3 className="text-xl font-bold mb-2">Day 1 Analysis</h3>
            <p className="opacity-90">
              Comprehensive synthesis of all sessions with strategic insights
            </p>
          </Link>

          <Link href="/search" className="frost-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02] group" style={{ borderTop: '4px solid var(--glacial-500)' }}>
            <div className="mb-3 group-hover:scale-110 transition-transform"><SearchIcon size={36} color="var(--glacial-500)" /></div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--glacial-800)' }}>Search</h3>
            <p style={{ color: 'var(--sage-600)' }}>
              Search across all summit content and materials
            </p>
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center" style={{ borderColor: 'var(--glacial-200)' }}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Image
              src="/media/nch-logo.svg"
              alt="Nordic Circular Hotspot"
              width={32}
              height={32}
              className="h-8 w-auto opacity-70"
            />
            <span className="text-lg font-semibold" style={{ color: 'var(--glacial-700)' }}>Nordic Circular Summit 2025</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--sage-500)' }}>
            Circular Frontiers: Shaping Our Future • Nuuk, Greenland
          </p>
        </footer>
      </main>
    </div>
  );
}
