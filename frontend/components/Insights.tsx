export default function Insights({ items }: { items: string[] }) {
  if (!items || items.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 shadow-xl backdrop-blur-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-green-900/30 p-2">
            <span className="text-xl">✅</span>
          </div>
          <h3 className="text-lg font-bold text-white">Risk Insights</h3>
        </div>
        <div className="rounded-xl border-2 border-green-800/50 bg-green-900/20 p-4">
          <p className="font-medium text-gray-300">
            No risk insights at this time. Sprint is healthy! 🎉
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 shadow-xl backdrop-blur-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-lg bg-orange-900/30 p-2">
          <span className="text-xl">🔍</span>
        </div>
        <h3 className="text-lg font-bold text-white">Risk Insights</h3>
        <span className="ml-auto rounded-full bg-orange-900/30 px-3 py-1 text-xs font-bold text-orange-300">
          {items.length}
        </span>
      </div>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 rounded-xl border-l-4 border-orange-500 bg-gradient-to-r from-orange-900/20 to-amber-900/20 p-4 shadow-sm transition-all hover:shadow-md"
          >
            <span className="mt-0.5 text-lg text-orange-400">⚠️</span>
            <span className="flex-1 font-medium text-gray-200">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
  