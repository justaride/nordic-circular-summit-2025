import { speakers } from '@/lib/data';
import Header from '@/components/layout/Header';
import SpeakerCard from '@/components/ui/SpeakerCard';

export default function SpeakersPage() {
  const categories = {
    government: { label: 'Government & Policy', icon: '🏛️' },
    municipal: { label: 'Municipal Leaders', icon: '🏙️' },
    corporate: { label: 'Corporate & Industry', icon: '🏢' },
    academic: { label: 'Academic & Research', icon: '🎓' },
    industry: { label: 'Industry Specialists', icon: '⚙️' },
    organization: { label: 'Organizations & Clusters', icon: '🤝' },
    sustainability: { label: 'Sustainability Leaders', icon: '🌱' }
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Speakers"
        subtitle={`${speakers.length} speakers from across the Nordic region and beyond`}
        icon="🎤"
        showBackLink={true}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {Object.entries(categories).map(([key, { label, icon }]) => {
          const categorySpeakers = speakers.filter(s => s.category === key);
          if (categorySpeakers.length === 0) return null;

          return (
            <section key={key} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--glacial-800)' }}>
                <span>{icon}</span> {label}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorySpeakers.map(speaker => (
                  <SpeakerCard key={speaker.id} speaker={speaker} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

