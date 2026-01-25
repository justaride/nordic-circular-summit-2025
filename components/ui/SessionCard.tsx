'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getParticipantsBySession, getSessionParticipantsBySession } from '@/lib/data';
import { SessionParticipant } from '@/lib/types';
import {
  LocationIcon,
  GlobeIcon,
  LaptopIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@/components/Icons';

const typeColors = {
  keynote: { bg: 'var(--glacial-100)', text: 'var(--glacial-700)' },
  panel: { bg: 'var(--sage-100)', text: 'var(--sage-700)' },
  workshop: { bg: 'var(--glacial-50)', text: 'var(--glacial-600)' },
  digital: { bg: 'var(--sage-50)', text: 'var(--sage-600)' }
};

function SessionParticipants({ sessionId }: { sessionId: string }) {
  const participants = getParticipantsBySession(sessionId);
  const sessionParticipants = getSessionParticipantsBySession(sessionId);

  if (participants.length === 0) {
    return null;
  }

  // Group participants by role
  const byRole = sessionParticipants.reduce((acc, sp) => {
    if (!acc[sp.role]) {
      acc[sp.role] = [];
    }
    acc[sp.role].push(sp);
    return acc;
  }, {} as Record<string, SessionParticipant[]>);

  const roleOrder: Array<'speaker' | 'moderator' | 'panelist' | 'attendee'> = ['speaker', 'moderator', 'panelist', 'attendee'];
  const roleLabels = {
    speaker: 'Speakers',
    moderator: 'Moderators',
    panelist: 'Panelists',
    attendee: 'Attendees'
  };

  const roleColors = {
    speaker: { bg: 'var(--glacial-100)', text: 'var(--glacial-700)' },
    moderator: { bg: 'var(--sage-100)', text: 'var(--sage-700)' },
    panelist: { bg: 'var(--glacial-50)', text: 'var(--glacial-600)' },
    attendee: { bg: 'var(--arctic-100)', text: 'var(--arctic-700)' }
  };

  return (
    <div className="mt-6 border-t pt-6" style={{ borderColor: 'var(--glacial-200)' }}>
      <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--glacial-700)' }}>Participants ({participants.length})</h4>

      <div className="space-y-4">
        {roleOrder.map(role => {
          const roleParticipants = byRole[role] || [];
          if (roleParticipants.length === 0) return null;
          const colors = roleColors[role];

          return (
            <div key={role}>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs px-2 py-1 rounded font-medium"
                  style={{ background: colors.bg, color: colors.text }}
                >
                  {roleLabels[role]}
                </span>
                <span className="text-xs" style={{ color: 'var(--arctic-500)' }}>({roleParticipants.length})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roleParticipants.map(sp => {
                  const participant = participants.find(p => p.id === sp.participantId);
                  if (!participant) return null;

                  return (
                    <div
                      key={sp.participantId}
                      className="flex items-start justify-between p-3 rounded border transition-colors"
                      style={{ background: 'var(--arctic-50)', borderColor: 'var(--glacial-200)' }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate" style={{ color: 'var(--glacial-800)' }}>
                          {participant.name}
                        </div>
                        <div className="text-xs truncate" style={{ color: 'var(--sage-600)' }}>
                          {participant.organization}
                        </div>
                        {participant.email && (
                          <a
                            href={`mailto:${participant.email}`}
                            className="text-xs truncate block transition-colors hover:text-[var(--glacial-800)]"
                            style={{ color: 'var(--glacial-600)' }}
                          >
                            {participant.email}
                          </a>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-1 ml-2">
                        <span
                          className="text-xs px-2 py-0.5 rounded border flex items-center gap-1"
                          style={{ background: 'white', borderColor: 'var(--glacial-200)', color: 'var(--glacial-700)' }}
                        >
                          {sp.presence === 'nuuk' ? <LocationIcon size={12} /> : sp.presence === 'digital' ? <LaptopIcon size={12} /> : <GlobeIcon size={12} />} {sp.presence}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SessionCard({ session }: { session: any }) {
  const [showDetailed, setShowDetailed] = useState(false);
  const colors = typeColors[session.type as keyof typeof typeColors] || typeColors.panel;

  return (
    <div className="frost-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-all" style={{ borderLeft: '4px solid var(--glacial-400)' }}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="text-sm font-semibold" style={{ color: 'var(--arctic-600)' }}>
              {session.startTime} - {session.endTime} {session.timezone}
            </span>
            <span
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ background: colors.bg, color: colors.text }}
            >
              {session.type.toUpperCase()}
            </span>
            {session.id === 'circular-frontiers-opening' && (
              <Link
                href="/transcripts"
                className="text-xs px-3 py-1 rounded-full transition-colors flex items-center gap-1 hover:bg-[var(--sage-200)]"
                style={{ background: 'var(--sage-100)', color: 'var(--sage-700)' }}
              >
                <CheckIcon size={12} /> TRANSCRIPT AVAILABLE
              </Link>
            )}
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--glacial-800)' }}>{session.title}</h3>

          {/* Description with toggle */}
          <div style={{ color: 'var(--foreground)' }}>
            <p className={showDetailed ? '' : 'line-clamp-3'}>
              {showDetailed ? session.description : (session.shortDescription || session.description)}
            </p>
            {session.shortDescription && (
              <button
                onClick={() => setShowDetailed(!showDetailed)}
                className="text-sm font-medium mt-2 transition-colors flex items-center gap-1 hover:text-[var(--glacial-800)]"
                style={{ color: 'var(--glacial-600)' }}
              >
                {showDetailed ? <><ChevronDownIcon size={14} /> Show less</> : <><ChevronRightIcon size={14} /> Show detailed description</>}
              </button>
            )}
          </div>

          {/* Themes */}
          {session.themes && session.themes.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--glacial-700)' }}>Key Themes</h4>
              <ul className="space-y-1">
                {session.themes.map((theme: string, idx: number) => (
                  <li key={idx} className="text-sm flex items-start" style={{ color: 'var(--sage-700)' }}>
                    <span className="mr-2" style={{ color: 'var(--glacial-400)' }}>•</span>
                    <span>{theme}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Topics/Keywords */}
          {session.topics.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--glacial-700)' }}>Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {session.topics.slice(0, showDetailed ? session.topics.length : 8).map((topic: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded"
                    style={{ background: 'var(--arctic-100)', color: 'var(--arctic-700)' }}
                  >
                    {topic}
                  </span>
                ))}
                {!showDetailed && session.topics.length > 8 && (
                  <span className="text-xs px-2 py-1" style={{ color: 'var(--arctic-500)' }}>
                    +{session.topics.length - 8} more
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center gap-4 text-sm" style={{ color: 'var(--sage-600)' }}>
            <span className="flex items-center gap-1"><LocationIcon size={14} /> {session.location}</span>
            {session.onlineAvailable && <span className="flex items-center gap-1"><GlobeIcon size={14} /> Online Available</span>}
          </div>

          {/* Participants Section */}
          <SessionParticipants sessionId={session.id} />
        </div>
      </div>
    </div>
  );
}
