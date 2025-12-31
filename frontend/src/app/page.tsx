'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import GlassCard from '@/components/GlassCard';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* Hero Section with 3D Effects */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-amber-500/20 animate-pulse-slow" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <ScrollReveal direction="up" delay={0}>
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                className="mb-8 inline-flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 p-4 shadow-2xl card-3d">
                  <span className="text-6xl">🚀</span>
                </div>
              </motion.div>

              <motion.h1
                className="mb-6 text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                A higher standard in{' '}
                <span className="gradient-text">sprint management</span>
              </motion.h1>

              <ScrollReveal direction="up" delay={200}>
                <p className="mb-4 text-xl text-gray-300 sm:text-2xl">
                  AI-Powered Sprint Risk Analysis
                </p>
                <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400">
                  Predict sprint failures, monitor health metrics, and optimize your agile workflow with machine learning-powered insights
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={400}>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/dashboard"
                      className="group glass-card rounded-lg bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition-all hover:shadow-xl inline-block"
                    >
                      Get Started
                      <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/dashboard"
                      className="glass-card rounded-lg border border-gray-700 bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:border-orange-500/50 inline-block"
                    >
                      View Dashboard
                    </Link>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-sm">Scroll</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Features Section with 3D Cards */}
      <section className="relative py-32 lg:py-40 perspective-1000">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Built for modern agile teams
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                Everything you need to monitor, predict, and optimize your sprint performance
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            <ScrollReveal direction="up" delay={0}>
              <GlassCard hover tilt className="transform-3d">
                <motion.div
                  className="mb-6 text-5xl transition-transform"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  🤖
                </motion.div>
                <h3 className="mb-3 text-xl font-bold text-white">ML Predictions</h3>
                <p className="leading-relaxed text-gray-400">
                  XGBoost-powered sprint failure prediction with feature importance analysis and real-time risk assessment
                </p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <GlassCard hover tilt className="transform-3d">
                <motion.div
                  className="mb-6 text-5xl transition-transform"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  📊
                </motion.div>
                <h3 className="mb-3 text-xl font-bold text-white">Real-Time Metrics</h3>
                <p className="leading-relaxed text-gray-400">
                  Track sprint health with live data from Jira & GitHub integrations, updated every 30 seconds
                </p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400}>
              <GlassCard hover tilt className="transform-3d">
                <motion.div
                  className="mb-6 text-5xl transition-transform"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  🎯
                </motion.div>
                <h3 className="mb-3 text-xl font-bold text-white">Risk Insights</h3>
                <p className="leading-relaxed text-gray-400">
                  Actionable recommendations and insights for sprint success, powered by advanced analytics
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Capabilities Section with Glass Morphism */}
      <section className="relative border-t border-gray-800 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Intelligent sprint monitoring
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                Complete sprint health tracking in one powerful platform
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '📈', title: 'Health Score Tracking', desc: 'Real-time sprint health scores calculated from multiple metrics' },
              { icon: '🔍', title: 'Risk Zone Analysis', desc: 'Automated risk zone classification with trend analysis' },
              { icon: '📉', title: 'Trend Visualization', desc: 'Interactive charts showing sprint health trends over time' },
              { icon: '🔗', title: 'Jira Integration', desc: 'Seamless connection with Jira to pull sprint data and metrics' },
              { icon: '💻', title: 'GitHub Integration', desc: 'Connect with GitHub repositories to track PR review times' },
              { icon: '💡', title: 'Actionable Insights', desc: 'Get specific recommendations to improve sprint health' },
            ].map((feature, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                <GlassCard hover>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/20 backdrop-blur-sm">
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-400">{feature.desc}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with 3D Effect */}
      <section className="relative border-t border-gray-800 py-32 lg:py-40 gradient-mesh">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <GlassCard className="p-12">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Ready to optimize your sprints?
              </h2>
              <p className="mb-8 text-lg text-gray-400">
                Start monitoring your sprint health in real-time with AI-powered insights
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
                >
                  Get Started
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </motion.div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
