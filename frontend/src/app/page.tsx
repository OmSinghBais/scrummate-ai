'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import GlassCard from '@/components/GlassCard';
import { motion } from 'framer-motion';

export default function Home() {
  const features = [
    {
      icon: '🤖',
      title: 'ML Predictions',
      description: 'XGBoost-powered sprint failure prediction with feature importance analysis and real-time risk assessment',
    },
    {
      icon: '📊',
      title: 'Real-Time Metrics',
      description: 'Track sprint health with live data from Jira & GitHub integrations, updated every 30 seconds',
    },
    {
      icon: '🎯',
      title: 'Risk Insights',
      description: 'Actionable recommendations and insights for sprint success, powered by advanced analytics',
    },
  ];

  const capabilities = [
    {
      icon: '📈',
      title: 'Health Score Tracking',
      description: 'Real-time sprint health scores calculated from multiple metrics including spillover rates, code churn, and PR review delays',
    },
    {
      icon: '🔍',
      title: 'Risk Zone Analysis',
      description: 'Automated risk zone classification (Low, Medium, High, Critical) with trend analysis and historical comparisons',
    },
    {
      icon: '📉',
      title: 'Trend Visualization',
      description: 'Interactive charts showing sprint health trends over time with predictive analytics',
    },
    {
      icon: '🔗',
      title: 'Jira Integration',
      description: 'Seamless connection with Jira to pull sprint data, issue metrics, and team performance indicators',
    },
    {
      icon: '💻',
      title: 'GitHub Integration',
      description: 'Connect with GitHub repositories to track PR review times, code churn, and development velocity',
    },
    {
      icon: '💡',
      title: 'Actionable Insights',
      description: 'Get specific recommendations to improve sprint health based on current metrics and historical patterns',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 flex justify-center py-20">
      <div className="w-[92%] max-w-7xl rounded-3xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Hero Section - Split Layout */}
        <section className="px-8 md:px-12 lg:px-16 py-20 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT - Text Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.1]">
                Sprint Intelligence,<br />
                <span className="text-teal-400">Reimagined</span>
              </h1>
              
              <p className="text-lg md:text-xl text-neutral-400 max-w-md leading-relaxed">
                Elegant solutions for the most complex agile workflow challenges.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/dashboard"
                    className="btn-premium btn-premium-primary inline-block text-center"
                  >
                    Explore Platform
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/dashboard"
                    className="btn-premium btn-premium-secondary inline-block text-center"
                  >
                    Book a Demo
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT - Visual */}
            <motion.div
              className="relative h-[420px] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Abstract Gradient Canvas */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 via-cyan-500/10 to-transparent backdrop-blur-lg border border-white/10 shadow-xl">
                {/* Animated Gradient Orbs */}
                <motion.div
                  className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-teal-400/30 blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -40, 0],
                    y: [0, 30, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                {/* Organic Shape Overlay */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(6, 182, 212, 0.1))',
                    borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                    filter: 'blur(40px)',
                  }}
                  animate={{
                    borderRadius: [
                      '40% 60% 70% 30% / 40% 50% 60% 50%',
                      '60% 40% 30% 70% / 50% 40% 50% 60%',
                      '40% 60% 70% 30% / 40% 50% 60% 50%',
                    ],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Platform Overview Section */}
        <section className="px-8 md:px-12 lg:px-16 py-20 lg:py-32 border-t border-white/5">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6">
                Built for Modern Teams
              </h2>
              <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
                Everything you need to monitor, predict, and optimize your sprint performance
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="px-8 md:px-12 lg:px-16 py-20 lg:py-32 border-t border-white/5">
          <ScrollReveal direction="up" delay={0}>
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6">
                Intelligent Sprint Monitoring
              </h2>
              <p className="text-lg md:text-xl text-neutral-400 max-w-2xl">
                Complete sprint health tracking in one powerful platform
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 80}>
                <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">{capability.icon}</div>
                    <h3 className="text-lg font-medium text-white">{capability.title}</h3>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">{capability.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-8 md:px-12 lg:px-16 py-20 lg:py-32 border-t border-white/5">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6">
                Ready to optimize your sprints?
              </h2>
              <p className="text-lg md:text-xl text-neutral-400 mb-12">
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
        </section>
      </div>
      <Footer />
    </div>
  );
}
