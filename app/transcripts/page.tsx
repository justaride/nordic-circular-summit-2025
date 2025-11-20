'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { sessions } from '@/lib/data';

// Load actual transcript data
import session1Transcript from '@/data/transcripts/session-1-circular-frontiers.json';
import session1SocialPosts from '@/data/social-media/session-1-posts.json';
import session2Transcript from '@/data/transcripts/session-2-circular-ocean.json';
import session2SocialPosts from '@/data/social-media/session-2-posts.json';
import session3Transcript from '@/data/transcripts/session-3-locally-rooted.json';
import session3SocialPosts from '@/data/social-media/session-3-posts.json';
import session4Transcript from '@/data/transcripts/session-4-arctic-lifestyles.json';
import session4SocialPosts from '@/data/social-media/session-4-posts.json';

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
  'circular-frontiers-opening': session1Transcript,
  'circular-ocean-industries': session2Transcript,
  'locally-rooted-materialising': session3Transcript,
  'arctic-nordic-lifestyles': session4Transcript
};

// Map social posts by session ID
const socialPostsData: Record<string, any[]> = {
  'circular-frontiers-opening': session1SocialPosts,
  'circular-ocean-industries': session2SocialPosts,
  'locally-rooted-materialising': session3SocialPosts,
  'arctic-nordic-lifestyles': session4SocialPosts
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-cyan-600 hover:text-cyan-700 mb-2 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Session Transcripts</h1>
          <p className="text-gray-600 mt-2">Full transcripts from Nordic Circular Summit 2025</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Session List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Sessions</h2>
              <div className="space-y-2">
                {sessions.map(session => {
                  const transcript = transcriptData[session.id];
                  const hasTranscript = !!transcript;

                  return (
                    <button
                      key={session.id}
                      onClick={() => hasTranscript && setSelectedSession(session.id)}
                      disabled={!hasTranscript}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedSession === session.id
                          ? 'bg-cyan-100 border-2 border-cyan-500'
                          : hasTranscript
                          ? 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                          : 'bg-gray-100 border-2 border-transparent opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 text-sm truncate">
                            {session.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Day {session.day} • {session.startTime}
                          </div>
                        </div>
                        {hasTranscript && (
                          <span className={`ml-2 text-xs px-2 py-1 rounded ${statusColors[transcript.transcriptionStatus]}`}>
                            {transcript.transcriptionStatus === 'completed' ? '✓' : transcript.transcriptionStatus}
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
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-gray-400 text-5xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Transcript Available</h3>
                <p className="text-gray-600">Select a session with available transcript from the list</p>
              </div>
            )}

            {selectedTranscript && session && (
              <div className="space-y-6">
                {/* Session Header */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{session.title}</h2>
                  <p className="text-gray-600 mb-4">{session.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>📅 {selectedTranscript.date}</span>
                    <span>⏱️ {selectedTranscript.metadata.duration}</span>
                    <span>🗣️ {selectedTranscript.metadata.participantCount} speakers</span>
                    <span className={`px-3 py-1 rounded ${statusColors[selectedTranscript.transcriptionStatus]}`}>
                      {selectedTranscript.transcriptionStatus.replace('_', ' ')}
                    </span>
                  </div>

                  {selectedTranscript.notes && (
                    <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                      <p className="text-sm text-cyan-900">{selectedTranscript.notes}</p>
                    </div>
                  )}
                </div>

                {/* Expandable Downloads Section - Dynamic for all sessions */}
                {selectedSession && sessionDownloads[selectedSession] && (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <button
                      onClick={() => setShowDownloads(!showDownloads)}
                      className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-l-4 border-green-500"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📥</span>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-gray-900">Downloads & Resources</h3>
                          <p className="text-sm text-gray-600">Transcripts, articles, quotes, and speaker guides</p>
                        </div>
                      </div>
                      <span className="text-gray-400 text-xl">{showDownloads ? '▼' : '▶'}</span>
                    </button>

                    {showDownloads && (
                      <div className="border-t p-6 bg-gray-50">
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
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <button
                      onClick={() => setShowWordCloud(!showWordCloud)}
                      className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-l-4 border-purple-500"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">☁️</span>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-gray-900">Word Cloud</h3>
                          <p className="text-sm text-gray-600">Top 50 most frequent words from the transcript</p>
                        </div>
                      </div>
                      <span className="text-gray-400 text-xl">{showWordCloud ? '▼' : '▶'}</span>
                    </button>

                    {showWordCloud && (
                      <div className="border-t p-6 bg-gradient-to-br from-purple-50 to-cyan-50">
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Part Header */}
      <div
        className="p-5 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 border-cyan-500"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">
                PART {index + 1}
              </span>
              <span className="text-sm text-gray-500">
                {part.startTime} - {part.endTime}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{part.title}</h3>
            {part.description && (
              <p className="text-sm text-gray-600 mt-1">{part.description}</p>
            )}
            {hasContent && (
              <div className="mt-2 flex items-center gap-2 text-xs text-green-600">
                <span>✓</span>
                <span>Transcript available</span>
              </div>
            )}
          </div>
          <button className="text-gray-400 hover:text-gray-600 ml-4">
            {isExpanded ? '▼' : '▶'}
          </button>
        </div>
      </div>

      {/* Part Content (Expanded) */}
      {isExpanded && (
        <div className="border-t bg-gray-50">
          {/* Notes Section */}
          {part.notes && (
            <div className="p-5 border-b bg-blue-50">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">📝 Notes</h4>
              <p className="text-sm text-blue-800 whitespace-pre-wrap">{part.notes}</p>
            </div>
          )}

          {/* Transcript Segments */}
          {hasContent ? (
            <div className="p-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Transcript</h4>
              <div className="space-y-4">
                {part.segments.map((segment: any, idx: number) => (
                  <div key={idx} className="transcript-segment">
                    {segment.speakerId && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-cyan-700 uppercase">
                          {formatSpeakerName(segment.speakerId)}
                        </span>
                        <span className="text-xs text-gray-400">
                          {segment.startTime}
                        </span>
                      </div>
                    )}
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap pl-4 border-l-2 border-gray-200">
                      {segment.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-400">
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
    'agita-baltbarde': 'Agita Baltbārde'
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
