'use client';

import Link from 'next/link';

export default function KumuMapPage() {
    return (
        <div className="min-h-screen bg-[#FFF9F0]">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm z-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div>
                        <Link href="/" className="inline-flex items-center mb-1 transition-colors" style={{ color: 'var(--glacial-600)' }}>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🗺️</span>
                            <h1 className="text-2xl font-bold" style={{ color: 'var(--glacial-800)' }}>Kumu Network Map</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)]">
                <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <iframe
                        src="https://embed.kumu.io/6995f2b5e2944ab446db03c9a709fbe9"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 'none' }}
                        title="Nordic Circular Summit Network Map"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
