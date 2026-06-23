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
    <div className="admin-login min-h-screen px-5 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
        <div className="admin-login-panel w-full border">
          <div className="p-6 sm:p-9">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-md">
              <div className="admin-kicker">Secure workspace</div>
              <h1 className="mt-3 text-4xl font-display font-bold text-[var(--color-admin-ink)]">Portfolio admin</h1>
              <p className="mt-3 text-sm leading-7 text-[var(--color-admin-muted)]">
                Sign in to update the content shown on Tana.CV.
              </p>

              {error ? (
                <div className="admin-error-message mt-6 rounded-md px-4 py-3 text-sm font-medium" role="alert">
                  {error}
                </div>
              ) : null}

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <label className="block space-y-2">
                  <span className="admin-field-label">Username</span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter your username"
                    className="admin-input px-5 py-4"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="admin-field-label">Password</span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="admin-input px-5 py-4"
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="admin-primary-button w-full justify-center px-5 py-4"
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
