'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

// Navbar Component
function Navbar() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/60 backdrop-blur-xl border-b border-white/10' 
        : 'bg-black/40 backdrop-blur-md border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-white text-lg">
          ScrumMate
        </Link>

        <div className="hidden md:flex gap-8 text-sm text-neutral-300">
          <Link href="/" className="hover:text-white transition-colors">
            Platform
          </Link>
          {session && (
            <>
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/planning" className="hover:text-white transition-colors">
                Planning
              </Link>
              <Link href="/performance" className="hover:text-white transition-colors">
                Performance
              </Link>
              <Link href="/sprints/compare" className="hover:text-white transition-colors">
                Compare
              </Link>
            </>
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
                className="px-4 py-2 rounded-full bg-teal-500 text-black text-sm font-medium hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40"
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
    <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center reveal">
      {/* LEFT */}
      <div>
        <h1 className="text-6xl lg:text-7xl font-serif tracking-tight leading-[1.05] text-white mb-6">
          Sprint Intelligence,<br />
          <span className="text-teal-400">Reimagined</span>
        </h1>

        <p className="mt-6 text-lg text-neutral-400 max-w-xl mb-8">
          Elegant solutions for the most complex agile workflow challenges.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition-all text-center shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40"
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

      {/* RIGHT (VISUAL ANCHOR) */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden reveal">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400/30 via-cyan-400/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(45,212,191,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(6,182,212,0.2),transparent_60%)]" />
        <div className="absolute inset-0 backdrop-blur-xl border border-white/10" />
      </div>
    </section>
  );
}

// Features Section
function Features() {
  const features = [
    { 
      title: 'ML Predictions', 
      desc: 'Sprint failure prediction using ML models',
      label: 'AI Capability',
      category: 'ai'
    },
    { 
      title: 'Real-Time Metrics', 
      desc: 'Live Jira & GitHub sprint health data',
      label: 'Integration',
      category: 'integration'
    },
    { 
      title: 'Risk Insights', 
      desc: 'Actionable sprint risk recommendations',
      label: 'Analytics',
      category: 'analytics'
    },
    { 
      title: 'Health Scores', 
      desc: 'Composite sprint health scoring',
      label: 'Metrics',
      category: 'metrics'
    },
    { 
      title: 'Trend Analysis', 
      desc: 'Predictive sprint trend visualization',
      label: 'Analytics',
      category: 'analytics'
    },
    { 
      title: 'Integrations', 
      desc: 'Jira & GitHub native sync',
      label: 'Integration',
      category: 'integration'
    },
  ];

  return (
    <section className="relative py-24 reveal">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <h2 className="text-4xl lg:text-5xl text-white mb-12 font-serif tracking-tight">Built for Modern Teams</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className="reveal rounded-2xl bg-white/8 backdrop-blur-lg border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 hover:bg-white/12 hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <span className="text-xs uppercase tracking-wider text-teal-400 mb-3 inline-block">
                {f.label}
              </span>
              <h3 className="text-lg text-white font-medium mb-2">{f.title}</h3>
              <p className="text-sm text-neutral-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Trust Section
function TrustSection() {
  return (
    <section className="relative py-24 text-center reveal">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <p className="text-neutral-400 text-lg mb-8">Trusted by modern engineering teams</p>
        <div className="mt-8 flex justify-center gap-12 opacity-50 flex-wrap">
          <span className="text-neutral-300 font-medium">Jira</span>
          <span className="text-neutral-300 font-medium">GitHub</span>
          <span className="text-neutral-300 font-medium">Slack</span>
          <span className="text-neutral-300 font-medium">Linear</span>
          <span className="text-neutral-300 font-medium">Notion</span>
        </div>
      </div>
    </section>
  );
}

// Main Home Component
export default function Home() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      
      {/* Floating Canvas */}
      <div className="min-h-screen flex justify-center py-24">
        <div className="w-[94%] max-w-7xl rounded-3xl bg-neutral-900/70 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
          <Landing />
          <Features />
          <TrustSection />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
