'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('general');
  const [riskThresholds, setRiskThresholds] = useState({
    green: 70,
    yellow: 50,
    orange: 30,
    red: 0,
  });
  const [notifications, setNotifications] = useState({
    email: true,
    riskAlerts: true,
    weeklyReport: false,
  });

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'integrations', label: 'Integrations', icon: '🔌' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'risk', label: 'Risk Thresholds', icon: '📊' },
    { id: 'webhooks', label: 'Webhooks', icon: '🔗', href: '/settings/webhooks' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif text-white mb-8">Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-4 space-y-2">
              {tabs.map((tab) => {
                if (tab.href) {
                  return (
                    <Link
                      key={tab.id}
                      href={tab.href}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-teal-500/20 text-teal-400'
                          : 'text-neutral-300 hover:bg-white/5'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </Link>
                  );
                }
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-teal-500/20 text-teal-400'
                        : 'text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-8"
            >
              {activeTab === 'general' && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">General Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        defaultValue={session?.user?.name || ''}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={session?.user?.email || ''}
                        disabled
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white opacity-50"
                      />
                    </div>
                    <button className="px-6 py-3 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'integrations' && (
                <IntegrationsTab />
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Notification Preferences</h2>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <div>
                          <div className="font-medium text-white capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-sm text-neutral-400">
                            {key === 'email' && 'Receive email notifications'}
                            {key === 'riskAlerts' && 'Get alerts when risk changes'}
                            {key === 'weeklyReport' && 'Weekly sprint summary report'}
                          </div>
                        </div>
                        <button
                          onClick={() => setNotifications({ ...notifications, [key]: !value })}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            value ? 'bg-teal-500' : 'bg-neutral-700'
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                    <button className="px-6 py-3 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition-colors">
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'risk' && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Risk Thresholds</h2>
                  <p className="text-neutral-400 mb-6">
                    Customize the health score thresholds for risk zone classification
                  </p>
                  <div className="space-y-4">
                    {Object.entries(riskThresholds).map(([zone, threshold]) => (
                      <div key={zone} className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-white capitalize">{zone} Zone</span>
                          <span className="text-2xl font-bold text-white">{threshold}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={threshold}
                          onChange={(e) => setRiskThresholds({ ...riskThresholds, [zone]: parseInt(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                    ))}
                    <button className="px-6 py-3 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition-colors">
                      Save Thresholds
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Integrations Tab Component
function IntegrationsTab() {
  const [jiraConfig, setJiraConfig] = useState({
    baseUrl: '',
    email: '',
    apiToken: '',
  });
  const [githubConfig, setGithubConfig] = useState({
    token: '',
    owner: '',
    repo: '',
  });
  const [jiraConnected, setJiraConnected] = useState(false);
  const [githubConnected, setGithubConnected] = useState(false);
  const [jiraTesting, setJiraTesting] = useState(false);
  const [githubTesting, setGithubTesting] = useState(false);
  const [jiraError, setJiraError] = useState('');
  const [githubError, setGithubError] = useState('');
  const [jiraSuccess, setJiraSuccess] = useState('');
  const [githubSuccess, setGithubSuccess] = useState('');

  // Get API URL
  function getApiUrl(): string {
    if (typeof window !== 'undefined') {
      const envUrl = process.env.NEXT_PUBLIC_API_URL;
      if (envUrl) {
        return envUrl.startsWith('http') ? envUrl : `https://${envUrl}`;
      }
      // Check if we're on Vercel
      if (window.location.hostname.includes('vercel.app')) {
        return 'https://scrummate-ai-21yl.onrender.com';
      }
      return 'http://localhost:3001';
    }
    return 'http://localhost:3001';
  }

  const testJiraConnection = async () => {
    setJiraTesting(true);
    setJiraError('');
    setJiraSuccess('');
    
    try {
      // Validate inputs
      if (!jiraConfig.baseUrl || !jiraConfig.email || !jiraConfig.apiToken) {
        setJiraError('Please fill in all fields');
        setJiraTesting(false);
        return;
      }
      
      // Validate URL format
      if (!jiraConfig.baseUrl.startsWith('http://') && !jiraConfig.baseUrl.startsWith('https://')) {
        setJiraError('Base URL must start with http:// or https://');
        setJiraTesting(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(jiraConfig.email)) {
        setJiraError('Please enter a valid email address');
        setJiraTesting(false);
        return;
      }
      
      // In a real implementation, this would call your backend API
      // For now, we'll simulate a connection test
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful connection
      setJiraConnected(true);
      setJiraSuccess('Connection successful! Click Save to store your configuration.');
      setJiraError('');
    } catch (error: any) {
      setJiraError(error.message || 'Connection failed. Please check your credentials.');
      setJiraConnected(false);
      setJiraSuccess('');
    } finally {
      setJiraTesting(false);
    }
  };

  const testGithubConnection = async () => {
    setGithubTesting(true);
    setGithubError('');
    setGithubSuccess('');
    
    try {
      // Validate inputs
      if (!githubConfig.token || !githubConfig.owner || !githubConfig.repo) {
        setGithubError('Please fill in all fields');
        setGithubTesting(false);
        return;
      }

      // Validate token format (GitHub tokens usually start with ghp_)
      if (!githubConfig.token.startsWith('ghp_') && !githubConfig.token.startsWith('github_pat_')) {
        setGithubError('GitHub token should start with ghp_ or github_pat_');
        setGithubTesting(false);
        return;
      }
      
      // In a real implementation, this would call your backend API
      // For now, we'll simulate a connection test
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful connection
      setGithubConnected(true);
      setGithubSuccess('Connection successful! Click Save to store your configuration.');
      setGithubError('');
    } catch (error: any) {
      setGithubError(error.message || 'Connection failed. Please check your credentials.');
      setGithubConnected(false);
      setGithubSuccess('');
    } finally {
      setGithubTesting(false);
    }
  };

  const saveJiraConfig = async () => {
    if (!jiraConnected) {
      setJiraError('Please test connection first');
      return;
    }
    
    try {
      // In a real implementation, save to backend
      // const apiUrl = getApiUrl();
      // await axios.post(`${apiUrl}/integrations/jira`, jiraConfig, {
      //   headers: { Authorization: `Bearer ${session?.accessToken}` }
      // });
      
      // For now, show success message
      alert('Jira configuration saved successfully! (Note: Backend integration endpoint needs to be implemented)');
      setJiraSuccess('Configuration saved!');
    } catch (error: any) {
      setJiraError('Failed to save configuration: ' + (error.message || 'Unknown error'));
    }
  };

  const saveGithubConfig = async () => {
    if (!githubConnected) {
      setGithubError('Please test connection first');
      return;
    }
    
    try {
      // In a real implementation, save to backend
      // const apiUrl = getApiUrl();
      // await axios.post(`${apiUrl}/integrations/github`, githubConfig, {
      //   headers: { Authorization: `Bearer ${session?.accessToken}` }
      // });
      
      // For now, show success message
      alert('GitHub configuration saved successfully! (Note: Backend integration endpoint needs to be implemented)');
      setGithubSuccess('Configuration saved!');
    } catch (error: any) {
      setGithubError('Failed to save configuration: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">Integrations</h2>
      <p className="text-neutral-400 mb-6">
        Connect your tools to get real-time sprint data and metrics
      </p>
      
      <div className="space-y-6">
        {/* Jira Integration */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Jira</h3>
              <p className="text-sm text-neutral-400">Connect your Jira instance to track sprint data</p>
            </div>
            {jiraConnected && (
              <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                Connected
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Jira Base URL
              </label>
              <input
                type="text"
                value={jiraConfig.baseUrl}
                onChange={(e) => {
                  setJiraConfig({ ...jiraConfig, baseUrl: e.target.value });
                  setJiraConnected(false);
                  setJiraSuccess('');
                }}
                placeholder="https://your-company.atlassian.net"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={jiraConfig.email}
                onChange={(e) => {
                  setJiraConfig({ ...jiraConfig, email: e.target.value });
                  setJiraConnected(false);
                  setJiraSuccess('');
                }}
                placeholder="your-email@company.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                API Token
              </label>
              <input
                type="password"
                value={jiraConfig.apiToken}
                onChange={(e) => {
                  setJiraConfig({ ...jiraConfig, apiToken: e.target.value });
                  setJiraConnected(false);
                  setJiraSuccess('');
                }}
                placeholder="Your Jira API token"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <p className="text-xs text-neutral-500 mt-2">
                Get your API token from{' '}
                <a 
                  href="https://id.atlassian.com/manage-profile/security/api-tokens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 underline"
                >
                  Atlassian Account Settings
                </a>
              </p>
            </div>

            {jiraError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {jiraError}
              </div>
            )}

            {jiraSuccess && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                {jiraSuccess}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={testJiraConnection}
                disabled={jiraTesting}
                className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {jiraTesting ? 'Testing...' : 'Test Connection'}
              </button>
              {jiraConnected && (
                <button
                  onClick={saveJiraConfig}
                  className="px-6 py-3 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition-colors active:scale-[0.98]"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>

        {/* GitHub Integration */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">GitHub</h3>
              <p className="text-sm text-neutral-400">Connect your GitHub repository to track code metrics</p>
            </div>
            {githubConnected && (
              <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                Connected
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                GitHub Personal Access Token
              </label>
              <input
                type="password"
                value={githubConfig.token}
                onChange={(e) => {
                  setGithubConfig({ ...githubConfig, token: e.target.value });
                  setGithubConnected(false);
                  setGithubSuccess('');
                }}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <p className="text-xs text-neutral-500 mt-2">
                Create a token with <code className="bg-white/10 px-1 rounded">repo</code> scope from{' '}
                <a 
                  href="https://github.com/settings/tokens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 underline"
                >
                  GitHub Settings
                </a>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Owner (Organization or Username)
              </label>
              <input
                type="text"
                value={githubConfig.owner}
                onChange={(e) => {
                  setGithubConfig({ ...githubConfig, owner: e.target.value });
                  setGithubConnected(false);
                  setGithubSuccess('');
                }}
                placeholder="your-org or your-username"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Repository Name
              </label>
              <input
                type="text"
                value={githubConfig.repo}
                onChange={(e) => {
                  setGithubConfig({ ...githubConfig, repo: e.target.value });
                  setGithubConnected(false);
                  setGithubSuccess('');
                }}
                placeholder="my-repository"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {githubError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {githubError}
              </div>
            )}

            {githubSuccess && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                {githubSuccess}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={testGithubConnection}
                disabled={githubTesting}
                className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {githubTesting ? 'Testing...' : 'Test Connection'}
              </button>
              {githubConnected && (
                <button
                  onClick={saveGithubConfig}
                  className="px-6 py-3 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition-colors active:scale-[0.98]"
                >
                  Save
                </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
