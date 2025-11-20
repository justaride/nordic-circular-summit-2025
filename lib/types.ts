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
  contact?: {
    email?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    phone?: string;
  };
  links?: {
    companyProfile?: string;
    articles?: string[];
    presentations?: string[];
  };
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
  contact?: {
    email?: string;
    phone?: string;
    linkedin?: string;
    twitter?: string;
    address?: string;
  };
  details?: {
    founded?: string;
    employees?: string;
    industry?: string;
    focus?: string[];
  };
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

export interface TranscriptSegment {
  startTime: string; // e.g., "09:15:00" or "00:15:30"
  endTime: string;
  text: string;
  speakerId?: string; // Optional speaker attribution
}

export interface SessionPart {
  id: string;
  title: string; // e.g., "Welcome by session moderators", "Keynote 1", "Panel Discussion"
  startTime: string;
  endTime: string;
  description?: string;
  speakers: string[]; // speaker IDs
  segments: TranscriptSegment[]; // Transcript segments for this part
  notes?: string; // User notes for this part
}

export interface Transcript {
  id: string;
  sessionId: string;
  date: string; // Date of recording
  recordingFile?: string; // Path to audio/video file
  transcriptionStatus: 'pending' | 'in_progress' | 'completed' | 'needs_review';
  parts: SessionPart[]; // Session broken into parts based on program
  fullTranscript?: string; // Full transcript text if needed
  notes?: string; // Overall session notes
  metadata?: {
    duration?: string;
    recordedBy?: string;
    transcribedBy?: string;
    language?: string;
  };
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
  date: string;
  time_relative?: string;
  author?: string;
  author_title?: string;
  content: string;
  hashtags: string[];
  mentions: string[];
  media: string[];
  engagement: {
    likes: number;
    comments: number;
    shares?: number;
  };
  status: 'draft' | 'scheduled' | 'published';
  post_type: string;
  language?: string;
  sessionId?: string;
  scheduledFor?: string;
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

// Extended data model for network enrichment

export interface ParticipationRecord {
  year: number;
  role?: string;
  organization: string;
  sessions?: string[]; // session IDs
  title?: string;
}

export interface SessionRole {
  sessionId: string;
  role: 'speaker' | 'moderator' | 'panelist' | 'attendee';
  status: 'confirmed' | 'declined' | 'pending' | 'in_contact';
  presence: 'nuuk' | 'digital' | 'hybrid';
  timeSlot?: string;
  presentationDelivered?: boolean;
  segment?: string; // e.g., "Arctic & Greenlandic Perspectives"
}

export interface Participant {
  id: string;
  name: string;
  title: string;
  organization: string;
  country: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  bio?: string;
  photo?: string;
  logo?: string;
  gender?: 'Male' | 'Female' | 'Other';
  segment?: string; // government, corporate, academic, etc.
  participationHistory: ParticipationRecord[];
  sessionRoles: SessionRole[];
  bioDelivered?: boolean;
  photoDelivered?: boolean;
  logoDelivered?: boolean;
  // Additional fields from historical data
  twitter?: string;
  website?: string;
}

export interface NetworkContact {
  id: string;
  name: string;
  organization: string;
  title?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  country?: string;
  segment?: string;
  yearsParticipated: number[]; // e.g., [2020, 2021, 2023]
  notes?: string;
}

export interface SessionParticipant {
  sessionId: string;
  participantId: string;
  role: 'speaker' | 'moderator' | 'panelist' | 'attendee';
  status: 'confirmed' | 'declined' | 'pending' | 'in_contact';
  presence: 'nuuk' | 'digital' | 'hybrid';
  timeSlot?: string;
  presentationDelivered?: boolean;
}
