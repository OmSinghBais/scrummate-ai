const metricIcons: Record<string, string> = {
  'Spillover Rate': '📊',
  'PR Review Delay': '⏱️',
  'Code Churn': '🔄',
  'Bug Reopen Rate': '🐛',
};

const getMetricColor = (title: string, value: number) => {
  if (title === 'Spillover Rate' || title === 'Bug Reopen Rate') {
    if (value > 40) return 'text-red-400';
    if (value > 25) return 'text-orange-400';
    return 'text-green-400';
  }
  if (title === 'PR Review Delay') {
    if (value > 60) return 'text-red-400';
    if (value > 40) return 'text-orange-400';
    return 'text-green-400';
  }
  if (title === 'Code Churn') {
    if (value > 70) return 'text-red-400';
    if (value > 50) return 'text-orange-400';
    return 'text-green-400';
  }
  return 'text-white';
};

export default function MetricCard({ title, value, trend }: { title: string; value: string; trend?: number }) {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const valueColor = getMetricColor(title, numericValue);
  const icon = metricIcons[title] || '📈';

  return (
    <div className="group relative overflow-hidden rounded-2xl glass-card p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:scale-105 card-3d">
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-amber-500/0 transition-all duration-300 group-hover:from-orange-500/10 group-hover:to-amber-500/10" />

      <div className="relative transform-3d">
        <div className="mb-4 flex items-center justify-between">
          <div className="rounded-lg bg-gray-800 p-2">
            <span className="text-2xl">{icon}</span>
          </div>
          {trend !== undefined && (
            <span
              className={`rounded-full px-2 py-1 text-xs font-semibold ${
                trend >= 0
                  ? 'bg-red-900/30 text-red-400'
                  : 'bg-green-900/30 text-green-400'
              }`}
            >
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
          {title}
        </h3>
        <p className={`text-4xl font-extrabold ${valueColor} transition-colors`}>
          {value}
        </p>
      </div>
    </div>
  );
}
  