/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-outfit)', 'serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        space: {
          900: '#050510',
          800: '#0a0a1a',
          700: '#14142b',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          glow: 'rgba(139, 92, 246, 0.4)',
        },
        fuchsia: {
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          glow: 'rgba(217, 70, 239, 0.4)',
        },
        neon: {
          cyan: '#06b6d4',
          mint: '#5eead4',
          glow: 'rgba(6, 182, 212, 0.4)',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          glow: 'rgba(20, 184, 166, 0.4)',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          glow: 'rgba(6, 182, 212, 0.4)',
        },
        mint: {
          400: '#5eead4',
        },
      },
      animation: {
        'float': 'float 12s ease-in-out infinite',
        'float-complex': 'float-complex 15s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'aurora': 'aurora 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-complex': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(2%, -4%) scale(1.05)' },
          '66%': { transform: 'translate(-2%, 4%) scale(0.95)' },
        },
        aurora: {
          from: { backgroundPosition: '50% 50%, 50% 50%' },
          to: { backgroundPosition: '350% 50%, 350% 50%' },
        }
      }
    },
  },
  plugins: [],
};
