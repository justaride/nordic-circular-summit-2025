import Link from 'next/link';
import Image from 'next/image';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Back to Home Link */}
        <div className="mb-8 text-left">
          <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border-2 border-cyan-500">
          {/* Retro Terminal Header */}
          <div className="mb-6 font-mono text-left">
            <div className="bg-black p-2 rounded text-green-400 text-sm">
              <span className="text-red-500">▶</span> SYSTEM_ACCESS.exe
            </div>
          </div>

          {/* GIF */}
          <div className="mb-6 rounded-lg overflow-hidden border-4 border-black shadow-xl">
            <Image
              src="/nonono.gif"
              alt="Ah ah ah, you didn't say the magic word"
              width={500}
              height={375}
              className="w-full h-auto"
              unoptimized
            />
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-cyan-400 font-mono">
              AH AH AH!
            </h1>
            <p className="text-xl text-gray-300 font-mono">
              You didn't say the magic word...
            </p>

            <div className="my-6 border-t border-gray-700 pt-6">
              <p className="text-gray-400 mb-2">
                🦖 Search functionality coming soon
              </p>
              <p className="text-sm text-gray-500 italic">
                (We spared no expense... well, maybe on the search feature)
              </p>
            </div>

            {/* Navigation Options */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <Link
                href="/sessions"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Browse Sessions
              </Link>
              <Link
                href="/transcripts"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                View Transcripts
              </Link>
            </div>

            <div className="mt-4">
              <Link
                href="/"
                className="text-cyan-400 hover:text-cyan-300 underline text-sm"
              >
                Or return to the main gate (homepage)
              </Link>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-500 font-mono">
              JURASSIC PARK COMPUTER SYSTEM v1.0.1
              <br />
              © 1993 InGen Technologies
              <br />
              <span className="text-cyan-500">Nordic Circular Summit Edition</span>
            </p>
          </div>
        </div>

        {/* Easter Egg Message */}
        <p className="mt-6 text-gray-600 text-sm font-mono">
          💡 Tip: Use browser search (Cmd/Ctrl+F) while viewing pages for now
        </p>
      </div>
    </div>
  );
}
