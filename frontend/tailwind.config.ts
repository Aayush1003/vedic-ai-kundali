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
        // Vedic astrology themed colors
        vedic: {
          50: '#faf8f6',
          100: '#f5f1ed',
          200: '#e8e0d8',
          300: '#dbc9c0',
          400: '#c9a89d',
          500: '#b78870',
          600: '#a56d52',
          700: '#885843',
          800: '#6d483b',
          900: '#583c33',
        },
        lunar: {
          50: '#faf8ff',
          100: '#f5f1ff',
          200: '#e8deff',
          300: '#dbc9ff',
          400: '#c9a8ff',
          500: '#b787ff',
          600: '#a56cff',
          700: '#8858ff',
          800: '#6d48ff',
          900: '#583cff',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-vedic': 'linear-gradient(135deg, #b78870 0%, #6d48ff 100%)',
        'gradient-lunar': 'linear-gradient(135deg, #dbc9c0 0%, #c9a8ff 100%)',
      },
    },
  },
  plugins: [require('tailwindcss/plugin')],
} satisfies Config

export default config
