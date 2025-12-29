'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import MetricCard from '@/components/MetricCard';
import RiskBadge from '@/components/RiskBadge';
import Insights from '@/components/Insights';
import RiskTrendChart from '@/components/RiskTrendChart';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [healthRes, historyRes] = await Promise.all([
          axios.get(`${API_URL}/sprint/health`),
          axios.get(`${API_URL}/sprint/history`).catch(() => ({ data: [] })),
        ]);
        setData(healthRes.data);
        setHistory(historyRes.data || []);
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch data:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-10">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🚀 ScrumMate AI Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time sprint health monitoring and risk prediction
          </p>
        </div>

        {/* Health Score Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Current Sprint Health Score
              </h2>
              <div className="flex items-baseline gap-4">
                <div className="text-6xl font-bold text-gray-900 dark:text-white">
                  {data.healthScore}
                </div>
                <div className="text-2xl text-gray-500 dark:text-gray-400">/ 100</div>
              </div>
            </div>
            <RiskBadge zone={data.riskZone} />
          </div>

          {/* ML Prediction */}
          <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  ML Prediction
                </p>
                <p className="text-orange-700 dark:text-orange-300 font-semibold">
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
            value={`${data.metrics.prReviewDelay}h`}
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
    </div>
  );
}
