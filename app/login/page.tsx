'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(redirect);
        router.refresh();
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--glacial-50) 0%, var(--sage-50) 100%)' }}>
      {/* Nordic Background Layer */}
      <div className="nordic-bg" />

      <div className="max-w-md w-full relative z-10">
        {/* Logo/Title Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/media/nch-logo.svg"
              alt="Nordic Circular Hotspot"
              width={80}
              height={80}
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--glacial-800)' }}>
            Nordic Circular Summit 2025
          </h1>
          <p style={{ color: 'var(--sage-700)' }}>
            Circular Frontiers: Shaping Our Future
          </p>
        </div>

        {/* Login Card */}
        <div className="frost-card-strong rounded-2xl shadow-xl p-8" style={{ border: '1px solid var(--glacial-200)' }}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--glacial-800)' }}>Welcome</h2>
            <p style={{ color: 'var(--sage-600)' }}>
              Please enter the password to access the summit platform
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--glacial-700)' }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all"
                style={{
                  borderColor: 'var(--glacial-300)',
                  background: 'var(--arctic-50)',
                  color: 'var(--foreground)'
                }}
                placeholder="Enter password"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-lg text-sm bg-red-50 border border-red-200 text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-3 px-6 rounded-lg font-medium transition-all hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, var(--glacial-600) 0%, var(--glacial-700) 100%)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--glacial-200)' }}>
            <p className="text-center text-sm" style={{ color: 'var(--sage-500)' }}>
              Nuuk, Greenland • November 19-20, 2025
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm" style={{ color: 'var(--sage-600)' }}>
          <p>
            Co-hosted by Nordic Circular Hotspot with Nordic Innovation, Cradlenet,
            Lifestyle and Design Cluster, and Natural State
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--glacial-50)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: 'var(--glacial-600)' }}></div>
          <p className="mt-4" style={{ color: 'var(--sage-600)' }}>Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
