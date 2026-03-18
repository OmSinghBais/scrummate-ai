'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

function getApiUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return 'https://scrummate-ai-21yl.onrender.com';
  }
  return 'http://localhost:3001';
}

// 3D Tilt Card
function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    card.style.transform = `perspective(900px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) scale3d(1.015,1.015,1.015)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
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

import { motion } from 'framer-motion';

// Animated background
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

// Field component
function Field({
  id, label, type = 'text', value, onChange, placeholder, required = true, minLength
}: {
  id: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder: string; required?: boolean; minLength?: number;
}) {
  return (
    <div className="group">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: 'rgba(148,163,184,0.7)' }}>
        {label}
      </label>
      <input
        id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)}
        required={required} placeholder={placeholder} minLength={minLength}
        className="w-full px-4 py-3 rounded-xl text-white placeholder-neutral-600 outline-none transition-all duration-200"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
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
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }

    setLoading(true);
    try {
      const apiUrl = getApiUrl();
      const registerUrl = apiUrl.startsWith('http') ? `${apiUrl}/auth/register` : `https://${apiUrl}/auth/register`;

      const response = await axios.post(registerUrl, { name, email, password }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
        validateStatus: (status) => status < 500,
      });

      if (response.data.access_token) {
        sessionStorage.setItem('temp_token', response.data.access_token);
        router.push('/login?registered=true&token=' + encodeURIComponent(response.data.access_token));
      } else {
        router.push('/login?registered=true');
      }
    } catch (err: any) {
      let msg = 'Registration failed. Please try again.';
      if (err.response) {
        msg = err.response.data?.message || err.response.data?.error || `Server error (${err.response.status})`;
      } else if (err.request) {
        msg = `Cannot connect to backend server at ${err.config?.url || 'unknown URL'}. Please check your connection.`;
      } else {
        msg = err.message || msg;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative py-8 selection:bg-violet-500/30"
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
              style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.8), rgba(167,139,250,0.8), transparent)' }}
            />

          {/* Logo icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.1))',
                border: '1px solid rgba(6,182,212,0.3)',
                boxShadow: '0 8px 24px rgba(6,182,212,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="url(#g2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5" stroke="url(#g2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12l10 5 10-5" stroke="url(#g2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="g2" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#06b6d4"/>
                    <stop offset="1" stopColor="#a78bfa"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
            <p className="text-sm" style={{ color: 'rgba(148,163,184,0.8)' }}>Get started with ScrumMate AI</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl text-sm"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}
            >
              <div className="font-semibold mb-1">⚠ Registration Error</div>
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field id="name" label="Full Name" value={name} onChange={setName} placeholder="John Doe" />
            <Field id="email" label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
            <Field id="password" label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" minLength={6} />
            <Field id="confirmPassword" label="Confirm Password" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="••••••••" minLength={6} />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 relative overflow-hidden mt-2"
              style={{
                background: 'linear-gradient(135deg, #06b6d4, #14b8a6)',
                color: '#000',
                boxShadow: '0 8px 32px rgba(6,182,212,0.35)',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(6,182,212,0.55)'; }}
              onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(6,182,212,0.35)'; }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Creating account…
                </span>
              ) : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: 'rgba(148,163,184,0.6)' }}>
              Already have an account?{' '}
              <Link href="/login" className="font-medium hover:text-teal-300 transition-colors" style={{ color: '#5eead4' }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </TiltCard>
      </motion.div>
    </div>
  );
}
