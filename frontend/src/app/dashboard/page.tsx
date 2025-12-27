'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import MetricCard from '@/components/MetricCard';
import RiskBadge from '@/components/RiskBadge';
import Insights from '@/components/Insights';
import RiskTrendChart from '@/components/RiskTrendChart';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!API) {
      setError('API URL not configured');
      return;
    }

    axios
      .get(`${API}/sprint/history`)
      .then((res) => setHistory(res.data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load sprint history');
      });
  }, []);

  useEffect(() => {
    if (!API) return;

    axios
      .get(`${API}/sprint/health`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load sprint health');
      });
  }, []);

  if (error) {
    return <p className="p-10 text-red-500">{error}</p>;
  }

  if (!data) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">🚀 ScrumMate AI Dashboard</h1>

      <div className="flex items-center gap-6">
        <div className="text-5xl font-bold">{data.healthScore}</div>
        <RiskBadge zone={data.riskZone} />
      </div>

      <div className="mt-2 text-sm text-orange-400">
        ML Prediction: {data.mlPrediction}
      </div>

      {data.mlExplanation?.length > 0 && (
        <div className="border rounded-lg p-4 mt-4">
          <h3 className="font-semibold mb-2">🧠 Why this sprint is risky</h3>
          <ul className="space-y-1">
            {data.mlExplanation.map((item: any, idx: number) => (
              <li key={idx}>
                {idx + 1}. {item.feature} — {item.importance}%
              </li>
            ))}
          </ul>
        </div>
      )}

      <RiskTrendChart data={history} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Spillover Rate" value={data.metrics.spilloverRate + '%'} />
        <MetricCard title="PR Review Delay" value={data.metrics.prReviewDelay + '%'} />
        <MetricCard title="Code Churn" value={data.metrics.codeChurn + '%'} />
        <MetricCard title="Bug Reopen Rate" value={data.metrics.bugReopenRate + '%'} />
      </div>

      <Insights items={data.insights} />
    </div>
  );
}
