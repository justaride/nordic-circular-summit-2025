'use client';

import Link from 'next/link';

export default function Day1AnalysisPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Day 1 Complete Analysis</h1>
        <p className="text-lg text-gray-600 mb-2">
          Nordic Circular Summit 2025 - November 19, 2025
        </p>
        <p className="text-gray-600">
          Comprehensive synthesis of all 6 Day 1 sessions, identifying cross-session themes,
          strategic insights, and implementation priorities.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-cyan-100 rounded-lg p-6">
          <div className="text-3xl font-bold text-cyan-900">6</div>
          <div className="text-cyan-700">Sessions Analyzed</div>
        </div>
        <div className="bg-blue-100 rounded-lg p-6">
          <div className="text-3xl font-bold text-blue-900">5.5</div>
          <div className="text-blue-700">Hours of Content</div>
        </div>
        <div className="bg-purple-100 rounded-lg p-6">
          <div className="text-3xl font-bold text-purple-900">24+</div>
          <div className="text-purple-700">Speakers</div>
        </div>
        <div className="bg-green-100 rounded-lg p-6">
          <div className="text-3xl font-bold text-green-900">8</div>
          <div className="text-green-700">Cross-Session Themes</div>
        </div>
      </div>

      {/* Download Cards */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Day 1 Holistic Outputs</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Executive Summary */}
          <a
            href="/executive/day1-executive-summary.md"
            download
            className="block p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <div className="flex items-start">
              <div className="text-4xl mr-4">📋</div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2">Executive Summary</h3>
                <p className="text-gray-600 mb-3">
                  High-level overview for decision-makers, funders, and policymakers.
                  Top 5 cross-session themes, strategic insights, and implementation priorities.
                </p>
                <div className="text-sm text-gray-500">
                  2,562 words • Markdown
                </div>
              </div>
            </div>
          </a>

          {/* Cross-Session Themes */}
          <a
            href="/highlights/day1-cross-session-themes.md"
            download
            className="block p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <div className="flex items-start">
              <div className="text-4xl mr-4">🔗</div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2">Cross-Session Themes</h3>
                <p className="text-gray-600 mb-3">
                  Deep analysis of 8 major themes appearing across multiple sessions.
                  Includes trust as infrastructure, indigenous knowledge, place-based solutions, and more.
                </p>
                <div className="text-sm text-gray-500">
                  4,778 words • Markdown
                </div>
              </div>
            </div>
          </a>

          {/* Data Visualization */}
          <a
            href="/highlights/day1-by-the-numbers.md"
            download
            className="block p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
          >
            <div className="flex items-start">
              <div className="text-4xl mr-4">📊</div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2">Day 1 By The Numbers</h3>
                <p className="text-gray-600 mb-3">
                  Comprehensive statistics and metrics from all sessions.
                  Geographic representation, key data points, speaker diversity, and more.
                </p>
                <div className="text-sm text-gray-500">
                  3,087 words • Markdown
                </div>
              </div>
            </div>
          </a>

          {/* Social Media Posts */}
          <a
            href="/social-media/day1-holistic-posts.json"
            download
            className="block p-6 border-2 border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-all"
          >
            <div className="flex items-start">
              <div className="text-4xl mr-4">📱</div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2">Social Media Posts</h3>
                <p className="text-gray-600 mb-3">
                  20 platform-ready social media posts covering cross-session themes,
                  top quotes, implementation insights, and Day 2 previews.
                </p>
                <div className="text-sm text-gray-500">
                  20 posts • LinkedIn (13) • Twitter (7) • JSON
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Key Themes Preview */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-bold text-xl mb-4">8 Cross-Session Themes Identified</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <span className="text-2xl mr-3">🤝</span>
            <div>
              <div className="font-semibold">Trust as Infrastructure</div>
              <div className="text-sm text-gray-600">Social capital enabling circular transitions</div>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-3">🌱</span>
            <div>
              <div className="font-semibold">Indigenous Knowledge & Circularity</div>
              <div className="text-sm text-gray-600">Traditional practices as contemporary innovation</div>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-3">📍</span>
            <div>
              <div className="font-semibold">Place-Based Solutions</div>
              <div className="text-sm text-gray-600">Local context over universal templates</div>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-3">💪</span>
            <div>
              <div className="font-semibold">Economic Resilience</div>
              <div className="text-sm text-gray-600">Shortened supply chains as competitive advantage</div>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-3">🔧</span>
            <div>
              <div className="font-semibold">Technology as Enabler</div>
              <div className="text-sm text-gray-600">Tools for transparency, not solutions themselves</div>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-3">✨</span>
            <div>
              <div className="font-semibold">Quality of Life as Purpose</div>
              <div className="text-sm text-gray-600">Beyond metrics to human flourishing</div>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-3">🌍</span>
            <div>
              <div className="font-semibold">Nordic-Arctic-Baltic Collaboration</div>
              <div className="text-sm text-gray-600">Regional partnership as model</div>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-3">🚀</span>
            <div>
              <div className="font-semibold">Implementation Over Planning</div>
              <div className="text-sm text-gray-600">From strategy to concrete action</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 mb-4">
          Want more detailed session content?
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/content"
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Individual Session Content
          </Link>
          <Link
            href="/sessions"
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            Sessions Overview
          </Link>
          <Link
            href="/transcripts"
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            Transcripts
          </Link>
        </div>
      </div>
    </div>
  );
}
