'use client';

import Header from '@/components/layout/Header';

export default function KumuMapPage() {
    return (
        <div className="min-h-screen bg-[#FFF9F0] flex flex-col">
            <Header 
                title="Kumu Network Map" 
                icon="🗺️" 
                showBackLink={true} 
            />

            {/* Main Content */}
            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200" style={{ minHeight: '600px' }}>
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
