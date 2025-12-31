import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import Providers from '../components/Providers';

export const metadata: Metadata = {
  title: 'ScrumMate AI - Sprint Risk Analysis',
  description: 'AI-powered sprint health monitoring and risk prediction platform',
  manifest: '/manifest.json',
  themeColor: '#14b8a6',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ScrumMate AI',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex min-h-screen min-w-[340px] flex-col bg-black font-sans text-white antialiased overflow-x-hidden">
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
