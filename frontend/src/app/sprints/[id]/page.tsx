'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function SprintDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [sprint, setSprint] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (session?.accessToken && id) {
      fetchSprintData();
    }
  }, [session, id]);

  const fetchSprintData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${(session as any)?.accessToken}`,
      };

      const [sprintRes, analyticsRes, historyRes] = await Promise.all([
        axios.get(`${API_URL}/sprint/${id}`, { headers }),
        axios.get(`${API_URL}/sprint/${id}/analytics`, { headers }).catch(() => ({ data: null })),
        axios.get(`${API_URL}/sprint/history`, { headers }).catch(() => ({ data: [] })),
      ]);

      setSprint(sprintRes.data);
      setAnalytics(analyticsRes.data);
      setHistory(historyRes.data || []);
    } catch (error) {
      console.error('Failed to fetch sprint data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (zone: string) => {
    switch (zone) {
      case 'GREEN': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'YELLOW': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'ORANGE': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'RED': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-neutral-400 bg-neutral-400/10 border-neutral-400/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
          <p className="mt-4 text-neutral-400">Loading sprint details...</p>
        </div>
      </div>
    );
  }

  if (!sprint) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Sprint Not Found</h2>
          <Link href="/dashboard" className="text-teal-400 hover:text-teal-300">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const chartData = history.slice(-10).map((s: any) => ({
    name: s.sprintName || `Sprint ${s.id}`,
    health: s.healthScore,
    spillover: s.metrics?.spilloverRate || 0,
    prDelay: s.metrics?.prReviewDelay || 0,
  }));

  const metricsData = [
    { name: 'Spillover Rate', value: sprint.metrics?.spilloverRate || 0, unit: '%' },
    { name: 'PR Review Delay', value: sprint.metrics?.prReviewDelay || 0, unit: 'h' },
    { name: 'Code Churn', value: sprint.metrics?.codeChurn || 0, unit: '%' },
    { name: 'Bug Reopen Rate', value: sprint.metrics?.bugReopenRate || 0, unit: '%' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="text-teal-400 hover:text-teal-300 mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-serif text-white mb-2">{sprint.sprintName || 'Sprint Details'}</h1>
            <p className="text-neutral-400">
              Created: {new Date(sprint.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className={`px-4 py-2 rounded-full border ${getRiskColor(sprint.riskZone)}`}>
            {sprint.riskZone} Risk
          </div>
        </div>

        {/* Health Score Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-neutral-400 mb-2">Health Score</div>
              <div className={`text-6xl font-bold ${
                sprint.healthScore >= 70 ? 'text-green-400' :
                sprint.healthScore >= 50 ? 'text-yellow-400' :
                sprint.healthScore >= 30 ? 'text-orange-400' :
                'text-red-400'
              }`}>
                {sprint.healthScore}
              </div>
              <div className="text-neutral-500 text-sm">/ 100</div>
            </div>
            <div>
              <div className="text-sm text-neutral-400 mb-2">ML Prediction</div>
              <div className="text-2xl font-semibold text-white mb-1">
                {sprint.mlPrediction || 'N/A'}
              </div>
              <div className="text-xs text-neutral-500">AI-powered forecast</div>
            </div>
            {analytics?.analytics && (
              <div>
                <div className="text-sm text-neutral-400 mb-2">Team Velocity</div>
                <div className="text-2xl font-semibold text-white mb-1">
                  {analytics.analytics.velocity}
                </div>
                <div className="text-xs text-neutral-500 capitalize">
                  Trend: {analytics.analytics.trend}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsData.map((metric) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6"
            >
              <div className="text-sm text-neutral-400 mb-2">{metric.name}</div>
              <div className="text-3xl font-bold text-white">
                {metric.value}{metric.unit}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Health Score Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                <Legend />
                <Line type="monotone" dataKey="health" stroke="#14b8a6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Metrics Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                <Legend />
                <Bar dataKey="spillover" fill="#f59e0b" />
                <Bar dataKey="prDelay" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Risk Factors & Recommendations */}
        {analytics?.analytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-red-500/10 border border-red-500/20 p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">⚠️ Risk Factors</h3>
              <ul className="space-y-2">
                {analytics.analytics.riskFactors.map((factor: string, idx: number) => (
                  <li key={idx} className="text-neutral-300 flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-teal-500/10 border border-teal-500/20 p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">💡 Recommendations</h3>
              <ul className="space-y-2">
                {analytics.analytics.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="text-neutral-300 flex items-start gap-2">
                    <span className="text-teal-400 mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

