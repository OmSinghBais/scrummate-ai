import Link from 'next/link';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform">
            <span className="text-6xl">🚀</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-gray-900 via-orange-600 to-amber-600 dark:from-white dark:via-orange-400 dark:to-amber-400 bg-clip-text text-transparent mb-4">
            ScrumMate AI
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-3 font-semibold">
            AI-Powered Sprint Risk Analysis
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Predict sprint failures, monitor health metrics, and optimize your agile workflow with machine learning
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/dashboard"
            className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
          >
            <span>View Dashboard</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">🤖</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              ML Predictions
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              XGBoost-powered sprint failure prediction with feature importance analysis
            </p>
          </div>
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">📊</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Real-Time Metrics
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Track sprint health with live data from Jira & GitHub integrations
            </p>
          </div>
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Risk Insights
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Actionable recommendations and insights for sprint success
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Ready to get started?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Monitor your sprint health in real-time
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl"
            >
              Open Dashboard →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
