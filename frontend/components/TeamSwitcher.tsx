'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Team {
  id: number;
  name: string;
  description?: string;
}

export default function TeamSwitcher({ selectedTeamId, onTeamChange }: { selectedTeamId?: number; onTeamChange: (teamId: number) => void }) {
  const { data: session } = useSession();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDesc, setNewTeamDesc] = useState('');

  useEffect(() => {
    if (session?.accessToken) {
      fetchTeams();
    }
  }, [session]);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`${API_URL}/teams`, {
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      });
      setTeams(response.data);
      if (response.data.length > 0 && !selectedTeamId) {
        onTeamChange(response.data[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTeam = async () => {
    if (!newTeamName.trim()) return;

    try {
      const response = await axios.post(
        `${API_URL}/teams`,
        { name: newTeamName, description: newTeamDesc },
        {
          headers: {
            Authorization: `Bearer ${(session as any)?.accessToken}`,
          },
        }
      );
      setTeams([...teams, response.data]);
      onTeamChange(response.data.id);
      setShowCreateModal(false);
      setNewTeamName('');
      setNewTeamDesc('');
    } catch (error) {
      console.error('Failed to create team:', error);
    }
  };

  const selectedTeam = teams.find(t => t.id === selectedTeamId);

  if (loading) {
    return <div className="h-10 w-32 bg-white/5 rounded-lg animate-pulse" />;
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <span>👥</span>
          <span>{selectedTeam?.name || 'Select Team'}</span>
          <span className="text-xs">▼</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 left-0 min-w-[200px] rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl z-50"
            >
              <div className="p-2">
                {teams.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => {
                      onTeamChange(team.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedTeamId === team.id
                        ? 'bg-teal-500/20 text-teal-400'
                        : 'text-white hover:bg-white/5'
                    }`}
                  >
                    {team.name}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setShowCreateModal(true);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-sm text-teal-400 hover:bg-white/5 transition-colors mt-2 border-t border-white/10 pt-2"
                >
                  + Create New Team
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Create New Team</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-300 mb-2">Team Name</label>
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="Engineering Team"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-2">Description (optional)</label>
                <input
                  type="text"
                  value={newTeamDesc}
                  onChange={(e) => setNewTeamDesc(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="Frontend development team"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={createTeam}
                className="flex-1 px-4 py-2 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewTeamName('');
                  setNewTeamDesc('');
                }}
                className="flex-1 px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

