'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { participants, getParticipantStats } from '@/lib/data';
import Header from '@/components/layout/Header';
import ParticipantCard from '@/components/ui/ParticipantCard';

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
    <div className="min-h-screen">
      <Header
        title="Participant Network"
        subtitle="Explore the Nordic Circular Summit community network"
        icon="🌐"
        showBackLink={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
