import { readFileSync } from 'fs';
import { join } from 'path';
import { SocialMediaPost } from '@/lib/types';
import Header from '@/components/layout/Header';
import SocialPostCard from '@/components/ui/SocialPostCard';

function getSocialMediaPosts(): SocialMediaPost[] {
  try {
    const dataPath = join(process.cwd(), 'data', 'social-media', 'all-posts.json');
    const fileContent = readFileSync(dataPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

export default function SocialMediaPage() {
  const posts = getSocialMediaPosts();

  const stats = {
    total: posts.length,
    instagram: posts.filter(p => p.platform === 'instagram').length,
    linkedin: posts.filter(p => p.platform === 'linkedin').length,
    published: posts.filter(p => p.status === 'published').length,
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Social Media"
        subtitle="Historical posts and social media workflow"
        icon="📱"
        showBackLink={true}
      />

      {/* Statistics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="frost-card rounded-xl shadow-lg p-6" style={{ borderLeft: '4px solid var(--glacial-400)' }}>
            <p className="text-sm mb-1" style={{ color: 'var(--sage-600)' }}>Total Posts</p>
            <p className="text-3xl font-bold" style={{ color: 'var(--glacial-800)' }}>{stats.total}</p>
          </div>
          <div className="rounded-xl shadow-lg p-6 text-white" style={{ background: 'linear-gradient(135deg, var(--glacial-500) 0%, var(--sage-500) 100%)' }}>
            <p className="text-sm opacity-90 mb-1">Instagram</p>
            <p className="text-3xl font-bold">{stats.instagram}</p>
          </div>
          <div className="rounded-xl shadow-lg p-6 text-white" style={{ background: 'var(--glacial-600)' }}>
            <p className="text-sm opacity-90 mb-1">LinkedIn</p>
            <p className="text-3xl font-bold">{stats.linkedin}</p>
          </div>
          <div className="rounded-xl shadow-lg p-6 text-white" style={{ background: 'var(--sage-600)' }}>
            <p className="text-sm opacity-90 mb-1">Published</p>
            <p className="text-3xl font-bold">{stats.published}</p>
          </div>
        </div>

        {/* Post Feed */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--glacial-800)' }}>Historical Posts</h2>

          {posts.map((post) => (
            <SocialPostCard key={post.id} post={post} />
          ))}

          {posts.length === 0 && (
            <div className="frost-card rounded-xl shadow-lg p-12 text-center">
              <p style={{ color: 'var(--arctic-500)' }}>No social media posts found</p>
              <p className="text-sm mt-2" style={{ color: 'var(--arctic-400)' }}>Posts will appear here once imported</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
