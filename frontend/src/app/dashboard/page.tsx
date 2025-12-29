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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 dark:border-orange-900 border-t-orange-500 mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">Loading dashboard...</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Fetching sprint data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-10">
        <div className="text-center max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">{error}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            Make sure the backend is running and accessible
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => fetchData()}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              Retry
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all font-semibold"
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
    if (score >= 70) return 'text-green-600 dark:text-green-400';
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 30) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animate-fade-in">
      {refreshing && (
        <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-4 py-2 flex items-center gap-2 animate-fade-in">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Refreshing...</span>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg">
                <span className="text-3xl">🚀</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  ScrumMate AI
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {lastUpdated && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
              <button
                onClick={() => fetchData(true)}
                disabled={refreshing}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
              >
                <span className={`text-lg ${refreshing ? 'animate-spin' : ''}`}>
                  {refreshing ? '⏳' : '🔄'}
                </span>
                <span className="font-medium text-sm">Refresh</span>
              </button>
              <Link
                href="/"
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all text-sm font-medium"
              >
                Home
              </Link>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 ml-16">
            Real-time sprint health monitoring and AI-powered risk prediction
          </p>
        </div>

        {/* Health Score Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-8 backdrop-blur-sm bg-opacity-95">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                Current Sprint Health Score
              </h2>
              <div className="flex items-baseline gap-4">
                <div className={`text-7xl font-extrabold ${getHealthColor(data.healthScore)}`}>
                  {data.healthScore}
                </div>
                <div className="text-3xl text-gray-400 dark:text-gray-500 font-medium">/ 100</div>
              </div>
              {/* Health Bar */}
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    data.healthScore >= 70 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                    data.healthScore >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                    data.healthScore >= 30 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                    'bg-gradient-to-r from-red-500 to-red-600'
                  }`}
                  style={{ width: `${data.healthScore}%` }}
                />
              </div>
            </div>
        <RiskBadge zone={data.riskZone} />
      </div>

          {/* ML Prediction */}
          <div className="mt-8 p-5 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 dark:from-orange-900/30 dark:via-amber-900/20 dark:to-orange-900/30 rounded-xl border-2 border-orange-200 dark:border-orange-800/50 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                  AI Prediction
                </p>
                <p className="text-lg font-bold text-orange-700 dark:text-orange-300">
                  {data.mlPrediction}
                </p>
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
