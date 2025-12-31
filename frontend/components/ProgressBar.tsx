'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'orange' | 'green' | 'red' | 'blue';
  showValue?: boolean;
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  color = 'orange',
  showValue = true,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const colorClasses = {
    orange: 'from-orange-500 to-amber-500',
    green: 'from-green-500 to-emerald-500',
    red: 'from-red-500 to-rose-500',
    blue: 'from-blue-500 to-cyan-500',
  };

  const getColor = () => {
    if (percentage >= 70) return 'green';
    if (percentage >= 40) return 'orange';
    return 'red';
  };

  const finalColor = color === 'orange' ? getColor() : color;

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-sm font-medium text-gray-300">{label}</span>}
          {showValue && (
            <span className="text-sm font-semibold text-white">{value}%</span>
          )}
        </div>
      )}
      <div className="h-3 w-full rounded-full bg-gray-800 overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colorClasses[finalColor]} shadow-lg`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

