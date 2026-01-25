import { Participant } from '@/lib/types';

interface ParticipantCardProps {
  participant: Participant;
}

export default function ParticipantCard({ participant }: ParticipantCardProps) {
  const years = participant.participationHistory.map((ph) => ph.year).sort();
  const yearRange = years.length > 0
    ? years.length === 1
      ? years[0].toString()
      : `${Math.min(...years)}–${Math.max(...years)}`
    : 'N/A';

  return (
    <div className="frost-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow" style={{ borderLeft: '4px solid var(--glacial-400)' }}>
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--glacial-800)' }}>
          {participant.name}
        </h3>
        {participant.title && (
          <p className="text-sm" style={{ color: 'var(--sage-600)' }}>{participant.title}</p>
        )}
      </div>

      {/* Organization & Country */}
      <div className="mb-4 space-y-1">
        <div className="flex items-start">
          <span className="text-sm font-medium w-24 flex-shrink-0" style={{ color: 'var(--arctic-500)' }}>
            Organization:
          </span>
          <span className="text-sm" style={{ color: 'var(--glacial-800)' }}>{participant.organization}</span>
        </div>
        {participant.country && (
          <div className="flex items-start">
            <span className="text-sm font-medium w-24 flex-shrink-0" style={{ color: 'var(--arctic-500)' }}>
              Country:
            </span>
            <span className="text-sm" style={{ color: 'var(--glacial-800)' }}>{participant.country}</span>
          </div>
        )}
      </div>

      {/* Participation History */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium" style={{ color: 'var(--glacial-700)' }}>
            Participated:
          </span>
          <span className="text-sm font-semibold" style={{ color: 'var(--glacial-600)' }}>
            {yearRange}
          </span>
        </div>
        {participant.participationHistory.length > 1 && (
          <div className="flex flex-wrap gap-1">
            {participant.participationHistory.map((ph, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-1 text-xs font-medium rounded"
                style={{ background: 'var(--glacial-100)', color: 'var(--glacial-800)' }}
              >
                {ph.year}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Contact Info */}
      {(participant.email || participant.linkedin || participant.phone) && (
        <div className="border-t pt-4 space-y-2" style={{ borderColor: 'var(--glacial-200)' }}>
          {participant.email && (
            <a
              href={`mailto:${participant.email}`}
              className="flex items-center text-sm transition-colors hover:text-[var(--glacial-800)]"
              style={{ color: 'var(--sage-600)' }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          )}
          {participant.linkedin && (
            <a
              href={participant.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm transition-colors hover:text-[var(--glacial-800)]"
              style={{ color: 'var(--sage-600)' }}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
          )}
          {participant.phone && (
            <a
              href={`tel:${participant.phone}`}
              className="flex items-center text-sm transition-colors hover:text-[var(--glacial-800)]"
              style={{ color: 'var(--sage-600)' }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Phone
            </a>
          )}
        </div>
      )}

      {/* Session roles */}
      {participant.sessionRoles.length > 0 && (
        <div className="border-t pt-4 mt-4" style={{ borderColor: 'var(--glacial-200)' }}>
          <div className="text-sm font-medium mb-2" style={{ color: 'var(--glacial-700)' }}>
            2025 Sessions:
          </div>
          <div className="flex flex-wrap gap-1">
            {participant.sessionRoles.map((sr, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-1 text-xs font-medium rounded"
                style={{
                  background: sr.role === 'speaker' ? 'var(--glacial-100)' : sr.role === 'moderator' ? 'var(--sage-100)' : 'var(--arctic-100)',
                  color: sr.role === 'speaker' ? 'var(--glacial-800)' : sr.role === 'moderator' ? 'var(--sage-800)' : 'var(--arctic-800)'
                }}
              >
                {sr.role}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
