export default function SocialTab() {
  const posts = [
    {
      platform: 'LinkedIn',
      content: 'Day 2 of Nordic Circular Summit 2025: From vision to implementation.\n\n"No single market has scaled feedstock volumes or technology mix available to build a circular textile system alone."\n\nThe Nordic-Baltic Textile Transition Group launched today—8 countries building regional infrastructure together.',
      theme: 'Regional Collaboration',
      hashtags: ['#CircularEconomy', '#NordicBaltic', '#TextileCircularity']
    },
    {
      platform: 'Twitter',
      content: 'The most sustainable building is the one already built.\n\n200,000+ unused buildings in Norwegian districts.\n130,000 potential housing units from splitting large houses.\n\nWe don\'t need to build more—we need to use what exists. #CircularConstruction',
      theme: 'Building on What Exists',
      hashtags: ['#CircularConstruction', '#SustainableBuilding', '#Nordic']
    },
    {
      platform: 'LinkedIn',
      content: 'Key insight from Day 2:\n\n"Competing brands that would not in a million years sit together five years ago—they\'re actually quite willing to sit together."\n\nPre-competitive collaboration works when challenges are too big for any single company.\n\nDanish textile sector: 40 companies. Shared goals. Annual reporting.',
      theme: 'Pre-Competitive Collaboration',
      hashtags: ['#Collaboration', '#CircularEconomy', '#BusinessTransformation']
    }
  ];

  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--glacial-800)' }}>Social Media Highlights</h2>
      <p className="mb-6" style={{ color: '#111827' }}>
        15 ready-to-publish social media posts covering Day 2 cross-session themes, key quotes, and implementation insights.
      </p>

      <div className="space-y-6">
        {posts.map((post, i) => (
          <div key={i} className="rounded-xl p-4 shadow-lg" style={{ background: 'var(--arctic-50)', border: '1px solid var(--glacial-200)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded text-sm font-semibold" style={{
                background: post.platform === 'LinkedIn' ? 'var(--glacial-100)' : 'var(--sage-100)',
                color: post.platform === 'LinkedIn' ? 'var(--glacial-700)' : 'var(--sage-700)'
              }}>
                {post.platform}
              </span>
              <span className="text-sm" style={{ color: 'var(--arctic-500)' }}>{post.theme}</span>
            </div>
            <p className="whitespace-pre-line mb-3" style={{ color: '#111827' }}>{post.content}</p>
            <div className="flex flex-wrap gap-2">
              {post.hashtags.map((tag, j) => (
                <span key={j} className="text-sm" style={{ color: 'var(--glacial-600)' }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl" style={{ background: 'var(--glacial-50)' }}>
        <p className="text-sm" style={{ color: 'var(--glacial-800)' }}>
          <strong>Full social media package:</strong> Download the complete JSON file with 15 posts
          covering all Day 2 themes, formatted and ready to publish.
        </p>
      </div>
    </div>
  );
}
