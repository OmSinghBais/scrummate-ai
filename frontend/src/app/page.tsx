'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import HolographicObject from '@/components/HolographicObject';
import ScrollReveal from '@/components/ScrollReveal';
import GlassCard from '@/components/GlassCard';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay">
        {/* Dark Background */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        
        {/* Holographic 3D Object */}
        <HolographicObject />
        
        {/* Content Container - Centered with rounded frame */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="glass rounded-3xl p-12 md:p-16 lg:p-20 max-w-6xl mx-auto">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Headline */}
              <h1 className="editorial-headline text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-6 leading-[1.1]">
                Sprint Intelligence,<br />
                <span className="gradient-text">Reimagined</span>
              </h1>
              
              {/* Subheadline */}
              <motion.p
                className="editorial-body text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Elegant solutions for the most complex agile workflow challenges.
              </motion.p>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Link
                  href="/dashboard"
                  className="btn-premium btn-premium-primary inline-block"
                >
                  Explore Platform
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Overview Section */}
      <section className="relative py-32 lg:py-40 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="glass rounded-3xl p-12 md:p-16">
            <ScrollReveal direction="up" delay={0}>
              <div className="text-center mb-16">
                <h2 className="editorial-headline text-4xl md:text-5xl font-light text-white mb-4">
                  Built for Modern Teams
                </h2>
                <p className="editorial-body text-lg text-gray-400 max-w-2xl mx-auto">
                  Everything you need to monitor, predict, and optimize your sprint performance
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-8 md:grid-cols-3">
              <ScrollReveal direction="up" delay={0}>
                <GlassCard hover className="p-8">
                  <div className="mb-6 text-5xl">🤖</div>
                  <h3 className="text-xl font-medium text-white mb-3 editorial-headline">ML Predictions</h3>
                  <p className="text-gray-400 editorial-body leading-relaxed">
                    XGBoost-powered sprint failure prediction with feature importance analysis
                  </p>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <GlassCard hover className="p-8">
                  <div className="mb-6 text-5xl">📊</div>
                  <h3 className="text-xl font-medium text-white mb-3 editorial-headline">Real-Time Metrics</h3>
                  <p className="text-gray-400 editorial-body leading-relaxed">
                    Track sprint health with live data from Jira & GitHub integrations
                  </p>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={400}>
                <GlassCard hover className="p-8">
                  <div className="mb-6 text-5xl">🎯</div>
                  <h3 className="text-xl font-medium text-white mb-3 editorial-headline">Risk Insights</h3>
                  <p className="text-gray-400 editorial-body leading-relaxed">
                    Actionable recommendations and insights for sprint success
                  </p>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 lg:py-40 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="glass rounded-3xl p-12 md:p-16">
            <ScrollReveal direction="up" delay={0}>
              <div className="mb-16">
                <h2 className="editorial-headline text-4xl md:text-5xl font-light text-white mb-4">
                  Intelligent Sprint Monitoring
                </h2>
                <p className="editorial-body text-lg text-gray-400 max-w-2xl">
                  Complete sprint health tracking in one powerful platform
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: '📈', title: 'Health Score Tracking', desc: 'Real-time sprint health scores from multiple metrics' },
                { icon: '🔍', title: 'Risk Zone Analysis', desc: 'Automated risk classification with trend analysis' },
                { icon: '📉', title: 'Trend Visualization', desc: 'Interactive charts showing sprint health over time' },
                { icon: '🔗', title: 'Jira Integration', desc: 'Seamless connection with Jira for sprint data' },
                { icon: '💻', title: 'GitHub Integration', desc: 'Track PR review times and code metrics' },
                { icon: '💡', title: 'Actionable Insights', desc: 'Specific recommendations to improve sprint health' },
              ].map((feature, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                  <GlassCard hover className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-2xl">{feature.icon}</div>
                      <h3 className="text-lg font-medium text-white editorial-headline">{feature.title}</h3>
                    </div>
                    <p className="text-gray-400 editorial-body text-sm">{feature.desc}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 lg:py-40 bg-[#0a0a0a]">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <ScrollReveal direction="up" delay={0}>
            <div className="glass rounded-3xl p-12 md:p-16 text-center">
              <h2 className="editorial-headline text-4xl md:text-5xl font-light text-white mb-4">
                Ready to optimize your sprints?
              </h2>
              <p className="editorial-body text-lg text-gray-400 mb-8">
                Start monitoring your sprint health in real-time with AI-powered insights
              </p>
              <Link
                href="/dashboard"
                className="btn-premium btn-premium-primary inline-block"
              >
                Get Started
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
