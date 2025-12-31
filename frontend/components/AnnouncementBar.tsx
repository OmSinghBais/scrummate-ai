import Link from 'next/link';

export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 z-50 flex h-9 w-screen items-center justify-center gap-x-4 overflow-hidden bg-[#0B0C0E] px-safe">
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <span className="font-semibold">New:</span>
        <span>Enhanced AI predictions with real-time risk analysis</span>
        <Link
          href="/dashboard"
          className="font-semibold text-orange-400 transition-colors hover:text-orange-300 underline"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}

