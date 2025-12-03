'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { sessions } from '@/lib/data';

// Load actual transcript data - Day 1
import session1Transcript from '@/data/transcripts/session-1-circular-frontiers.json';
import session1SocialPosts from '@/data/social-media/session-1-posts.json';
import session2Transcript from '@/data/transcripts/session-2-circular-ocean.json';
import session2SocialPosts from '@/data/social-media/session-2-posts.json';
import session3Transcript from '@/data/transcripts/session-3-locally-rooted.json';
import session3SocialPosts from '@/data/social-media/session-3-posts.json';
import session4Transcript from '@/data/transcripts/session-4-arctic-lifestyles.json';
import session4SocialPosts from '@/data/social-media/session-4-posts.json';
import session5Transcript from '@/data/transcripts/session-5-circular-cities.json';
import session5SocialPosts from '@/data/social-media/session-5-posts.json';
import day1SummaryTranscript from '@/data/transcripts/session-day1-summary.json';
import day1SummarySocialPosts from '@/data/social-media/session-day1-summary-posts.json';

// Load actual transcript data - Day 2
import day2CircularDesignToolboxTranscript from '@/data/transcripts/day2-session-circular-design-toolbox.json';
import day2NbttTextilesTranscript from '@/data/transcripts/day2-session-nbtt-textiles.json';
import day2CircularConstructionTranscript from '@/data/transcripts/day2-session-circular-construction.json';

// Load social posts - Day 2
import day2ConstructionSocialPosts from '@/data/social-media/day2-session-1-construction-posts.json';
import day2NbttSocialPosts from '@/data/social-media/day2-session-4-nbtt-posts.json';
import day2ToolboxSocialPosts from '@/data/social-media/day2-session-5-toolbox-posts.json';

// Stop words to filter out from word cloud
const STOP_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you',
  'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one',
  'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your',
  'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
  'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new',
  'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is', 'was', 'are', 'been', 'has', 'had',
  'were', 'said', 'did', 'having', 'may', 'should', 'am', 'being', 'very', 'much', 'here', 'where', 'yes',
  'yeah', 'ok', 'okay', 'um', 'uh', 'ah', 'oh', 'well'
]);

// Map transcripts by session ID
const transcriptData: Record<string, any> = {
  // Day 1
  'circular-frontiers-opening': session1Transcript,
  'circular-ocean-industries': session2Transcript,
  'locally-rooted-materialising': session3Transcript,
  'arctic-nordic-lifestyles': session4Transcript,
  'circular-cities-regions': session5Transcript,
  'day1-summary': day1SummaryTranscript,
  // Day 2
  'day2-circular-design-toolbox': day2CircularDesignToolboxTranscript,
  'day2-nbtt-textiles': day2NbttTextilesTranscript,
  'day2-circular-construction': day2CircularConstructionTranscript
};

// Map social posts by session ID
const socialPostsData: Record<string, any[]> = {
  // Day 1
  'circular-frontiers-opening': session1SocialPosts,
  'circular-ocean-industries': session2SocialPosts,
  'locally-rooted-materialising': session3SocialPosts,
  'arctic-nordic-lifestyles': session4SocialPosts,
  'circular-cities-regions': session5SocialPosts,
  'day1-summary': day1SummarySocialPosts,
  // Day 2
  'day2-circular-construction': day2ConstructionSocialPosts,
  'day2-nbtt-textiles': day2NbttSocialPosts,
  'day2-circular-design-toolbox': day2ToolboxSocialPosts
};

// Session-specific download files mapping
const sessionDownloads: Record<string, {
  transcript: string;
  json: string;
  article: string;
  highlights: string;
  speakerGuide: string;
}> = {
  'circular-frontiers-opening': {
    transcript: '/transcripts/session-1-circular-frontiers-CLEAN.md',
    json: '/transcripts/session-1-circular-frontiers.json',
    article: '/articles/session-1-circular-frontiers-article.md',
    highlights: '/highlights/session-1-key-quotes-and-themes.md',
    speakerGuide: '/transcripts/SESSION-1-SPEAKER-IDENTIFICATION.md'
  },
  'circular-ocean-industries': {
    transcript: '/transcripts/session-2-circular-ocean-CLEAN.md',
    json: '/transcripts/session-2-circular-ocean.json',
    article: '/articles/session-2-circular-ocean-article.md',
    highlights: '/highlights/session-2-key-quotes-and-themes.md',
    speakerGuide: '/transcripts/SESSION-2-SPEAKER-IDENTIFICATION.md'
  },
  'locally-rooted-materialising': {
    transcript: '/transcripts/session-3-locally-rooted-CLEAN.md',
    json: '/transcripts/session-3-locally-rooted.json',
    article: '/articles/session-3-locally-rooted-article.md',
    highlights: '/highlights/session-3-key-quotes-and-themes.md',
    speakerGuide: '/transcripts/SESSION-3-SPEAKER-IDENTIFICATION.md'
  },
  'arctic-nordic-lifestyles': {
    transcript: '/transcripts/session-4-arctic-lifestyles-CLEAN.md',
    json: '/transcripts/session-4-arctic-lifestyles.json',
    article: '/articles/session-4-arctic-lifestyles-article.md',
    highlights: '/highlights/session-4-key-quotes-and-themes.md',
    speakerGuide: '/transcripts/SESSION-4-SPEAKER-IDENTIFICATION.md'
  },
  'circular-cities-regions': {
    transcript: '/transcripts/session-5-circular-cities-CLEAN.md',
    json: '/transcripts/session-5-circular-cities.json',
    article: '/articles/session-5-circular-cities-article.md',
    highlights: '/highlights/session-5-key-quotes-and-themes.md',
    speakerGuide: '/transcripts/SESSION-5-SPEAKER-IDENTIFICATION.md'
  },
  'day1-summary': {
    transcript: '/transcripts/session-day1-summary-CLEAN.md',
    json: '/transcripts/session-day1-summary.json',
    article: '/articles/session-day1-summary-reflections.md',
    highlights: '/highlights/session-day1-summary-key-quotes.md',
    speakerGuide: '/transcripts/SESSION-DAY1-SUMMARY-SPEAKER-IDENTIFICATION.md'
  },
  // Day 2 Sessions - With Transcripts
  'day2-circular-design-toolbox': {
    transcript: '/transcripts/day2-session-circular-design-toolbox-CLEAN.md',
    json: '/transcripts/day2-session-circular-design-toolbox.json',
    article: '/articles/day2-circular-design-toolbox-article.md',
    highlights: '/highlights/day2-circular-design-toolbox-key-quotes.md',
    speakerGuide: '/transcripts/DAY2-SESSION-CIRCULAR-DESIGN-TOOLBOX-SPEAKER-IDENTIFICATION.md'
  },
  'day2-nbtt-textiles': {
    transcript: '/transcripts/day2-session-nbtt-textiles-CLEAN.md',
    json: '/transcripts/day2-session-nbtt-textiles.json',
    article: '/articles/day2-nbtt-textiles-article.md',
    highlights: '/highlights/day2-nbtt-textiles-key-quotes.md',
    speakerGuide: '/transcripts/DAY2-SESSION-NBTT-TEXTILES-SPEAKER-IDENTIFICATION.md'
  },
  'day2-circular-construction': {
    transcript: '/transcripts/day2-session-circular-construction-CLEAN.md',
    json: '/transcripts/day2-session-circular-construction.json',
    article: '/articles/day2-circular-construction-article.md',
    highlights: '/highlights/day2-circular-construction-key-quotes.md',
    speakerGuide: '/transcripts/DAY2-SESSION-CIRCULAR-CONSTRUCTION-SPEAKER-IDENTIFICATION.md'
  },
  // Day 2 Sessions - No Recording
  'day2-welcome-introduction': {
    transcript: '',
    json: '',
    article: '',
    highlights: '',
    speakerGuide: ''
  },
  'day2-arctic-materials-governance': {
    transcript: '',
    json: '',
    article: '',
    highlights: '',
    speakerGuide: ''
  },
  'day2-circular-skills-knowledge': {
    transcript: '',
    json: '',
    article: '',
    highlights: '',
    speakerGuide: ''
  },
  'day2-circular-port-cities': {
    transcript: '',
    json: '',
    article: '',
    highlights: '',
    speakerGuide: ''
  }
};

