export default function Insights({ items }: { items: string[] }) {
  if (!items || items.length === 0) {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <span className="text-xl">✅</span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
            Risk Insights
          </h3>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-800/50">
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            No risk insights at this time. Sprint is healthy! 🎉
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
          <span className="text-xl">🔍</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          Risk Insights
        </h3>
        <span className="ml-auto px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-bold">
          {items.length}
        </span>
      </div>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl border-l-4 border-orange-500 shadow-sm hover:shadow-md transition-all"
          >
            <span className="text-orange-600 dark:text-orange-400 mt-0.5 text-lg">⚠️</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
  