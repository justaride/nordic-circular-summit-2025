import { useState } from 'react';
import { quotesData } from '@/lib/quotes';

export default function QuotesViewer({ sessionId }: { sessionId: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const data = quotesData[sessionId];

  if (!data) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-l-4 border-purple-500"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">💬</span>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900">Key Quotes & Themes</h3>
            <p className="text-sm text-gray-600">Top insights and core themes from this session</p>
          </div>
        </div>
        <span className="text-gray-400 text-xl">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="border-t p-6 bg-purple-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Quotes */}
            <div>
              <h4 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                <span className="text-xl">❝</span> Top Quotes
              </h4>
              <div className="space-y-4">
                {data.topQuotes && data.topQuotes.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                    <p className="text-gray-800 italic mb-3">"{item.quote}"</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="font-bold text-sm text-gray-900">{item.author}</p>
                        <p className="text-xs text-gray-500">{item.org}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                        {item.theme}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Themes */}
            <div>
              <h4 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                <span className="text-xl">🎯</span> Core Themes
              </h4>
              <div className="space-y-4">
                {data.coreThemes && data.coreThemes.map((theme, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{theme.icon}</span>
                      <h5 className="font-bold text-gray-900">{theme.title}</h5>
                    </div>
                    <ul className="space-y-1 ml-9">
                      {theme.points.map((point, pIdx) => (
                        <li key={pIdx} className="text-sm text-gray-700 list-disc">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
