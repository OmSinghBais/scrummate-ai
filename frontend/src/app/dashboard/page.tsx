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

  useEffect(() => {
    axios.get(`${API}/sprint/history`)
      .then(res => setHistory(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    axios.get(`${API}/sprint/health`)
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) return <p className="p-10">Loading dashboard...</p>;

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">🚀 ScrumMate AI Dashboard</h1>

      <div className="flex items-center gap-6">
        <div className="text-5xl font-bold">{data.healthScore}</div>
        <RiskBadge zone={data.riskZone} />
      </div>

      <div className="text-sm text-orange-400">
        ML Prediction: {data.mlPrediction}
      </div>

      <RiskTrendChart data={history} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Spillover Rate" value={`${data.metrics.spilloverRate}%`} />
        <MetricCard title="PR Review Delay" value={`${data.metrics.prReviewDelay}%`} />
        <MetricCard title="Code Churn" value={`${data.metrics.codeChurn}%`} />
        <MetricCard title="Bug Reopen Rate" value={`${data.metrics.bugReopenRate}%`} />
      </div>

      <Insights items={data.insights} />
    </div>
  );
}
