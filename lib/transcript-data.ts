// Load actual transcript data - Day 1
import session1Transcript from '@/data/transcripts/session-1-circular-frontiers.json';
import session1SocialPosts from '@/data/social-media/session-1-posts.json';
import session2Transcript from '@/data/transcripts/session-2-circular-ocean.json';
import session2SocialPosts from '@/data/social-media/session-2-posts.json';
import session3Transcript from '@/data/transcripts/session-3-locally-rooted.json';
import session3SocialPosts from '@/data/social-media/session-3-posts.json';
import session4Transcript from '@/data/transcripts/session-4-arctic-lifestyles.json';
import session4SocialPosts from '@/data/social-media/session-4-posts.json';
import session5Transcript from '@/data/transcripts/session-5-circular-cities.json';
import session5SocialPosts from '@/data/social-media/session-5-posts.json';
import day1SummaryTranscript from '@/data/transcripts/session-day1-summary.json';
import day1SummarySocialPosts from '@/data/social-media/session-day1-summary-posts.json';

// Load actual transcript data - Day 2
import day2CircularDesignToolboxTranscript from '@/data/transcripts/day2-session-circular-design-toolbox.json';
import day2NbttTextilesTranscript from '@/data/transcripts/day2-session-nbtt-textiles.json';
import day2CircularConstructionTranscript from '@/data/transcripts/day2-session-circular-construction.json';

// Load social posts - Day 2
import day2ConstructionSocialPosts from '@/data/social-media/day2-session-1-construction-posts.json';
import day2NbttSocialPosts from '@/data/social-media/day2-session-4-nbtt-posts.json';
import day2ToolboxSocialPosts from '@/data/social-media/day2-session-5-toolbox-posts.json';

// Map transcripts by session ID
export const transcriptData: Record<string, any> = {
  // Day 1
  'circular-frontiers-opening': session1Transcript,
  'circular-ocean-industries': session2Transcript,
  'locally-rooted-materialising': session3Transcript,
  'arctic-nordic-lifestyles': session4Transcript,
  'circular-cities-regions': session5Transcript,
  'day1-summary': day1SummaryTranscript,
  // Day 2
  'day2-circular-design-toolbox': day2CircularDesignToolboxTranscript,
  'day2-nbtt-textiles': day2NbttTextilesTranscript,
  'day2-circular-construction': day2CircularConstructionTranscript
};

// Map social posts by session ID
export const socialPostsData: Record<string, any[]> = {
  // Day 1
  'circular-frontiers-opening': session1SocialPosts,
  'circular-ocean-industries': session2SocialPosts,
  'locally-rooted-materialising': session3SocialPosts,
  'arctic-nordic-lifestyles': session4SocialPosts,
  'circular-cities-regions': session5SocialPosts,
  'day1-summary': day1SummarySocialPosts,
  // Day 2
  'day2-circular-construction': day2ConstructionSocialPosts,
  'day2-nbtt-textiles': day2NbttSocialPosts,
  'day2-circular-design-toolbox': day2ToolboxSocialPosts
};

