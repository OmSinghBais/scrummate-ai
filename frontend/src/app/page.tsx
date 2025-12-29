import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-8">
      <div className="max-w-4xl text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 ScrumMate AI
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2">
            AI-Powered Sprint Risk Analysis
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500">
            Predict sprint failures and optimize your agile workflow
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg"
          >
            View Dashboard →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              ML Predictions
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              XGBoost-powered sprint failure prediction
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Real-Time Metrics
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track sprint health with live data from Jira & GitHub
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Risk Insights
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Actionable recommendations for sprint success
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
