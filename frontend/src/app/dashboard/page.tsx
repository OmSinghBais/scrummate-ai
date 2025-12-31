'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MetricCard from '@/components/MetricCard';
import StatsCard from '@/components/StatsCard';
import ProgressBar from '@/components/ProgressBar';
import RiskBadge from '@/components/RiskBadge';
import Insights from '@/components/Insights';
import RiskTrendChart from '@/components/RiskTrendChart';
import ScrollReveal from '@/components/ScrollReveal';
import GlassCard from '@/components/GlassCard';
import TeamSwitcher from '@/components/TeamSwitcher';

// Use production backend URL if NEXT_PUBLIC_API_URL is not set
const API_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')
    ? 'https://scrummate-ai-21yl.onrender.com'
    : 'http://localhost:3001');

export default function Dashboard() {
  const { data: session } = useSession();
  const [selectedTeamId, setSelectedTeamId] = useState<number | undefined>();
  const [data, setData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (showRefreshing = false) => {
    if (!session?.accessToken) return;

    try {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const headers = {
        Authorization: `Bearer ${(session as any)?.accessToken}`,
      };
      
      const healthUrl = selectedTeamId 
        ? `${API_URL}/sprint/health?teamId=${selectedTeamId}`
        : `${API_URL}/sprint/health`;
      const historyUrl = selectedTeamId
        ? `${API_URL}/sprint/history?teamId=${selectedTeamId}`
        : `${API_URL}/sprint/history`;
      
      const [healthRes, historyRes] = await Promise.all([
        axios.get(healthUrl, { headers }),
        axios.get(historyUrl, { headers }).catch(() => ({ data: [] })),
      ]);
      
      setData(healthRes.data);
      setHistory(historyRes.data || []);
      setLastUpdated(new Date());
    } catch (err: any) {
      console.error('Failed to fetch data:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchData();
      const interval = setInterval(() => fetchData(), 30000);
      return () => clearInterval(interval);
    }
  }, [session, selectedTeamId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <motion.div
            className="relative mx-auto mb-6 h-16 w-16"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full"></div>
          </motion.div>
          <p className="text-lg font-medium text-white">Loading dashboard...</p>
          <p className="mt-2 text-sm text-gray-400">Fetching sprint data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-10">
        <GlassCard className="max-w-md p-8 text-center">
          <div className="mb-4 text-6xl">⚠️</div>
          <h2 className="mb-3 text-2xl font-bold text-white">Error Loading Dashboard</h2>
          <p className="mb-2 text-gray-400">{error}</p>
          <p className="mb-6 text-sm text-gray-500">
            Make sure the backend is running and accessible
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => fetchData()}
              className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-orange-600 hover:to-amber-600 hover:shadow-xl"
            >
              Retry
            </button>
            <Link
              href="/"
              className="rounded-xl border border-gray-800 bg-transparent px-6 py-3 font-semibold text-white transition-all hover:border-gray-700 hover:bg-gray-800/50"
            >
              Go Home
            </Link>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // Get health score color based on value
  const getHealthColor = (score: number) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    if (score >= 30) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="p-8">
        {refreshing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-24 right-4 z-50 glass-card px-4 py-2 flex items-center gap-2 shadow-lg"
          >
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
            <span className="text-sm font-medium text-white">Refreshing...</span>
          </motion.div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif text-white mb-2">Dashboard</h1>
            <p className="text-neutral-400">Real-time sprint health monitoring and AI-powered risk prediction</p>
          </div>
          <div className="flex items-center gap-4">
            <TeamSwitcher
              selectedTeamId={selectedTeamId}
              onTeamChange={setSelectedTeamId}
            />
            {lastUpdated && (
              <div className="text-sm text-gray-400 hidden sm:block">
                Updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
            <motion.button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className="glass-card flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:bg-gray-800/50 disabled:cursor-not-allowed disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`text-lg ${refreshing ? 'animate-spin' : ''}`}>
                {refreshing ? '⏳' : '🔄'}
              </span>
              <span>Refresh</span>
            </motion.button>
          </div>
        </div>

          {/* Stats Overview */}
          <ScrollReveal direction="up" delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Health Score"
                value={data.healthScore}
                change={5}
                trend="up"
                icon="📊"
                color="green"
              />
              <StatsCard
                title="Active Sprints"
                value="12"
                change={2}
                trend="up"
                icon="🏃"
                color="blue"
              />
              <StatsCard
                title="Risk Alerts"
                value="3"
                change={-1}
                trend="down"
                icon="⚠️"
                color="red"
              />
              <StatsCard
                title="Team Velocity"
                value="87%"
                change={12}
                trend="up"
                icon="⚡"
                color="orange"
              />
            </div>
          </ScrollReveal>

          {/* Health Score Card */}
          <ScrollReveal direction="up" delay={100}>
            <GlassCard className="mb-8 p-8">
              <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                    Current Sprint Health Score
                  </h2>
                  <div className="mb-6 flex items-baseline gap-4">
                    <motion.div
                      className={`text-7xl font-extrabold ${getHealthColor(data.healthScore)}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      {data.healthScore}
                    </motion.div>
                    <div className="text-3xl font-medium text-gray-500">/ 100</div>
                  </div>
                  <ProgressBar
                    value={data.healthScore}
                    max={100}
                    showValue={false}
                  />
                </div>
                <RiskBadge zone={data.riskZone} />
              </div>

              {/* ML Prediction */}
              <motion.div
                className="rounded-xl border-2 border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 p-5"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-800 p-2 shadow-sm">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      AI Prediction
                    </p>
                    <p className="text-lg font-bold text-orange-400">{data.mlPrediction}</p>
                  </div>
                </div>
              </motion.div>
            </GlassCard>
          </ScrollReveal>

          {/* Metrics Grid */}
          <ScrollReveal direction="up" delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Spillover Rate"
                value={`${data.metrics.spilloverRate}%`}
              />
              <MetricCard
                title="PR Review Delay"
                value={`${Math.round(data.metrics.prReviewDelay || 0)}h`}
              />
              <MetricCard
                title="Code Churn"
                value={`${data.metrics.codeChurn}%`}
              />
              <MetricCard
                title="Bug Reopen Rate"
                value={`${data.metrics.bugReopenRate}%`}
              />
            </div>
          </ScrollReveal>

          {/* Chart and Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ScrollReveal direction="up" delay={300}>
              <RiskTrendChart data={history} />
            </ScrollReveal>
            <ScrollReveal direction="up" delay={400}>
              <Insights items={data.insights} />
            </ScrollReveal>
          </div>
      </div>
    </div>
  );
}