function generateWordFrequency(transcript: any): Array<{ word: string; count: number }> {
  if (!transcript || !transcript.parts) return [];

  const wordCount: Record<string, number> = {};

  // Extract all text from segments
  transcript.parts.forEach((part: any) => {
    if (part.segments) {
      part.segments.forEach((segment: any) => {
        if (segment.text) {
          // Clean and split text into words
          const words = segment.text
            .toLowerCase()
            .replace(/[^\w\s'-]/g, ' ') // Remove punctuation except hyphens and apostrophes
            .split(/\s+/)
            .filter((word: string) => {
              return word.length > 3 && !STOP_WORDS.has(word) && !/^\d+$/.test(word);
            });

          words.forEach((word: string) => {
            wordCount[word] = (wordCount[word] || 0) + 1;
          });
        }
      });
    }
  });

  // Convert to array and sort by frequency
  return Object.entries(wordCount)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 50); // Top 50 words
}

export default function TranscriptsPage() {
  const [selectedSession, setSelectedSession] = useState<string | null>('circular-frontiers-opening');
  const [showDownloads, setShowDownloads] = useState(false);
  const [showWordCloud, setShowWordCloud] = useState(false);

  const selectedTranscript = selectedSession ? transcriptData[selectedSession] : null;
  const session = selectedSession ? sessions.find(s => s.id === selectedSession) : null;

  // Generate word frequency for word cloud
  const wordFrequency = useMemo(() => {
    return selectedTranscript ? generateWordFrequency(selectedTranscript) : [];
  }, [selectedTranscript]);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    needs_review: 'bg-orange-100 text-orange-800'
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f7f8 0%, #f4f6f2 50%, #f5f7f6 100%)' }}>
      {/* Nordic Background Layer */}
      <div className="nordic-bg" />

      <header className="frost-card-strong border-b" style={{ borderColor: 'var(--glacial-200)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="mb-2 inline-block transition-colors" style={{ color: 'var(--glacial-600)' }}>
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--glacial-800)' }}>Session Transcripts</h1>
          <p className="mt-2" style={{ color: 'var(--sage-600)' }}>Full transcripts from Nordic Circular Summit 2025</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Session List */}
          <div className="lg:col-span-1">
            <div className="frost-card-strong rounded-xl shadow-lg p-6 sticky top-6" style={{ borderColor: 'var(--glacial-200)' }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--glacial-800)' }}>Sessions</h2>
              <div className="space-y-2">
                {sessions.map(session => {
                  const transcript = transcriptData[session.id];
                  const hasTranscript = !!transcript;

                  return (
                    <button
                      key={session.id}
                      onClick={() => hasTranscript && setSelectedSession(session.id)}
                      disabled={!hasTranscript}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedSession === session.id
                          ? 'border-2 shadow-md'
                          : hasTranscript
                          ? 'border-2 border-transparent'
                          : 'border-2 border-transparent opacity-50 cursor-not-allowed'
                      }`}
                      style={
                        selectedSession === session.id
                          ? { background: 'var(--glacial-50)', borderColor: 'var(--glacial-400)' }
                          : hasTranscript
                          ? { background: 'var(--arctic-50)' }
                          : { background: 'var(--arctic-100)' }
                      }
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate" style={{ color: 'var(--glacial-800)' }}>
                            {session.title}
                          </div>
                          <div className="text-xs mt-1" style={{ color: 'var(--sage-500)' }}>
                            Day {session.day} • {session.startTime}
                          </div>
                        </div>
                        {hasTranscript ? (
                          <span
                            className="ml-2 text-xs px-2 py-1 rounded"
                            style={{
                              background: transcript.transcriptionStatus === 'completed' ? 'var(--sage-100)' : 'var(--glacial-100)',
                              color: transcript.transcriptionStatus === 'completed' ? 'var(--sage-700)' : 'var(--glacial-700)'
                            }}
                          >
                            {transcript.transcriptionStatus === 'completed' ? '✓' : transcript.transcriptionStatus}
                          </span>
                        ) : (
                          <span
                            className="ml-2 text-xs px-2 py-1 rounded whitespace-nowrap"
                            style={{
                              background: 'var(--arctic-200)',
                              color: 'var(--arctic-600)'
                            }}
                          >
                            No Recording
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Transcript Content */}
          <div className="lg:col-span-3">
            {!selectedTranscript && (
              <div className="frost-card rounded-xl shadow-lg p-12 text-center">
                <div className="text-5xl mb-4" style={{ color: 'var(--glacial-300)' }}>📝</div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--glacial-800)' }}>No Transcript Available</h3>
                <p style={{ color: 'var(--sage-600)' }}>Select a session with available transcript from the list</p>
              </div>
            )}

            {selectedTranscript && session && (
              <div className="space-y-6">
                {/* Session Header */}
                <div className="frost-card-strong rounded-xl shadow-lg p-6">
                  <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--glacial-800)' }}>{session.title}</h2>
                  <p className="mb-4" style={{ color: 'var(--sage-600)' }}>{session.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm mb-4" style={{ color: 'var(--arctic-600)' }}>
                    <span>📅 {selectedTranscript.date}</span>
                    <span>⏱️ {selectedTranscript.metadata.duration}</span>
                    <span>🗣️ {selectedTranscript.metadata.participantCount} speakers</span>
                    <span
                      className="px-3 py-1 rounded"
                      style={{
                        background: selectedTranscript.transcriptionStatus === 'completed' ? 'var(--sage-100)' : 'var(--glacial-100)',
                        color: selectedTranscript.transcriptionStatus === 'completed' ? 'var(--sage-700)' : 'var(--glacial-700)'
                      }}
                    >
                      {selectedTranscript.transcriptionStatus.replace('_', ' ')}
                    </span>
                  </div>

                  {selectedTranscript.notes && (
                    <div className="p-4 rounded-lg" style={{ background: 'var(--glacial-50)', border: '1px solid var(--glacial-200)' }}>
                      <p className="text-sm" style={{ color: 'var(--glacial-800)' }}>{selectedTranscript.notes}</p>
                    </div>
                  )}
                </div>

                {/* Expandable Downloads Section - Dynamic for all sessions */}
                {selectedSession && sessionDownloads[selectedSession] && (
                  <div className="frost-card rounded-xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => setShowDownloads(!showDownloads)}
                      className="w-full p-5 flex items-center justify-between transition-colors border-l-4"
                      style={{ borderColor: 'var(--sage-400)' }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📥</span>
                        <div className="text-left">
                          <h3 className="text-lg font-bold" style={{ color: 'var(--glacial-800)' }}>Downloads & Resources</h3>
                          <p className="text-sm" style={{ color: 'var(--sage-600)' }}>Transcripts, articles, quotes, and speaker guides</p>
                        </div>
                      </div>
                      <span className="text-xl" style={{ color: 'var(--glacial-400)' }}>{showDownloads ? '▼' : '▶'}</span>
                    </button>

                    {showDownloads && (
                      <div className="border-t p-6" style={{ background: 'var(--arctic-50)', borderColor: 'var(--glacial-100)' }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <a
                            href={sessionDownloads[selectedSession].transcript}
                            download
                            className="flex items-start gap-3 p-4 bg-white hover:bg-cyan-50 rounded-lg border-2 border-gray-200 hover:border-cyan-300 transition-all group"
                          >
                            <span className="text-3xl">📄</span>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-cyan-700">Full Transcript</h4>
                              <p className="text-xs text-gray-600 mt-1">Complete markdown transcript with all speakers and timestamps</p>
                              <span className="text-xs text-cyan-600 mt-2 inline-block">Download MD →</span>
                            </div>
                          </a>

                          <a
                            href={sessionDownloads[selectedSession].json}
                            download
                            className="flex items-start gap-3 p-4 bg-white hover:bg-cyan-50 rounded-lg border-2 border-gray-200 hover:border-cyan-300 transition-all group"
                          >
                            <span className="text-3xl">📊</span>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-cyan-700">Structured Data</h4>
                              <p className="text-xs text-gray-600 mt-1">JSON format with segments, speakers, and metadata</p>
                              <span className="text-xs text-cyan-600 mt-2 inline-block">Download JSON →</span>
                            </div>
                          </a>

                          <a
                            href={sessionDownloads[selectedSession].article}
                            download
                            className="flex items-start gap-3 p-4 bg-white hover:bg-green-50 rounded-lg border-2 border-gray-200 hover:border-green-300 transition-all group"
                          >
                            <span className="text-3xl">📰</span>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-green-700">Article</h4>
                              <p className="text-xs text-gray-600 mt-1">5000+ word comprehensive article covering all themes</p>
                              <span className="text-xs text-green-600 mt-2 inline-block">Download Article →</span>
                            </div>
                          </a>

                          <a
                            href={sessionDownloads[selectedSession].highlights}
                            download
                            className="flex items-start gap-3 p-4 bg-white hover:bg-purple-50 rounded-lg border-2 border-gray-200 hover:border-purple-300 transition-all group"
                          >
                            <span className="text-3xl">💬</span>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-purple-700">Key Quotes & Themes</h4>
                              <p className="text-xs text-gray-600 mt-1">Top 10 quotes, themes, and tweet-ready highlights</p>
                              <span className="text-xs text-purple-600 mt-2 inline-block">Download Highlights →</span>
                            </div>
                          </a>

                          <a
                            href={sessionDownloads[selectedSession].speakerGuide}
                            download
                            className="flex items-start gap-3 p-4 bg-white hover:bg-blue-50 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all group"
                          >
                            <span className="text-3xl">🎤</span>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-700">Speaker Guide</h4>
                              <p className="text-xs text-gray-600 mt-1">Detailed speaker identification guide</p>
                              <span className="text-xs text-blue-600 mt-2 inline-block">Download Guide →</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Expandable Word Cloud Section - Dynamic for all sessions */}
                {selectedSession && wordFrequency.length > 0 && (
                  <div className="frost-card rounded-xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => setShowWordCloud(!showWordCloud)}
                      className="w-full p-5 flex items-center justify-between transition-colors border-l-4"
                      style={{ borderColor: 'var(--glacial-400)' }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">☁️</span>
                        <div className="text-left">
                          <h3 className="text-lg font-bold" style={{ color: 'var(--glacial-800)' }}>Word Cloud</h3>
                          <p className="text-sm" style={{ color: 'var(--sage-600)' }}>Top 50 most frequent words from the transcript</p>
                        </div>
                      </div>
                      <span className="text-xl" style={{ color: 'var(--glacial-400)' }}>{showWordCloud ? '▼' : '▶'}</span>
                    </button>

                    {showWordCloud && (
                      <div className="border-t p-6" style={{ background: 'linear-gradient(135deg, var(--glacial-50) 0%, var(--sage-50) 100%)', borderColor: 'var(--glacial-100)' }}>
                        <div className="flex flex-wrap gap-3 justify-center items-center p-6">
                          {wordFrequency.map((item, idx) => {
                            const maxCount = wordFrequency[0].count;
                            const minSize = 12;
                            const maxSize = 48;
                            const fontSize = minSize + ((item.count / maxCount) * (maxSize - minSize));

                            const colors = [
                              'text-cyan-600',
                              'text-purple-600',
                              'text-green-600',
                              'text-blue-600',
                              'text-pink-600',
                              'text-indigo-600',
                              'text-orange-600'
                            ];
                            const color = colors[idx % colors.length];

                            return (
                              <span
                                key={item.word}
                                className={`font-bold ${color} hover:scale-110 transition-transform cursor-default`}
                                style={{ fontSize: `${fontSize}px` }}
                                title={`"${item.word}" appears ${item.count} times`}
                              >
                                {item.word}
                              </span>
                            );
                          })}
                        </div>

                        <div className="mt-6 pt-6 border-t border-purple-200">
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">Top 10 Words</h4>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {wordFrequency.slice(0, 10).map((item, idx) => (
                              <div key={item.word} className="bg-white rounded-lg p-3 text-center border border-gray-200">
                                <div className="text-xs text-gray-500">#{idx + 1}</div>
                                <div className="font-bold text-gray-900">{item.word}</div>
                                <div className="text-xs text-cyan-600">{item.count}×</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Expandable Article Section - Dynamic for all sessions */}
                {selectedSession && (
                  <ArticleViewer sessionId={selectedSession} />
                )}

                {/* Expandable Quotes & Themes Section - Dynamic for all sessions */}
                {selectedSession && (
                  <QuotesViewer sessionId={selectedSession} />
                )}

                {/* Expandable Social Media Section */}
                {selectedSession && socialPostsData[selectedSession] && (
                  <SocialMediaViewer sessionId={selectedSession} />
                )}

                {/* Transcript Parts */}
                <div className="space-y-6">
                  {selectedTranscript.parts.map((part: any, index: number) => (
                    <TranscriptPart key={part.id} part={part} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function TranscriptPart({ part, index }: { part: any; index: number }) {
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

function formatSpeakerName(speakerId: string | null): string {
  if (!speakerId) return 'Unknown Speaker';

  // Convert speaker ID to readable name
  const names: Record<string, string> = {
    // Day 1 Speakers
    'einar-kleppe-holthe': 'Einar Kleppe Holthe',
    'eva-jorgensen': 'Eva Jørgensen',
    'edvard-lybert-mork': 'Edvard Lybert Mørk',
    'peter-borg': 'Peter Borg',
    'gorm-vold': 'Gorm Vold',
    'marthe-haugland': 'Marthe Haugland',
    'peter-munch-madsen': 'Peter Munch Madsen',
    'cathrine-barth': 'Cathrine Barth',
    'frederik-thrane': 'Frederik Thrane',
    'alisa-mick': 'Alisa Mick',
    'michel-bajuk': 'Michel Bajuk',
    'keira-dignan': 'Keira Dignan',
    'agita-baltbarde': 'Agita Baltbārde',
    // Day 2 - Circular Design Toolbox
    'dan-mikkin': 'Dan Mikkin',
    'maarja-karlson': 'Maarja Karlson',
    // Day 2 - NBTT Textiles
    'betina-simonsen': 'Betina Simonsen',
    'kerli-kant-hvass': 'Kerli Kant Hvass',
    'jonas-eder-hansen': 'Jonas Eder-Hansen',
    'emilia-jedda': 'Emilia Jedda',
    'inga': 'Inga',
    // Day 2 - Circular Construction
    'jan-thomas-odegard': 'Jan Thomas Odegard',
    'helle-redder-momsen': 'Helle Redder Momsen',
    'anna-karlsdottir': 'Anna Karlsdottir'
  };

  return names[speakerId] || speakerId;
}

function ArticleViewer({ sessionId }: { sessionId: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Session-specific article data
  const articleData: Record<string, {
    title: string;
    subtitle: string;
    description: string;
    headline: string;
    subheadline: string;
  }> = {
    // Day 1 Sessions
    'circular-frontiers-opening': {
      title: 'Article: Circular Frontiers',
      subtitle: '5000+ word comprehensive article covering all session themes',
      description: 'Circular Frontiers: Arctic and Nordic Leaders Chart Path to Sustainable Future',
      headline: 'Circular Frontiers: Arctic and Nordic Leaders Chart Path to Sustainable Future',
      subheadline: 'Nordic Circular Summit 2025 opens in Nuuk with powerful call for systemic change'
    },
    'circular-ocean-industries': {
      title: 'Article: Circular Ocean Industries',
      subtitle: '5800+ word comprehensive article covering ocean transformation',
      description: 'From Waste to Value: Nordic Ocean Industries Lead Circular Revolution',
      headline: 'From Waste to Value: Nordic Ocean Industries Lead Circular Revolution',
      subheadline: 'Nordic Circular Summit 2025 deep-dives into seafood transformation'
    },
    'locally-rooted-materialising': {
      title: 'Article: Locally Rooted',
      subtitle: '5500+ word comprehensive article on material security and circular resilience',
      description: 'Locally Rooted, Globally Connected: Arctic Perspectives on Material Security and Circular Resilience',
      headline: 'Locally Rooted, Globally Connected: Arctic Perspectives on Material Security',
      subheadline: 'How circularity became a strategic imperative for competitiveness and security'
    },
    'arctic-nordic-lifestyles': {
      title: 'Article: Arctic & Nordic Lifestyles',
      subtitle: '5800+ word article on how Greenlandic wisdom can transform modern product systems',
      description: 'Circularity as Tradition: How Greenlandic Wisdom Can Transform Modern Product Systems',
      headline: 'Circularity as Tradition: How Greenlandic Wisdom Transforms Modern Products',
      subheadline: 'What if we don\'t need to invent circularity—what if we just need to listen to those who never abandoned it?'
    },
    'circular-cities-regions': {
      title: 'Article: Circular Cities & Regions',
      subtitle: '5850+ word article on place-based circular economy transformation',
      description: 'Circular Cities & Regions: From Place Economy to Planetary Regeneration',
      headline: 'Circular Cities & Regions: From Place Economy to Planetary Regeneration',
      subheadline: 'How Riga, Cesis, and Greenland are proving that circularity starts where life happens'
    },
    'day1-summary': {
      title: 'Article: Day 1 Summary',
      subtitle: '4450+ word closing reflection on trust, quality of life, and implementation',
      description: 'Day 1 Closing: Trust, Quality of Life, and the Shift to Implementation',
      headline: 'Day 1 Closing: Trust, Quality of Life, and the Shift to Implementation',
      subheadline: 'Key takeaways from Nordic Circular Summit 2025 opening day in Nuuk'
    },
    // Day 2 Sessions
    'day2-circular-construction': {
      title: 'Article: Circular Construction',
      subtitle: 'Comprehensive article on Nordic circular construction transformation',
      description: 'From Pilots to Practice: Nordic Circular Construction\'s Pivotal Moment',
      headline: 'From Pilots to Practice: Nordic Circular Construction\'s Pivotal Moment',
      subheadline: 'Digital partner session reveals path from experimentation to systemic transformation'
    },
    'day2-nbtt-textiles': {
      title: 'Article: Nordic-Baltic Textile Transition',
      subtitle: 'Launch of the NBTT Group and regional textile collaboration',
      description: 'Nordic-Baltic Textile Transition Group Launches',
      headline: 'Nordic-Baltic Textile Transition Group Launches',
      subheadline: 'New collaborative platform unites eight countries to tackle textile circularity crisis'
    },
    'day2-circular-design-toolbox': {
      title: 'Article: Circular Design Toolbox',
      subtitle: 'Open-source methodology for business transformation',
      description: 'The Circular Design Toolbox: Making Circular Transition Practical',
      headline: 'The Circular Design Toolbox: Making Circular Transition Practical',
      subheadline: 'Estonian sustainability designers unveil open-source methodology for business transformation'
    }
  };

  const article = articleData[sessionId];
  if (!article) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-l-4 border-orange-500"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">📰</span>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900">{article.title}</h3>
            <p className="text-sm text-gray-600">{article.subtitle}</p>
          </div>
        </div>
        <span className="text-gray-400 text-xl">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="border-t p-8 bg-gray-50 prose prose-cyan max-w-none">
          <article className="bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{article.headline}</h1>
            <p className="text-lg font-semibold text-gray-700 mb-2">{article.subheadline}</p>
            <p className="text-sm text-gray-500 mb-8 italic">November 19, 2025 | Nuuk, Greenland</p>

            <div className="space-y-6 text-gray-800 leading-relaxed">
              {sessionId === 'circular-frontiers-opening' && (
                <>
                  <p>
                    In a historic first for the Nordic Circular Summit series, leaders, innovators, and youth activists gathered in Nuuk, Greenland, marking the first time the annual event has been held in one of the Nordic region's self-governing territories. The opening session, "Circular Frontiers: Shaping our Future," set an ambitious tone for two days of collaboration, learning, and action toward a truly circular economy.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">A Historic Arctic Welcome</h2>
                  <p>
                    The summit opened with a traditional Greenlandic cultural ceremony featuring NAPA's drum song and lamp lighting—a moment that Greenland's Minister Peter Borg described as deeply spiritual. "It awakens my spiritual partner inside me, my companion, the polar bear," he shared with the 100+ participants gathered in person and hundreds more joining digitally.
                  </p>
                  <p>
                    Minister Borg's opening address highlighted Greenland's unique position at the intersection of traditional knowledge and modern circular economy principles. "Greenlandic tradition in hunting and local food production are built on generations of practical experience," he explained. "They reflect careful use of resources where nothing is wasted and every part of the catch has a purpose."
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Rethinking Value in a 250-Year-Old Linear Economy</h2>
                  <p>
                    Einar Kleppe Holthe, host and representative of Nordic Circular Hotspot, delivered a comprehensive presentation that reframed how we think about value in economic systems. "We live in a 250-year-old linear economy," he stated. "The fish don't know what water is. My generation needs to unlearn what we have learned and grew up in."
                  </p>
                  <p>
                    Holthe outlined Nordic Circular Hotspot's mission to accelerate the transition by focusing on value chains rather than isolated initiatives. "Circular Economy goes on kilos, not krona or dollars," he emphasized. "It really explains the natural resources in our systems."
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Trust as Infrastructure: Nordic Perspectives</h2>
                  <p>
                    The Nordic Arctic Panel brought together voices from across the region, each offering unique insights into how circular economy can scale while remaining rooted in local values.
                  </p>

                  <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 my-4">
                    <p className="font-semibold text-cyan-900">"The real infrastructure in Greenland is trust, I would say. Not the roads."</p>
                    <p className="text-sm text-cyan-700 mt-1">— Edvard Lybert Mørk, Nalek Ventures</p>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-4">
                    <p className="font-semibold text-purple-900">"Invite us into the room, support us on the streets, and don't jail us."</p>
                    <p className="text-sm text-purple-700 mt-1">— Keira Dignan, Regeneration Åland</p>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Takeaways</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Symbiosis as Nordic superpower for industrial and regional collaboration</li>
                    <li>Adaptable business models more appropriate than rigid scalable models</li>
                    <li>Pre-competitive collaboration frameworks enabling business cooperation</li>
                    <li>Need for hybrid public-private investment models</li>
                    <li>Political alignment required between national and EU circular targets</li>
                    <li>Youth demanding system-level change with organized participation</li>
                    <li>Baltic-Nordic collaboration expanding "New Nordics" concept</li>
                    <li>250 years of linear thinking must be unlearned through knowledge infrastructure</li>
                  </ul>
                </>
              )}

              {sessionId === 'circular-ocean-industries' && (
                <>
                  <p>
                    In a packed session at the Nordic Circular Summit 2025, ocean industry leaders from across the Nordic and Arctic region gathered in Nuuk to share breakthrough examples of how circular economy principles are transforming one of the region's most important economic sectors: fisheries and ocean industries.
                  </p>
                  <p>
                    The "Circular Ocean Industries" panel brought together corporate giants, innovative startups, and the enabling clusters that connect them—all united by a common goal: to eliminate the staggering 23 million metric tons of edible seafood currently lost or wasted globally each year.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The 100% Philosophy: Iceland's Gift to the World</h2>
                  <p>
                    Alexandra Leeper, CEO of Iceland Ocean Cluster, shared the organization's flagship "100% Fish" philosophy—a concept that has transformed how the industry thinks about seafood utilization.
                  </p>
                  <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 my-4">
                    <p className="font-semibold text-cyan-900">"We lose and waste more than 23 million metric tons of edible quality aquatic food annually."</p>
                    <p className="text-sm text-cyan-700 mt-1">— Alexandra Leeper, Iceland Ocean Cluster</p>
                  </div>
                  <p>
                    Iceland's journey provides a powerful model. Historically, the country used only about 45% of each fish's biomass. Through tight collaborations, that number has risen to over 90%. The economic impact is staggering: Atlantic cod, once worth about $12 USD per fish, now has a potential value of around $5,000 USD when fully utilized.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Royal Greenland: Corporate Transformation</h2>
                  <p>
                    Kristian S. Ottesen from Royal Greenland shared a transformation story demonstrating corporate execution at scale. At their shrimp factory in Ilulissat, 7,000-10,000 tons of biomass were historically discarded. Their shrimp meal factory lost 800,000 Danish kroner every year.
                  </p>
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-4">
                    <p className="font-semibold text-purple-900">"We made all the mistakes you can do in a project like this. But we managed to transform a loss-making factory into a profitable strategy."</p>
                    <p className="text-sm text-purple-700 mt-1">— Kristian S. Ottesen, Royal Greenland</p>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Hylia Nordic: Startup Innovation</h2>
                  <p>
                    Michaela Lindström's Hylia Nordic shows how startups can disrupt industry norms. Side streams can have 20x more calcium, 10x more zinc, 5x more collagen than fillets—yet 30-70% of seafood processing becomes waste.
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4">
                    <p className="font-semibold text-green-900">"For consumers, it needs to taste good and have good texture. If we want people to eat side streams, they need to resemble familiar seafood."</p>
                    <p className="text-sm text-green-700 mt-1">— Michaela Lindström, Hylia Nordic</p>
                  </div>
                </>
              )}

              {sessionId === 'day2-circular-construction' && (
                <>
                  <p>
                    The gap between Nordic ambitions and circular construction reality was laid bare in this pivotal Day 2 session. While the Nordic region aspires to be the world's most sustainable and integrated region by 2030, its circularity in construction remains among the lowest globally.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Uncomfortable Truth</h2>
                  <p>
                    Jan Thomas Odegard of Natural State opened with a frank assessment: despite ambitious sustainability goals, the Nordics face eight major challenges blocking circular construction—from linear domination to slow construction cycles limiting experimentation.
                  </p>
                  <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 my-4">
                    <p className="font-semibold text-cyan-900">"If we are to reach our sustainability goals, we really have to do changes in the way we do construction."</p>
                    <p className="text-sm text-cyan-700 mt-1">— Jan Thomas Odegard, Natural State</p>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Iceland's 900-Year Material Heritage</h2>
                  <p>
                    Anna Karlsdottir of Ludica Architects delivered a powerful perspective from Iceland—a nation where approximately 80% of buildings are concrete, yet which built biodegradable structures for nearly 900 years.
                  </p>
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-4">
                    <p className="font-semibold text-purple-900">"If concrete brought Iceland to modernity, what brings us into a regenerative future?"</p>
                    <p className="text-sm text-purple-700 mt-1">— Anna Karlsdottir, Ludica Architects</p>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Takeaways</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Denmark must reduce new construction by 80% by 2030</li>
                    <li>Norway needs 72% material use reduction by 2030</li>
                    <li>200,000+ unused buildings exist in Norwegian districts alone</li>
                    <li>The building hierarchy: Use existing → Maintain → Renovate → Extend → Build new</li>
                    <li>Nordic Circular Construction Catalog features 15 circular solution companies</li>
                  </ul>
                </>
              )}

              {sessionId === 'day2-nbtt-textiles' && (
                <>
                  <p>
                    In a sector facing systemic crisis, the launch of the Nordic-Baltic Textile Transition Group (NBTT) marks a watershed moment for regional collaboration. The session brought together textile industry experts from across the Nordic-Baltic region to establish a new platform for accelerating textile circularity.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">A Sector in Crisis</h2>
                  <p>
                    Kerli Kant Hvass painted a stark picture: approximately 80% of collected textiles from Nordic-Baltic countries are exported to Africa and Asia. The circular economy's inner loops—reuse, repair, preparation for reuse—largely happen elsewhere.
                  </p>
                  <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 my-4">
                    <p className="font-semibold text-cyan-900">"No single market has scaled feedstock volumes or technology mix available to build a circular textile system alone."</p>
                    <p className="text-sm text-cyan-700 mt-1">— Kerli Kant Hvass, Aalborg University</p>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Regional Complementarity</h2>
                  <p>
                    Nordics bring design, R&D, and emerging tech; Baltics bring production capacity, manual sorting expertise, and reuse infrastructure. Together, the region has what it needs.
                  </p>
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-4">
                    <p className="font-semibold text-purple-900">"Competing brands that would not in a million years sit together five years ago, they're actually quite willing to sit together."</p>
                    <p className="text-sm text-purple-700 mt-1">— Frederik Thrane, Lifestyle & Design Cluster</p>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Danish Model: 2030 Goals</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>40% recycled content in textiles by 2030</li>
                    <li>10% fiber-to-fiber recycling target</li>
                    <li>~40 Danish companies signed voluntary sector collaboration</li>
                    <li>NBTT Group to host 2 online + 1 physical meeting annually</li>
                  </ul>
                </>
              )}

              {sessionId === 'day2-circular-design-toolbox' && (
                <>
                  <p>
                    In a world where the linear economy grows faster than circular solutions can scale, two Estonian sustainability designers introduced a practical tool to help companies bridge the gap. The Circular Design Toolbox offers a step-by-step methodology for businesses seeking to integrate circular thinking.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Business Case for Design</h2>
                  <p>
                    The toolbox builds on the Ellen MacArthur Foundation's R Strategies framework—ten distinct approaches to becoming more circular, from Refuse to Regenerate.
                  </p>
                  <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 my-4">
                    <p className="font-semibold text-cyan-900">"The linear economy is heavily dominating the world. And it's getting worse. Not that we are having less circular solutions, but the linear economy is growing even faster."</p>
                    <p className="text-sm text-cyan-700 mt-1">— Dan Mikkin, HI Advisory</p>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Circularity Ladder</h2>
                  <p>
                    Companies position themselves on five levels: Conventional → Green → Sustainable → Restorative → Regenerative. The goal is honest self-assessment and realistic 5-year targets.
                  </p>
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-4">
                    <p className="font-semibold text-purple-900">"If it adds up, then it all makes sense. If it doesn't, then it's a charity project. We are talking about actual working business models."</p>
                    <p className="text-sm text-purple-700 mt-1">— Dan Mikkin, HI Advisory</p>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">15 Tools Across Four Stages</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Understand</strong> (6 tools): Map situation, stakeholders, inefficiencies</li>
                    <li><strong>Define</strong> (3 tools): Narrow to new value proposition</li>
                    <li><strong>Ideate</strong> (3 tools): Generate and prioritize solutions</li>
                    <li><strong>Develop</strong> (3 tools): Create implementation roadmap</li>
                  </ul>
                  <p className="mt-4">
                    The toolbox is available as open-source on Enterprise Estonia's website.
                  </p>
                </>
              )}
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

function QuotesViewer({ sessionId }: { sessionId: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Session-specific quotes data
  const quotesData: Record<string, {
    topQuotes: Array<{ quote: string; author: string; org: string; theme: string }>;
    coreThemes: Array<{ title: string; icon: string; points: string[] }>;
  }> = {
    'circular-frontiers-opening': {
      topQuotes: [
    {
      quote: "The real infrastructure in Greenland is trust, I would say. Not the roads, not the... Yeah, trust is the real infrastructure in Greenland. Without it, we don't have any.",
      author: "Edvard Lybert Mørk",
      org: "Nalek Ventures, Greenland",
      theme: "Trust as Infrastructure"
    },
    {
      quote: "If you just take away three things from what my generation would need in order to be involved in the planning of our future, I would say: Invite us into the room, support us on the streets, and don't jail us.",
      author: "Keira Dignan",
      org: "Regeneration Åland / Regeneration 2030",
      theme: "Youth Demands"
    },
    {
      quote: "We live in a 250-year-old linear economy. I used to say the fish don't know what water is. So my generation really needs—it's a big task to unlearn what we have learned and grew up in.",
      author: "Cathrine Barth",
      org: "Natural State Norway / Nordic Circular Hotspot",
      theme: "Unlearning the Linear Economy"
    },
    {
      quote: "If there's one key takeaway that we will listen throughout the day and also tomorrow, it's the super skill that we can leverage: symbiosis. It is actually another word for how nature works. We don't have waste in nature, but how do we organize our industries and societies for industrial symbiosis and regional symbiosis?",
      author: "Cathrine Barth",
      org: "Natural State Norway / Nordic Circular Hotspot",
      theme: "Symbiosis as Superpower"
    },
    {
      quote: "Circular Economy goes on kilos, not krona or dollars. It really explains the natural resources in our systems. And that is why this is now coming.",
      author: "Einar Kleppe Holthe",
      org: "Nordic Circular Hotspot",
      theme: "Circular Economy Measurement"
    },
    {
      quote: "Greenlandic tradition in hunting and local food production are built on generations of practical experience. They reflect careful use of resources where nothing is wasted and every part of the catch has a purpose.",
      author: "Peter Borg",
      org: "Minister, Government of Greenland",
      theme: "Traditional Knowledge"
    },
    {
      quote: "The Nordics share on paper an ambition to become the most sustainable region by 2030. In practice, however, I see from my perspective, mostly short-term economic concerns being addressed. National politics need to, at the very least, align with already set targets and the ambitions of the European Union.",
      author: "Michel Bajuk",
      org: "CradleNet, Sweden / Nordic Circular Hotspot",
      theme: "Political Alignment"
    },
    {
      quote: "With circular investments we probably need new types of investment models which bring public investments and private investments together so that we can also lower the risk that private investors are currently seeing in circular investments.",
      author: "Alisa Mick",
      org: "Mixi, Finland",
      theme: "Investment Models"
    },
    {
      quote: "What I would like us to push is to think about the third level of circular economy, which is the system level. How is our economy designed? How is it functioning? What are the incentives? Who gets to make the decisions?",
      author: "Keira Dignan",
      org: "Regeneration Åland / Regeneration 2030",
      theme: "System-Level Change"
    },
    {
      quote: "I think this is the most important part of infrastructure. It's the human and knowledge infrastructure. How do we reskill our next generation and any generation time to come so we can scale faster into an economy that is in balance with the nature systems?",
      author: "Cathrine Barth",
      org: "Natural State Norway / Nordic Circular Hotspot",
      theme: "Human Infrastructure"
    }
      ],
      coreThemes: [
    {
      title: "Value Redefinition",
      icon: "💎",
      points: [
        "Circular economy measured in kilos (material flows) not currency",
        "Balance between human and nature values currently imbalanced",
        "Nature value becoming scarce, driving circular economy importance",
        "Moving from meaningless growth to sustainable development"
      ]
    },
    {
      title: "Trust & Collaboration",
      icon: "🤝",
      points: [
        "Trust as foundational infrastructure (especially in Arctic contexts)",
        "Collaboration, design thinking, technology as Nordic strengths",
        "Pre-competitive frameworks enabling business collaboration",
        "Sense of responsibility remaining strong in Nordic societies"
      ]
    },
    {
      title: "Adaptability Over Scale",
      icon: "🔄",
      points: [
        "Adaptable models more appropriate than rigid scalable models",
        "Context matters: rural vs urban, local vs global",
        "Arctic strengths: reuse, resource respect, local self-reliance",
        "28 million Nordic market as platform, not template"
      ]
    },
    {
      title: "Youth & System Change",
      icon: "🌱",
      points: [
        "Three levels: Micro (individual), Economy-wide (4% circular), System (macro design)",
        "Youth strategies: Outside pressure (activism) and inside participation (advisory)",
        "18 organizations in Regeneration 2030 network across Nordic-Baltic region",
        "Demands: Invite into rooms, support on streets, don't criminalize"
      ]
    }
      ]
    },
    'circular-ocean-industries': {
      topQuotes: [
        {
          quote: "We lose and waste more than 23 million metric tons of edible quality aquatic food annually. This is not only environmentally impactful, but economically wasteful.",
          author: "Alexandra Leeper",
          org: "CEO, Iceland Ocean Cluster",
          theme: "Global Seafood Waste"
        },
        {
          quote: "Atlantic cod has gone from a single fish worth about $12 USD to one that now has a potential value of around $5,000 USD.",
          author: "Alexandra Leeper",
          org: "Iceland Ocean Cluster",
          theme: "Value Transformation"
        },
        {
          quote: "We don't need to reinvent the wheels. Those steps and methods are really practically applicable to many other places.",
          author: "Alexandra Leeper",
          org: "Iceland Ocean Cluster",
          theme: "Universal Principles"
        },
        {
          quote: "We made all the mistakes you can do in a project like this. We didn't involve the right departments at the right time. But we managed to transform a loss-making factory into a profitable strategy.",
          author: "Kristian S. Ottesen",
          org: "Royal Greenland",
          theme: "Corporate Transformation"
        },
        {
          quote: "We have a cultural way of using everything. This is naturally ingrained in Greenlandic culture to use everything we pull out of the sea.",
          author: "Kristian S. Ottesen",
          org: "Royal Greenland",
          theme: "Cultural Foundation"
        },
        {
          quote: "Side streams can have 20 times more calcium, 10 times more zinc, 5 times more collagen, and twice as much iron compared to fillets. Imagine eating collagen in your food instead of buying expensive pills.",
          author: "Michaela Lindström",
          org: "Hylia Nordic",
          theme: "Side Streams as Superfood"
        },
        {
          quote: "It doesn't matter how good an idea it is. For consumers, it needs to taste good and have good texture. If we want people to eat side streams, they need to resemble familiar seafood.",
          author: "Michaela Lindström",
          org: "Hylia Nordic",
          theme: "Taste Imperative"
        },
        {
          quote: "The solutions start with logistics and transport. It's all about volumes. Every time we move resources, quality goes down, and price goes down with it.",
          author: "Linn Indrestrand",
          org: "Danish Ocean Cluster",
          theme: "Logistics as Leverage"
        },
        {
          quote: "Solutions lie between sectors, not within sectors. Our role is connecting companies across sectors to find resources and ideas.",
          author: "Monika Poulsen",
          org: "ACT Cluster, Northern Norway",
          theme: "Cross-Sectoral Innovation"
        },
        {
          quote: "Building trust takes time. Once we have that trust, we make the cause bigger than any person. People deal with people.",
          author: "Linn Indrestrand",
          org: "Danish Ocean Cluster",
          theme: "Trust Infrastructure"
        }
      ],
      coreThemes: [
        {
          title: "100% Utilization Philosophy",
          icon: "🐟",
          points: [
            "Iceland: 45% → 90%+ fish utilization",
            "Atlantic cod: $12 → $5,000 potential value",
            "Every part used: heads, skins, bones, guts, blood",
            "Applications: food, textiles, cosmetics, biotech, biomedical"
          ]
        },
        {
          title: "Corporate Transformation",
          icon: "🏭",
          points: [
            "Royal Greenland: World's largest cold-water shrimp producer",
            "Challenge: 7,000-10,000 tons biomass historically discarded",
            "Problem: Factory lost 800K DKK/year",
            "Result: Loss-making → profitable operation"
          ]
        },
        {
          title: "Side Streams as Superfood",
          icon: "💪",
          points: [
            "20x more calcium than fillets",
            "10x more zinc",
            "5x more collagen",
            "15% of global seafood wasted at processing stage"
          ]
        },
        {
          title: "Cluster Ecosystem",
          icon: "🤝",
          points: [
            "Iceland Ocean Cluster: 100% Fish philosophy",
            "Sister network spans 12 countries",
            "Danish, ACT clusters as regional enablers",
            "Cross-sectoral collaboration key to solutions"
          ]
        }
      ]
    },
    'locally-rooted-materialising': {
      topQuotes: [
        {
          quote: "We cannot mine our way out of this dependency. At the same time, we will still need mining in the years ahead. We need both. But circularity must define the long-term path.",
          author: "Mika Sulkinoja",
          org: "Sitra, Finland",
          theme: "Mining + Circularity"
        },
        {
          quote: "Circularity is no longer an environmental agenda. It is now a matter of competitiveness and security for Europe and for all other regions as well.",
          author: "Mika Sulkinoja",
          org: "Sitra, Finland",
          theme: "Circularity as Security"
        },
        {
          quote: "Money goes where value is created. It's as simple as that.",
          author: "Luca De Lorenzo",
          org: "Nordic Investment Bank",
          theme: "Value Creation"
        },
        {
          quote: "The value of resilience has increased. This is structural. It's not going to go away even if we get a bit more peace. The fundamental trust in the market is broken.",
          author: "Luca De Lorenzo",
          org: "Nordic Investment Bank",
          theme: "Structural Shift"
        },
        {
          quote: "Shortening supply chains has a value. And we can put a dollar or a euro sign or a kroner sign to it.",
          author: "Luca De Lorenzo",
          org: "Nordic Investment Bank",
          theme: "Resilience Value"
        },
        {
          quote: "How could it be if we go together and establish an ArcCirc? An Arctic Circular Economy Resource Centre.",
          author: "Cathrine Barth",
          org: "Natural State / Nordic Circular Hotspot",
          theme: "ArcCirc Vision"
        },
        {
          quote: "For small entities in the Arctic with limited resources, a lot of the programs that EU provides are extremely complicated. It's complicated to apply, it's complicated to report.",
          author: "Anders Ladefoged",
          org: "European Economic and Social Committee",
          theme: "Arctic Complexity"
        },
        {
          quote: "Can we still maintain prior informed consent? Are we able to pay maybe a higher price? We have to. We need to do this despite the international pressure.",
          author: "Patrick Schroeder",
          org: "Chatham House",
          theme: "Indigenous Rights"
        },
        {
          quote: "The Arctic community is actually quite a large nation, if you put it in those terms, with 4 million people.",
          author: "Cathrine Barth",
          org: "Natural State / Nordic Circular Hotspot",
          theme: "Arctic as Nation"
        },
        {
          quote: "Every material comes from somewhere and is going to live possibly forever. Material economics, material independency, material rights—these are newborn topics.",
          author: "Cathrine Barth",
          org: "Natural State / Nordic Circular Hotspot",
          theme: "Material Economics"
        }
      ],
      coreThemes: [
        {
          title: "Circularity as Security Strategy",
          icon: "🔒",
          points: [
            "No longer environmental agenda—now competitiveness and security",
            "Europe's dependency on China for critical materials",
            "Export of needed materials while recycling targets go unmet",
            "Strategic blind spot in tracking secondary materials"
          ]
        },
        {
          title: "Inner Loops Over Recycling",
          icon: "♻️",
          points: [
            "Remanufacturing market: €31B → €100B by 2030",
            "500,000 potential jobs from inner loops",
            "Reuse, repair, refurbishment before recycling",
            "ESPR as key upstream measure"
          ]
        },
        {
          title: "Structural Shift in Finance",
          icon: "💰",
          points: [
            "Resilience now has quantifiable value",
            "Supply chains no longer optimized on cost alone",
            "Broken market trust is permanent, not temporary",
            "Circular models now financially attractive"
          ]
        },
        {
          title: "ArcCirc Vision",
          icon: "🌍",
          points: [
            "Arctic Circular Economy Resource Centre proposed",
            "4 million Arctic residents as active agents",
            "Prevent Arctic 'linear lock-in'",
            "Modeled on EU CERC for Global South"
          ]
        }
      ]
    },
    'arctic-nordic-lifestyles': {
      topQuotes: [
        {
          quote: "In Greenland, circularity isn't a trend, it's a tradition and it's the foundation.",
          author: "Frederik Thrane",
          org: "Lifestyle and Design Cluster, Denmark",
          theme: "Circularity as Tradition"
        },
        {
          quote: "Growing up in a remote Arctic community has shaped my understanding of what resilience truly means. In our everyday life every resource has value, nothing is wasted, but not because it was a trend but because it was a necessity deeply rooted in Inuit tradition.",
          author: "Lise Lotte",
          org: "Independent Consultant, Qaanaaq",
          theme: "Resilience as Necessity"
        },
        {
          quote: "Every single material that we use is from a hunter that is local. You can't find anything in our store where I can't tell you who made it.",
          author: "Mia Chemnitz",
          org: "Grevilliot, Greenland",
          theme: "Complete Traceability"
        },
        {
          quote: "We are always limited by quotas. We are sold out all the time. It's a luxury problem. But we would never be able to make more than what we're doing now.",
          author: "Mia Chemnitz",
          org: "Grevilliot, Greenland",
          theme: "Quota Limitations"
        },
        {
          quote: "We are basically a company founded on waste product, because we hunt for the meat. And then we wear the rest.",
          author: "Mia Chemnitz",
          org: "Grevilliot, Greenland",
          theme: "Waste as Foundation"
        },
        {
          quote: "The good thing about buying garments from someone you know is that this person who made the garment is probably the best in the world to repair it.",
          author: "Mia Chemnitz",
          org: "Grevilliot, Greenland",
          theme: "Maker as Repairer"
        },
        {
          quote: "I trust the seal skin more than anything that's been tested a lot. So if I'm going on the ice cap or on a dog sled, I know what I'm going to be wearing.",
          author: "Mia Chemnitz",
          org: "Grevilliot, Greenland",
          theme: "Traditional Knowledge"
        },
        {
          quote: "We are taking back our tattoos. We're taking back our earrings. We're taking back our anorak. We're taking back our materials, culture, music, everything.",
          author: "Mia Chemnitz",
          org: "Grevilliot, Greenland",
          theme: "Cultural Decolonization"
        },
        {
          quote: "We don't have to reinvent the wheel. We have to listen and learn from the history and then just reinstate some of the practices.",
          author: "Kristian Ottesen",
          org: "Royal Greenland",
          theme: "Reintroducing Practices"
        },
        {
          quote: "Your scarf is not just a scarf. It's a bit of a history, a culture, and tradition. And a meal.",
          author: "Lise Lotte",
          org: "Independent Consultant, Qaanaaq",
          theme: "Products as Stories"
        }
      ],
      coreThemes: [
        {
          title: "Circularity as Tradition",
          icon: "🏔️",
          points: [
            "Nothing wasted in Arctic communities for millennia",
            "Survival necessity, not environmental trend",
            "Design, production, and community inseparable",
            "Waste not, have not, want not cultural belief"
          ]
        },
        {
          title: "Quota Limitations as Drivers",
          icon: "📊",
          points: [
            "Limited by sustainable musk ox harvest quotas",
            "Cannot scale beyond ecological limits",
            "Always sold out—but sustainably",
            "Scarcity drives value, not volume"
          ]
        },
        {
          title: "Maker = Repairer",
          icon: "🧵",
          points: [
            "Person who made garment best to repair it",
            "Relationship-based service model",
            "No third-party repair shops needed",
            "What ESPR mandates, local relationships make natural"
          ]
        },
        {
          title: "Cultural Decolonization",
          icon: "✊",
          points: [
            "Taking back traditional materials and practices",
            "From Canada Goose to local seal skin",
            "Indigenous materials now seen as superior",
            "Not return to past—path to sustainable future"
          ]
        }
      ]
    },
    'circular-cities-regions': {
      topQuotes: [
        {
          quote: "For the most important thing you have to build when you build places is trust. And that is what we've been talking most about today. If you don't have trust, you don't manage to create any good place.",
          author: "Einar Kleppe Holthe",
          org: "Natural State, Norway",
          theme: "Trust as Foundation"
        },
        {
          quote: "The language of this structure is economy, is numbers. That is why you need to learn how to speak economic, and for instance, circular economic. You use numbers to describe values for society, for humans, with nature resource management.",
          author: "Einar Kleppe Holthe",
          org: "Natural State, Norway",
          theme: "Economic Language"
        },
        {
          quote: "The words that come to mind when people describe this new time is actually very much in line with the very, very old time in a Greenlandic or Arctic sense. How do we make use of what we have in a way that's not going to restrict future generations?",
          author: "Inooraq Brandt",
          org: "Rambøll Grønland A/S",
          theme: "Arctic Circular Wisdom"
        },
        {
          quote: "We have examples with housing blocks in the Disko Bay area of Greenland, where we are essentially stripping down to the main constructions, refurbishing it for a new life at about half of the cost of building a new building.",
          author: "Inooraq Brandt",
          org: "Rambøll Grønland A/S",
          theme: "Renovation Economics"
        },
        {
          quote: "We must succeed together. This also includes that we're not gonna, at least for now, put in some legislation concerning sustainability. We should be able to do this together and agree on all of those things.",
          author: "Embla Kristjánsdóttir",
          org: "Ministry for Housing, Infrastructure and Outer Districts, Greenland",
          theme: "Trust-Based Strategy"
        },
        {
          quote: "A bioregion is not an administrative unit. It is a geographic and cultural space where public authorities, farmers, tourism operators, businesses and citizens agree to manage local resources sustainably based on ecological principles and shared responsibility.",
          author: "Inese Suija-Markova",
          org: "Cesis Municipality & Vidzeme Region, Latvia",
          theme: "Bioregion Definition"
        },
        {
          quote: "We would like to be a modern driving force for circular economy innovations, a circular economy lab within the country and to be a source of inspiration for other cities.",
          author: "Tālis Linkaits",
          org: "Riga Energy Agency, Latvia",
          theme: "Riga's Vision"
        },
        {
          quote: "One of the things we found out when we made that limit was, what about reused products? What should they calculate for? And more or less everyone wanted the political push that it should be set to zero.",
          author: "Helle Redder Momsen",
          org: "Nordic Sustainable Construction, Denmark",
          theme: "Reused Products in LCA"
        },
        {
          quote: "It should not be hard to be sustainable, to make sustainable choices. It should be easy for you to do that, easy to do right.",
          author: "Helle Redder Momsen",
          org: "Nordic Sustainable Construction, Denmark",
          theme: "Making Sustainability Easy"
        },
        {
          quote: "Life is lived in municipalities. So that's where you need to have the solutions and the place based economy and value creation.",
          author: "Marthe Haugland",
          org: "Nordic Innovation",
          theme: "Place-Based Solutions"
        }
      ],
      coreThemes: [
        {
          title: "Place Economy Principles",
          icon: "🏙️",
          points: [
            "Trust as foundational infrastructure for place building",
            "Economic language to describe holistic value",
            "Life of place = life of planet",
            "Quality of life defined by individuals"
          ]
        },
        {
          title: "Riga's Circular Transformation",
          icon: "🇱🇻",
          points: [
            "EU Mission city: climate neutral and smart",
            "Circular economy lab for Latvia",
            "Three directions: citizens, municipality, businesses",
            "First Latvian Circular Economy Forum: 108 speakers"
          ]
        },
        {
          title: "Cesis Bioregion Model",
          icon: "🌿",
          points: [
            "First bioregion in the Baltics",
            "13 institutions signed Memorandum of Goodwill",
            "Social contract based on ecological principles",
            "Eight priority areas for sustainable development"
          ]
        },
        {
          title: "Nordic Construction Harmonization",
          icon: "🏗️",
          points: [
            "LCA limits for all Nordic countries",
            "Reused products counted as zero emissions",
            "Renovation economics: 50% cost of new builds",
            "Trust-based strategy without legislation"
          ]
        }
      ]
    },
    'day1-summary': {
      topQuotes: [
        {
          quote: "Trust is the infrastructure of Greenland. Without it, we don't have any.",
          author: "Edvard Lybert Mørk",
          org: "Nalek Ventures, Greenland",
          theme: "Trust as Foundation"
        },
        {
          quote: "Side stream superfood.",
          author: "Edvard Lybert Mørk",
          org: "Nalek Ventures, Greenland",
          theme: "Value from Byproducts"
        },
        {
          quote: "Inuit mindset are very aligned with circular economy way of thinking.",
          author: "Edvard Lybert Mørk",
          org: "Nalek Ventures, Greenland",
          theme: "Indigenous Alignment"
        },
        {
          quote: "Being poor makes us think different.",
          author: "Malene Vahl Rasmussen",
          org: "Mayor, Kommune Kujalleq, Greenland",
          theme: "Scarcity Drives Innovation"
        },
        {
          quote: "The real thing is on the coast. So I hope you'll visit.",
          author: "Malene Vahl Rasmussen",
          org: "Mayor, Kommune Kujalleq, Greenland",
          theme: "Authentic Experience"
        },
        {
          quote: "Quality of life. That is why we're doing circular economy, isn't it? Because to improve quality of life.",
          author: "Marthe Haugland",
          org: "Nordic Innovation",
          theme: "Ultimate Purpose"
        },
        {
          quote: "Life is lived in municipalities. So that's where you need to have the solutions and the place based economy and value creation.",
          author: "Marthe Haugland",
          org: "Nordic Innovation",
          theme: "Place-Based Priority"
        },
        {
          quote: "Perhaps we've moved a little bit into implementation.",
          author: "Marthe Haugland",
          org: "Nordic Innovation",
          theme: "Implementation Shift"
        },
        {
          quote: "We wanna make sure that the value stay, most of it stays in the region.",
          author: "Malene Vahl Rasmussen",
          org: "Mayor, Kommune Kujalleq, Greenland",
          theme: "Value Retention"
        },
        {
          quote: "When we take action, it actually can be measured very fast.",
          author: "Malene Vahl Rasmussen",
          org: "Mayor, Kommune Kujalleq, Greenland",
          theme: "Rapid Feedback"
        }
      ],
      coreThemes: [
        {
          title: "Trust Infrastructure",
          icon: "🤝",
          points: [
            "Trust as invisible infrastructure enabling collaboration",
            "Social capital enables circular models",
            "Reputation becomes currency in sparse populations",
            "Strong relationships matter more than contracts"
          ]
        },
        {
          title: "Municipal Circular Economy",
          icon: "🏛️",
          points: [
            "Food systems as entry point (kindergartens, elders)",
            "Local partnerships with hunters, fishermen, farmers",
            "Youth inclusion in decision-making",
            "Mining negotiations focused on community benefits"
          ]
        },
        {
          title: "Quality of Life as North Star",
          icon: "⭐",
          points: [
            "Ultimate purpose of circular economy",
            "Economy exists to serve life, not vice versa",
            "Includes health, meaningful work, community, culture",
            "Start with desired outcomes, work backward"
          ]
        },
        {
          title: "Implementation Over Planning",
          icon: "🚀",
          points: [
            "Shift from perpetual planning to concrete action",
            "Conference fatigue in small regions",
            "Small scale enables rapid feedback",
            "Day 2 focused on concrete projects"
          ]
        }
      ]
    },
    // Day 2 Sessions
    'day2-circular-design-toolbox': {
      topQuotes: [
        {
          quote: "The linear economy is heavily dominating the world. And it's not moving in the right direction. We have just the recent data coming in and it's getting worse. Not that we are having less circular solutions, but the linear economy is growing even faster.",
          author: "Dan Mikkin",
          org: "HI Advisory, Estonia",
          theme: "Linear Economy Crisis"
        },
        {
          quote: "We wanted to create this step-by-step systemic approach that the process would be a bit easier.",
          author: "Maarja Karlson",
          org: "HI Advisory, Estonia",
          theme: "Toolbox Purpose"
        },
        {
          quote: "The aim here is not to score the highest but to be as objective as you can, be realistic.",
          author: "Maarja Karlson",
          org: "HI Advisory, Estonia",
          theme: "Self-Assessment Guidance"
        },
        {
          quote: "Regenerative organizations are these rare pioneering companies which actually restore the environment around them so that they give back more than they take from nature and from society.",
          author: "Dan Mikkin",
          org: "HI Advisory, Estonia",
          theme: "Regenerative Goal"
        },
        {
          quote: "If it adds up, then it all makes sense. If it doesn't, then it's a charity project. We are talking about actual working business models.",
          author: "Dan Mikkin",
          org: "HI Advisory, Estonia",
          theme: "Economic Viability"
        },
        {
          quote: "A good efficient transition process usually takes five, six, seven tools over a course of several months.",
          author: "Dan Mikkin",
          org: "HI Advisory, Estonia",
          theme: "Practical Implementation"
        }
      ],
      coreThemes: [
        {
          title: "R Strategies Framework",
          icon: "♻️",
          points: [
            "Ellen MacArthur Foundation's 10 R strategies as foundation",
            "Key 5 integrated: Refuse, Reduce, Replace, Extend, Regenerate",
            "From waste management to regenerative business models",
            "Top level: give back more than you take"
          ]
        },
        {
          title: "Double Diamond Process",
          icon: "💎",
          points: [
            "British Design Council methodology adapted for circular",
            "4 stages: Understand, Define, Ideate, Develop",
            "15 tools across all stages",
            "Self-assessment questionnaire as starting point"
          ]
        },
        {
          title: "Circularity Ladder",
          icon: "📊",
          points: [
            "5-step progression for organizations",
            "Conventional → Green → Sustainable → Restorative → Regenerative",
            "Goal: be realistic about where you are today",
            "5-year planning horizon for progression"
          ]
        },
        {
          title: "Partner Collaboration",
          icon: "🤝",
          points: [
            "Partner Personas alongside User Personas",
            "Supply chain collaboration essential for circularity",
            "Understanding partner needs, goals, and challenges",
            "Circular solutions require ecosystem thinking"
          ]
        }
      ]
    },
    'day2-nbtt-textiles': {
      topQuotes: [
        {
          quote: "The purpose of this Nordic-Baltic textile transition group is actually to serve as a common platform where we can bring together stakeholders... from companies, research communities, civil societies, and also the public sector.",
          author: "Betina Simonsen",
          org: "Lifestyle & Design Cluster, Denmark",
          theme: "Platform Purpose"
        },
        {
          quote: "The textile industry works as a system and there is no country system organized within their own borders. So we need to think across borders here.",
          author: "Kerli Kant Hvass",
          org: "Aalborg University, Estonia/Denmark",
          theme: "Cross-Border Collaboration"
        },
        {
          quote: "No single market has scaled feedstock volumes or technology mix available to build a circular textile system alone.",
          author: "Kerli Kant Hvass",
          org: "Aalborg University, Estonia/Denmark",
          theme: "Regional Integration"
        },
        {
          quote: "We can collaborate only when you have trust. Trust doesn't happen itself. So we need to have space to meet, learn about each other, understand each other, discuss the challenges and build that trust.",
          author: "Kerli Kant Hvass",
          org: "Aalborg University, Estonia/Denmark",
          theme: "Trust Building"
        },
        {
          quote: "The first thing that we learned has been that this pre-competitive setting where competing brands that would not in a million years sit together five years ago, they're actually quite willing to sit together.",
          author: "Frederik Thrane",
          org: "Lifestyle & Design Cluster, Denmark",
          theme: "Pre-Competitive Collaboration"
        },
        {
          quote: "A shared Nordic approach could really strengthen our collective voice also in Brussels and help demonstrate that our region is ready to lead on circular textiles.",
          author: "Jonas Eder-Hansen",
          org: "Lifestyle & Design Cluster, Denmark",
          theme: "EU Policy Influence"
        }
      ],
      coreThemes: [
        {
          title: "Regional Value Chain",
          icon: "🌍",
          points: [
            "Nordics: design, R&D, automated sorting, recycling tech",
            "Baltics: manual sorting, production, reuse/repair",
            "No single country can build circular system alone",
            "Complementary strengths across region"
          ]
        },
        {
          title: "EPR Harmonization",
          icon: "📋",
          points: [
            "Need harmonized Extended Producer Responsibility",
            "Focus on impact, not just price",
            "Address whole waste hierarchy",
            "Fix market failures collectively"
          ]
        },
        {
          title: "Pre-Competitive Collaboration",
          icon: "🤝",
          points: [
            "Competing brands now willing to collaborate",
            "Danish model: 40 signatories, shared goals",
            "Voluntary but with accountability",
            "Annual data reporting and benchmarking"
          ]
        },
        {
          title: "Reduction as Core Theme",
          icon: "📉",
          points: [
            "Reduction of virgin materials and consumption",
            "Waste prevention over recycling",
            "Preparation for reuse prioritized",
            "Ultra fast fashion as major challenge"
          ]
        }
      ]
    },
    'day2-circular-construction': {
      topQuotes: [
        {
          quote: "The Nordics as a region wants to be the most sustainable and integrated region in the world by 2030. But circularity in general is very low. That's among some of the lowest.",
          author: "Jan Thomas Odegard",
          org: "Natural State / Nordic Circular Construction",
          theme: "Nordic Paradox"
        },
        {
          quote: "Denmark must reduce its new construction with 80% by 2030 to reach its goals.",
          author: "Jan Thomas Odegard",
          org: "Natural State / Nordic Circular Construction",
          theme: "Transformation Scale"
        },
        {
          quote: "For nearly 900 years we built structures that were biodegradable, required constant care and returned to the earth when they were no longer in use. In contrast, our modern material systems are permanent, resource-intensive and environmentally burdensome.",
          author: "Anna Karlsdottir",
          org: "Ludica Architects, Iceland",
          theme: "Historical Perspective"
        },
        {
          quote: "Innovation literally operated within a loophole.",
          author: "Anna Karlsdottir",
          org: "Ludica Architects, Iceland",
          theme: "Regulatory Barriers"
        },
        {
          quote: "If concrete brought Iceland to modernity, what brings us into a regenerative future?",
          author: "Anna Karlsdottir",
          org: "Ludica Architects, Iceland",
          theme: "Future Vision"
        },
        {
          quote: "The most sustainable building is the one that is kept in use and loved.",
          author: "Helle Redder Momsen",
          org: "Danish Authority / Nordic Network for Sustainable Construction",
          theme: "Existing Buildings"
        },
        {
          quote: "At which pace can we consume materials which have taken billions of years to form?",
          author: "Helle Redder Momsen",
          org: "Danish Authority / Nordic Network for Sustainable Construction",
          theme: "Resource Philosophy"
        },
        {
          quote: "Until now, I haven't found one politician who can say, we're going to be this much circular in construction to achieve our climate and nature goals.",
          author: "Jan Thomas Odegard",
          org: "Natural State / Nordic Circular Construction",
          theme: "Political Goals"
        },
        {
          quote: "A traditional house in Norway is one that you can disassemble. And the Danes love it as their summer house even. You can pick it apart and then move it around.",
          author: "Jan Thomas Odegard",
          org: "Natural State / Nordic Circular Construction",
          theme: "Traditional Circularity"
        },
        {
          quote: "The real challenge lies in the implementation - how to shift from linear extraction to circular, regenerative systems in a meaningful and effective way.",
          author: "Anna Karlsdottir",
          org: "Ludica Architects, Iceland",
          theme: "Implementation Challenge"
        }
      ],
      coreThemes: [
        {
          title: "9R Framework",
          icon: "🔄",
          points: [
            "Avoid unnecessary buildings first priority",
            "Transform existing buildings second",
            "Recycling materials least intensive option",
            "Different building parts need varied approaches"
          ]
        },
        {
          title: "Existing Building Stock",
          icon: "🏛️",
          points: [
            "Most sustainable building already exists",
            "Finnish hierarchy: Use → Maintain → Renovate → Extend → Build new",
            "200,000+ unused buildings in Norway alone",
            "Office-to-housing conversions as quick wins"
          ]
        },
        {
          title: "Nordic Maturity Gap",
          icon: "📊",
          points: [
            "Netherlands as pioneer benchmark",
            "Denmark/Finland leading Nordic countries",
            "Sweden > Norway > Iceland > Greenland",
            "Regulatory + market development needed together"
          ]
        },
        {
          title: "Nine Policy Measures",
          icon: "📋",
          points: [
            "Lifetime extension top priority",
            "Demolition prevention/criteria",
            "Remove barriers for renovation",
            "Design for disassembly standards"
          ]
        }
      ]
    }
  };

  const sessionData = quotesData[sessionId];
  if (!sessionData) return null;

  const { topQuotes, coreThemes } = sessionData;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-l-4 border-pink-500"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">💬</span>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900">Key Quotes & Themes</h3>
            <p className="text-sm text-gray-600">Top 10 quotes and 4 core themes from the session</p>
          </div>
        </div>
        <span className="text-gray-400 text-xl">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="border-t p-8 bg-gradient-to-br from-pink-50 to-purple-50">
          {/* Top Quotes */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>🌟</span> Top 10 Quotes
            </h3>
            <div className="space-y-6">
              {topQuotes.map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-pink-400">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl font-bold text-pink-500">#{idx + 1}</span>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-pink-600 mb-2">{item.theme}</div>
                      <blockquote className="text-gray-800 italic leading-relaxed mb-3">
                        "{item.quote}"
                      </blockquote>
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">— {item.author}</div>
                        <div className="text-gray-600">{item.org}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Themes */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>🎯</span> Core Themes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreThemes.map((theme, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{theme.icon}</span>
                    <h4 className="text-lg font-bold text-gray-900">{theme.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {theme.points.map((point, pidx) => (
                      <li key={pidx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SocialMediaViewer({ sessionId }: { sessionId?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const posts = sessionId ? (socialPostsData[sessionId] || []) : [];

  // Filter posts by platform and type
  const filteredPosts = posts.filter((post: any) => {
    const platformMatch = selectedPlatform === 'all' || post.platform === selectedPlatform;
    const typeMatch = selectedType === 'all' || post.post_type === selectedType;
    return platformMatch && typeMatch;
  });

  // Get unique platforms and post types
  const platforms = ['all', ...Array.from(new Set(posts.map((p: any) => p.platform)))];
  const postTypes = ['all', ...Array.from(new Set(posts.map((p: any) => p.post_type)))];

  const platformIcons: Record<string, string> = {
    linkedin: '💼',
    twitter: '𝕏',
    instagram: '📷',
    facebook: '👥',
    all: '🌐'
  };

  const platformColors: Record<string, string> = {
    linkedin: 'bg-blue-50 border-blue-300 text-blue-900',
    twitter: 'bg-gray-50 border-gray-400 text-gray-900',
    instagram: 'bg-pink-50 border-pink-300 text-pink-900',
    facebook: 'bg-indigo-50 border-indigo-300 text-indigo-900'
  };

  const platformStats = platforms
    .filter(p => p !== 'all')
    .map(platform => ({
      platform,
      count: posts.filter((p: any) => p.platform === platform).length
    }));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-l-4 border-blue-500"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">📱</span>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900">Social Media Content</h3>
            <p className="text-sm text-gray-600">Ready-to-use posts for LinkedIn, Twitter, Instagram & Facebook</p>
          </div>
        </div>
        <span className="text-gray-400 text-xl">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="border-t bg-gradient-to-br from-blue-50 to-purple-50">
          {/* Statistics Overview */}
          <div className="p-6 bg-white border-b">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">📊 Content Overview</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {platformStats.map(stat => (
                <div key={stat.platform} className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                  <div className="text-2xl mb-2">{platformIcons[stat.platform]}</div>
                  <div className="text-xs uppercase text-gray-500 font-semibold">{stat.platform}</div>
                  <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
                  <div className="text-xs text-gray-500">posts</div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 bg-white border-b">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 block">Filter by Platform</label>
                <div className="flex flex-wrap gap-2">
                  {platforms.map(platform => (
                    <button
                      key={platform}
                      onClick={() => setSelectedPlatform(platform)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        selectedPlatform === platform
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {platformIcons[platform]} {platform === 'all' ? 'All' : platform}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 block">Filter by Type</label>
                <div className="flex flex-wrap gap-2">
                  {postTypes.slice(0, 6).map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        selectedType === type
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {type === 'all' ? 'All Types' : type.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredPosts.length} of {posts.length} posts
            </div>
          </div>

          {/* Posts Grid */}
          <div className="p-6">
            <div className="space-y-6">
              {filteredPosts.map((post: any) => (
                <div
                  key={post.id}
                  className={`bg-white rounded-lg p-6 shadow-sm border-2 ${platformColors[post.platform] || 'border-gray-200'}`}
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{platformIcons[post.platform]}</span>
                      <div>
                        <div className="font-bold text-gray-900">{post.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700 font-semibold uppercase">
                            {post.platform}
                          </span>
                          <span className="text-xs px-2 py-1 bg-purple-100 rounded-full text-purple-700 font-semibold">
                            {post.post_type.replace('_', ' ')}
                          </span>
                          {post.speaker && (
                            <span className="text-xs px-2 py-1 bg-cyan-100 rounded-full text-cyan-700 font-semibold">
                              🎤 {post.speaker}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {post.character_count} chars
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                      {post.content}
                    </pre>
                  </div>

                  {/* Hashtags */}
                  {post.hashtags && post.hashtags.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-600 mb-2">Hashtags:</div>
                      <div className="flex flex-wrap gap-2">
                        {post.hashtags.map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded border border-blue-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Thread Posts (for Twitter threads) */}
                  {post.thread_posts && post.thread_posts.length > 0 && (
                    <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="text-xs font-semibold text-yellow-900 mb-3">
                        🧵 Thread ({post.thread_posts.length} tweets)
                      </div>
                      <div className="space-y-2">
                        {post.thread_posts.map((tweet: string, idx: number) => (
                          <div key={idx} className="p-2 bg-white rounded text-sm text-gray-800 border border-yellow-200">
                            {tweet}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metadata Footer */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pt-4 border-t border-gray-200">
                    {post.theme && (
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">Theme:</span>
                        <span>{post.theme}</span>
                      </div>
                    )}
                    {post.media_suggestion && (
                      <div className="flex items-center gap-1">
                        <span>📸</span>
                        <span>{post.media_suggestion}</span>
                      </div>
                    )}
                    {post.call_to_action && (
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">CTA:</span>
                        <span>{post.call_to_action}</span>
                      </div>
                    )}
                  </div>

                  {/* Copy Button */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        const textToCopy = `${post.content}\n\n${post.hashtags ? post.hashtags.join(' ') : ''}`;
                        navigator.clipboard.writeText(textToCopy);
                        alert('Post copied to clipboard!');
                      }}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-semibold text-sm"
                    >
                      📋 Copy Post + Hashtags
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <div className="text-gray-600">No posts match your filters</div>
              </div>
            )}
          </div>

          {/* Download All Section */}
          <div className="p-6 bg-white border-t">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Download All Posts</h4>
                <p className="text-sm text-gray-600">Get the complete JSON file with all {posts.length} social media posts</p>
              </div>
              <a
                href="/social-media/session-1-posts.json"
                download
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
              >
                📥 Download JSON
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
