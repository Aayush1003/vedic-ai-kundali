import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Vedic AI Kundali',
  description: 'AI-powered Vedic Astrology platform with Kundali generation, compatibility matching, and AI astrologer chat.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-cosmic-950 text-cosmic-100 antialiased`}>
        {children}
      </body>
    </html>
  )
}
