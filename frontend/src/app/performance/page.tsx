'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import TeamSwitcher from '@/components/TeamSwitcher';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function PerformancePage() {
  const { data: session } = useSession();
  const [selectedTeamId, setSelectedTeamId] = useState<number | undefined>();
  const [performance, setPerformance] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.accessToken) {
      fetchPerformance();
    }
  }, [session, selectedTeamId]);

  const fetchPerformance = async () => {
    try {
      const url = selectedTeamId
        ? `${API_URL}/performance/team?teamId=${selectedTeamId}`
        : `${API_URL}/performance/team`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      });
      setPerformance(response.data);
    } catch (error) {
      console.error('Failed to fetch performance:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
          <p className="mt-4 text-neutral-400">Loading performance data...</p>
        </div>
      </div>
    );
  }

  if (!performance) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center text-neutral-400">No performance data available</div>
      </div>
    );
  }

  const velocityData = performance.recentPerformance.map((p: any) => ({
    name: p.sprintName || 'Sprint',
    velocity: p.healthScore,
  }));

  const metricsData = [
    { name: 'Spillover', value: Math.round(performance.avgMetrics.spilloverRate), unit: '%' },
    { name: 'PR Delay', value: Math.round(performance.avgMetrics.prReviewDelay), unit: 'h' },
    { name: 'Code Churn', value: Math.round(performance.avgMetrics.codeChurn), unit: '%' },
    { name: 'Bug Reopen', value: Math.round(performance.avgMetrics.bugReopenRate), unit: '%' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">Team Performance</h1>
            <p className="text-neutral-400">Track team velocity, trends, and metrics over time</p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="mb-6">
          <TeamSwitcher
            selectedTeamId={selectedTeamId}
            onTeamChange={setSelectedTeamId}
          />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6"
          >
            <div className="text-sm text-neutral-400 mb-2">Total Sprints</div>
            <div className="text-3xl font-bold text-white">{performance.totalSprints}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6"
          >
            <div className="text-sm text-neutral-400 mb-2">Avg Velocity</div>
            <div className="text-3xl font-bold text-white">{performance.avgVelocity}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6"
          >
            <div className="text-sm text-neutral-400 mb-2">Improvement Rate</div>
            <div className={`text-3xl font-bold ${
              performance.improvementRate > 0 ? 'text-green-400' :
              performance.improvementRate < 0 ? 'text-red-400' :
              'text-neutral-400'
            }`}>
              {performance.improvementRate > 0 ? '+' : ''}{performance.improvementRate.toFixed(1)}%
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6"
          >
            <div className="text-sm text-neutral-400 mb-2">Trend</div>
            <div className={`text-3xl font-bold capitalize ${
              performance.velocityTrend === 'improving' ? 'text-green-400' :
              performance.velocityTrend === 'declining' ? 'text-red-400' :
              'text-yellow-400'
            }`}>
              {performance.velocityTrend}
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Velocity Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                <Legend />
                <Line type="monotone" dataKey="velocity" stroke="#14b8a6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Average Metrics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metricsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                <Bar dataKey="value" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Recent Sprint Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {performance.recentPerformance.map((sprint: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-sm text-neutral-400 mb-1">{sprint.sprintName}</div>
                <div className={`text-2xl font-bold ${
                  sprint.healthScore >= 70 ? 'text-green-400' :
                  sprint.healthScore >= 50 ? 'text-yellow-400' :
                  sprint.healthScore >= 30 ? 'text-orange-400' :
                  'text-red-400'
                }`}>
                  {sprint.healthScore}
                </div>
                <div className="text-xs text-neutral-500 mt-1 capitalize">{sprint.riskZone}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

