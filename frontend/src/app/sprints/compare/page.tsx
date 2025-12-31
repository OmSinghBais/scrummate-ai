'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TeamSwitcher from '@/components/TeamSwitcher';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Sprint {
  id: number;
  sprintName: string;
  healthScore: number;
  riskZone: string;
  metrics: any;
  createdAt: string;
}

export default function SprintComparePage() {
  const { data: session } = useSession();
  const [selectedTeamId, setSelectedTeamId] = useState<number | undefined>();
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [selectedSprints, setSelectedSprints] = useState<number[]>([]);
  const [comparison, setComparison] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.accessToken && selectedTeamId) {
      fetchSprints();
    }
  }, [session, selectedTeamId]);

  const fetchSprints = async () => {
    try {
      const response = await axios.get(`${API_URL}/sprint/history?teamId=${selectedTeamId}`, {
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      });
      setSprints(response.data);
    } catch (error) {
      console.error('Failed to fetch sprints:', error);
    } finally {
      setLoading(false);
    }
  };

  const compareSprints = async () => {
    if (selectedSprints.length < 2) {
      alert('Please select at least 2 sprints to compare');
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/sprint/compare`,
        { sprintIds: selectedSprints, teamId: selectedTeamId },
        {
          headers: {
            Authorization: `Bearer ${(session as any)?.accessToken}`,
          },
        }
      );
      setComparison(response.data);
    } catch (error) {
      console.error('Failed to compare sprints:', error);
    }
  };

  const toggleSprint = (sprintId: number) => {
    setSelectedSprints((prev) =>
      prev.includes(sprintId)
        ? prev.filter((id) => id !== sprintId)
        : [...prev, sprintId]
    );
  };

  const getRiskColor = (zone: string) => {
    switch (zone) {
      case 'GREEN': return 'text-green-400';
      case 'YELLOW': return 'text-yellow-400';
      case 'ORANGE': return 'text-orange-400';
      case 'RED': return 'text-red-400';
      default: return 'text-neutral-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">Sprint Comparison</h1>
            <p className="text-neutral-400">Compare multiple sprints side-by-side</p>
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

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
          </div>
        ) : sprints.length === 0 ? (
          <div className="text-center py-12 text-neutral-400">
            No sprints found. Create some sprints first.
          </div>
        ) : (
          <>
            <div className="mb-8 rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Select Sprints to Compare</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {sprints.map((sprint) => (
                  <button
                    key={sprint.id}
                    onClick={() => toggleSprint(sprint.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedSprints.includes(sprint.id)
                        ? 'border-teal-500 bg-teal-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{sprint.sprintName}</span>
                      {selectedSprints.includes(sprint.id) && (
                        <span className="text-teal-400">✓</span>
                      )}
                    </div>
                    <div className={`text-2xl font-bold ${getRiskColor(sprint.riskZone)}`}>
                      {sprint.healthScore}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">
                      {new Date(sprint.createdAt).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={compareSprints}
                disabled={selectedSprints.length < 2}
                className="px-6 py-3 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Compare {selectedSprints.length} Sprint{selectedSprints.length !== 1 ? 's' : ''}
              </button>
            </div>

            {comparison && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6">
                  <h2 className="text-2xl font-semibold text-white mb-6">Comparison Results</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-sm text-neutral-400 mb-1">Avg Health Score</div>
                      <div className="text-3xl font-bold text-white">{comparison.comparison.avgHealthScore}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-sm text-neutral-400 mb-1">Avg Spillover</div>
                      <div className="text-3xl font-bold text-white">{comparison.comparison.avgSpillover}%</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-sm text-neutral-400 mb-1">Avg PR Delay</div>
                      <div className="text-3xl font-bold text-white">{comparison.comparison.avgPRDelay}h</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-sm text-neutral-400 mb-1">Avg Code Churn</div>
                      <div className="text-3xl font-bold text-white">{comparison.comparison.avgCodeChurn}%</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-sm text-neutral-400 mb-1">Avg Bug Reopen</div>
                      <div className="text-3xl font-bold text-white">{comparison.comparison.avgBugReopen}%</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20">
                    <div className="text-sm text-neutral-400 mb-1">Overall Trend</div>
                    <div className={`text-2xl font-bold ${
                      comparison.comparison.trend === 'improving' ? 'text-green-400' :
                      comparison.comparison.trend === 'declining' ? 'text-red-400' :
                      'text-yellow-400'
                    }`}>
                      {comparison.comparison.trend.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Sprint Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {comparison.sprints.map((sprint: any) => (
                      <div key={sprint.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="font-semibold text-white mb-2">{sprint.sprintName}</div>
                        <div className={`text-2xl font-bold ${getRiskColor(sprint.riskZone)} mb-2`}>
                          {sprint.healthScore}
                        </div>
                        <div className="text-xs text-neutral-400 space-y-1">
                          <div>Spillover: {sprint.metrics.spilloverRate}%</div>
                          <div>PR Delay: {sprint.metrics.prReviewDelay}h</div>
                          <div>Code Churn: {sprint.metrics.codeChurn}%</div>
                          <div>Bug Reopen: {sprint.metrics.bugReopenRate}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

