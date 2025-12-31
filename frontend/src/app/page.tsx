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
    <nav className={`sticky top-0 z-50 transition-all duration-300 elevation-3 ${
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
            className="px-6 py-3 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition-all text-center shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 micro-scale hover:scale-105"
          >
            Explore Platform
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors text-center micro-scale hover:border-white/30"
          >
            Book a Demo
          </Link>
        </div>
      </div>

      {/* RIGHT (VISUAL ANCHOR) */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden reveal noise-texture elevation-2">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400/30 via-cyan-400/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(45,212,191,0.35),transparent_60%)] animate-float" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(6,182,212,0.2),transparent_60%)]" />
        <div className="absolute inset-0 backdrop-blur-xl border border-white/10" />
      </div>
    </section>
  );
}

// Features Section with Grouped Categories
function Features() {
  const featureGroups = [
    {
      category: 'Predict',
      features: [
        { 
          title: 'ML Predictions', 
          desc: 'Sprint failure prediction using ML models',
          confidence: 92,
        },
        { 
          title: 'Risk Insights', 
          desc: 'Actionable sprint risk recommendations',
          confidence: 88,
        },
      ]
    },
    {
      category: 'Monitor',
      features: [
        { 
          title: 'Real-Time Metrics', 
          desc: 'Live Jira & GitHub sprint health data',
        },
        { 
          title: 'Health Scores', 
          desc: 'Composite sprint health scoring',
        },
      ]
    },
    {
      category: 'Analyze',
      features: [
        { 
          title: 'Trend Analysis', 
          desc: 'Predictive sprint trend visualization',
        },
        { 
          title: 'Velocity Tracking', 
          desc: 'Team performance over time',
        },
      ]
    },
    {
      category: 'Integrate',
      features: [
        { 
          title: 'Jira Sync', 
          desc: 'Native Jira integration',
        },
        { 
          title: 'GitHub Integration', 
          desc: 'Real-time code metrics',
        },
      ]
    },
  ];

  return (
    <section className="relative py-24 reveal">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <h2 className="text-4xl lg:text-5xl text-white mb-16 font-serif tracking-tight">Built for Modern Teams</h2>

        <div className="space-y-16">
          {featureGroups.map((group, groupIdx) => (
            <div key={group.category} className="reveal" style={{ transitionDelay: `${groupIdx * 150}ms` }}>
              <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-6">
                {group.category}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {group.features.map((f, idx) => (
                  <div
                    key={f.title}
                    className="rounded-2xl bg-white/8 backdrop-blur-lg border border-white/15 elevation-1 p-6 hover:bg-white/12 hover:-translate-y-1 hover:elevation-2 transition-all duration-300 micro-scale"
                    style={{ transitionDelay: `${idx * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg text-white font-medium">{f.title}</h3>
                      {f.confidence && (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-teal-400 rounded-full transition-all duration-500"
                              style={{ width: `${f.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs text-teal-400 font-medium">{f.confidence}%</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-neutral-400">{f.desc}</p>
                  </div>
                ))}
              </div>
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
        <div className="w-[94%] max-w-7xl rounded-3xl bg-neutral-900/70 backdrop-blur-xl border border-white/10 elevation-3 overflow-hidden noise-texture">
          <Landing />
          <Features />
          <TrustSection />
          
          {/* Narrative Footer */}
          <section className="relative py-16 px-6 text-center border-t border-white/10">
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              ScrumMate AI helps teams ship with confidence.
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