// Session-specific download files mapping
export const sessionDownloads: Record<string, {
  transcript: string;
  json: string;
  article: string;
  highlights: string;
  speakerGuide: string;
}> = {
  'circular-frontiers-opening': {
    transcript: '/transcripts/session-1-circular-frontiers-CLEAN.md',
    json: '/transcripts/session-1-circular-frontiers.json',
    article: '/articles/session-1-circular-frontiers-article.md',
    highlights: '/highlights/session-1-key-quotes-and-themes.md',
    speakerGuide: '/transcripts/SESSION-1-SPEAKER-IDENTIFICATION.md'
  },
  'circular-ocean-industries': {
    transcript: '/transcripts/session-2-circular-ocean-CLEAN.md',
    json: '/transcripts/session-2-circular-ocean.json',
    article: '/articles/session-2-circular-ocean-article.md',
    highlights: '/highlights/session-2-key-quotes-and-themes.md',
    speakerGuide: '/transcripts/SESSION-2-SPEAKER-IDENTIFICATION.md'
  },
  'locally-rooted-materialising': {
    transcript: '/transcripts/session-3-locally-rooted-CLEAN.md',
    json: '/transcripts/session-3-locally-rooted.json',
    article: '/articles/session-3-locally-rooted-article.md',
    highlights: '/highlights/session-3-key-quotes-and-themes.md',
    speakerGuide: '/transcripts/SESSION-3-SPEAKER-IDENTIFICATION.md'
  },
  'arctic-nordic-lifestyles': {
    transcript: '/transcripts/session-4-arctic-lifestyles-CLEAN.md',
    json: '/transcripts/session-4-arctic-lifestyles.json',
    article: '/articles/session-4-arctic-lifestyles-article.md',
    highlights: '/highlights/session-4-key-quotes-and-themes.md',
    speakerGuide: '/transcripts/SESSION-4-SPEAKER-IDENTIFICATION.md'
  },
  'circular-cities-regions': {
    transcript: '/transcripts/session-5-circular-cities-CLEAN.md',
    json: '/transcripts/session-5-circular-cities.json',
    article: '/articles/session-5-circular-cities-article.md',
    highlights: '/highlights/session-5-key-quotes-and-themes.md',
    speakerGuide: '/transcripts/SESSION-5-SPEAKER-IDENTIFICATION.md'
  },
  'day1-summary': {
    transcript: '/transcripts/session-day1-summary-CLEAN.md',
    json: '/transcripts/session-day1-summary.json',
    article: '/articles/session-day1-summary-reflections.md',
    highlights: '/highlights/session-day1-summary-key-quotes.md',
    speakerGuide: '/transcripts/SESSION-DAY1-SUMMARY-SPEAKER-IDENTIFICATION.md'
  },
  // Day 2 Sessions - With Transcripts
  'day2-circular-design-toolbox': {
    transcript: '/transcripts/day2-session-circular-design-toolbox-CLEAN.md',
    json: '/transcripts/day2-session-circular-design-toolbox.json',
    article: '/articles/day2-circular-design-toolbox-article.md',
    highlights: '/highlights/day2-circular-design-toolbox-key-quotes.md',
    speakerGuide: '/transcripts/DAY2-SESSION-CIRCULAR-DESIGN-TOOLBOX-SPEAKER-IDENTIFICATION.md'
  },
  'day2-nbtt-textiles': {
    transcript: '/transcripts/day2-session-nbtt-textiles-CLEAN.md',
    json: '/transcripts/day2-session-nbtt-textiles.json',
    article: '/articles/day2-nbtt-textiles-article.md',
    highlights: '/highlights/day2-nbtt-textiles-key-quotes.md',
    speakerGuide: '/transcripts/DAY2-SESSION-NBTT-TEXTILES-SPEAKER-IDENTIFICATION.md'
  },
  'day2-circular-construction': {
    transcript: '/transcripts/day2-session-circular-construction-CLEAN.md',
    json: '/transcripts/day2-session-circular-construction.json',
    article: '/articles/day2-circular-construction-article.md',
    highlights: '/highlights/day2-circular-construction-key-quotes.md',
    speakerGuide: '/transcripts/DAY2-SESSION-CIRCULAR-CONSTRUCTION-SPEAKER-IDENTIFICATION.md'
  },
  // Day 2 Sessions - No Recording
  'day2-welcome-introduction': {
    transcript: '',
    json: '',
    article: '',
    highlights: '',
    speakerGuide: ''
  },
  'day2-arctic-materials-governance': {
    transcript: '',
    json: '',
    article: '',
    highlights: '',
    speakerGuide: ''
  },
  'day2-circular-skills-knowledge': {
    transcript: '',
    json: '',
    article: '',
    highlights: '',
    speakerGuide: ''
  },
  'day2-circular-port-cities': {
    transcript: '',
    json: '',
    article: '',
    highlights: '',
    speakerGuide: ''
  }
};
