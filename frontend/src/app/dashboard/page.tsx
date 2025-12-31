'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import MetricCard from '@/components/MetricCard';
import RiskBadge from '@/components/RiskBadge';
import Insights from '@/components/Insights';
import RiskTrendChart from '@/components/RiskTrendChart';
import Footer from '@/components/Footer';

// Use production backend URL if NEXT_PUBLIC_API_URL is not set
const API_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')
    ? 'https://scrummate-ai-21yl.onrender.com'
    : 'http://localhost:3001');

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const [healthRes, historyRes] = await Promise.all([
        axios.get(`${API_URL}/sprint/health`),
        axios.get(`${API_URL}/sprint/history`).catch(() => ({ data: [] })),
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
    fetchData();
    const interval = setInterval(() => fetchData(), 30000); // Auto-refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page-background">
        <div className="text-center">
          <div className="relative">
            <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-4 border-gray-800 border-t-orange-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
          <p className="text-lg font-medium text-white">Loading dashboard...</p>
          <p className="mt-2 text-sm text-gray-400">Fetching sprint data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page-background p-10">
        <div className="max-w-md rounded-2xl border border-gray-800 bg-gray-900/50 p-8 text-center backdrop-blur-sm">
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
        </div>
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
    <div className="min-h-screen bg-page-background animate-fade-in">
      {refreshing && (
        <div className="fixed top-20 right-4 z-50 rounded-lg border border-gray-800 bg-gray-900/95 backdrop-blur-lg px-4 py-2 flex items-center gap-2 shadow-lg animate-fade-in">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
          <span className="text-sm font-medium text-white">Refreshing...</span>
        </div>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400">
                Real-time sprint health monitoring and AI-powered risk prediction
              </p>
            </div>
            <div className="flex items-center gap-3">
              {lastUpdated && (
                <div className="text-sm text-gray-400">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
              <button
                onClick={() => fetchData(true)}
                disabled={refreshing}
                className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className={`text-lg ${refreshing ? 'animate-spin' : ''}`}>
                  {refreshing ? '⏳' : '🔄'}
                </span>
                <span>Refresh</span>
              </button>
              <Link
                href="/"
                className="rounded-lg border border-gray-800 bg-transparent px-4 py-2 text-sm font-medium text-white transition-all hover:border-gray-700 hover:bg-gray-800/50"
              >
                Home
              </Link>
            </div>
          </div>
        </div>

        {/* Health Score Section */}
        <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900/50 p-8 backdrop-blur-sm">
          <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                Current Sprint Health Score
              </h2>
              <div className="mb-4 flex items-baseline gap-4">
                <div className={`text-7xl font-extrabold ${getHealthColor(data.healthScore)}`}>
                  {data.healthScore}
                </div>
                <div className="text-3xl font-medium text-gray-500">/ 100</div>
              </div>
              {/* Health Bar */}
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    data.healthScore >= 70
                      ? 'bg-gradient-to-r from-green-500 to-green-600'
                      : data.healthScore >= 50
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                        : data.healthScore >= 30
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                          : 'bg-gradient-to-r from-red-500 to-red-600'
                  }`}
                  style={{ width: `${data.healthScore}%` }}
                />
              </div>
            </div>
            <RiskBadge zone={data.riskZone} />
          </div>

          {/* ML Prediction */}
          <div className="rounded-xl border-2 border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 p-5">
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
          </div>
        </div>

        {/* Metrics Grid */}
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

        {/* Chart and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RiskTrendChart data={history} />
          <Insights items={data.insights} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
