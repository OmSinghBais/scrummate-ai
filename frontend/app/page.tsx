import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">ScrumMate AI</h1>
      <p className="mb-6">Predict sprint risks before failure.</p>
      <Link href="/dashboard" className="underline text-blue-600">
        Go to Dashboard →
      </Link>
    </div>
  );
}
