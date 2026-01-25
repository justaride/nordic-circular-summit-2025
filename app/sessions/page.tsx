'use client';

import { sessions } from '@/lib/data';
import {
  SessionIcon,
  SnowflakeIcon,
  GlobeIcon
} from '@/components/Icons';
import Header from '@/components/layout/Header';
import SessionCard from '@/components/ui/SessionCard';

export default function SessionsPage() {
  const day1Sessions = sessions.filter(s => s.day === 1);
  const day2Sessions = sessions.filter(s => s.day === 2);

  return (
    <div className="min-h-screen">
      <Header
        title="Sessions"
        subtitle="Full program across two days"
        icon={<SessionIcon size={32} color="var(--glacial-500)" />}
        showBackLink={true}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Day 1 */}
        <section className="mb-12">
          <div className="rounded-xl p-5 mb-6 shadow-sm" style={{ background: 'linear-gradient(135deg, var(--glacial-100) 0%, var(--glacial-50) 100%)', border: '1px solid var(--glacial-200)' }}>
            <div className="flex items-center gap-3">
              <SnowflakeIcon size={32} color="var(--glacial-500)" />
              <div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--glacial-800)' }}>Day 1 - November 19, 2025</h2>
                <p style={{ color: 'var(--glacial-700)' }}>In-person sessions at Hans Egede Hotel, Nuuk</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {day1Sessions.map(session => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </section>

        {/* Day 2 */}
        <section>
          <div className="rounded-xl p-5 mb-6 shadow-sm" style={{ background: 'linear-gradient(135deg, var(--sage-100) 0%, var(--sage-50) 100%)', border: '1px solid var(--sage-200)' }}>
            <div className="flex items-center gap-3">
              <GlobeIcon size={32} color="var(--sage-500)" />
              <div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--sage-800)' }}>Day 2 - November 20, 2025</h2>
                <p style={{ color: 'var(--sage-700)' }}>Digital partner-hosted sessions</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {day2Sessions.map(session => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
