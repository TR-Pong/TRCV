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
    <div className="relative min-h-screen overflow-hidden bg-[#f3f5f8] px-6 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-8%] h-[360px] w-[360px] rounded-full bg-slate-200/45 blur-3xl" />
        <div className="absolute bottom-[-12%] right-[-8%] h-[420px] w-[420px] rounded-full bg-slate-100/80 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-xl items-center justify-center">
        <div className="w-full rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <div className="p-6 sm:p-10">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-md">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Admin Login</div>
              <h2 className="mt-3 text-4xl font-outfit font-semibold text-slate-900">Welcome back</h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                Sign in to manage portfolio content inside the backoffice workspace.
              </p>

              {error ? (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              ) : null}

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <label className="block space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Username</span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter your username"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Password</span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white"
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
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
