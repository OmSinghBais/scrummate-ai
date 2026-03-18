'use client';

import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: string;
  trend?: 'up' | 'down';
  color?: 'orange' | 'green' | 'red' | 'blue' | 'teal';
}

export default function StatsCard({ title, value, change, icon, trend, color = 'teal' }: StatsCardProps) {
  const colorClasses = {
    teal: 'from-teal-400 to-cyan-500',
    orange: 'from-orange-500 to-amber-500',
    green: 'from-emerald-400 to-teal-500',
    red: 'from-rose-500 to-pink-600',
    blue: 'from-cyan-400 to-blue-500',
  };

  return (
    <motion.div
      className="glass-card rounded-2xl p-6 card-3d relative overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 transition-opacity duration-300 hover:opacity-10 pointer-events-none`} />
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg border border-white/10`}>
          <span className="text-2xl">{icon}</span>
        </div>
        {change !== undefined && (
          <div
            className={`px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm border ${
              trend === 'up'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
            }`}
          >
            {trend === 'up' ? '↑' : '↓'} {Math.abs(change)}%
          </div>
        )}
      </div>
      
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2 font-outfit relative z-10">{title}</h3>
      <p className="text-3xl font-bold text-white font-outfit relative z-10">{value}</p>
      
      {change !== undefined && (
        <p className="text-xs text-gray-500 mt-2 font-sans relative z-10">vs last sprint</p>
      )}
    </motion.div>
  );
}

