export default function RiskBadge({ zone }: { zone: string }) {
  const config: Record<string, { bg: string; text: string; emoji: string; glow: string }> = {
    GREEN: {
      bg: 'bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700',
      text: 'text-white',
      emoji: '🟢',
      glow: 'shadow-green-500/50',
    },
    YELLOW: {
      bg: 'bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600',
      text: 'text-gray-900 dark:text-white',
      emoji: '🟡',
      glow: 'shadow-yellow-400/50',
    },
    ORANGE: {
      bg: 'bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700',
      text: 'text-white',
      emoji: '🟠',
      glow: 'shadow-orange-500/50',
    },
    RED: {
      bg: 'bg-gradient-to-r from-red-600 to-red-700 dark:from-red-700 dark:to-red-800',
      text: 'text-white',
      emoji: '🔴',
      glow: 'shadow-red-600/50',
    },
  };

  const style = config[zone] || config.GREEN;

  return (
    <span
      className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm shadow-lg ${style.bg} ${style.text} ${style.glow} border-2 border-white/20`}
    >
      <span className="text-lg">{style.emoji}</span>
      <span>{zone} RISK</span>
    </span>
  );
}
  