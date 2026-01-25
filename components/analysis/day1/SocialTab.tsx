export default function SocialTab() {
  const posts = [
    {
      platform: 'LinkedIn',
      content: 'Day 1 of Nordic Circular Summit 2025 in Nuuk revealed something profound: "Trust is the infrastructure of Greenland." Not roads. Not fiber optics. Trust.\n\nIn sparse populations where collaboration can\'t be mandated, social capital becomes more valuable than physical infrastructure.',
      theme: 'Trust as Infrastructure',
      hashtags: ['#CircularEconomy', '#NordicCollaboration', '#SocialCapital']
    },
    {
      platform: 'Twitter',
      content: 'What the circular economy movement is trying to codify—complete utilization, waste elimination, community sharing—Indigenous peoples have practiced for centuries.\n\n"We\'ve never thought of seal skin as waste in Greenland."',
      theme: 'Indigenous Knowledge',
      hashtags: ['#CircularEconomy', '#IndigenousKnowledge', '#Arctic']
    },
    {
      platform: 'LinkedIn',
      content: 'Circular economy is no longer an environmental agenda. It\'s now a matter of competitiveness and security.\n\nKey numbers from Day 1:\n• Atlantic cod: $12 → $5,000 value through 100% utilization\n• Europe remanufacturing: €31B → €100B by 2030\n• 500,000 jobs from remanufacturing expansion',
      theme: 'Economic Resilience',
      hashtags: ['#CircularEconomy', '#BusinessModel', '#Resilience']
    }
  ];

  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--glacial-800)' }}>Social Media Highlights</h2>
      <p className="mb-6" style={{ color: 'var(--foreground)' }}>
        20 ready-to-publish social media posts covering Day 1 cross-session themes, key quotes, and implementation insights.
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
            <p className="whitespace-pre-line mb-3" style={{ color: 'var(--foreground)' }}>{post.content}</p>
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
          <strong>Full social media package:</strong> Download the complete JSON file with 20 posts (13 LinkedIn, 7 Twitter)
          covering all 8 cross-session themes, formatted and ready to publish.
        </p>
      </div>
    </div>
  );
}
