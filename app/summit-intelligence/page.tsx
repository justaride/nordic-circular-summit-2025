import Link from "next/link";
import Header from "@/components/layout/Header";

export default function SummitIntelligencePage() {
  return (
    <div className="min-h-screen">
      <Header
        title="Summit Intelligence Hub"
        subtitle="Strategic Insights & Actionable Opportunities from NCS 2025"
        icon="📊"
        showBackLink={true}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="frost-card rounded-xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-6">🚧</div>
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--glacial-800)" }}
          >
            Coming Soon
          </h2>
          <p className="mb-8" style={{ color: "var(--sage-600)" }}>
            The Summit Intelligence Hub with strategic opportunities, project
            pipeline, funding sources, and key contacts is being prepared.
          </p>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg font-medium transition-colors"
            style={{ background: "var(--glacial-500)", color: "white" }}
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
