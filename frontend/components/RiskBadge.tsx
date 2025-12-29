export default function RiskBadge({ zone }: { zone: string }) {
  const config: Record<string, { bg: string; text: string; emoji: string }> = {
    GREEN: {
      bg: 'bg-green-500 dark:bg-green-600',
      text: 'text-white',
      emoji: '🟢',
    },
    YELLOW: {
      bg: 'bg-yellow-400 dark:bg-yellow-500',
      text: 'text-gray-900 dark:text-white',
      emoji: '🟡',
    },
    ORANGE: {
      bg: 'bg-orange-500 dark:bg-orange-600',
      text: 'text-white',
      emoji: '🟠',
    },
    RED: {
      bg: 'bg-red-600 dark:bg-red-700',
      text: 'text-white',
      emoji: '🔴',
    },
  };

  const style = config[zone] || config.GREEN;

  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm shadow-sm ${style.bg} ${style.text}`}
    >
      <span>{style.emoji}</span>
      <span>{zone} RISK</span>
    </span>
  );
}
  