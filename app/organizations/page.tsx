import { organizations, getSpeakersByOrganization } from '@/lib/data';
import Header from '@/components/layout/Header';
import OrganizationCard from '@/components/ui/OrganizationCard';

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
      <Header
        title="Organizations"
        subtitle={`${organizations.length} participating organizations`}
        icon="🏢"
        showBackLink={true}
      />

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
                    <OrganizationCard
                      key={org.id}
                      organization={org}
                      representatives={representatives}
                      borderColor={colors.border}
                    />
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
