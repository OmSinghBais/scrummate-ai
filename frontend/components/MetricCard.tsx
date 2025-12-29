const metricIcons: Record<string, string> = {
  'Spillover Rate': '📊',
  'PR Review Delay': '⏱️',
  'Code Churn': '🔄',
  'Bug Reopen Rate': '🐛',
};

const getMetricColor = (title: string, value: number) => {
  if (title === 'Spillover Rate' || title === 'Bug Reopen Rate') {
    if (value > 40) return 'text-red-600 dark:text-red-400';
    if (value > 25) return 'text-orange-600 dark:text-orange-400';
    return 'text-green-600 dark:text-green-400';
  }
  if (title === 'PR Review Delay') {
    if (value > 60) return 'text-red-600 dark:text-red-400';
    if (value > 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-green-600 dark:text-green-400';
  }
  if (title === 'Code Churn') {
    if (value > 70) return 'text-red-600 dark:text-red-400';
    if (value > 50) return 'text-orange-600 dark:text-orange-400';
    return 'text-green-600 dark:text-green-400';
  }
  return 'text-gray-900 dark:text-white';
};

export default function MetricCard({ title, value, trend }: { title: string; value: string; trend?: number }) {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const valueColor = getMetricColor(title, numericValue);
  const icon = metricIcons[title] || '📈';

  return (
    <div className="group relative border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-amber-50/0 group-hover:from-orange-50 group-hover:to-amber-50 dark:group-hover:from-orange-900/10 dark:group-hover:to-amber-900/10 transition-all duration-300" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <span className="text-2xl">{icon}</span>
          </div>
          {trend !== undefined && (
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                trend >= 0
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              }`}
            >
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
          {title}
        </h3>
        <p className={`text-4xl font-extrabold ${valueColor} transition-colors`}>
          {value}
        </p>
      </div>
    </div>
  );
}
  