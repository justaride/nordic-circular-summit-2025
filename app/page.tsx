import Link from 'next/link';
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
  UsersIcon,
  NotebookIcon,
  SparklesIcon
} from '@/components/Icons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NavigationCard from '@/components/ui/NavigationCard';
import StatCard from '@/components/ui/StatCard';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header 
        title={event.name} 
        subtitle={event.theme} 
        showLogo={true} 
      />

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
                <p style={{ color: '#111827' }}>
                  {new Date(event.dates.start).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric'
                  })} - {new Date(event.dates.end).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                <p style={{ color: '#111827' }}>
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
              <p style={{ color: '#111827' }}>{event.description}</p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <StatCard 
            value={speakers.length} 
            label="Speakers" 
            icon={<MicrophoneIcon size={36} color="var(--glacial-500)" />} 
            accentColor="glacial" 
          />
          <StatCard 
            value={sessions.length} 
            label="Sessions" 
            icon={<SessionIcon size={36} color="var(--sage-500)" />} 
            accentColor="sage" 
          />
          <StatCard 
            value={organizations.length} 
            label="Organizations" 
            icon={<BuildingIcon size={36} color="var(--glacial-500)" />} 
            accentColor="glacial" 
          />
          <StatCard 
            value="2" 
            label="Days" 
            icon={<SessionIcon size={36} color="var(--sage-500)" />} 
            accentColor="sage" 
          />
        </div>

        {/* Navigation Cards */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--glacial-800)' }}>
          <SearchIcon size={24} color="var(--glacial-500)" /> Explore the Summit
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Core Content Cards */}
          <NavigationCard 
            href="/speakers"
            title="Speakers"
            description="Browse all speakers from government, industry, academia, and civil society"
            icon={<MicrophoneIcon size={36} color="var(--glacial-500)" />}
            variant="standard"
            borderColor="var(--glacial-400)"
          />
          
          <NavigationCard 
            href="/sessions"
            title="Sessions"
            description="Explore keynotes, panels, and workshops across two days"
            icon={<SessionIcon size={36} color="var(--sage-500)" />}
            variant="standard"
            borderColor="var(--sage-400)"
          />
          
          <NavigationCard 
            href="/organizations"
            title="Organizations"
            description="View all participating organizations and partners"
            icon={<BuildingIcon size={36} color="var(--glacial-500)" />}
            variant="standard"
            borderColor="var(--glacial-500)"
          />

          {/* Featured Cards with Gradients */}
          <NavigationCard 
            href="/participants"
            title="Participant Network"
            description={`Explore the complete summit network with ${participants.length}+ participants from 2020-2025`}
            icon={<UsersIcon size={36} color="white" />}
            variant="featured"
            gradient="linear-gradient(135deg, var(--glacial-600) 0%, var(--glacial-700) 100%)"
          />
          
          <NavigationCard 
            href="/network"
            title="Interactive Network Map"
            description="Visualize connections between speakers and participants"
            icon={<NetworkIcon size={36} color="white" />}
            variant="featured"
            gradient="linear-gradient(135deg, var(--sage-500) 0%, var(--sage-700) 100%)"
          />
          
          <NavigationCard 
            href="/kumu-map"
            title="Kumu Network Map"
            description="Explore the ecosystem map powered by Kumu"
            icon={<GlobeIcon size={36} color="white" />}
            variant="featured"
            gradient="linear-gradient(135deg, #4ECDC4 0%, #2c3e50 100%)"
          />

          <NavigationCard 
            href="/transcripts"
            title="Transcripts"
            description="Access session transcripts with quotes and themes"
            icon={<TranscriptIcon size={36} color="var(--glacial-500)" />}
            variant="standard"
            borderColor="var(--glacial-400)"
          />

          <NavigationCard 
            href="/social-media"
            title="Social Media"
            description="Ready-to-use posts and content calendar"
            icon={<ShareIcon size={36} color="white" />}
            variant="featured"
            gradient="linear-gradient(135deg, var(--glacial-500) 0%, var(--sage-600) 100%)"
          />
          
          <NavigationCard 
            href="/content"
            title="Content Outputs"
            description="Download articles, quotes, and media content"
            icon={<DocumentIcon size={36} color="var(--sage-500)" />}
            variant="standard"
            borderColor="var(--sage-400)"
          />

          <NavigationCard 
            href="/day1-analysis"
            title="Day 1 Analysis"
            description="Comprehensive synthesis of plenary sessions with strategic insights"
            icon={<ChartIcon size={36} color="white" />}
            variant="featured"
            gradient="linear-gradient(135deg, var(--glacial-600) 0%, var(--sage-600) 100%)"
          />
          
          <NavigationCard 
            href="/day2-analysis"
            title="Day 2 Analysis"
            description="Digital partner sessions: Construction, Textiles, Design Toolbox"
            icon={<ChartIcon size={36} color="white" />}
            variant="featured"
            gradient="linear-gradient(135deg, var(--sage-600) 0%, var(--glacial-600) 100%)"
          />
          
          <NavigationCard 
            href="/search"
            title="Search"
            description="Search across all summit content and materials"
            icon={<SearchIcon size={36} color="var(--glacial-500)" />}
            variant="standard"
            borderColor="var(--glacial-500)"
          />
          
          <NavigationCard 
            href="/summit-intelligence"
            title="Summit Intelligence"
            description="Strategic opportunities, project pipeline & actionable insights for NCH"
            icon={<ChartIcon size={36} color="white" />}
            variant="featured"
            gradient="linear-gradient(135deg, var(--glacial-500) 0%, var(--sage-600) 100%)"
          />

          <div className="relative">
             <div className="absolute top-2 right-2 z-10 pointer-events-none">
              <SparklesIcon size={20} color="rgba(255,255,255,0.5)" />
            </div>
            <NavigationCard 
              href="/notebook"
              title="The Notebook"
              description="AI-generated insights, audio overviews & deep dives powered by NotebookLM"
              icon={<NotebookIcon size={36} color="white" />}
              variant="notebook"
            />
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
