import { useState } from 'react';
import { formatSpeakerName } from '@/lib/formatters';

export default function TranscriptPart({ part, index }: { part: any; index: number }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const hasContent = part.segments && part.segments.length > 0 && part.segments[0].text;

  return (
    <div className="frost-card rounded-xl shadow-lg overflow-hidden">
      {/* Part Header */}
      <div
        className="p-5 cursor-pointer transition-colors border-l-4"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ borderColor: 'var(--glacial-400)' }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: 'var(--glacial-100)', color: 'var(--glacial-700)' }}
              >
                PART {index + 1}
              </span>
              <span className="text-sm" style={{ color: 'var(--arctic-500)' }}>
                {part.startTime} - {part.endTime}
              </span>
            </div>
            <h3 className="text-xl font-bold" style={{ color: 'var(--glacial-800)' }}>{part.title}</h3>
            {part.description && (
              <p className="text-sm mt-1" style={{ color: 'var(--sage-600)' }}>{part.description}</p>
            )}
            {hasContent && (
              <div className="mt-2 flex items-center gap-2 text-xs" style={{ color: 'var(--sage-500)' }}>
                <span>✓</span>
                <span>Transcript available</span>
              </div>
            )}
          </div>
          <button className="ml-4" style={{ color: 'var(--glacial-400)' }}>
            {isExpanded ? '▼' : '▶'}
          </button>
        </div>
      </div>

      {/* Part Content (Expanded) */}
      {isExpanded && (
        <div className="border-t" style={{ background: 'var(--arctic-50)', borderColor: 'var(--glacial-100)' }}>
          {/* Notes Section */}
          {part.notes && (
            <div className="p-5 border-b" style={{ background: 'var(--glacial-50)', borderColor: 'var(--glacial-100)' }}>
              <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--glacial-700)' }}>📝 Notes</h4>
              <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--glacial-800)' }}>{part.notes}</p>
            </div>
          )}

          {/* Transcript Segments */}
          {hasContent ? (
            <div className="p-6">
              <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--glacial-700)' }}>Transcript</h4>
              <div className="space-y-4">
                {part.segments.map((segment: any, idx: number) => (
                  <div key={idx} className="transcript-segment">
                    {segment.speakerId && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase" style={{ color: 'var(--glacial-600)' }}>
                          {formatSpeakerName(segment.speakerId)}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--arctic-400)' }}>
                          {segment.startTime}
                        </span>
                      </div>
                    )}
                    <p className="leading-relaxed whitespace-pre-wrap pl-4 border-l-2" style={{ color: '#111827', borderColor: 'var(--glacial-200)' }}>
                      {segment.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 text-center" style={{ color: 'var(--arctic-400)' }}>
              <p className="text-sm italic">No transcript content for this part yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
