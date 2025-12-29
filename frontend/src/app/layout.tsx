import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ScrumMate AI - Sprint Risk Analysis',
  description: 'AI-powered sprint health monitoring and risk prediction platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
