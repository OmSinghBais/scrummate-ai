export default function RiskBadge({ zone }: { zone: string }) {
  const config: Record<string, { bg: string; text: string; emoji: string; glow: string }> = {
    GREEN: {
      bg: 'bg-gradient-to-r from-green-600 to-green-700',
      text: 'text-white',
      emoji: '🟢',
      glow: 'shadow-green-500/50',
    },
    YELLOW: {
      bg: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      text: 'text-white',
      emoji: '🟡',
      glow: 'shadow-yellow-400/50',
    },
    ORANGE: {
      bg: 'bg-gradient-to-r from-orange-600 to-orange-700',
      text: 'text-white',
      emoji: '🟠',
      glow: 'shadow-orange-500/50',
    },
    RED: {
      bg: 'bg-gradient-to-r from-red-700 to-red-800',
      text: 'text-white',
      emoji: '🔴',
      glow: 'shadow-red-600/50',
    },
  };

  const style = config[zone] || config.GREEN;

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-xl border-2 border-white/20 px-5 py-3 text-sm font-bold shadow-lg ${style.bg} ${style.text} ${style.glow}`}
    >
      <span className="text-lg">{style.emoji}</span>
      <span>{zone} RISK</span>
    </span>
  );
}
  