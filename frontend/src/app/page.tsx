'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#050510]/80 backdrop-blur-xl border-b border-white/10 elevation-1' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 p-[1px] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-shadow duration-300">
            <div className="w-full h-full rounded-md bg-[#050510] flex items-center justify-center border border-white/10">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">S</span>
            </div>
          </div>
          <span className="font-semibold text-white text-lg tracking-wide group-hover:text-violet-200 transition-colors">
            ScrumMate
          </span>
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400 nav-links">
          <Link href="/" className="hover:text-white transition-colors">Platform</Link>
          {session && (
            <>
              <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <Link href="/planning" className="hover:text-white transition-colors">Planning</Link>
              <Link href="/performance" className="hover:text-white transition-colors">Performance</Link>
              <Link href="/sprints/compare" className="hover:text-white transition-colors">Compare</Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {session ? (
             <>
               <span className="text-sm text-neutral-300 hidden sm:block">
                 {session.user?.name || session.user?.email}
               </span>
               <button
                 onClick={() => signOut()}
                 className="btn-premium btn-premium-secondary text-sm hidden sm:block"
               >
                 Sign Out
               </button>
             </>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="btn-premium btn-premium-primary text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                Get Started 
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// Hero 3D Product Preview Panel
function HeroPanel() {
  return (
    <div className="relative w-full h-[460px] perspective-1500" style={{ transformStyle: 'preserve-3d' }}>
      {/* Deep Background Glow */}
      <div className="absolute inset-x-10 inset-y-10 rounded-full blur-[80px] opacity-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.6), rgba(6,182,212,0.4), transparent 70%)' }}
      />

      {/* === MID LAYER — blurred depth card === */}
      <div className="absolute inset-x-8 inset-y-6 rounded-3xl"
        style={{
          background: 'rgba(5, 5, 16, 0.4)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.05)',
          transform: 'rotateX(8deg) rotateY(-6deg) translateZ(-60px)',
          transformStyle: 'preserve-3d',
          boxShadow: '0 40px 100px -20px rgba(0,0,0,0.9)',
        }}
      />

      {/* === FRONT MAIN CARD === */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden group glass-premium"
        style={{
          transform: 'rotateX(5deg) rotateY(-3deg)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'rotateX(2deg) rotateY(-1deg) translateZ(20px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'rotateX(5deg) rotateY(-3deg)';
        }}
      >
        {/* Dynamic Glare Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Top highlight line */}
        <div className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.8), rgba(6,182,212,0.8), transparent)' }}
        />

        {/* Browser-like Header */}
        <div className="flex items-center gap-2 px-6 py-4 bg-black/20 border-b border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-600 hover:bg-red-500 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-600 hover:bg-yellow-500 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-600 hover:bg-green-500 transition-colors" />
          <div className="ml-4 flex-1 h-6 rounded bg-white/5 border border-white/5 flex items-center px-3">
             <span className="text-[10px] text-neutral-500 font-mono tracking-wider">scrummate.ai/dashboard</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium text-lg tracking-tight">Q3 Launch Sprint</h4>
              <p className="text-xs text-neutral-400 mt-1">Sprint Health Overview</p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center gap-2 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs text-teal-300 font-medium">On Track</span>
            </div>
          </div>

          {/* Main Metric */}
          <div className="flex items-end gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-6xl font-light tracking-tighter"
              style={{ background: 'linear-gradient(135deg, #a78bfa, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              94
            </span>
            <div className="mb-2">
              <div className="text-sm text-neutral-300">Predictive Match Score</div>
              <div className="text-xs text-neutral-500 mt-0.5">+4 from last week</div>
            </div>
          </div>

          {/* Detailed Bars */}
          <div className="space-y-4">
            {[
              { label: 'Velocity Consistency', pct: 92, color: '#8b5cf6', glow: 'rgba(139,92,246,0.5)' },
              { label: 'Code Quality', pct: 88, color: '#06b6d4', glow: 'rgba(6,182,212,0.5)' },
              { label: 'Risk Factor', pct: 12, color: '#f43f5e', glow: 'rgba(244,63,94,0.5)', reverse: true },
            ].map((bar) => (
              <div key={bar.label} className="group/bar">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-neutral-400">{bar.label}</span>
                  <span style={{ color: bar.color }} className="font-medium">{bar.pct}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden bg-black/40 border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.pct}%` }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    className="h-full rounded-full relative"
                    style={{ 
                      background: `linear-gradient(90deg, ${bar.color}CC, ${bar.color})`, 
                      boxShadow: `0 0 10px ${bar.glow}` 
                    }}
                  >
                     <div className="absolute inset-0 bg-white/20 w-1/3 animate-[shimmer_2s_infinite]" style={{ transform: 'skewX(-20deg)' }} />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === FLOATING MINI NOTIFICATION — top right === */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
        className="absolute -top-6 -right-6 rounded-2xl p-4 w-52 z-10 glass-premium"
        style={{
          transform: 'rotateX(-5deg) rotateY(10deg) translateZ(40px)',
        }}
      >
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
            <span className="text-violet-300 text-xs">AI</span>
          </div>
          <div>
             <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider mb-0.5">Insight Generated</div>
             <div className="text-xs text-white leading-tight">Team velocity is peaking. Optimal time for technical debt review.</div>
          </div>
        </div>
      </motion.div>

      {/* === FLOATING MINI CHART — bottom left === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute -bottom-8 -left-8 rounded-2xl p-4 w-48 z-10 glass-premium"
        style={{
          transform: 'rotateX(5deg) rotateY(-10deg) translateZ(50px)',
        }}
      >
        <div className="text-[10px] text-neutral-400 uppercase tracking-widest mb-2">Burn Rate</div>
        <div className="flex items-end gap-1 h-12">
           {[40, 60, 45, 80, 55, 90, 75].map((val, i) => (
             <motion.div 
               key={i}
               initial={{ height: 0 }}
               animate={{ height: `${val}%` }}
               transition={{ delay: 1.6 + (i * 0.1), duration: 0.5 }}
               className="flex-1 rounded-t-sm"
               style={{ background: `linear-gradient(to top, rgba(6,182,212,0.2), rgba(6,182,212,0.8))` }}
             />
           ))}
        </div>
      </motion.div>
    </div>
  );
}

// Hero Section
function Landing() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Dynamic Aurora Background */}
      <div className="absolute inset-0 bg-aurora opacity-30 pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050510]/50 to-[#050510] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        {/* LEFT COPY */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)] animate-pulse" />
            <span className="text-xs font-medium text-violet-200 tracking-wide uppercase">Introducing ScrumMate AI 2.0</span>
          </div>

          <h1 className="editorial-headline text-white mb-6">
            Engineering intelligence <br className="hidden md:block"/>
            <span className="gradient-text">beautifully executed.</span>
          </h1>

          <p className="editorial-body text-neutral-400 text-lg md:text-xl max-w-xl mb-10">
            Predict sprint failures before they happen. Deep insights, elegant UI, and real-time machine learning for leading development teams.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link href="/signup" className="btn-premium btn-premium-primary text-center text-lg px-8 py-4">
              Start Building Free
            </Link>
            <Link href="#features" className="btn-premium btn-premium-secondary text-center text-lg px-8 py-4 group flex items-center justify-center gap-2">
              Explore Platform
              <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT 3D SHOWCASE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block relative"
        >
          <HeroPanel />
        </motion.div>
      </div>
    </section>
  );
}

// Features Section
function Features() {
  const features = [
    { 
      title: 'Predictive ML Engine', 
      desc: 'Our neural nets analyze past sprint data to predict delivery risks with 92% accuracy before day one.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="url(#violet-cyan)">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      title: 'Real-time Health Scoring', 
      desc: 'Live composite scores based on PR velocity, Jira ticket stagnation, and team load balance.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="url(#cyan-mint)">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      title: 'Deep Integrations', 
      desc: 'Seamlessly syncs with GitHub, GitLab, and Jira. Zero configuration required to start seeing insights.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="url(#violet-cyan)">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
  ];

  return (
    <section id="features" className="py-24 relative">
       {/* SVG Gradients for Icons */}
       <svg width="0" height="0" className="absolute">
         <defs>
           <linearGradient id="violet-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop stopColor="#a78bfa" offset="0%" />
             <stop stopColor="#06b6d4" offset="100%" />
           </linearGradient>
           <linearGradient id="cyan-mint" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop stopColor="#06b6d4" offset="0%" />
             <stop stopColor="#5eead4" offset="100%" />
           </linearGradient>
         </defs>
       </svg>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="editorial-headline text-white mb-4">Precision insights</h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">Everything you need to ship faster, without burning out your team.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="glass-card glass-card-hover p-8 rounded-3xl reveal" style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                {f.icon}
              </div>
              <h3 className="text-xl font-medium text-white mb-3">{f.title}</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">{f.desc}</p>
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
    <section className="py-24 border-t border-white/5 reveal bg-gradient-to-b from-transparent to-[#0a0a1a]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-500 mb-10">Trusted by engineering teams at</p>
        <div className="flex justify-center items-center gap-12 lg:gap-20 opacity-40 flex-wrap grayscale hover:grayscale-0 transition-all duration-700">
          <h4 className="text-2xl font-bold font-serif italic text-white">Acme Corp</h4>
          <h4 className="text-xl font-bold tracking-tighter text-white">GLOBAL<span className="text-cyan-400">NET</span></h4>
          <h4 className="text-2xl font-light tracking-widest text-white">NEXUS</h4>
          <h4 className="text-xl font-semibold text-white">Vertex</h4>
          <h4 className="text-2xl font-black text-white mix-blend-overlay">PULSE</h4>
        </div>
      </div>
    </section>
  );
}

// Main Home Component
export default function Home() {
  useEffect(() => {
    // Scroll reveal intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#050510] selection:bg-violet-500/30">
      <div className="grain-overlay opacity-50" />
      <Navbar />
      <Landing />
      <Features />
      <TrustSection />
      <Footer className="border-t border-white/5 bg-[#050510]" />
    </main>
  );
}
