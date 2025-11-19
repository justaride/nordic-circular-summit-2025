export interface Speaker {
  id: string;
  name: string;
  title: string;
  organization: string;
  country: string;
  category: 'government' | 'municipal' | 'corporate' | 'academic' | 'industry' | 'organization' | 'sustainability';
  bio: string;
  photo: string;
  sessions: string[];
  topics: string[];
}

export interface Session {
  id: string;
  day: number;
  title: string;
  startTime: string;
  endTime: string;
  timezone: string;
  type: 'keynote' | 'panel' | 'workshop' | 'digital';
  description: string;
  speakers: string[];
  moderators: string[];
  topics: string[];
  location: string;
  onlineAvailable: boolean;
  transcriptFile: string;
  notes: string;
}

export interface Organization {
  id: string;
  name: string;
  type: 'host' | 'partner' | 'corporate' | 'financial' | 'innovation' | 'research' | 'academic';
  country: string;
  description: string;
  website: string;
  logo: string;
  representatives: string[];
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  color: string;
}

export interface Event {
  name: string;
  theme: string;
  tagline: string;
  dates: {
    start: string;
    end: string;
  };
  location: {
    venue: string;
    city: string;
    country: string;
    timezone: string;
  };
  format: {
    inPerson: boolean;
    online: boolean;
  };
  description: string;
  website: string;
  organizers: string[];
  partners: string[];
  wcefSideEvent: boolean;
}

export interface Transcript {
  sessionId: string;
  timestamp: string;
  content: string;
  speakers: {
    speakerId: string;
    segments: {
      startTime: string;
      endTime: string;
      text: string;
    }[];
  }[];
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  sessionId: string;
  content: string;
  tags: string[];
  status: 'draft' | 'review' | 'published';
}

export interface SocialMediaPost {
  id: string;
  platform: 'linkedin' | 'twitter' | 'instagram' | 'facebook';
  sessionId: string;
  content: string;
  media: string[];
  tags: string[];
  scheduledFor: string;
  status: 'draft' | 'scheduled' | 'published';
}

export interface Highlight {
  id: string;
  sessionId: string;
  speakerId: string;
  quote: string;
  context: string;
  timestamp: string;
  topics: string[];
}
