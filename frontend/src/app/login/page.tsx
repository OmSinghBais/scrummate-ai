'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check if user just registered
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage('Account created successfully! Please sign in.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage(''); // Clear success message on new login attempt
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.error('Login failed:', result.error);
        // Provide more specific error messages
        if (result.error.includes('fetch') || result.error.includes('network') || result.error.includes('ECONNREFUSED')) {
          setError('Cannot connect to backend server. Please check your connection or contact support if the issue persists.');
        } else if (result.error.includes('404') || result.error.includes('not found')) {
          setError('Backend endpoint not found. The server may be misconfigured.');
        } else if (result.error.includes('500') || result.error.includes('server error')) {
          setError('Backend server error. Please try again later or contact support.');
        } else if (result.error.includes('CredentialsSignin') || result.error.includes('401') || result.error.includes('Unauthorized')) {
          setError('Invalid email or password. Please check your credentials and try again.');
        } else {
          setError('Login failed: ' + result.error + '. Please check the browser console for details.');
        }
      } else if (result?.ok) {
        // Successful login
        router.push('/dashboard');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } catch (err: any) {
      console.error('Login exception:', err);
      setError('An error occurred: ' + (err.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-white mb-2">Welcome Back</h1>
            <p className="text-neutral-400">Sign in to your ScrumMate account</p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <div className="font-medium mb-1">Login Error</div>
              <div>{error}</div>
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-2 text-xs text-red-300">
                  Check browser console and server logs for details
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-400">
              Don't have an account?{' '}
              <Link href="/signup" className="text-teal-400 hover:text-teal-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
            <div className="text-center">
              <div className="animate-pulse text-neutral-400">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

