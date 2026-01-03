'use client';

import { useState, useEffect } from 'react';
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


import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

