'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const dynamic = 'force-dynamic';

// 3D Tilt Card with mouse tracking
function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(900px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      className="w-full max-w-md"
    >
      {children}
    </div>
  );
}

// Floating animated orbs background
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Dark base */}
      <div className="absolute inset-0 bg-[#050510]" />
      
      {/* Aurora Mesh */}
      <div className="absolute inset-0 bg-aurora opacity-40 mix-blend-screen" />
      
      {/* Deep gradient overlay */}
      <div className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 20%, rgba(139,92,246,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 80%, rgba(6,182,212,0.15) 0%, transparent 60%)
          `
        }}
      />
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Floating orbs */}
      <div className="absolute rounded-full blur-[100px] opacity-40"
        style={{
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
          top: '-15%', left: '-10%',
          animation: 'floatOrb1 20s ease-in-out infinite'
        }}
      />
      <div className="absolute rounded-full blur-[120px] opacity-30"
        style={{
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
          bottom: '-20%', right: '-15%',
          animation: 'floatOrb2 25s ease-in-out infinite'
        }}
      />
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage('Account created successfully! Please sign in.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error.includes('fetch') || result.error.includes('network') || result.error.includes('ECONNREFUSED')) {
          setError('Cannot connect to backend server. Please check your connection.');
        } else if (result.error.includes('CredentialsSignin') || result.error.includes('401')) {
          setError('Invalid email or password. Please check your credentials.');
        } else {
          setError('Login failed. Please try again.');
        }
      } else if (result?.ok) {
        router.push('/dashboard');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } catch (err: any) {
      setError('An error occurred: ' + (err.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative selection:bg-violet-500/30"
      style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease' }}
    >
      <AnimatedBackground />

      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} className="w-full max-w-md">
        <TiltCard>
          {/* Deep glow behind card */}
          <div className="absolute inset-0 rounded-[2.5rem] blur-2xl opacity-40 pointer-events-none z-[-1]"
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.5), rgba(6,182,212,0.4))' }}
          />

          <div className="relative w-full rounded-[2rem] p-8 sm:p-10 overflow-hidden glass-premium">
            {/* Top highlight stripe */}
            <div className="absolute inset-x-0 top-0 h-px w-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.8), rgba(6,182,212,0.8), transparent)' }}
            />

          {/* Icon / Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(20,184,166,0.2), rgba(6,182,212,0.1))',
                border: '1px solid rgba(20,184,166,0.3)',
                boxShadow: '0 8px 24px rgba(20,184,166,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="url(#g1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5" stroke="url(#g1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12l10 5 10-5" stroke="url(#g1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="g1" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#14b8a6"/>
                    <stop offset="1" stopColor="#06b6d4"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-sm" style={{ color: 'rgba(148,163,184,0.8)' }}>Sign in to your ScrumMate account</p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl text-sm flex items-center gap-3"
              style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.25)', color: '#5eead4' }}
            >
              <span className="text-lg">✓</span>
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-2xl text-sm"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}
            >
              <div className="font-semibold mb-1">⚠ Login Error</div>
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: 'email', label: 'Email', type: 'email', value: email, onChange: setEmail, placeholder: 'you@example.com' },
              { id: 'password', label: 'Password', type: 'password', value: password, onChange: setPassword, placeholder: '••••••••' },
            ].map((field) => (
              <div key={field.id} className="group">
                <label htmlFor={field.id} className="block text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: 'rgba(148,163,184,0.7)' }}>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  required
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-neutral-600 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid rgba(20,184,166,0.5)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(20,184,166,0.1)';
                    e.target.style.background = 'rgba(20,184,166,0.05)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(255,255,255,0.08)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'rgba(255,255,255,0.04)';
                  }}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 relative overflow-hidden mt-2"
              style={{
                background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
                color: '#000',
                boxShadow: '0 8px 32px rgba(20,184,166,0.35)',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(20,184,166,0.55)'; }}
              onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(20,184,166,0.35)'; }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Signing in…
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: 'rgba(148,163,184,0.6)' }}>
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium hover:text-teal-300 transition-colors"
                style={{ color: '#5eead4' }}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </TiltCard>
      </motion.div>

      <style jsx global>{`
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(40px, 60px) scale(1.08); }
          66%       { transform: translate(-30px, 30px) scale(0.95); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-50px, -40px) scale(1.05); }
          66%       { transform: translate(30px, -60px) scale(0.97); }
        }
      `}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
