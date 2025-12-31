import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';

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
      <body className="flex min-h-screen min-w-[340px] flex-col bg-[#0B0C0E] font-sans text-white antialiased overflow-x-hidden">
        <AnnouncementBar />
        <Navbar />
        <main className="grow">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
