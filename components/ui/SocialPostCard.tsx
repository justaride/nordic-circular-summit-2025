import { SocialMediaPost } from '@/lib/types';

interface SocialPostCardProps {
  post: SocialMediaPost;
}

const platformColors: Record<string, { bg: string; text: string }> = {
  instagram: { bg: 'linear-gradient(135deg, var(--glacial-500) 0%, var(--sage-500) 100%)', text: 'white' },
  linkedin: { bg: 'var(--glacial-600)', text: 'white' },
  twitter: { bg: 'var(--arctic-600)', text: 'white' },
  facebook: { bg: 'var(--sage-600)', text: 'white' }
};

const platformIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
    </svg>
  ),
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
};

export default function SocialPostCard({ post }: SocialPostCardProps) {
  return (
    <div className="frost-card rounded-xl shadow-lg overflow-hidden">
      {/* Post Header */}
      <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--glacial-200)' }}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg text-white" style={{ background: platformColors[post.platform]?.bg || 'var(--glacial-500)' }}>
            {platformIcons[post.platform]}
          </div>
          <div>
            {post.author && (
              <p className="font-semibold" style={{ color: 'var(--glacial-800)' }}>{post.author}</p>
            )}
            {post.author_title && (
              <p className="text-xs" style={{ color: 'var(--sage-600)' }}>{post.author_title}</p>
            )}
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--arctic-500)' }}>
              <span>{post.date}</span>
              {post.time_relative && (
                <>
                  <span>•</span>
                  <span>{post.time_relative}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <span className="text-xs px-3 py-1 rounded-full capitalize" style={{ background: 'var(--arctic-100)', color: 'var(--arctic-700)' }}>
          {post.post_type.replace('_', ' ')}
        </span>
      </div>

      {/* Post Content */}
      <div className="p-6">
        <p className="whitespace-pre-line" style={{ color: 'var(--foreground)' }}>{post.content}</p>

        {/* Hashtags and Mentions */}
        {(post.hashtags.length > 0 || post.mentions.length > 0) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.hashtags.map((tag, idx) => (
              <span key={idx} className="text-sm font-medium" style={{ color: 'var(--glacial-600)' }}>
                {tag}
              </span>
            ))}
            {post.mentions.map((mention, idx) => (
              <span key={idx} className="text-sm font-medium" style={{ color: 'var(--sage-600)' }}>
                {mention}
              </span>
            ))}
          </div>
        )}

        {/* Media Tags */}
        {post.media.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.media.map((item, idx) => (
              <span key={idx} className="text-xs px-2 py-1 rounded" style={{ background: 'var(--arctic-100)', color: 'var(--arctic-600)' }}>
                📷 {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Engagement Stats */}
      <div className="px-6 py-4 border-t" style={{ background: 'var(--arctic-50)', borderColor: 'var(--glacial-200)' }}>
        <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--sage-600)' }}>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{post.engagement.likes} likes</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{post.engagement.comments} comments</span>
          </div>
          {post.engagement.shares !== undefined && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>{post.engagement.shares} shares</span>
            </div>
          )}
          {post.language && (
            <span className="ml-auto text-xs px-2 py-1 rounded capitalize" style={{ background: 'var(--glacial-100)', color: 'var(--glacial-700)' }}>
              {post.language}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
