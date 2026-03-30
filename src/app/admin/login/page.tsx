'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push('/admin/profile');
        return;
      }

      const data = await response.json();
      setError(data.error || 'Login failed');
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f7fb] px-6 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-8%] h-[360px] w-[360px] rounded-full bg-blue-200/45 blur-3xl" />
        <div className="absolute bottom-[-12%] right-[-8%] h-[420px] w-[420px] rounded-full bg-slate-200/60 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[40px] border border-white/60 bg-white/80 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur xl:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden bg-[radial-gradient(circle_at_top,#dbeafe,transparent_52%),linear-gradient(180deg,#2563eb_0%,#1d4ed8_100%)] p-10 text-white xl:block">
            <div className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
              Secure Access
            </div>
            <h1 className="mt-8 max-w-md text-5xl font-outfit font-semibold leading-tight">
              Refined admin dashboard for portfolio content.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-blue-100">
              Manage profile, experience, education, skills, and projects from a structured workspace designed for quick edits.
            </p>

            <div className="mt-12 grid gap-4">
              {['Separated pages per section', 'Light dashboard layout', 'Bilingual content editing'].map((item) => (
                <div key={item} className="rounded-[24px] border border-white/20 bg-white/10 px-5 py-4 text-sm text-blue-50">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto w-full max-w-md"
            >
              <div className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                Admin Login
              </div>
              <h2 className="mt-6 text-4xl font-outfit font-semibold text-slate-900">Welcome back</h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                Sign in to edit portfolio content inside the redesigned admin workspace.
              </p>

              {error ? (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              ) : null}

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <label className="block space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Username</span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="tr.pong"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Password</span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(37,99,235,0.24)] transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
