import { Speaker, Session, Organization, Theme, Event, Participant, NetworkContact, SessionParticipant } from './types';
import speakersData from '@/data/speakers/speakers.json';
import sessionsData from '@/data/sessions/sessions.json';
import organizationsData from '@/data/organizations/organizations.json';
import themesData from '@/data/themes/themes.json';
import eventData from '@/data/event.json';
import participantsData from '@/data/participants/participants.json';
import networkContactsData from '@/data/participants/network-contacts.json';
import sessionParticipantsData from '@/data/participants/session-participants.json';

export const speakers = speakersData as Speaker[];
export const sessions = sessionsData as Session[];
export const organizations = organizationsData as Organization[];
export const themes = themesData as Theme[];
export const event = eventData as Event;
export const participants = participantsData as Participant[];
export const networkContacts = networkContactsData as NetworkContact[];
export const sessionParticipants = sessionParticipantsData as Record<string, SessionParticipant[]>;

export function getSpeakerById(id: string): Speaker | undefined {
  return speakers.find(s => s.id === id);
}

export function getSessionById(id: string): Session | undefined {
  return sessions.find(s => s.id === id);
}

export function getOrganizationById(id: string): Organization | undefined {
  return organizations.find(o => o.id === id);
}

export function getThemeById(id: string): Theme | undefined {
  return themes.find(t => t.id === id);
}

export function getSpeakersBySession(sessionId: string): Speaker[] {
  const session = getSessionById(sessionId);
  if (!session) return [];
  return session.speakers.map(id => getSpeakerById(id)).filter(Boolean) as Speaker[];
}

export function getSessionsBySpeaker(speakerId: string): Session[] {
  return sessions.filter(session => session.speakers.includes(speakerId));
}

export function getSpeakersByOrganization(organizationId: string): Speaker[] {
  const org = getOrganizationById(organizationId);
  if (!org) return [];
  return org.representatives.map(id => getSpeakerById(id)).filter(Boolean) as Speaker[];
}

export function getSpeakersByCategory(category: Speaker['category']): Speaker[] {
  return speakers.filter(s => s.category === category);
}

export function getSessionsByDay(day: number): Session[] {
  return sessions.filter(s => s.day === day);
}

export function searchSpeakers(query: string): Speaker[] {
  const q = query.toLowerCase();
  return speakers.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.organization.toLowerCase().includes(q) ||
    s.title.toLowerCase().includes(q) ||
    s.topics.some(t => t.toLowerCase().includes(q))
  );
}

export function searchSessions(query: string): Session[] {
  const q = query.toLowerCase();
  return sessions.filter(s =>
    s.title.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q) ||
    s.topics.some(t => t.toLowerCase().includes(q))
  );
}

// Participant functions

export function getParticipantById(id: string): Participant | undefined {
  return participants.find(p => p.id === id);
}

export function getParticipantsBySession(sessionId: string): Participant[] {
  const sessionParts = sessionParticipants[sessionId] || [];
  return sessionParts
    .map(sp => getParticipantById(sp.participantId))
    .filter(Boolean) as Participant[];
}

export function getParticipantsByRole(sessionId: string, role: 'speaker' | 'moderator' | 'panelist' | 'attendee'): Participant[] {
  const sessionParts = sessionParticipants[sessionId] || [];
  const participantIds = sessionParts
    .filter(sp => sp.role === role)
    .map(sp => sp.participantId);

  return participantIds
    .map(id => getParticipantById(id))
    .filter(Boolean) as Participant[];
}

export function getParticipantsByYear(year: number): Participant[] {
  return participants.filter(p =>
    p.participationHistory.some(ph => ph.year === year)
  );
}

export function getParticipantsByOrganization(organizationName: string): Participant[] {
  return participants.filter(p =>
    p.organization.toLowerCase().includes(organizationName.toLowerCase())
  );
}

export function searchParticipants(query: string): Participant[] {
  const q = query.toLowerCase();
  return participants.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.organization.toLowerCase().includes(q) ||
    p.title.toLowerCase().includes(q) ||
    (p.country && p.country.toLowerCase().includes(q))
  );
}

// Network contact functions

export function getNetworkContactById(id: string): NetworkContact | undefined {
  return networkContacts.find(nc => nc.id === id);
}

export function getNetworkContactsByYear(year: number): NetworkContact[] {
  return networkContacts.filter(nc =>
    nc.yearsParticipated.includes(year)
  );
}

export function searchNetworkContacts(query: string): NetworkContact[] {
  const q = query.toLowerCase();
  return networkContacts.filter(nc =>
    nc.name.toLowerCase().includes(q) ||
    nc.organization.toLowerCase().includes(q) ||
    (nc.title && nc.title.toLowerCase().includes(q)) ||
    (nc.country && nc.country.toLowerCase().includes(q))
  );
}

// Session participant functions

export function getSessionParticipantsBySession(sessionId: string): SessionParticipant[] {
  return sessionParticipants[sessionId] || [];
}

export function getSessionParticipantsByStatus(sessionId: string, status: 'confirmed' | 'declined' | 'pending' | 'in_contact'): SessionParticipant[] {
  const sessionParts = sessionParticipants[sessionId] || [];
  return sessionParts.filter(sp => sp.status === status);
}

// Statistics functions

export function getParticipantStats() {
  const totalParticipants = participants.length;
  const historicalContacts = networkContacts.length;
  const totalSessions = Object.keys(sessionParticipants).length;
  const totalSessionParticipants = Object.values(sessionParticipants).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  // Count participants by year
  const byYear: Record<number, number> = {};
  participants.forEach(p => {
    p.participationHistory.forEach(ph => {
      byYear[ph.year] = (byYear[ph.year] || 0) + 1;
    });
  });

  // Count by country
  const byCountry: Record<string, number> = {};
  participants.forEach(p => {
    if (p.country) {
      byCountry[p.country] = (byCountry[p.country] || 0) + 1;
    }
  });

  return {
    totalParticipants,
    historicalContacts,
    totalSessions,
    totalSessionParticipants,
    byYear,
    byCountry,
  };
}
