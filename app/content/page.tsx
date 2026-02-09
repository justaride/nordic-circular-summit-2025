import Link from "next/link";
import Header from "@/components/layout/Header";

export default function ContentPage() {
  const sessionsWithContent = [
    {
      id: "circular-frontiers-opening",
      title: "Session 1: Circular Frontiers - Shaping our Future",
      date: "November 19, 2025",
      time: "13:00-14:30",
      filePrefix: "session-1-circular-frontiers",
    },
    {
      id: "circular-ocean-industries",
      title: "Session 2: Circular Ocean Industries",
      date: "November 19, 2025",
      time: "14:00-15:15",
      filePrefix: "session-2-circular-ocean",
    },
    {
      id: "locally-rooted-materialising",
      title: "Session 3: Locally Rooted - Materialising a Circular Future",
      date: "November 19, 2025",
      time: "14:00-15:15",
      filePrefix: "session-3-locally-rooted",
    },
    {
      id: "arctic-nordic-lifestyles",
      title: "Session 4: Arctic & Nordic Lifestyles",
      date: "November 19, 2025",
      time: "13:45-14:45",
      filePrefix: "session-4-arctic-lifestyles",
    },
    {
      id: "circular-cities-regions",
      title: "Session 5: Circular Cities & Regions",
      date: "November 19, 2025",
      time: "15:00-16:00",
      filePrefix: "session-5-circular-cities",
    },
    {
      id: "day1-summary",
      title: "Day 1 Summary: Closing Reflections",
      date: "November 19, 2025",
      time: "16:15-16:45",
      filePrefix: "session-day1-summary",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Content Overview"
        subtitle="All generated content from Nordic Circular Summit 2025 Day 1 sessions"
        icon="📦"
        showBackLink={true}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {sessionsWithContent.map((session, index) => (
            <div
              key={session.id}
              className="border-b pb-8 last:border-b-0"
              style={{ borderColor: "var(--glacial-200)" }}
            >
              {/* Session Header */}
              <div className="mb-6">
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: "var(--glacial-800)" }}
                >
                  {session.title}
                </h2>
                <p className="text-sm" style={{ color: "var(--sage-500)" }}>
                  {session.date} · {session.time}
                </p>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Transcript (Markdown) */}
                <a
                  href={`/transcripts/${session.filePrefix}-CLEAN.md`}
                  download
                  className="frost-card block p-6 rounded-xl transition-all hover:shadow-lg"
                  style={{ borderLeft: "4px solid var(--glacial-400)" }}
                >
                  <div className="text-3xl mb-2">📄</div>
                  <div
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--glacial-800)" }}
                  >
                    Transcript
                  </div>
                  <div className="text-xs" style={{ color: "var(--sage-500)" }}>
                    Markdown · Clean
                  </div>
                </a>

                {/* Transcript (JSON) */}
                <a
                  href={`/transcripts/${session.filePrefix}.json`}
                  download
                  className="frost-card block p-6 rounded-xl transition-all hover:shadow-lg"
                  style={{ borderLeft: "4px solid var(--glacial-500)" }}
                >
                  <div className="text-3xl mb-2">📊</div>
                  <div
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--glacial-800)" }}
                  >
                    Data
                  </div>
                  <div className="text-xs" style={{ color: "var(--sage-500)" }}>
                    JSON · Structured
                  </div>
                </a>

                {/* Article */}
                <a
                  href={`/articles/${session.filePrefix}-article.md`}
                  download
                  className="frost-card block p-6 rounded-xl transition-all hover:shadow-lg"
                  style={{ borderLeft: "4px solid var(--sage-400)" }}
                >
                  <div className="text-3xl mb-2">📰</div>
                  <div
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--glacial-800)" }}
                  >
                    Article
                  </div>
                  <div className="text-xs" style={{ color: "var(--sage-500)" }}>
                    ~5,800 words
                  </div>
                </a>

                {/* Key Quotes & Themes */}
                <a
                  href={`/highlights/${session.filePrefix}-key-quotes.md`}
                  download
                  className="frost-card block p-6 rounded-xl transition-all hover:shadow-lg"
                  style={{ borderLeft: "4px solid var(--sage-500)" }}
                >
                  <div className="text-3xl mb-2">💬</div>
                  <div
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--glacial-800)" }}
                  >
                    Quotes
                  </div>
                  <div className="text-xs" style={{ color: "var(--sage-500)" }}>
                    Key Themes
                  </div>
                </a>

                {/* Social Media */}
                <a
                  href={`/social-media/${session.filePrefix}-posts.json`}
                  download
                  className="frost-card block p-6 rounded-xl transition-all hover:shadow-lg"
                  style={{ borderLeft: "4px solid var(--arctic-400)" }}
                >
                  <div className="text-3xl mb-2">📱</div>
                  <div
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--glacial-800)" }}
                  >
                    Social
                  </div>
                  <div className="text-xs" style={{ color: "var(--sage-500)" }}>
                    {session.id === "day1-summary" ? "10 posts" : "15 posts"}
                  </div>
                </a>
              </div>

              {/* Speaker Guide Link */}
              <div className="mt-4">
                <a
                  href={`/transcripts/SESSION-${index + 1}-SPEAKER-IDENTIFICATION.md`}
                  download
                  className="inline-flex items-center text-sm transition-colors"
                  style={{ color: "var(--glacial-600)" }}
                >
                  <span className="mr-2">📋</span>
                  Speaker Identification Guide
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 frost-card rounded-xl p-6">
          <h3
            className="font-bold text-lg mb-4"
            style={{ color: "var(--glacial-800)" }}
          >
            Content Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--glacial-600)" }}
              >
                6
              </div>
              <div className="text-sm" style={{ color: "var(--sage-600)" }}>
                Sessions Processed
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--sage-600)" }}
              >
                ~50K
              </div>
              <div className="text-sm" style={{ color: "var(--glacial-600)" }}>
                Words Generated
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--glacial-700)" }}
              >
                85
              </div>
              <div className="text-sm" style={{ color: "var(--sage-600)" }}>
                Social Media Posts
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--sage-700)" }}
              >
                36
              </div>
              <div className="text-sm" style={{ color: "var(--glacial-600)" }}>
                Downloadable Files
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 text-center">
          <p className="text-sm mb-4" style={{ color: "var(--arctic-500)" }}>
            Looking for something specific?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/transcripts"
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                background: "var(--glacial-100)",
                color: "var(--glacial-700)",
              }}
            >
              View Transcripts Page
            </Link>
            <Link
              href="/sessions"
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                background: "var(--sage-100)",
                color: "var(--sage-700)",
              }}
            >
              View Sessions Overview
            </Link>
            <Link
              href="/social-media"
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                background: "var(--arctic-100)",
                color: "var(--arctic-700)",
              }}
            >
              View Social Media Hub
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
