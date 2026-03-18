import { motion } from 'framer-motion';

export default function RiskBadge({ zone }: { zone: string }) {
  const config: Record<string, { bg: string; text: string; emoji: string; glow: string }> = {
    GREEN: {
      bg: 'bg-gradient-to-r from-teal-500 to-emerald-600',
      text: 'text-white',
      emoji: '🟢',
      glow: 'shadow-teal-500/50',
    },
    YELLOW: {
      bg: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      text: 'text-white',
      emoji: '🟡',
      glow: 'shadow-yellow-400/50',
    },
    ORANGE: {
      bg: 'bg-gradient-to-r from-orange-500 to-orange-600',
      text: 'text-white',
      emoji: '🟠',
      glow: 'shadow-orange-500/50',
    },
    RED: {
      bg: 'bg-gradient-to-r from-rose-600 to-red-800',
      text: 'text-white',
      emoji: '🔴',
      glow: 'shadow-rose-600/50',
    },
  };

  const style = config[zone] || config.GREEN;

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2.5 rounded-xl border border-white/20 px-5 py-3 text-sm font-bold shadow-lg backdrop-blur-md ${style.bg} ${style.text} ${style.glow}`}
    >
      <span className="text-lg">{style.emoji}</span>
      <span className="font-outfit uppercase tracking-wider">{zone} RISK</span>
    </motion.span>
  );
}
  