import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config = {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep space cosmic theme
        cosmic: {
          50: '#f4f6f8',
          100: '#e3e8ee',
          200: '#c8d3de',
          300: '#a3b6c7',
          400: '#7893a9',
          500: '#58778f',
          600: '#435e74',
          700: '#364c5f',
          800: '#2f4151',
          900: '#1b2633',
          950: '#0b111a',
        },
        // Mystic Gold accents
        gold: {
          50: '#fffdf5',
          100: '#fff9e6',
          200: '#fff1cd',
          300: '#ffe3a3',
          400: '#ffcf6b',
          500: '#ffb32b',
          600: '#f5960b',
          700: '#cc7302',
          800: '#a1580b',
          900: '#82490d',
          950: '#4a2602',
        },
        // Vibrant cosmic purple
        mystic: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f4cbf5',
          300: '#efa0f0',
          400: '#e56ee4',
          500: '#d946d7',
          600: '#b821b5',
          700: '#971793',
          800: '#7a1577',
          900: '#651661',
          950: '#3e043b',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #ffb32b 0%, #d946d7 100%)',
        'gradient-cosmic': 'linear-gradient(to bottom right, #0b111a, #1b2633)',
      },
      boxShadow: {
        'glow-gold': '0 0 20px -5px rgba(255, 179, 43, 0.4)',
        'glow-mystic': '0 0 20px -5px rgba(217, 70, 215, 0.4)',
        'glow-cyan': '0 0 20px -5px rgba(34, 211, 238, 0.4)',
      },
    },
  },
  plugins: [require('tailwindcss/plugin')],
} satisfies Config

export default config
