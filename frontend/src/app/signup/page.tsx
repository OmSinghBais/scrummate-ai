'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

// Get API URL - prioritize environment variable, then detect production
function getApiUrl(): string {
  // Always check environment variable first
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Client-side detection for production
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // If on Vercel, use Render backend
    if (hostname.includes('vercel.app')) {
      return 'https://scrummate-ai-21yl.onrender.com';
    }
  }
  
  // Default to localhost for development
  return 'http://localhost:3001';
}


export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Get API URL at runtime (not at module load)
      const apiUrl = getApiUrl();
      const registerUrl = `${apiUrl}/auth/register`;
      
      console.log('Registration attempt:', {
        apiUrl,
        registerUrl,
        hasEnvVar: !!process.env.NEXT_PUBLIC_API_URL,
        hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
      });
      
      const response = await axios.post(registerUrl, {
        name,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      // Auto-login after successful registration if token is returned
      if (response.data.access_token) {
        // Store token temporarily (NextAuth will handle session)
        sessionStorage.setItem('temp_token', response.data.access_token);
        router.push('/login?registered=true&token=' + encodeURIComponent(response.data.access_token));
      } else {
        router.push('/login?registered=true');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText,
        url: err.config?.url,
        method: err.config?.method,
      });
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response) {
        // Server responded with error
        errorMessage = err.response.data?.message || 
                      err.response.data?.error || 
                      `Server error (${err.response.status}): ${err.response.statusText || 'Unknown error'}`;
      } else if (err.request) {
        // Request made but no response (network error, CORS, etc.)
        errorMessage = 'Cannot connect to backend server. Please check your connection or contact support.';
      } else {
        // Error in request setup
        errorMessage = err.message || 'An unexpected error occurred.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-white mb-2">Create Account</h1>
            <p className="text-neutral-400">Get started with ScrumMate AI</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

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
                minLength={6}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-300 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-400">
              Already have an account?{' '}
              <Link href="/login" className="text-teal-400 hover:text-teal-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

