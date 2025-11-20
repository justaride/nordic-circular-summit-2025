'use client';

import Link from 'next/link';
import { sessions } from '@/lib/data';

export default function ContentPage() {
  // Filter sessions with transcripts (Sessions 1-5 + Day 1 Summary)
  const sessionsWithContent = [
    {
      id: 'circular-frontiers-opening',
      title: 'Session 1: Circular Frontiers - Shaping our Future',
      date: 'November 19, 2025',
      time: '13:00-14:30',
      filePrefix: 'session-1-circular-frontiers'
    },
    {
      id: 'circular-ocean-industries',
      title: 'Session 2: Circular Ocean Industries',
      date: 'November 19, 2025',
      time: '14:00-15:15',
      filePrefix: 'session-2-circular-ocean'
    },
    {
      id: 'locally-rooted-materialising',
      title: 'Session 3: Locally Rooted - Materialising a Circular Future',
      date: 'November 19, 2025',
      time: '14:00-15:15',
      filePrefix: 'session-3-locally-rooted'
    },
    {
      id: 'arctic-nordic-lifestyles',
      title: 'Session 4: Arctic & Nordic Lifestyles',
      date: 'November 19, 2025',
      time: '13:45-14:45',
      filePrefix: 'session-4-arctic-lifestyles'
    },
    {
      id: 'circular-cities-regions',
      title: 'Session 5: Circular Cities & Regions',
      date: 'November 19, 2025',
      time: '15:00-16:00',
      filePrefix: 'session-5-circular-cities'
    },
    {
      id: 'day1-summary',
      title: 'Day 1 Summary: Closing Reflections',
      date: 'November 19, 2025',
      time: '16:15-16:45',
      filePrefix: 'session-day1-summary'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Content Overview</h1>
        <p className="text-lg text-gray-600">
          All generated content from Nordic Circular Summit 2025 Day 1 sessions.
          Download transcripts, articles, key quotes, and social media content.
        </p>
      </div>

      <div className="space-y-12">
        {sessionsWithContent.map((session, index) => (
          <div key={session.id} className="border-b border-gray-200 pb-8 last:border-b-0">
            {/* Session Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{session.title}</h2>
              <p className="text-sm text-gray-500">
                {session.date} · {session.time}
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Transcript (Markdown) */}
              <a
                href={`/transcripts/${session.filePrefix}-CLEAN.md`}
                download
                className="block p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="text-3xl mb-2">📄</div>
                <div className="font-semibold text-sm mb-1">Transcript</div>
                <div className="text-xs text-gray-500">Markdown · Clean</div>
              </a>

              {/* Transcript (JSON) */}
              <a
                href={`/transcripts/${session.filePrefix}.json`}
                download
                className="block p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="text-3xl mb-2">📊</div>
                <div className="font-semibold text-sm mb-1">Data</div>
                <div className="text-xs text-gray-500">JSON · Structured</div>
              </a>

              {/* Article */}
              <a
                href={`/articles/${session.filePrefix}-article.md`}
                download
                className="block p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <div className="text-3xl mb-2">📰</div>
                <div className="font-semibold text-sm mb-1">Article</div>
                <div className="text-xs text-gray-500">~5,800 words</div>
              </a>

              {/* Key Quotes & Themes */}
              <a
                href={`/highlights/${session.filePrefix}-key-quotes.md`}
                download
                className="block p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
              >
                <div className="text-3xl mb-2">💬</div>
                <div className="font-semibold text-sm mb-1">Quotes</div>
                <div className="text-xs text-gray-500">Key Themes</div>
              </a>

              {/* Social Media */}
              <a
                href={`/social-media/${session.filePrefix}-posts.json`}
                download
                className="block p-6 border-2 border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-all"
              >
                <div className="text-3xl mb-2">📱</div>
                <div className="font-semibold text-sm mb-1">Social</div>
                <div className="text-xs text-gray-500">
                  {session.id === 'day1-summary' ? '10 posts' : '15 posts'}
                </div>
              </a>
            </div>

            {/* Speaker Guide Link */}
            <div className="mt-4">
              <a
                href={`/transcripts/SESSION-${index + 1}-SPEAKER-IDENTIFICATION.md`}
                download
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <span className="mr-2">📋</span>
                Speaker Identification Guide
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-bold text-lg mb-4">Content Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold text-blue-600">6</div>
            <div className="text-sm text-gray-600">Sessions Processed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">~50K</div>
            <div className="text-sm text-gray-600">Words Generated</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">85</div>
            <div className="text-sm text-gray-600">Social Media Posts</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600">36</div>
            <div className="text-sm text-gray-600">Downloadable Files</div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 mb-4">
          Looking for something specific?
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/transcripts"
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            View Transcripts Page
          </Link>
          <Link
            href="/sessions"
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            View Sessions Overview
          </Link>
          <Link
            href="/social-media"
            className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
          >
            View Social Media Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
