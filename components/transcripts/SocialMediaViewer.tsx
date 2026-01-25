import { useState } from 'react';

interface SocialPost {
  content: string;
  author?: string;
  handle?: string;
  likes?: number;
  retweets?: number;
  hashtags?: string[];
  platform?: 'twitter' | 'linkedin';
}

interface SocialMediaViewerProps {
  posts: SocialPost[];
}

export default function SocialMediaViewer({ posts }: SocialMediaViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!posts || posts.length === 0) return null;

  return (
    <div className="frost-card rounded-xl shadow-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between transition-colors border-l-4"
        style={{ borderColor: 'var(--arctic-400)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">📱</span>
          <div className="text-left">
            <h3 className="text-lg font-bold" style={{ color: 'var(--glacial-800)' }}>Social Media Highlights</h3>
            <p className="text-sm" style={{ color: 'var(--sage-600)' }}>Ready-to-share posts and community reactions</p>
          </div>
        </div>
        <span className="text-xl" style={{ color: 'var(--glacial-400)' }}>{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="border-t p-6" style={{ background: 'var(--arctic-50)', borderColor: 'var(--glacial-100)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                      {post.author ? post.author[0] : 'U'}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">{post.author || 'Summit Attendee'}</div>
                      <div className="text-xs text-gray-500">{post.handle || '@attendee'}</div>
                    </div>
                  </div>
                  <span className="text-blue-400">
                    {/* Twitter Icon */}
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </span>
                </div>
                <p className="text-sm text-gray-800 mb-3">{post.content}</p>
                {post.hashtags && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.hashtags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-xs text-blue-500">#{tag}</span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4 text-xs text-gray-500 border-t pt-2">
                  <span className="flex items-center gap-1">❤️ {post.likes || 0}</span>
                  <span className="flex items-center gap-1">🔁 {post.retweets || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
