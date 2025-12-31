'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TeamSwitcher from '@/components/TeamSwitcher';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function PlanningPage() {
  const { data: session } = useSession();
  const [selectedTeamId, setSelectedTeamId] = useState<number | undefined>();
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [sprintName, setSprintName] = useState('');
  const [goal, setGoal] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [stories, setStories] = useState<any[]>([]);
  const [newStory, setNewStory] = useState({ title: '', points: 0, dependencies: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.accessToken && selectedTeamId) {
      fetchPlans();
    }
  }, [session, selectedTeamId]);

  const fetchPlans = async () => {
    if (!selectedTeamId) return;
    try {
      const response = await axios.get(`${API_URL}/planning/team/${selectedTeamId}`, {
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      });
      setPlans(response.data);
    } catch (error) {
      console.error('Failed to fetch plans:', error);
    }
  };

  const createPlan = async () => {
    if (!selectedTeamId || !sprintName) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/planning`,
        { teamId: selectedTeamId, sprintName, goal },
        {
          headers: {
            Authorization: `Bearer ${(session as any)?.accessToken}`,
          },
        }
      );
      setPlans([response.data, ...plans]);
      setSelectedPlan(response.data);
      setSprintName('');
      setGoal('');
    } catch (error) {
      console.error('Failed to create plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const addStory = async () => {
    if (!selectedPlan || !newStory.title) return;
    try {
      const response = await axios.post(
        `${API_URL}/planning/${selectedPlan.id}/stories`,
        { teamId: selectedTeamId, story: newStory },
        {
          headers: {
            Authorization: `Bearer ${(session as any)?.accessToken}`,
          },
        }
      );
      setSelectedPlan(response.data);
      setStories(response.data.stories || []);
      setNewStory({ title: '', points: 0, dependencies: [] });
    } catch (error) {
      console.error('Failed to add story:', error);
    }
  };

  const totalPoints = stories.reduce((sum, s) => sum + (s.points || 0), 0);
  const utilization = capacity > 0 ? (totalPoints / capacity) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">Sprint Planning</h1>
            <p className="text-neutral-400">Plan your sprints with goals, stories, and capacity</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create New Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Create Sprint Plan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-300 mb-2">Sprint Name</label>
                <input
                  type="text"
                  value={sprintName}
                  onChange={(e) => setSprintName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="Sprint 1"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-2">Sprint Goal</label>
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="What do we want to achieve?"
                  rows={3}
                />
              </div>
              <button
                onClick={createPlan}
                disabled={loading || !sprintName}
                className="w-full px-6 py-3 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Plan'}
              </button>
            </div>
          </motion.div>

          {/* Plan Details */}
          <div className="lg:col-span-2 space-y-6">
            {selectedPlan ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-white">{selectedPlan.sprintName}</h2>
                      <p className="text-neutral-400 mt-1">{selectedPlan.goal || 'No goal set'}</p>
                    </div>
                    <button
                      onClick={() => setSelectedPlan(null)}
                      className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/5"
                    >
                      Close
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm text-neutral-300 mb-2">Team Capacity (points)</label>
                      <input
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                      />
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <div className="text-sm text-neutral-400 mb-1">Total Points</div>
                      <div className="text-2xl font-bold text-white">{totalPoints}</div>
                      {capacity > 0 && (
                        <div className="text-xs text-neutral-500 mt-1">
                          {utilization.toFixed(0)}% utilization
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Add Story</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newStory.title}
                        onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                        placeholder="Story title"
                        className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                      />
                      <input
                        type="number"
                        value={newStory.points}
                        onChange={(e) => setNewStory({ ...newStory, points: parseInt(e.target.value) || 0 })}
                        placeholder="Points"
                        className="w-24 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                      />
                      <button
                        onClick={addStory}
                        className="px-6 py-2 rounded-xl bg-teal-500 text-black font-medium hover:bg-teal-400"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Stories ({stories.length})</h3>
                    <div className="space-y-2">
                      {stories.map((story, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium text-white">{story.title}</div>
                            <div className="text-sm text-neutral-400">{story.points} points</div>
                          </div>
                          <div className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-sm">
                            {story.points} pts
                          </div>
                        </div>
                      ))}
                      {stories.length === 0 && (
                        <div className="text-center py-8 text-neutral-400">
                          No stories added yet
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </>
            ) : (
              <div className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-white mb-2">No Plan Selected</h3>
                <p className="text-neutral-400">
                  Create a new sprint plan or select an existing one
                </p>
              </div>
            )}

            {/* Existing Plans */}
            {plans.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Existing Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => {
                        setSelectedPlan(plan);
                        setStories(plan.stories || []);
                        setCapacity(plan.capacity || 0);
                      }}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
                    >
                      <div className="font-semibold text-white mb-1">{plan.sprintName}</div>
                      <div className="text-sm text-neutral-400">{plan.goal || 'No goal'}</div>
                      <div className="text-xs text-neutral-500 mt-2">
                        {plan.totalPoints} points • {plan.stories?.length || 0} stories
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

