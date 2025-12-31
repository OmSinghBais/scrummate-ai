'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import TeamSwitcher from '@/components/TeamSwitcher';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const WEBHOOK_EVENTS = [
  { id: 'sprint_created', label: 'Sprint Created' },
  { id: 'sprint_completed', label: 'Sprint Completed' },
  { id: 'risk_changed', label: 'Risk Zone Changed' },
  { id: 'health_score_updated', label: 'Health Score Updated' },
];

export default function WebhooksPage() {
  const { data: session } = useSession();
  const [selectedTeamId, setSelectedTeamId] = useState<number | undefined>();
  const [webhooks, setWebhooks] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWebhook, setNewWebhook] = useState({
    url: '',
    events: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.accessToken && selectedTeamId) {
      fetchWebhooks();
    }
  }, [session, selectedTeamId]);

  const fetchWebhooks = async () => {
    if (!selectedTeamId) return;
    try {
      const response = await axios.get(`${API_URL}/webhooks/team/${selectedTeamId}`, {
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      });
      setWebhooks(response.data);
    } catch (error) {
      console.error('Failed to fetch webhooks:', error);
    }
  };

  const createWebhook = async () => {
    if (!selectedTeamId || !newWebhook.url || newWebhook.events.length === 0) return;
    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/webhooks`,
        { teamId: selectedTeamId, ...newWebhook },
        {
          headers: {
            Authorization: `Bearer ${(session as any)?.accessToken}`,
          },
        }
      );
      setShowCreateModal(false);
      setNewWebhook({ url: '', events: [] });
      fetchWebhooks();
    } catch (error) {
      console.error('Failed to create webhook:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteWebhook = async (id: number) => {
    if (!selectedTeamId) return;
    try {
      await axios.delete(`${API_URL}/webhooks/${id}`, {
        data: { teamId: selectedTeamId },
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      });
      fetchWebhooks();
    } catch (error) {
      console.error('Failed to delete webhook:', error);
    }
  };

  const toggleEvent = (eventId: string) => {
    setNewWebhook((prev) => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter((e) => e !== eventId)
        : [...prev.events, eventId],
    }));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-white mb-2">Webhooks</h1>
          <p className="text-neutral-400">Configure webhooks to receive real-time updates</p>
        </div>

        <div className="mb-6">
          <TeamSwitcher
            selectedTeamId={selectedTeamId}
            onTeamChange={setSelectedTeamId}
          />
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition-colors"
          >
            + Create Webhook
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {webhooks.map((webhook) => (
            <motion.div
              key={webhook.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${webhook.active ? 'bg-green-400' : 'bg-neutral-500'}`} />
                  <span className="text-sm text-neutral-400">Active</span>
                </div>
                <button
                  onClick={() => deleteWebhook(webhook.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Delete
                </button>
              </div>
              <div className="mb-4">
                <div className="text-sm text-neutral-400 mb-1">URL</div>
                <div className="text-white font-mono text-sm break-all">{webhook.url}</div>
              </div>
              <div>
                <div className="text-sm text-neutral-400 mb-2">Events</div>
                <div className="flex flex-wrap gap-2">
                  {webhook.events.map((event: string) => (
                    <span
                      key={event}
                      className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-xs"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          {webhooks.length === 0 && (
            <div className="col-span-2 text-center py-12 text-neutral-400">
              No webhooks configured. Create one to get started.
            </div>
          )}
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Create Webhook</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-300 mb-2">Webhook URL</label>
                  <input
                    type="url"
                    value={newWebhook.url}
                    onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                    placeholder="https://your-app.com/webhook"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-300 mb-2">Events</label>
                  <div className="space-y-2">
                    {WEBHOOK_EVENTS.map((event) => (
                      <label
                        key={event.id}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={newWebhook.events.includes(event.id)}
                          onChange={() => toggleEvent(event.id)}
                          className="rounded"
                        />
                        <span className="text-white text-sm">{event.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={createWebhook}
                  disabled={loading || !newWebhook.url || newWebhook.events.length === 0}
                  className="flex-1 px-4 py-2 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create'}
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewWebhook({ url: '', events: [] });
                  }}
                  className="flex-1 px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

