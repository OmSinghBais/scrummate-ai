'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-9 z-50 h-16 w-screen bg-transparent px-safe lg:h-16">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg transition-transform group-hover:scale-105">
            <span className="text-xl">🚀</span>
          </div>
          <span className="text-xl font-bold text-white">ScrumMate AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-100 hover:shadow-lg"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[100px] z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 md:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-base font-medium text-gray-300 transition-colors hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="block text-base font-medium text-gray-300 transition-colors hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="block rounded-lg bg-white px-4 py-2 text-center text-sm font-semibold text-gray-900 transition-all hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

