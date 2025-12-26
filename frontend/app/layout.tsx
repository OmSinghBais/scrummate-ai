import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ScrumMate AI',
  description: 'AI-powered sprint risk dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
