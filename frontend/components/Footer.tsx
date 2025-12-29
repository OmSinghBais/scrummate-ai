import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 ScrumMate AI. Built with ❤️ for agile teams.
            </p>
          </div>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

