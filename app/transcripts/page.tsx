'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { sessions } from '@/lib/data';
import { transcriptData, socialPostsData, sessionDownloads } from '@/lib/transcript-data';
import Header from '@/components/layout/Header';
import TranscriptPart from '@/components/transcripts/TranscriptPart';
import ArticleViewer from '@/components/transcripts/ArticleViewer';
import QuotesViewer from '@/components/transcripts/QuotesViewer';
import SocialMediaViewer from '@/components/transcripts/SocialMediaViewer';

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

      <Header 
        title="Session Transcripts" 
        subtitle="Full transcripts from Nordic Circular Summit 2025" 
        showBackLink={true}
      />

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
                  <SocialMediaViewer posts={socialPostsData[selectedSession]} />
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