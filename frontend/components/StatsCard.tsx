'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: string;
  trend?: 'up' | 'down';
  color?: 'orange' | 'green' | 'red' | 'blue';
}

export default function StatsCard({ title, value, change, icon, trend, color = 'orange' }: StatsCardProps) {
  const colorClasses = {
    orange: 'from-orange-500 to-amber-500',
    green: 'from-green-500 to-emerald-500',
    red: 'from-red-500 to-rose-500',
    blue: 'from-blue-500 to-cyan-500',
  };

  return (
    <motion.div
      className="glass-card rounded-2xl p-6 card-3d"
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
          <span className="text-2xl">{icon}</span>
        </div>
        {change !== undefined && (
          <div
            className={`px-2 py-1 rounded-lg text-xs font-semibold ${
              trend === 'up'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {trend === 'up' ? '↑' : '↓'} {Math.abs(change)}%
          </div>
        )}
      </div>
      
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
      
      {change !== undefined && (
        <p className="text-xs text-gray-500 mt-2">vs last sprint</p>
      )}
    </motion.div>
  );
}

