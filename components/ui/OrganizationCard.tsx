import { Speaker } from '@/lib/types';

interface Organization {
  id: string;
  name: string;
  country: string;
  type: string;
  description: string;
  website?: string;
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
    linkedin?: string;
  };
  details?: {
    focus?: string[];
  };
}

interface OrganizationCardProps {
  organization: Organization;
  representatives: Speaker[];
  borderColor: string;
}

export default function OrganizationCard({ organization, representatives, borderColor }: OrganizationCardProps) {
  return (
    <div
      className="frost-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
      style={{ borderLeft: `4px solid ${borderColor}` }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold" style={{ color: 'var(--glacial-800)' }}>{organization.name}</h3>
        <span
          className="text-xs px-2 py-1 rounded"
          style={{ background: 'var(--sage-100)', color: 'var(--sage-700)' }}
        >
          {organization.country}
        </span>
      </div>
      <p className="mb-4" style={{ color: 'var(--foreground)' }}>{organization.description}</p>

      {organization.website && (
        <a
          href={organization.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium inline-flex items-center gap-1 transition-colors hover:text-[var(--glacial-800)]"
          style={{ color: 'var(--glacial-600)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          Visit Website
        </a>
      )}

      {organization.contact && (
        <div className="mt-4 space-y-2">
          {organization.contact.email && (
            <div className="text-sm flex items-center gap-2" style={{ color: 'var(--sage-600)' }}>
              <svg className="w-4 h-4" style={{ color: 'var(--arctic-400)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href={`mailto:${organization.contact.email}`} className="transition-colors hover:text-[var(--glacial-800)]" style={{ color: 'var(--glacial-600)' }}>{organization.contact.email}</a>
            </div>
          )}
          {organization.contact.phone && (
            <div className="text-sm flex items-center gap-2" style={{ color: 'var(--sage-600)' }}>
              <svg className="w-4 h-4" style={{ color: 'var(--arctic-400)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {organization.contact.phone}
            </div>
          )}
          {organization.contact.linkedin && (
            <div className="text-sm">
              <a
                href={organization.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-[var(--glacial-800)]"
                style={{ color: 'var(--glacial-600)' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          )}
          {organization.contact.address && (
            <div className="text-sm flex items-start gap-2" style={{ color: 'var(--sage-600)' }}>
              <svg className="w-4 h-4 mt-0.5" style={{ color: 'var(--arctic-400)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{organization.contact.address}</span>
            </div>
          )}
        </div>
      )}

      {organization.details && organization.details.focus && (
        <div className="mt-4">
          <p className="text-xs font-semibold mb-2" style={{ color: 'var(--glacial-700)' }}>Focus Areas</p>
          <div className="flex flex-wrap gap-2">
            {organization.details.focus.map((area, idx) => (
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
}
