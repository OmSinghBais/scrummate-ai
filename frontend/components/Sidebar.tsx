'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { href: '/dashboard', label: 'Overview', icon: '📊', badge: null },
    { href: '/dashboard/sprints', label: 'Sprints', icon: '🏃', badge: '12' },
    { href: '/dashboard/metrics', label: 'Metrics', icon: '📈', badge: null },
    { href: '/dashboard/risks', label: 'Risks', icon: '⚠️', badge: '3' },
    { href: '/dashboard/insights', label: 'Insights', icon: '💡', badge: null },
    { href: '/dashboard/teams', label: 'Teams', icon: '👥', badge: null },
    { href: '/dashboard/integrations', label: 'Integrations', icon: '🔗', badge: null },
  ];

  const quickActions = [
    { label: 'New Sprint', icon: '➕', action: () => {} },
    { label: 'Generate Report', icon: '📄', action: () => {} },
    { label: 'Export Data', icon: '💾', action: () => {} },
  ];

  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <motion.aside
      className={`hidden lg:block fixed left-0 top-[105px] bottom-0 z-40 glass-card border-r border-gray-800/50 backdrop-blur-xl transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 glass-card p-2 rounded-full border border-gray-800 hover:bg-gray-800/50 transition-colors"
      >
        <motion.svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </motion.svg>
      </button>

      <div className="h-full flex flex-col p-4">
        {/* Navigation Menu */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item, idx) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Link
                href={item.href}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all card-3d ${
                  isActive(item.href)
                    ? 'text-white bg-orange-500/20 shadow-lg shadow-orange-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-orange-500/20 text-orange-400">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {isActive(item.href) && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-amber-500 rounded-r"
                    layoutId="activeSidebar"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Quick Actions */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 pt-8 border-t border-gray-800/50"
          >
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3 px-4">Quick Actions</p>
            <div className="space-y-2">
              {quickActions.map((action, idx) => (
                <motion.button
                  key={action.label}
                  onClick={action.action}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all card-3d"
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
                >
                  <span>{action.icon}</span>
                  <span>{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}

