'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { participants, getParticipantStats } from '@/lib/data';
import { Participant } from '@/lib/types';

export default function ParticipantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const stats = getParticipantStats();

  const years = useMemo(() => {
    return Object.keys(stats.byYear)
      .map(Number)
      .sort((a, b) => b - a);
  }, [stats.byYear]);

  const countries = useMemo(() => {
    return Object.keys(stats.byCountry).sort();
  }, [stats.byCountry]);

  const filteredParticipants = useMemo(() => {
    let filtered = participants;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.organization.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          (p.country && p.country.toLowerCase().includes(q))
      );
    }

    if (selectedYear) {
      filtered = filtered.filter((p) =>
        p.participationHistory.some((ph) => ph.year === selectedYear)
      );
    }

    if (selectedCountry) {
      filtered = filtered.filter((p) => p.country === selectedCountry);
    }

    return filtered;
  }, [searchQuery, selectedYear, selectedCountry]);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center transition-colors" style={{ color: 'var(--glacial-600)' }}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">🌐</span>
            <h1 className="text-5xl font-bold" style={{ color: 'var(--glacial-800)' }}>
              Participant Network
            </h1>
          </div>
          <p className="text-xl" style={{ color: 'var(--sage-600)' }}>
            Explore the Nordic Circular Summit community network
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="frost-card rounded-xl shadow-lg p-6" style={{ borderLeft: '4px solid var(--glacial-400)' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--glacial-600)' }}>
              {stats.totalParticipants}
            </div>
            <div style={{ color: 'var(--sage-600)' }}>Total Participants</div>
          </div>
          <div className="frost-card rounded-xl shadow-lg p-6" style={{ borderLeft: '4px solid var(--sage-400)' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--sage-600)' }}>
              {stats.historicalContacts}
            </div>
            <div style={{ color: 'var(--glacial-600)' }}>Historical Contacts</div>
          </div>
          <div className="frost-card rounded-xl shadow-lg p-6" style={{ borderLeft: '4px solid var(--glacial-500)' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--glacial-700)' }}>
              {Object.keys(stats.byCountry).length}
            </div>
            <div style={{ color: 'var(--sage-600)' }}>Countries</div>
          </div>
          <div className="frost-card rounded-xl shadow-lg p-6" style={{ borderLeft: '4px solid var(--sage-500)' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--sage-700)' }}>
              {Object.keys(stats.byYear).length}
            </div>
            <div style={{ color: 'var(--glacial-600)' }}>Years of Data</div>
          </div>
        </div>

        {/* Filters */}
        <div className="frost-card rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--glacial-700)' }}>
                Search
              </label>
              <input
                type="text"
                placeholder="Name, organization, title, country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none"
                style={{ borderColor: 'var(--glacial-300)', background: 'var(--arctic-50)' }}
              />
            </div>

            {/* Year filter */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--glacial-700)' }}>
                Year
              </label>
              <select
                value={selectedYear || ''}
                onChange={(e) =>
                  setSelectedYear(e.target.value ? Number(e.target.value) : null)
                }
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none"
                style={{ borderColor: 'var(--glacial-300)', background: 'var(--arctic-50)' }}
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year} ({stats.byYear[year]} participants)
                  </option>
                ))}
              </select>
            </div>

            {/* Country filter */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--glacial-700)' }}>
                Country
              </label>
              <select
                value={selectedCountry || ''}
                onChange={(e) =>
                  setSelectedCountry(e.target.value || null)
                }
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none"
                style={{ borderColor: 'var(--glacial-300)', background: 'var(--arctic-50)' }}
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country} ({stats.byCountry[country]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filters indicator */}
          {(searchQuery || selectedYear || selectedCountry) && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm" style={{ color: 'var(--sage-600)' }}>Active filters:</span>
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" style={{ background: 'var(--glacial-100)', color: 'var(--glacial-800)' }}>
                  Search: {searchQuery}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-2"
                    style={{ color: 'var(--glacial-600)' }}
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedYear && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" style={{ background: 'var(--sage-100)', color: 'var(--sage-800)' }}>
                  Year: {selectedYear}
                  <button
                    onClick={() => setSelectedYear(null)}
                    className="ml-2"
                    style={{ color: 'var(--sage-600)' }}
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCountry && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" style={{ background: 'var(--arctic-100)', color: 'var(--arctic-800)' }}>
                  Country: {selectedCountry}
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className="ml-2"
                    style={{ color: 'var(--arctic-600)' }}
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedYear(null);
                  setSelectedCountry(null);
                }}
                className="text-sm underline"
                style={{ color: 'var(--glacial-600)' }}
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-4" style={{ color: 'var(--sage-600)' }}>
          Showing {filteredParticipants.length} of {participants.length} participants
        </div>

        {/* Participants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParticipants.map((participant) => (
            <ParticipantCard key={participant.id} participant={participant} />
          ))}
        </div>

        {/* No results */}
        {filteredParticipants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-lg" style={{ color: 'var(--arctic-500)' }}>
              No participants found matching your filters.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ParticipantCard({ participant }: { participant: Participant }) {
  const years = participant.participationHistory.map((ph) => ph.year).sort();
  const yearRange = years.length > 0
    ? years.length === 1
      ? years[0].toString()
      : `${Math.min(...years)}–${Math.max(...years)}`
    : 'N/A';

  return (
    <div className="frost-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow" style={{ borderLeft: '4px solid var(--glacial-400)' }}>
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--glacial-800)' }}>
          {participant.name}
        </h3>
        {participant.title && (
          <p className="text-sm" style={{ color: 'var(--sage-600)' }}>{participant.title}</p>
        )}
      </div>

      {/* Organization & Country */}
      <div className="mb-4 space-y-1">
        <div className="flex items-start">
          <span className="text-sm font-medium w-24 flex-shrink-0" style={{ color: 'var(--arctic-500)' }}>
            Organization:
          </span>
          <span className="text-sm" style={{ color: 'var(--glacial-800)' }}>{participant.organization}</span>
        </div>
        {participant.country && (
          <div className="flex items-start">
            <span className="text-sm font-medium w-24 flex-shrink-0" style={{ color: 'var(--arctic-500)' }}>
              Country:
            </span>
            <span className="text-sm" style={{ color: 'var(--glacial-800)' }}>{participant.country}</span>
          </div>
        )}
      </div>

      {/* Participation History */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium" style={{ color: 'var(--glacial-700)' }}>
            Participated:
          </span>
          <span className="text-sm font-semibold" style={{ color: 'var(--glacial-600)' }}>
            {yearRange}
          </span>
        </div>
        {participant.participationHistory.length > 1 && (
          <div className="flex flex-wrap gap-1">
            {participant.participationHistory.map((ph, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-1 text-xs font-medium rounded"
                style={{ background: 'var(--glacial-100)', color: 'var(--glacial-800)' }}
              >
                {ph.year}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Contact Info */}
      {(participant.email || participant.linkedin || participant.phone) && (
        <div className="border-t pt-4 space-y-2" style={{ borderColor: 'var(--glacial-200)' }}>
          {participant.email && (
            <a
              href={`mailto:${participant.email}`}
              className="flex items-center text-sm transition-colors"
              style={{ color: 'var(--sage-600)' }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          )}
          {participant.linkedin && (
            <a
              href={participant.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm transition-colors"
              style={{ color: 'var(--sage-600)' }}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
          )}
          {participant.phone && (
            <a
              href={`tel:${participant.phone}`}
              className="flex items-center text-sm transition-colors"
              style={{ color: 'var(--sage-600)' }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Phone
            </a>
          )}
        </div>
      )}

      {/* Session roles */}
      {participant.sessionRoles.length > 0 && (
        <div className="border-t pt-4 mt-4" style={{ borderColor: 'var(--glacial-200)' }}>
          <div className="text-sm font-medium mb-2" style={{ color: 'var(--glacial-700)' }}>
            2025 Sessions:
          </div>
          <div className="flex flex-wrap gap-1">
            {participant.sessionRoles.map((sr, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-1 text-xs font-medium rounded"
                style={{
                  background: sr.role === 'speaker' ? 'var(--glacial-100)' : sr.role === 'moderator' ? 'var(--sage-100)' : 'var(--arctic-100)',
                  color: sr.role === 'speaker' ? 'var(--glacial-800)' : sr.role === 'moderator' ? 'var(--sage-800)' : 'var(--arctic-800)'
                }}
              >
                {sr.role}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
