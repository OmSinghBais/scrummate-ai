'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';

'use client';

import { useSession, signOut } from 'next-auth/react';

// Navbar Component
function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-white">
          ScrumMate
        </Link>

        <div className="hidden md:flex gap-8 text-sm text-neutral-300">
          <Link href="/" className="hover:text-white transition-colors">
            Platform
          </Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Dashboard
          </Link>
          {session && (
            <Link href="/sprints/compare" className="hover:text-white transition-colors">
              Compare
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-neutral-300 hover:text-white transition-colors hidden sm:block"
              >
                Dashboard
              </Link>
              <Link
                href="/settings"
                className="text-sm text-neutral-300 hover:text-white transition-colors hidden sm:block"
              >
                Settings
              </Link>
              <span className="text-sm text-neutral-300 hidden sm:block">
                {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 rounded-full border border-white/20 text-white text-sm hover:bg-white/5 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-full border border-white/20 text-white text-sm hover:bg-white/5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-full bg-teal-500 text-black text-sm font-medium hover:bg-teal-400 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function Landing() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* LEFT */}
      <div>
        <h1 className="text-5xl md:text-6xl font-serif leading-tight text-white">
          Sprint Intelligence,<br />
          <span className="text-teal-400">Reimagined</span>
        </h1>

        <p className="mt-6 text-lg text-neutral-400 max-w-xl">
          Elegant solutions for the most complex agile workflow challenges.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition-colors text-center"
          >
            Explore Platform
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors text-center"
          >
            Book a Demo
          </Link>
        </div>
      </div>

      {/* RIGHT (VISUAL PLACEHOLDER — CRITICAL) */}
      <div className="relative h-[420px] rounded-2xl bg-gradient-to-br from-teal-400/30 to-cyan-500/10 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(45,212,191,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(6,182,212,0.2),transparent_60%)]" />
      </div>
    </section>
  );
}

// Features Section
function Features() {
  const features = [
    { title: 'ML Predictions', desc: 'Sprint failure prediction using ML models' },
    { title: 'Real-Time Metrics', desc: 'Live Jira & GitHub sprint health data' },
    { title: 'Risk Insights', desc: 'Actionable sprint risk recommendations' },
    { title: 'Health Scores', desc: 'Composite sprint health scoring' },
    { title: 'Trend Analysis', desc: 'Predictive sprint trend visualization' },
    { title: 'Integrations', desc: 'Jira & GitHub native sync' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-4xl text-white mb-12 font-serif">Built for Modern Teams</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-lg text-white font-medium">{f.title}</h3>
            <p className="text-sm text-neutral-400 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Main Home Component
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Landing />
      <Features />
      <Footer />
    </main>
  );
}
