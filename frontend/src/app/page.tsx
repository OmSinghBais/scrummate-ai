'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import GlobalCanvas from '@/components/GlobalCanvas';
import HolographicObject from '@/components/HolographicObject';
import ScrollReveal from '@/components/ScrollReveal';
import GlassCard from '@/components/GlassCard';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* Premium Hero Section - Split Layout */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden grain-overlay pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <GlobalCanvas>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[600px]">
            {/* Left Side - Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <h1 className="editorial-headline text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1]">
                Sprint Intelligence,<br />
                <span className="gradient-text">Reimagined</span>
              </h1>
              
              <p className="editorial-body text-xl md:text-2xl text-gray-400 leading-relaxed max-w-xl">
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

            {/* Right Side - 3D Visual */}
            <motion.div
              className="relative h-[400px] lg:h-[600px] hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative w-full h-full">
                <HolographicObject />
              </div>
            </motion.div>
          </div>
        </GlobalCanvas>
      </section>

      {/* Platform Overview Section */}
      <section className="relative py-32 lg:py-40 bg-[#0a0a0a] px-4 sm:px-6 lg:px-8">
        <GlobalCanvas>
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-20">
              <h2 className="editorial-headline text-white mb-8">
                Built for Modern Teams
              </h2>
              <p className="editorial-body text-xl text-gray-400 max-w-2xl mx-auto">
                Everything you need to monitor, predict, and optimize your sprint performance
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
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
            ].map((feature, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                <GlassCard hover className="p-8 h-full">
                  <div className="mb-6 text-5xl">{feature.icon}</div>
                  <h3 className="text-2xl font-medium text-white mb-4 editorial-headline">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 editorial-body leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </GlobalCanvas>
      </section>

      {/* Features Section */}
      <section className="relative py-32 lg:py-40 bg-[#0a0a0a] px-4 sm:px-6 lg:px-8">
        <GlobalCanvas>
          <ScrollReveal direction="up" delay={0}>
            <div className="mb-20">
              <h2 className="editorial-headline text-white mb-8">
                Intelligent Sprint Monitoring
              </h2>
              <p className="editorial-body text-xl text-gray-400 max-w-2xl">
                Complete sprint health tracking in one powerful platform
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
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
            ].map((feature, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 80}>
                <GlassCard hover className="p-8 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <h3 className="text-xl font-medium text-white editorial-headline">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 editorial-body text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </GlobalCanvas>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 lg:py-40 bg-[#0a0a0a] px-4 sm:px-6 lg:px-8">
        <GlobalCanvas>
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="editorial-headline text-white mb-8">
                Ready to optimize your sprints?
              </h2>
              <p className="editorial-body text-xl text-gray-400 mb-12">
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
        </GlobalCanvas>
      </section>

      <Footer />
    </div>
  );
}
