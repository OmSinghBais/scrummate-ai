import Link from 'next/link';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center animate-fade-in">
            <div className="mb-8 inline-flex items-center justify-center">
              <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 p-4 shadow-2xl transition-transform hover:scale-105">
                <span className="text-6xl">🚀</span>
              </div>
            </div>
            <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
              A higher standard in{' '}
              <span className="gradient-text">sprint management</span>
            </h1>
            <p className="mb-4 text-xl text-gray-300 sm:text-2xl">
              AI-Powered Sprint Risk Analysis
            </p>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400">
              Predict sprint failures, monitor health metrics, and optimize your agile workflow with machine learning-powered insights
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="group rounded-lg bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
              >
                Get Started
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg border border-gray-700 bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:border-gray-600 hover:bg-gray-800/50"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Built for modern agile teams
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Everything you need to monitor, predict, and optimize your sprint performance
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border border-gray-800 bg-gray-900/50 p-8 backdrop-blur-sm transition-all hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10">
              <div className="mb-6 text-5xl transition-transform group-hover:scale-110">
                🤖
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">ML Predictions</h3>
              <p className="leading-relaxed text-gray-400">
                XGBoost-powered sprint failure prediction with feature importance analysis and real-time risk assessment
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-800 bg-gray-900/50 p-8 backdrop-blur-sm transition-all hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10">
              <div className="mb-6 text-5xl transition-transform group-hover:scale-110">
                📊
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Real-Time Metrics</h3>
              <p className="leading-relaxed text-gray-400">
                Track sprint health with live data from Jira & GitHub integrations, updated every 30 seconds
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-800 bg-gray-900/50 p-8 backdrop-blur-sm transition-all hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10">
              <div className="mb-6 text-5xl transition-transform group-hover:scale-110">
                🎯
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Risk Insights</h3>
              <p className="leading-relaxed text-gray-400">
                Actionable recommendations and insights for sprint success, powered by advanced analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="relative border-t border-gray-800 bg-gray-900/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Intelligent sprint monitoring
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Complete sprint health tracking in one powerful platform
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
                  <span className="text-xl">📈</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Health Score Tracking</h3>
              </div>
              <p className="text-gray-400">
                Real-time sprint health scores calculated from multiple metrics including spillover rates, code churn, and PR review delays
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
                  <span className="text-xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Risk Zone Analysis</h3>
              </div>
              <p className="text-gray-400">
                Automated risk zone classification (Low, Medium, High, Critical) with trend analysis and historical comparisons
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
                  <span className="text-xl">📉</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Trend Visualization</h3>
              </div>
              <p className="text-gray-400">
                Interactive charts showing sprint health trends over time with predictive analytics
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
                  <span className="text-xl">🔗</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Jira Integration</h3>
              </div>
              <p className="text-gray-400">
                Seamless connection with Jira to pull sprint data, issue metrics, and team performance indicators
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
                  <span className="text-xl">💻</span>
                </div>
                <h3 className="text-lg font-semibold text-white">GitHub Integration</h3>
              </div>
              <p className="text-gray-400">
                Connect with GitHub repositories to track PR review times, code churn, and development velocity
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
                  <span className="text-xl">💡</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Actionable Insights</h3>
              </div>
              <p className="text-gray-400">
                Get specific recommendations to improve sprint health based on current metrics and historical patterns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative border-t border-gray-800 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to optimize your sprints?
          </h2>
          <p className="mb-8 text-lg text-gray-400">
            Start monitoring your sprint health in real-time with AI-powered insights
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
          >
            Get Started
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
