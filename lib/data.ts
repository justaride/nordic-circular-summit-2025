import { Speaker, Session, Organization, Theme, Event } from './types';
import speakersData from '@/data/speakers/speakers.json';
import sessionsData from '@/data/sessions/sessions.json';
import organizationsData from '@/data/organizations/organizations.json';
import themesData from '@/data/themes/themes.json';
import eventData from '@/data/event.json';

export const speakers = speakersData as Speaker[];
export const sessions = sessionsData as Session[];
export const organizations = organizationsData as Organization[];
export const themes = themesData as Theme[];
export const event = eventData as Event;

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
