import { useState } from 'react';
import Image from 'next/image';
import {
  SparklesIcon,
  PlayIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentIcon,
  ExternalLinkIcon
} from '@/components/Icons';
import { NotebookItem } from '@/lib/notebook-data';

const typeLabels: Record<string, { label: string; color: string; bg: string }> = {
  audio: { label: 'Audio Overview', color: 'var(--glacial-700)', bg: 'var(--glacial-100)' },
  video: { label: 'Video', color: '#dc2626', bg: '#fee2e2' },
  summary: { label: 'AI Summary', color: 'var(--sage-700)', bg: 'var(--sage-100)' },
  faq: { label: 'FAQ', color: '#7c3aed', bg: '#ede9fe' },
  briefing: { label: 'Briefing Doc', color: '#0891b2', bg: '#cffafe' },
  image: { label: 'Mind Map', color: '#059669', bg: '#d1fae5' },
  pdf: { label: 'PDF Document', color: '#ea580c', bg: '#ffedd5' },
  other: { label: 'Content', color: '#6b7280', bg: '#f3f4f6' },
};

export default function NotebookItemCard({ item }: { item: NotebookItem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeStyle = typeLabels[item.type] || typeLabels.other;

  return (
    <div className="frost-card rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {item.type === 'audio' || item.type === 'video' ? (
              <div className="p-2 rounded-lg" style={{ background: typeStyle.bg }}>
                <PlayIcon size={24} color={typeStyle.color} />
              </div>
            ) : item.type === 'image' ? (
              <div className="p-2 rounded-lg" style={{ background: typeStyle.bg }}>
                <SparklesIcon size={24} color={typeStyle.color} />
              </div>
            ) : (
              <div className="p-2 rounded-lg" style={{ background: typeStyle.bg }}>
                <DocumentIcon size={24} color={typeStyle.color} />
              </div>
            )}
            <div>
              <span
                className="text-xs font-medium px-2 py-1 rounded-full"
                style={{ background: typeStyle.bg, color: typeStyle.color }}
              >
                {typeStyle.label}
              </span>
              {item.duration && (
                <span className="text-xs ml-2" style={{ color: 'var(--sage-500)' }}>
                  {item.duration}
                </span>
              )}
            </div>
          </div>
          <span className="text-xs" style={{ color: 'var(--sage-500)' }}>
            {item.dateAdded}
          </span>
        </div>

        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--glacial-800)' }}>
          {item.title}
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--sage-600)' }}>
          {item.description}
        </p>

        {item.audioUrl && (
          <div className="mb-4">
            <audio controls className="w-full" style={{ height: '40px' }}>
              <source src={item.audioUrl} type="audio/m4a" />
              <source src={item.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {item.videoUrl && (
          <div className="mb-4 rounded-lg overflow-hidden" style={{ background: '#000' }}>
            <video controls className="w-full" style={{ maxHeight: '300px' }}>
              <source src={item.videoUrl} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </div>
        )}

        {item.imageUrl && (
          <div className="mb-4">
            <a href={item.imageUrl} target="_blank" rel="noopener noreferrer">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              />
            </a>
            <p className="text-xs mt-2 text-center" style={{ color: 'var(--sage-500)' }}>
              Click to view full size
            </p>
          </div>
        )}

        {item.pdfUrl && (
          <div className="mb-4">
            <a
              href={item.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all hover:scale-[1.02]"
              style={{ background: 'var(--glacial-100)', color: 'var(--glacial-700)', border: '1px solid var(--glacial-200)' }}
            >
              <DocumentIcon size={20} color="var(--glacial-600)" />
              View PDF Document
              <ExternalLinkIcon size={16} color="var(--glacial-500)" />
            </a>
          </div>
        )}

        {item.content && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: 'var(--glacial-600)' }}
            >
              {isExpanded ? (
                <>
                  <ChevronUpIcon size={16} /> Hide content
                </>
              ) : (
                <>
                  <ChevronDownIcon size={16} /> Show content
                </>
              )}
            </button>

            {isExpanded && (
              <div
                className="mt-4 p-4 rounded-lg prose prose-sm max-w-none"
                style={{ background: 'var(--sage-50)', border: '1px solid var(--sage-200)' }}
              >
                <div
                  className="whitespace-pre-wrap text-sm"
                  style={{ color: 'var(--glacial-800)' }}
                >
                  {item.content}
                </div>
              </div>
            )}
          </>
        )}

        {item.externalUrl && (
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium transition-colors hover:underline"
            style={{ color: 'var(--glacial-600)' }}
          >
            <ExternalLinkIcon size={16} /> Open in NotebookLM
          </a>
        )}
      </div>
    </div>
  );
}
