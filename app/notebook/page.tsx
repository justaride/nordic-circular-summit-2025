'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  NotebookIcon,
  SparklesIcon,
  PlayIcon,
  HomeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentIcon,
  ExternalLinkIcon
} from '@/components/Icons';

interface NotebookItem {
  id: string;
  title: string;
  description: string;
  type: 'audio' | 'summary' | 'faq' | 'briefing' | 'other';
  content?: string;
  audioUrl?: string;
  externalUrl?: string;
  dateAdded: string;
  duration?: string;
}

// Placeholder data - will be populated with NotebookLM outputs
const notebookItems: NotebookItem[] = [
  // Items will be added here as NotebookLM generates content
];

const typeLabels: Record<string, { label: string; color: string; bg: string }> = {
  audio: { label: 'Audio Overview', color: 'var(--glacial-700)', bg: 'var(--glacial-100)' },
  summary: { label: 'AI Summary', color: 'var(--sage-700)', bg: 'var(--sage-100)' },
  faq: { label: 'FAQ', color: '#7c3aed', bg: '#ede9fe' },
  briefing: { label: 'Briefing Doc', color: '#0891b2', bg: '#cffafe' },
  other: { label: 'Content', color: '#6b7280', bg: '#f3f4f6' },
};

function NotebookItemCard({ item }: { item: NotebookItem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeStyle = typeLabels[item.type] || typeLabels.other;

  return (
    <div className="frost-card rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {item.type === 'audio' ? (
              <div className="p-2 rounded-lg" style={{ background: typeStyle.bg }}>
                <PlayIcon size={24} color={typeStyle.color} />
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
              <source src={item.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
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

export default function NotebookPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="frost-card-strong border-b" style={{ borderColor: 'var(--glacial-200)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80" style={{ color: 'var(--glacial-600)' }}>
                <HomeIcon size={18} />
                <span>Home</span>
              </Link>
              <span style={{ color: 'var(--glacial-300)' }}>/</span>
              <div className="flex items-center gap-2">
                <NotebookIcon size={24} color="var(--glacial-600)" />
                <h1 className="text-2xl font-bold" style={{ color: 'var(--glacial-800)' }}>The Notebook</h1>
              </div>
            </div>
            <Image
              src="/media/nch-logo.svg"
              alt="Nordic Circular Hotspot"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro Section */}
        <section className="frost-card-strong rounded-2xl shadow-xl p-8 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10" style={{
            background: 'radial-gradient(circle, var(--glacial-300) 0%, transparent 70%)',
            transform: 'translate(30%, -30%)'
          }} />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <SparklesIcon size={28} color="var(--glacial-500)" />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--glacial-800)' }}>
                AI-Generated Summit Insights
              </h2>
            </div>
            <p className="text-lg mb-4" style={{ color: 'var(--sage-700)' }}>
              This page hosts content generated by Google&apos;s NotebookLM from the complete Nordic Circular Summit 2025 documentation.
              Explore AI-powered summaries, audio overviews, and deep-dive analyses of the summit&apos;s key themes and discussions.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--glacial-100)' }}>
                <PlayIcon size={16} color="var(--glacial-600)" />
                <span className="text-sm font-medium" style={{ color: 'var(--glacial-700)' }}>Audio Overviews</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--sage-100)' }}>
                <DocumentIcon size={16} color="var(--sage-600)" />
                <span className="text-sm font-medium" style={{ color: 'var(--sage-700)' }}>AI Summaries</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: '#ede9fe' }}>
                <NotebookIcon size={16} color="#7c3aed" />
                <span className="text-sm font-medium" style={{ color: '#7c3aed' }}>FAQ & Deep Dives</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        {notebookItems.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {notebookItems.map((item) => (
              <NotebookItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="frost-card rounded-2xl shadow-lg p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full" style={{ background: 'var(--glacial-100)' }}>
                <NotebookIcon size={48} color="var(--glacial-400)" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--glacial-700)' }}>
              Content Coming Soon
            </h3>
            <p className="text-lg mb-6 max-w-md mx-auto" style={{ color: 'var(--sage-600)' }}>
              NotebookLM is processing the summit documentation. Audio overviews, summaries, and AI-generated insights will appear here.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: 'var(--sage-50)', border: '1px solid var(--sage-200)' }}>
              <SparklesIcon size={18} color="var(--sage-500)" />
              <span className="text-sm" style={{ color: 'var(--sage-600)' }}>
                40 documents uploaded to NotebookLM
              </span>
            </div>
          </div>
        )}

        {/* Source Info */}
        <section className="mt-12 p-6 rounded-xl" style={{ background: 'var(--sage-50)', border: '1px solid var(--sage-200)' }}>
          <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--glacial-700)' }}>
            <DocumentIcon size={20} color="var(--glacial-600)" />
            Source Documentation
          </h3>
          <p className="text-sm mb-4" style={{ color: 'var(--sage-600)' }}>
            The Notebook content is generated from 40 comprehensive documents including:
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 rounded-lg bg-white">
              <div className="font-semibold" style={{ color: 'var(--glacial-700)' }}>9 Transcripts</div>
              <div style={{ color: 'var(--sage-500)' }}>Full session recordings</div>
            </div>
            <div className="p-3 rounded-lg bg-white">
              <div className="font-semibold" style={{ color: 'var(--glacial-700)' }}>9 Articles</div>
              <div style={{ color: 'var(--sage-500)' }}>Long-form session writeups</div>
            </div>
            <div className="p-3 rounded-lg bg-white">
              <div className="font-semibold" style={{ color: 'var(--glacial-700)' }}>9 Quote Collections</div>
              <div style={{ color: 'var(--sage-500)' }}>Key quotes & themes</div>
            </div>
            <div className="p-3 rounded-lg bg-white">
              <div className="font-semibold" style={{ color: 'var(--glacial-700)' }}>53+ Speakers</div>
              <div style={{ color: 'var(--sage-500)' }}>Complete directory</div>
            </div>
          </div>
        </section>

        {/* Powered By */}
        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: 'var(--sage-500)' }}>
            Powered by{' '}
            <a
              href="https://notebooklm.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
              style={{ color: 'var(--glacial-600)' }}
            >
              Google NotebookLM
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
